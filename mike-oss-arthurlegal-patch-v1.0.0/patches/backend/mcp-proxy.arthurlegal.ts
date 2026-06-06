/**
 * mike-oss × ArthurLegal v1.0.0 — yargi-mcp-pro Proxy Router
 *
 * Kurulum:
 *   1. backend/src/routes/ altına bu dosyayı kopyala
 *   2. backend/src/index.ts'e router'ı ekle:
 *        import yargiMcpRouter from "./routes/mcp-proxy.arthurlegal";
 *        app.use("/api/mcp", yargiMcpRouter);
 *   3. backend/.env dosyasına ekle:
 *        YARGI_MCP_ENDPOINT=https://yargi-mcp-pro-production.up.railway.app/mcp
 *        YARGI_MCP_TOKEN=<OAuth access token — claude.ai bağlantısından alınır>
 *
 * Endpoint haritası:
 *   POST /api/mcp/yargi/mevzuat/search    → search_mevzuat
 *   POST /api/mcp/yargi/mevzuat/get       → get_mevzuat_document
 *   POST /api/mcp/yargi/kararlar/search   → search_bedesten_unified
 *   POST /api/mcp/yargi/kararlar/get      → get_bedesten_document_markdown
 *   POST /api/mcp/yargi/health            → check_government_servers_health
 *
 * Kaynak: ArthurLegal v1.2.0 — yargi-mcp-rehberi.md
 * https://github.com/beerbottle90/ArthurLegal
 */

import { Router, type Request, type Response } from "express";

const router = Router();

const MCP_ENDPOINT = process.env.YARGI_MCP_ENDPOINT ?? "https://yargi-mcp-pro-production.up.railway.app/mcp";
const MCP_TOKEN = process.env.YARGI_MCP_TOKEN ?? "";

// ---------------------------------------------------------------------------
// Core proxy helper
// ---------------------------------------------------------------------------

async function callMcpTool(
    toolName: string,
    toolInput: Record<string, unknown>,
): Promise<unknown> {
    if (!MCP_TOKEN) {
        throw new Error("YARGI_MCP_TOKEN env değişkeni tanımlanmamış. backend/.env dosyasına ekleyin.");
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

    const json = (await res.json()) as { result?: unknown; error?: { message: string } };
    if (json.error) throw new Error(`MCP hata: ${json.error.message}`);
    return json.result;
}

function handleError(res: Response, err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: msg });
}

// ---------------------------------------------------------------------------
// Mevzuat endpoints
// ---------------------------------------------------------------------------

/**
 * POST /api/mcp/yargi/mevzuat/search
 * Body: { query: string, limit?: number }
 */
router.post("/yargi/mevzuat/search", async (req: Request, res: Response) => {
    try {
        const { query, limit = 10 } = req.body as { query: string; limit?: number };
        const result = await callMcpTool("search_mevzuat", { query, limit });
        res.json({ data: result });
    } catch (err) {
        handleError(res, err);
    }
});

/**
 * POST /api/mcp/yargi/mevzuat/get
 * Body: { mevzuat_id: string, id_type?: "mevzuat" | "outline" | "madde" | "gerekce" }
 */
router.post("/yargi/mevzuat/get", async (req: Request, res: Response) => {
    try {
        const { mevzuat_id, id_type = "mevzuat" } = req.body as {
            mevzuat_id: string;
            id_type?: string;
        };
        const result = await callMcpTool("get_mevzuat_document", { mevzuat_id, id_type });
        res.json({ data: result });
    } catch (err) {
        handleError(res, err);
    }
});

// ---------------------------------------------------------------------------
// Yargı kararı endpoints
// ---------------------------------------------------------------------------

/**
 * POST /api/mcp/yargi/kararlar/search
 * Body: { query: string, limit?: number, institution?: string }
 *
 * institution örnekleri: "yargitay", "danistay", "anayasa", "kvkk", "rekabet"
 */
router.post("/yargi/kararlar/search", async (req: Request, res: Response) => {
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
});

/**
 * POST /api/mcp/yargi/kararlar/get
 * Body: { document_url: string }
 */
router.post("/yargi/kararlar/get", async (req: Request, res: Response) => {
    try {
        const { document_url } = req.body as { document_url: string };
        const result = await callMcpTool("get_bedesten_document_markdown", { document_url });
        res.json({ data: result });
    } catch (err) {
        handleError(res, err);
    }
});

// ---------------------------------------------------------------------------
// Sağlık kontrolü
// ---------------------------------------------------------------------------

/**
 * POST /api/mcp/yargi/health
 */
router.post("/yargi/health", async (_req: Request, res: Response) => {
    try {
        const result = await callMcpTool("check_government_servers_health", {});
        res.json({ data: result });
    } catch (err) {
        handleError(res, err);
    }
});

export default router;
