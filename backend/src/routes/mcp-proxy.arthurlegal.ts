/**
 * mike-oss × ArthurLegal v2.0.0 — yargi-mcp-pro Proxy Router
 *
 * Kurulum:
 *   1. backend/src/routes/ altına bu dosyayı kopyala
 *   2. backend/src/index.ts'e router'ı ekle:
 *        import yargiMcpRouter from "./routes/mcp-proxy.arthurlegal";
 *        app.use("/api/mcp", yargiMcpRouter);
 *   3. backend/.env dosyasına ekle:
 *        YARGI_MCP_ENDPOINT=https://yargi-mcp-pro-production.up.railway.app/mcp
 *        YARGI_MCP_TOKEN=<OAuth access token>
 *
 * Endpoint haritası (15 endpoint — ArthurLegal v1.2.0 tam kapsam):
 *
 *   Mevzuat:
 *     POST /api/mcp/yargi/mevzuat/search         → search_mevzuat
 *     POST /api/mcp/yargi/mevzuat/get            → get_mevzuat_document
 *     POST /api/mcp/yargi/mevzuat/search-within  → search_within_mevzuat
 *
 *   Kararlar (Genel):
 *     POST /api/mcp/yargi/kararlar/search        → search_bedesten_unified
 *     POST /api/mcp/yargi/kararlar/get           → get_bedesten_document_markdown
 *     POST /api/mcp/yargi/kararlar/semantic      → search_bedesten_semantic
 *
 *   Kurum Bazlı Arama:
 *     POST /api/mcp/yargi/anayasa/search         → search_anayasa_unified
 *     POST /api/mcp/yargi/rekabet/search         → search_rekabet_kurumu_decisions
 *     POST /api/mcp/yargi/kvkk/search            → search_kvkk_decisions
 *     POST /api/mcp/yargi/bddk/search            → search_bddk_decisions
 *     POST /api/mcp/yargi/gib/search             → search_gib_ozelge
 *     POST /api/mcp/yargi/kik/search             → search_kik_v2_decisions
 *     POST /api/mcp/yargi/sayistay/search        → search_sayistay_unified
 *
 *   Yardımcı:
 *     POST /api/mcp/yargi/research-guide         → legal_research_guide
 *     POST /api/mcp/yargi/health                 → check_government_servers_health
 *
 * Kaynak: ArthurLegal v1.2.0 — yargi-mcp-rehberi.md
 * https://github.com/beerbottle90/ArthurLegal
 */

import { Router, type Request, type Response } from "express";

const router = Router();

const MCP_ENDPOINT =
    process.env.YARGI_MCP_ENDPOINT ??
    "https://yargi-mcp-pro-production.up.railway.app/mcp";
const MCP_TOKEN = process.env.YARGI_MCP_TOKEN ?? "";

// ---------------------------------------------------------------------------
// Core proxy helper
// ---------------------------------------------------------------------------

async function callMcpTool(
    toolName: string,
    toolInput: Record<string, unknown>,
): Promise<unknown> {
    if (!MCP_TOKEN) {
        throw new Error(
            "YARGI_MCP_TOKEN env değişkeni tanımlanmamış. backend/.env dosyasına ekleyin.",
        );
    }

    const body = {
        jsonrpc: "2.0",
        id: 1,
        method: "tools/call",
        params: { name: toolName, arguments: toolInput },
    };

    const res = await fetch(MCP_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/event-stream",
            Authorization: `Bearer ${MCP_TOKEN}`,
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        throw new Error(`yargi-mcp-pro ${res.status}: ${await res.text()}`);
    }

    const contentType = res.headers.get("content-type") ?? "";
    let json: { result?: unknown; error?: { message: string } };

    if (contentType.includes("text/event-stream")) {
        // SSE format: one or more "data: {...}" lines — find the JSON-RPC response line
        const text = await res.text();
        const dataLine = text
            .split("\n")
            .find((l) => l.startsWith("data:") && l.includes('"jsonrpc"'));
        if (!dataLine) throw new Error("MCP SSE response contained no data line");
        json = JSON.parse(dataLine.slice(5).trim());
    } else {
        json = (await res.json()) as typeof json;
    }

    if (json.error) throw new Error(`MCP hata: ${json.error.message}`);
    return json.result;
}

function handleError(res: Response, err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: msg });
}

// ---------------------------------------------------------------------------
// Mevzuat (Mevzuat Bilgi Sistemi)
// ---------------------------------------------------------------------------

/** POST /api/mcp/yargi/mevzuat/search — Mevzuat arama
 *  Body: { query?, mevzuat_adi?, mevzuat_no?, mevzuat_tur_list?, page_size? }
 *  query/phrase are aliases — whichever is provided is forwarded as `phrase`.
 */
router.post("/yargi/mevzuat/search", async (req: Request, res: Response) => {
    try {
        const {
            query,
            phrase,
            mevzuat_adi,
            mevzuat_no,
            mevzuat_tur_list,
            page_size = 10,
        } = req.body as {
            query?: string;
            phrase?: string;
            mevzuat_adi?: string;
            mevzuat_no?: string;
            mevzuat_tur_list?: string[];
            page_size?: number;
        };
        const input: Record<string, unknown> = { page_size };
        const p = phrase ?? query;
        if (p) input.phrase = p;
        if (mevzuat_adi) input.mevzuat_adi = mevzuat_adi;
        if (mevzuat_no) input.mevzuat_no = mevzuat_no;
        if (mevzuat_tur_list) input.mevzuat_tur_list = mevzuat_tur_list;
        const result = await callMcpTool("search_mevzuat", input);
        res.json({ data: result });
    } catch (err) {
        handleError(res, err);
    }
});

