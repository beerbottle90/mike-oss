# mike-oss × ArthurLegal Integration Patch v1.0.0

This patch adds [ArthurLegal v1.2.0](https://github.com/beerbottle90/ArthurLegal) Turkish law intelligence to [mike-oss](https://github.com/beerbottle90/mike-oss), an open-source AI legal document platform.

**Turkish installation guide:** [KURULUM.md](./KURULUM.md)

---

## What This Patch Does

mike-oss provides the infrastructure layer (document management, multi-model AI, tabular review, DOCX generation). ArthurLegal provides the legal intelligence layer (Turkish law expertise, 17 jurisdictions, 70+ skills). This patch bridges the two.

```
┌────────────────────────────────────────┐
│  mike-oss (UI + storage + multi-model) │
│                                        │
│  + ArthurLegal Patch v1.0.0:           │
│    • 5 TR-law workflows                │
│    • 10 TR column presets              │
│    • yargi-mcp-pro proxy               │
│    • System prompt injection           │
└────────────────────────────────────────┘
         ↕ (optional full ArthurLegal)
┌────────────────────────────────────────┐
│  ArthurLegal v1.2.0                    │
│  (70+ skills · 17 jurisdictions · MCP) │
└────────────────────────────────────────┘
```

---

## Files

```
mike-oss-arthurlegal-patch-v1.0.0/
├── README.md                                    ← this file
├── KURULUM.md                                   ← Turkish setup guide
├── CHANGELOG.md                                 ← version history
│
├── patches/
│   ├── backend/
│   │   ├── builtinWorkflows.arthurlegal.ts      ← 5 new TR law workflows
│   │   └── mcp-proxy.arthurlegal.ts             ← yargi-mcp-pro Express proxy
│   └── frontend/
│       ├── columnPresets.arthurlegal.ts         ← 10 TR column presets
│       └── practices.arthurlegal.ts             ← updated practice list (+10 TR areas)
│
└── knowledge/
    ├── arthurlegal-corporate-v1.2.0-system-prompt.md   ← in-house system prompt
    └── arthurlegal-lawfirm-v1.2.0-system-prompt.md     ← law firm system prompt
```

---

## New Workflows (5)

| ID | Title | ArthurLegal Skill |
|---|---|---|
| `arthurlegal-nda-triage-tr` | NDA Triaj — TR Hukuku (GREEN/YELLOW/RED) | `/commercial-legal:nda-review` |
| `arthurlegal-kvkk-dsar` | KVKK DSAR Yanıtı — m.11 + m.28 | `/privacy-legal:dsar-response` |
| `arthurlegal-isg-incident` | İSG Olay Müdahalesi 0–72 Saat Runbook | `/litigation-legal:isg-incident-response` |
| `arthurlegal-closing-checklist-tr` | TR M&A Kapanış Kontrol Listesi | `/corporate-legal:closing-checklist` |
| `arthurlegal-transfer-pricing` | Transfer Fiyatlandırması Risk Taraması | `/tax-legal:transfer-pricing-review` |

---

## New Column Presets (10)

| Preset | Match Pattern | Format | TR Law Basis |
|---|---|---|---|
| Yönetim Hukuku | `yönetim hukuku` | text | TBK m.24 |
| Damga Vergisi | `damga vergisi` | text | DVK Bant IV |
| Damga Vergisi Tutarı | `damga vergisi tutar` | text | DVK hesaplama |
| KVKK / Kişisel Veri | `kvkk`, `kişisel veri` | text | 6698 m.5/6/9 |
| Tahkim Maddesi | `tahkim`, `istac`, `icc` | text | TTK m.5/A |
| Rekabet Yasağı | `rekabet yasağı`, `non-compete` | text | TTK m.51, TBK m.444 |
| Tazminat Tavanı | `tazminat tavan`, `liability cap` | text | TBK m.115 |
| Mücbir Sebep (TBK) | `mücbir sebep`, `force majeure` | text | TBK m.136 |
| Fesih Bildirimi | `fesih`, `termination notice` | text | 4857 m.17 |
| Yaptırım Riski | `yaptırım`, `sanction`, `ofac` | text | OFAC/AB/UK/BM |

---

## New Practice Areas (10 added)

Turkish-law specific practice areas added to the existing 18 english-language options:

`Ticari Sözleşme (TR)` · `Kurumsal / M&A (TR)` · `İş Hukuku (TR)` · `KVKK / Gizlilik` · `Regülasyon (TR)` · `FSH / IP (TR)` · `İdare Hukuku (TR)` · `Vergi Hukuku (TR)` · `Enerji Hukuku (TR)` · `Sermaye Piyasası (TR)`

---

## MCP Proxy (Optional)

The `mcp-proxy.arthurlegal.ts` router provides access to [yargi-mcp-pro](https://yargi-mcp-pro-production.up.railway.app/mcp), a unified MCP server covering 15 Turkish legal institutions:

| Endpoint | Tool | Coverage |
|---|---|---|
| `POST /api/mcp/yargi/mevzuat/search` | `search_mevzuat` | Turkish legislation full text |
| `POST /api/mcp/yargi/mevzuat/get` | `get_mevzuat_document` | Law text by article |
| `POST /api/mcp/yargi/kararlar/search` | `search_bedesten_unified` | Yargıtay · Danıştay · AYM · KVKK · Rekabet · Sayıştay · BDDK · KİK · GİB |
| `POST /api/mcp/yargi/kararlar/get` | `get_bedesten_document_markdown` | Full decision text |
| `POST /api/mcp/yargi/health` | `check_government_servers_health` | Server availability check |

Requires `YARGI_MCP_TOKEN` in `backend/.env`. See [KURULUM.md](./KURULUM.md) for OAuth setup.

---

## System Prompts

Two condensed system prompts are provided for mike-oss chat integration:

- **Corporate** (`knowledge/arthurlegal-corporate-v1.2.0-system-prompt.md`) — For in-house legal teams. 10 plugins, Turkish law primary, 17-jurisdiction awareness.
- **Law Firm** (`knowledge/arthurlegal-lawfirm-v1.2.0-system-prompt.md`) — For law firms. 12 plugins including criminal defense and firm operations.

For the full ArthurLegal system prompts with complete skill libraries, see the [ArthurLegal repository](https://github.com/beerbottle90/ArthurLegal).

---

## What This Patch Does NOT Include

This patch is an additive bridge — it does not replace the full ArthurLegal experience:

| Feature | This Patch | Full ArthurLegal |
|---|---|---|
| Turkish law workflows | 5 core workflows | 70+ skills across 10 plugins |
| Reference files | System prompt only | 42+ jurisdiction reference guides |
| Automation agents | — | 7 scheduled agents |
| Skill command system | — | `/plugin:skill` command routing |
| Full MCP integration | Proxy endpoints | yargi-mcp-pro + OpenCaseLaw.ch + CourtListener |

For the full ArthurLegal experience, deploy [ArthurLegal v1.2.0](https://github.com/beerbottle90/ArthurLegal) on claude.ai Projects or Claude Code alongside mike-oss.

---

## License

MIT — Same as mike-oss and ArthurLegal.

Built on [mike-oss](https://github.com/beerbottle90/mike-oss) (MIT) and [ArthurLegal](https://github.com/beerbottle90/ArthurLegal) (MIT).
