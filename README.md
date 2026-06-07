# mike-oss x ArthurLegal

AI-powered legal document assistant — Turkish law edition.
Built on [mike-oss](https://mikeoss.com) with [ArthurLegal v1.2.0](https://github.com/beerbottle90/ArthurLegal) integration.

**Stack:** Next.js frontend · Express backend · Supabase Auth/Postgres · Cloudflare R2 storage · Claude / Gemini / OpenAI

---

## Windows Installer (Recommended)

**[Download MikeOSS-ArthurLegal-Setup-v2.0.3.exe](https://github.com/beerbottle90/mike-oss/releases/latest)**

Or build it yourself: see [installer/README-BUILD.md](installer/README-BUILD.md).

### Before You Install

You need a **Supabase project** set up and ready. Create one free at [supabase.com](https://supabase.com).

**Step 1 — Run schema.sql in Supabase**

Open your Supabase project → **SQL Editor** → paste and run the contents of [`backend/schema.sql`](backend/schema.sql).

This creates all required tables. Skip this and the app will fail on first use.

**Step 2 — Collect your keys**

**Page 1 — Database (required)**

| Key | Where to find it |
|---|---|
| **Supabase URL** | Supabase Dashboard → Settings → Data API → **Project URL** |
| **Supabase Secret Key** | Supabase Dashboard → Settings → Data API → **service_role** key |
| **Supabase Publishable Key** | Supabase Dashboard → Settings → Data API → **anon** key |

> **Supabase URL format:** enter only the base URL — `https://xxxx.supabase.co`
> Do **not** add `/rest/v1/` or a trailing slash.

**Page 2 — AI Provider Keys (at least one required)**

| Key | Where to find it |
|---|---|
| **Anthropic API Key** | [console.anthropic.com](https://console.anthropic.com) → API Keys |
| **OpenAI API Key** *(optional)* | [platform.openai.com](https://platform.openai.com) → API Keys |
| **Google Gemini API Key** *(optional)* | [aistudio.google.com](https://aistudio.google.com) → Get API Key |

**Step 3 — Run the installer**

The wizard collects these six values across two pages and writes the `.env` files automatically.
Internal secrets (`USER_API_KEYS_ENCRYPTION_SECRET`, `DOWNLOAD_SIGNING_SECRET`) are auto-generated — you don't need to set them.
After installation a desktop shortcut starts both servers and opens `http://localhost:3000`.

### After Installation

If you need to change any values later, edit:

- `C:\Program Files\MikeOSS-ArthurLegal\backend\.env`
- `C:\Program Files\MikeOSS-ArthurLegal\frontend\standalone\.env.local`

Then restart the app via the desktop shortcut.

**To enable yargi-mcp-pro legal database search**, add your token to `backend\.env`:

```
YARGI_MCP_TOKEN=your-token-here
```

The installer does not collect this value. Without it, `/api/mcp/yargi/...` endpoints are unreachable.

### Troubleshooting (Installer)

**"Failed to save API Key" in Account Settings**
This should not occur with v2.0.2+ — the installer auto-generates `USER_API_KEYS_ENCRYPTION_SECRET`. If it does, open `C:\Program Files\MikeOSS-ArthurLegal\backend\.env` and verify `USER_API_KEYS_ENCRYPTION_SECRET=` has a non-empty value. If blank, generate one with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` and restart.

**App shows "Cannot GET /"**
Backend is running on port 3000 instead of frontend. Kill all Node processes and relaunch via the desktop shortcut.

**Sign-up email never arrives**
Go to Supabase Dashboard → Authentication → Providers → Email → disable **Confirm email** for local/dev use.

---

## Development Setup

For contributors or self-hosted deployments without the installer.

### Prerequisites

- Node.js 20+
- npm
- A Supabase project
- A Cloudflare R2 (or S3-compatible) bucket
- At least one AI provider key: Anthropic, Gemini, or OpenAI

### Database

Open Supabase SQL Editor and run `backend/schema.sql` once for a fresh project.

### Environment

**`backend/.env`**

```bash
PORT=3001
FRONTEND_URL=http://localhost:3000

SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SECRET_KEY=your-service-role-key

DOWNLOAD_SIGNING_SECRET=replace-with-random-64-char-hex
USER_API_KEYS_ENCRYPTION_SECRET=replace-with-random-64-char-hex

R2_ENDPOINT_URL=https://your-account-id.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=your-r2-access-key
R2_SECRET_ACCESS_KEY=your-r2-secret-key
R2_BUCKET_NAME=mike

ANTHROPIC_API_KEY=
GEMINI_API_KEY=
OPENAI_API_KEY=
RESEND_API_KEY=

# ArthurLegal MCP (optional)
YARGI_MCP_ENDPOINT=https://yargi-mcp-pro-production.up.railway.app/mcp
YARGI_MCP_TOKEN=
```

**`frontend/.env.local`**

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-anon-key
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

> Both `DOWNLOAD_SIGNING_SECRET` and `USER_API_KEYS_ENCRYPTION_SECRET` are **required** — the app will fail to save user API keys if either is blank. Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### Install & Run

```bash
npm install --prefix backend
npm install --prefix frontend

# Terminal 1
npm run dev --prefix backend

# Terminal 2
npm run dev --prefix frontend
```

Open `http://localhost:3000`.

### Build Checks

```bash
npm run build --prefix backend
npm run build --prefix frontend
npm run lint --prefix frontend
```

---

## ArthurLegal Integration (v2.0.3)

This fork adds Turkish law intelligence from [ArthurLegal v1.2.0](https://github.com/beerbottle90/ArthurLegal):

- **17 workflows** — NDA triage, KVKK DSAR, M&A closing, employment, DPIA, trademark, litigation, energy, criminal defense, and more
- **22 tabular review presets** — Turkish and international law (English Law, New York Law, EU, KVKK, arbitration, competition, IP, energy, tax)
- **8 active MCP proxy endpoints** (`/api/mcp/yargi/...`) — mevzuat search/get/search-within, Yargıtay+Danıştay keyword & semantic search, document fetch, research guide *(requires `YARGI_MCP_TOKEN` in `backend/.env`; 7 institution-specific routes — AYM, Rekabet, KVKK, BDDK, GİB, KİK, Sayıştay — require an extended token and return 501 otherwise)*
- **13 Turkish practice areas** in the practice area picker

See [CHANGELOG.md](CHANGELOG.md) for full version history.

---

## Repository Structure

```
frontend/          Next.js application
backend/           Express API + Supabase + document processing
backend/schema.sql Supabase schema (run once on a fresh project)
installer/         Windows NSIS installer source + build script
mike-oss-arthurlegal-patch-v1.0.0/   Patch notes and knowledge files
```