/** POST /api/mcp/yargi/mevzuat/get — Kanun/madde metni al
 *  Body: { id, id_type? }  (id = mevzuat_id — param name in tool is "id")
 */
router.post("/yargi/mevzuat/get", async (req: Request, res: Response) => {
    try {
        const { id, mevzuat_id, id_type = "mevzuat" } = req.body as {
            id?: string;
            mevzuat_id?: string;
            id_type?: "mevzuat" | "outline" | "madde" | "gerekce";
        };
        const result = await callMcpTool("get_mevzuat_document", {
            id: id ?? mevzuat_id,
            id_type,
        });
        res.json({ data: result });
    } catch (err) {
        handleError(res, err);
    }
});

/** POST /api/mcp/yargi/mevzuat/search-within — Belirli kanun içinde arama
 *  Body: { mevzuat_id, query, page_size? }
 */
router.post(
    "/yargi/mevzuat/search-within",
    async (req: Request, res: Response) => {
        try {
            const { mevzuat_id, query, page_size = 10 } = req.body as {
                mevzuat_id: string;
                query: string;
                page_size?: number;
            };
            const result = await callMcpTool("search_within_mevzuat", {
                mevzuat_id,
                query,
                page_size,
            });
            res.json({ data: result });
        } catch (err) {
            handleError(res, err);
        }
    },
);

// ---------------------------------------------------------------------------
// Kararlar — Genel (Bedesten)
// ---------------------------------------------------------------------------

/**
 * POST /api/mcp/yargi/kararlar/search
 * Body: { query/phrase, page_size?, court_types?, birimAdi?, kararTarihiStart?, kararTarihiEnd? }
 * query and phrase are aliases — forwarded as `phrase` to the tool.
 */
router.post(
    "/yargi/kararlar/search",
    async (req: Request, res: Response) => {
        try {
            const {
                query,
                phrase,
                page_size = 10,
                court_types,
                birimAdi,
                kararTarihiStart,
                kararTarihiEnd,
            } = req.body as {
                query?: string;
                phrase?: string;
                page_size?: number;
                court_types?: string[];
                birimAdi?: string;
                kararTarihiStart?: string;
                kararTarihiEnd?: string;
            };
            const input: Record<string, unknown> = { page_size };
            const p = phrase ?? query;
            if (p) input.phrase = p;
            if (court_types) input.court_types = court_types;
            if (birimAdi) input.birimAdi = birimAdi;
            if (kararTarihiStart) input.kararTarihiStart = kararTarihiStart;
            if (kararTarihiEnd) input.kararTarihiEnd = kararTarihiEnd;
            const result = await callMcpTool("search_bedesten_unified", input);
            res.json({ data: result });
        } catch (err) {
            handleError(res, err);
        }
    },
);

/** POST /api/mcp/yargi/kararlar/get — Karar tam metni
 *  Body: { documentId }  (not document_url — tool param is documentId)
 */
router.post("/yargi/kararlar/get", async (req: Request, res: Response) => {
    try {
        const { documentId, document_url } = req.body as {
            documentId?: string;
            document_url?: string;
        };
        const result = await callMcpTool("get_bedesten_document_markdown", {
            documentId: documentId ?? document_url,
        });
        res.json({ data: result });
    } catch (err) {
        handleError(res, err);
    }
});

/** POST /api/mcp/yargi/kararlar/semantic — Semantik karar arama */
router.post(
    "/yargi/kararlar/semantic",
    async (req: Request, res: Response) => {
        try {
            const { query, limit = 10 } = req.body as {
                query: string;
                limit?: number;
            };
            const result = await callMcpTool("search_bedesten_semantic", {
                query,
                limit,
            });
            res.json({ data: result });
        } catch (err) {
            handleError(res, err);
        }
    },
);

// ---------------------------------------------------------------------------
// Kurum Bazlı Arama
// Bu endpoint'ler mevcut token ile aktif değil.
// search_bedesten_unified veya search_bedesten_semantic kullanın.
// ---------------------------------------------------------------------------

function notAvailable(institution: string) {
    return (_req: Request, res: Response) => {
        res.status(501).json({
            error: `${institution} kurum araması bu token ile kullanılamaz. ` +
                   "Bunun yerine /api/mcp/yargi/kararlar/search veya /kararlar/semantic kullanın.",
        });
    };
}

router.post("/yargi/anayasa/search",  notAvailable("Anayasa Mahkemesi"));
router.post("/yargi/rekabet/search",  notAvailable("Rekabet Kurumu"));
router.post("/yargi/kvkk/search",     notAvailable("KVKK"));
router.post("/yargi/bddk/search",     notAvailable("BDDK"));
router.post("/yargi/gib/search",      notAvailable("GİB"));
router.post("/yargi/kik/search",      notAvailable("KİK"));
router.post("/yargi/sayistay/search", notAvailable("Sayıştay"));

// ---------------------------------------------------------------------------
// Yardımcı Araçlar
// ---------------------------------------------------------------------------

/** POST /api/mcp/yargi/research-guide — Araştırma rehberi + kurum listesi */
router.post(
    "/yargi/research-guide",
    async (_req: Request, res: Response) => {
        try {
            const result = await callMcpTool("legal_research_guide", {});
            res.json({ data: result });
        } catch (err) {
            handleError(res, err);
        }
    },
);

/** POST /api/mcp/yargi/health — Bağlantı sağlık kontrolü (research-guide üzerinden) */
router.post("/yargi/health", async (_req: Request, res: Response) => {
    try {
        await callMcpTool("legal_research_guide", {});
        res.json({ ok: true, status: "yargi-mcp-pro reachable" });
    } catch (err) {
        handleError(res, err);
    }
});

export default router;
