# Changelog — mike-oss x ArthurLegal

[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format.
Versioning: [Semantic Versioning 2.0](https://semver.org/).

---

## [2.0.1] — 2026-06-06 — *Installer & .env Fix*

### Fixed

- **Installer encoding**: NSIS language switched to English; all Turkish characters replaced with ASCII — fixes garbled text in setup wizard
- **License page**: replaced `schema.sql` with proper `LICENSE.txt` (MIT) in installer wizard
- **Supabase URL hint**: config page now shows `(base URL only — no /rest/v1/ or trailing slash)` to prevent misconfiguration
- **Installed .env**: `USER_API_KEYS_ENCRYPTION_SECRET` and `DOWNLOAD_SIGNING_SECRET` were written as empty by installer wizard — fixed; both now required for API key save to work
- **`SUPABASE_URL`**: installer-written value had trailing `/rest/v1/` path stripped from Supabase client calls — fixed by correcting the stored URL
- **`.gitignore`**: added `installer/bundle/`, `installer/dist/`, `installer/tools/` to exclude build artifacts

---

## [2.0.0] — 2026-06-06 — *Full ArthurLegal v1.2.0 Integration*

Full integration of ArthurLegal v1.2.0 across all 12 plugins, 17 jurisdictions, and 15 MCP institutions. Adds Windows installer.

### Added

**Workflows (5 → 17):**
- `arthurlegal-msa-review-tr` — MSA / Framework Agreement Review (TBK commercial)
- `arthurlegal-employment-contract-tr` — Employment Contract Review (4857 + TBK)
- `arthurlegal-termination-package-tr` — Termination Package (4857 m.17-21, KIDEM)
- `arthurlegal-isg-risk-tr` — ISG Risk Assessment (6331 + ISO 45001)
- `arthurlegal-kvkk-dpia-tr` — KVKK DPIA (6698 m.12 + GDPR Art.35)
- `arthurlegal-kvkk-cross-border-tr` — KVKK Cross-Border Transfer Analysis (m.9)
- `arthurlegal-rekabet-compliance-tr` — Competition Law Compliance Check (4054)
- `arthurlegal-marka-tescil-tr` — Trademark Registration Strategy (556 KHK + EUIPO)
- `arthurlegal-icra-strategy-tr` — Enforcement & Execution Strategy (2004 IIK)
- `arthurlegal-iyuk-itiraz-tr` — Administrative Appeal (2577 IYUK)
- `arthurlegal-epdk-lisans-tr` — EPDK License Application (6446 EK)
- `arthurlegal-cmk-48-saat` — Criminal Defense 48-Hour Protocol (CMK m.91)

**Column presets (10 → 22):**
- English Law governing law clause detector
- New York Law clause detector
- EU/AB Law clause detector
- Employment type classifier (tam/kismi/belirli/belirsiz)
- Severance + notice period extractor (KIDEM + IHBAR)
- Trademark rights clause detector
- Open source license compatibility checker
- Competition law restriction identifier
- Energy license type extractor (EPDK)
- Contract value / consideration extractor
- Administrative fine ceiling extractor
- (retained all 10 v1.0.0 Turkish presets)

**MCP proxy endpoints (5 → 15):**
- `POST /api/mcp/yargi/mevzuat/search-within` — search within a specific law
- `POST /api/mcp/yargi/anayasa/search` — Constitutional Court decisions
- `POST /api/mcp/yargi/rekabet/search` — Competition Authority decisions
- `POST /api/mcp/yargi/kvkk/search` — KVKK (data protection) decisions
- `POST /api/mcp/yargi/bddk/search` — Banking Regulation (BDDK)
- `POST /api/mcp/yargi/gib/search` — Revenue Administration (GIB) rulings
- `POST /api/mcp/yargi/kik/search` — Public Procurement (KIK) decisions
- `POST /api/mcp/yargi/sayistay/search` — Court of Accounts (Sayistay)
- `POST /api/mcp/yargi/kararlar/semantic` — Semantic search across all courts
- `POST /api/mcp/yargi/research-guide` — Structured legal research guide

**Practice areas (10 → 13 Turkish):**
- `Dava Yonetimi (TR)` — litigation management
- `Ceza Hukuku (TR)` — criminal defense
- `Buro Operasyonlari (TR)` — law firm operations

**Windows installer:**
- `installer/setup.nsi` — NSIS 3.x installer with MUI2, nsDialogs config page
- `installer/build-win.ps1` — build script (downloads portable Node.js 20, builds frontend + backend, bundles)
- `installer/launcher/MikeOSS.vbs` — silent VBScript launcher (no console window)
- `installer/launcher/start-servers.ps1` — starts backend + frontend, polls ports, opens browser
- `installer/launcher/stop-servers.js` — stops running servers (used by uninstaller)
- Output: `installer/dist/MikeOSS-ArthurLegal-Setup-v2.0.0.exe` (~44 MB, LZMA compressed)

### Fixed

- `backend/tsconfig.json`: `moduleResolution` changed from deprecated `"node"` to `"node10"`, removed `ignoreDeprecations` line
- `.vscode/settings.json`: added `typescript.tsdk` to use workspace TypeScript 5.9.3 instead of VS Code built-in

---

## [1.0.0] — 2026-06-06 — *Initial Integration Patch*

Initial ArthurLegal x mike-oss integration. See [`mike-oss-arthurlegal-patch-v1.0.0/CHANGELOG.md`](mike-oss-arthurlegal-patch-v1.0.0/CHANGELOG.md) for full details.

### Added

- 5 ArthurLegal workflows (NDA triage, KVKK DSAR, ISG incident, M&A closing, transfer pricing)
- 10 Turkish law column presets
- yargi-mcp-pro MCP proxy (5 endpoints)
- 10 Turkish practice areas
- System prompts for Corporate and Law Firm configurations

---

[2.0.0]: https://github.com/beerbottle90/mike-oss/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/beerbottle90/mike-oss/tree/ddd4a8d
