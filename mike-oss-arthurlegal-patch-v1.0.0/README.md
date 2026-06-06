# mike-oss × ArthurLegal Integration Patch v2.0.0

This patch adds [ArthurLegal v1.2.0](https://github.com/beerbottle90/ArthurLegal) Turkish law intelligence to [mike-oss](https://github.com/beerbottle90/mike-oss), an open-source AI legal document platform.

**Turkish installation guide:** [KURULUM.md](./KURULUM.md) | **Version history:** [CHANGELOG.md](./CHANGELOG.md)

---

## What This Patch Does

mike-oss provides the infrastructure layer (document management, multi-model AI, tabular review, DOCX generation). ArthurLegal provides the legal intelligence layer (Turkish law expertise, 17 jurisdictions, 70+ skills). This patch bridges the two.

```
┌────────────────────────────────────────┐
│  mike-oss (UI + storage + multi-model) │
│                                        │
│  + ArthurLegal Patch v2.0.0:           │
│    • 17 TR-law workflows               │
│    • 22 column presets (TR + intl)     │
│    • 15 yargi-mcp-pro endpoints        │
│    • System prompt injection           │
│    • Windows installer (.exe)          │
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

## Workflows (17)

| ID | Title | Plugin |
|---|---|---|
| `arthurlegal-nda-triage-tr` | NDA Triaj — GREEN/YELLOW/RED | commercial |
| `arthurlegal-msa-review-tr` | MSA / Çerçeve Sözleşme İncelemesi | commercial |
| `arthurlegal-closing-checklist-tr` | TR M&A Kapanış Kontrol Listesi | corporate |
| `arthurlegal-employment-contract-tr` | İstihdam Sözleşmesi İncelemesi | employment |
| `arthurlegal-termination-package-tr` | Fesih Paketi (Kıdem + İhbar) | employment |
| `arthurlegal-isg-incident` | İSG Olay Müdahalesi 0–72 Saat | employment |
| `arthurlegal-isg-risk-tr` | İSG Risk Değerlendirmesi | employment |
| `arthurlegal-kvkk-dsar` | KVKK DSAR Yanıtı m.11+m.28 | privacy |
| `arthurlegal-kvkk-dpia-tr` | KVKK DPIA (6698 m.12 + GDPR) | privacy |
| `arthurlegal-kvkk-cross-border-tr` | KVKK Yurt Dışı Aktarım Analizi | privacy |
| `arthurlegal-rekabet-compliance-tr` | Rekabet Hukuku Uyum Kontrolü | regulatory |
| `arthurlegal-marka-tescil-tr` | Marka Tescil Stratejisi | ip |
| `arthurlegal-icra-strategy-tr` | İcra Stratejisi (İİK) | litigation |
| `arthurlegal-iyuk-itiraz-tr` | İdari İtiraz Dilekçesi (İYUK) | administrative |
| `arthurlegal-transfer-pricing` | Transfer Fiyatlandırması Risk Taraması | tax |
| `arthurlegal-epdk-lisans-tr` | EPDK Lisans Başvurusu | energy |
| `arthurlegal-cmk-48-saat` | CMK 48 Saat Ceza Savunma Protokolü | criminal-defense |

---

## Column Presets (22)

**Turkish law (10 from v1.0.0):** Yönetim Hukuku, Damga Vergisi, Damga Vergisi Tutarı, KVKK/Kişisel Veri, Tahkim Maddesi, Rekabet Yasağı, Tazminat Tavanı, Mücbir Sebep, Fesih Bildirimi, Yaptırım Riski

**New in v2.0.0 (12):** English Law, New York Law, EU/AB Hukuku, İstihdam Türü, Kıdem+İhbar, Marka Hakkı, Açık Kaynak Lisansı, Rekabet Hukuku, Enerji Lisansı, Sözleşme Değeri, İdari Para Cezası

---

## Practice Areas (13 Turkish added)

`Ticari Sözleşme (TR)` · `Kurumsal / M&A (TR)` · `İş Hukuku (TR)` · `KVKK / Gizlilik` · `Regülasyon (TR)` · `FSH / IP (TR)` · `İdare Hukuku (TR)` · `Vergi Hukuku (TR)` · `Enerji Hukuku (TR)` · `Sermaye Piyasası (TR)` · `Dava Yönetimi (TR)` · `Ceza Hukuku (TR)` · `Büro Operasyonları (TR)`

---

## MCP Proxy (Optional) — 15 Endpoints

Provides access to [yargi-mcp-pro](https://yargi-mcp-pro-production.up.railway.app/mcp), covering 15 Turkish legal institutions:

| Endpoint | Coverage |
|---|---|
| `POST /api/mcp/yargi/mevzuat/search` | Mevzuat full-text search |
| `POST /api/mcp/yargi/mevzuat/get` | Full law text by article |
| `POST /api/mcp/yargi/mevzuat/search-within` | Search within a specific law |
| `POST /api/mcp/yargi/kararlar/search` | Yargıtay · Danıştay · AYM · KVKK · Rekabet · Sayıştay · BDDK · KİK · GİB |
| `POST /api/mcp/yargi/kararlar/get` | Full decision text |
| `POST /api/mcp/yargi/kararlar/semantic` | Semantic search across all courts |
| `POST /api/mcp/yargi/anayasa/search` | Constitutional Court decisions |
| `POST /api/mcp/yargi/rekabet/search` | Competition Authority decisions |
| `POST /api/mcp/yargi/kvkk/search` | KVKK Board decisions |
| `POST /api/mcp/yargi/bddk/search` | Banking Regulation (BDDK) |
| `POST /api/mcp/yargi/gib/search` | Revenue Administration (GIB) |
| `POST /api/mcp/yargi/kik/search` | Public Procurement (KIK) |
| `POST /api/mcp/yargi/sayistay/search` | Court of Accounts (Sayıştay) |
| `POST /api/mcp/yargi/research-guide` | Structured legal research guide |
| `POST /api/mcp/yargi/health` | Server availability check |

Requires `YARGI_MCP_TOKEN` in `backend/.env`. See [KURULUM.md](./KURULUM.md) for OAuth setup.

---

## System Prompts

Two condensed system prompts are provided for mike-oss chat integration:

- **Corporate** (`knowledge/arthurlegal-corporate-v1.2.0-system-prompt.md`) — For in-house legal teams. 10 plugins, Turkish law primary, 17-jurisdiction awareness.
- **Law Firm** (`knowledge/arthurlegal-lawfirm-v1.2.0-system-prompt.md`) — For law firms. 12 plugins including criminal defense and firm operations.

For the full ArthurLegal system prompts with complete skill libraries, see the [ArthurLegal repository](https://github.com/beerbottle90/ArthurLegal).

---

## Windows Installer

Build a self-contained `.exe` installer (includes Node.js 20, no prerequisites):

```powershell
# From project root:
cd installer
.\build-win.ps1
# → installer\dist\MikeOSS-ArthurLegal-Setup-v2.0.0.exe (~44 MB)
```

Requires NSIS 3.x: `winget install NSIS.NSIS`

---

## What This Patch Does NOT Include

This patch is an additive bridge — it does not replace the full ArthurLegal experience:

| Feature | This Patch | Full ArthurLegal |
|---|---|---|
| Turkish law workflows | 17 core workflows | 70+ skills across 12 plugins |
| Reference files | System prompt only | 42+ jurisdiction reference guides |
| Automation agents | — | 7 scheduled agents |
| Skill command system | — | `/plugin:skill` command routing |
| Full MCP integration | 15 proxy endpoints | yargi-mcp-pro + OpenCaseLaw.ch + CourtListener |

For the full ArthurLegal experience, deploy [ArthurLegal v1.2.0](https://github.com/beerbottle90/ArthurLegal) on claude.ai Projects or Claude Code alongside mike-oss.

---

## License

MIT — Same as mike-oss and ArthurLegal.

Built on [mike-oss](https://github.com/beerbottle90/mike-oss) (MIT) and [ArthurLegal](https://github.com/beerbottle90/ArthurLegal) (MIT).
