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
            Authorization: `Bearer ${MCP_TOKEN}`,
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        throw new Error(`yargi-mcp-pro ${res.status}: ${await res.text()}`);
    }

    const json = (await res.json()) as {
        result?: unknown;
        error?: { message: string };
    };
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

/** POST /api/mcp/yargi/mevzuat/search — Mevzuat tam metin arama */
router.post("/yargi/mevzuat/search", async (req: Request, res: Response) => {
    try {
        const { query, limit = 10 } = req.body as {
            query: string;
            limit?: number;
        };
        const result = await callMcpTool("search_mevzuat", { query, limit });
        res.json({ data: result });
    } catch (err) {
        handleError(res, err);
    }
});

/** POST /api/mcp/yargi/mevzuat/get — Kanun/madde metni al */
router.post("/yargi/mevzuat/get", async (req: Request, res: Response) => {
    try {
        const { mevzuat_id, id_type = "mevzuat" } = req.body as {
            mevzuat_id: string;
            id_type?: "mevzuat" | "outline" | "madde" | "gerekce";
        };
        const result = await callMcpTool("get_mevzuat_document", {
            mevzuat_id,
            id_type,
        });
        res.json({ data: result });
    } catch (err) {
        handleError(res, err);
    }
});

/** POST /api/mcp/yargi/mevzuat/search-within — Belirli kanun içinde arama */
router.post(
    "/yargi/mevzuat/search-within",
    async (req: Request, res: Response) => {
        try {
            const { mevzuat_id, query, limit = 10 } = req.body as {
                mevzuat_id: string;
                query: string;
                limit?: number;
            };
            const result = await callMcpTool("search_within_mevzuat", {
                mevzuat_id,
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
// Kararlar — Genel (Bedesten)
// ---------------------------------------------------------------------------

/**
 * POST /api/mcp/yargi/kararlar/search
 * institution örnekleri: "yargitay", "danistay", "anayasa", "kvkk", "rekabet"
 */
router.post(
    "/yargi/kararlar/search",
    async (req: Request, res: Response) => {
        try {
            const { query, limit = 10, institution } = req.body as {
                query: string;
                limit?: number;
                institution?: string;
            };
            const input: Record<string, unknown> = { query, limit };
            if (institution) input.institution = institution;
            const result = await callMcpTool("search_bedesten_unified", input);
            res.json({ data: result });
        } catch (err) {
            handleError(res, err);
        }
    },
);

/** POST /api/mcp/yargi/kararlar/get — Karar tam metni */
router.post("/yargi/kararlar/get", async (req: Request, res: Response) => {
    try {
        const { document_url } = req.body as { document_url: string };
        const result = await callMcpTool("get_bedesten_document_markdown", {
            document_url,
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
// ---------------------------------------------------------------------------

/** POST /api/mcp/yargi/anayasa/search — Anayasa Mahkemesi kararları */
router.post(
    "/yargi/anayasa/search",
    async (req: Request, res: Response) => {
        try {
            const { query, limit = 10 } = req.body as {
                query: string;
                limit?: number;
            };
            const result = await callMcpTool("search_anayasa_unified", {
                query,
                limit,
            });
            res.json({ data: result });
        } catch (err) {
            handleError(res, err);
        }
    },
);

/** POST /api/mcp/yargi/rekabet/search — Rekabet Kurumu kararları */
router.post(
    "/yargi/rekabet/search",
    async (req: Request, res: Response) => {
        try {
            const { query, limit = 10 } = req.body as {
                query: string;
                limit?: number;
            };
            const result = await callMcpTool(
                "search_rekabet_kurumu_decisions",
                { query, limit },
            );
            res.json({ data: result });
        } catch (err) {
            handleError(res, err);
        }
    },
);

/** POST /api/mcp/yargi/kvkk/search — KVKK Kurul kararları */
router.post("/yargi/kvkk/search", async (req: Request, res: Response) => {
    try {
        const { query, limit = 10 } = req.body as {
            query: string;
            limit?: number;
        };
        const result = await callMcpTool("search_kvkk_decisions", {
            query,
            limit,
        });
        res.json({ data: result });
    } catch (err) {
        handleError(res, err);
    }
});

/** POST /api/mcp/yargi/bddk/search — BDDK Kurul kararları */
router.post("/yargi/bddk/search", async (req: Request, res: Response) => {
    try {
        const { query, limit = 10 } = req.body as {
            query: string;
            limit?: number;
        };
        const result = await callMcpTool("search_bddk_decisions", {
            query,
            limit,
        });
        res.json({ data: result });
    } catch (err) {
        handleError(res, err);
    }
});

/** POST /api/mcp/yargi/gib/search — GİB Özelgeleri */
router.post("/yargi/gib/search", async (req: Request, res: Response) => {
    try {
        const { query, limit = 10 } = req.body as {
            query: string;
            limit?: number;
        };
        const result = await callMcpTool("search_gib_ozelge", {
            query,
            limit,
        });
        res.json({ data: result });
    } catch (err) {
        handleError(res, err);
    }
});

/** POST /api/mcp/yargi/kik/search — KİK İhale Kararları */
router.post("/yargi/kik/search", async (req: Request, res: Response) => {
    try {
        const { query, limit = 10 } = req.body as {
            query: string;
            limit?: number;
        };
        const result = await callMcpTool("search_kik_v2_decisions", {
            query,
            limit,
        });
        res.json({ data: result });
    } catch (err) {
        handleError(res, err);
    }
});

/** POST /api/mcp/yargi/sayistay/search — Sayıştay kararları */
router.post(
    "/yargi/sayistay/search",
    async (req: Request, res: Response) => {
        try {
            const { query, limit = 10 } = req.body as {
                query: string;
                limit?: number;
            };
            const result = await callMcpTool("search_sayistay_unified", {
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

/** POST /api/mcp/yargi/health — Hükümet sunucuları sağlık kontrolü */
router.post("/yargi/health", async (_req: Request, res: Response) => {
    try {
        const result = await callMcpTool("check_government_servers_health", {});
        res.json({ data: result });
    } catch (err) {
        handleError(res, err);
    }
});

export default router;
