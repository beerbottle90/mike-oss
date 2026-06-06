# Mike

Mike is a legal document assistant with a Next.js frontend, an Express backend, Supabase Auth/Postgres, and Cloudflare R2-compatible object storage.

Website: [mikeoss.com](https://mikeoss.com)

## Contents

- `frontend/` - Next.js application
- `backend/` - Express API, Supabase access, document processing, and database schema
- `backend/schema.sql` - Supabase schema for fresh databases
- `backend/migrations/` - incremental database updates for existing deployments

## Prerequisites

- Node.js 20 or newer
- npm
- git
- A Supabase project
- A Cloudflare R2 bucket, MinIO bucket, or another S3-compatible bucket
- At least one supported model provider API key: Anthropic, Google Gemini, or OpenAI
- LibreOffice installed locally if you need DOC/DOCX to PDF conversion

## Database Setup

For a new Supabase database, open the Supabase SQL editor and run:

```sql
-- copy and run the contents of:
-- backend/schema.sql
```

The schema file is based on `supabase-migration.sql` and folds in the later files in `backend/migrations/`.

For an existing database, do not run the full schema file over production data. Apply the incremental files in `backend/migrations/` instead.

## Environment

Create local env files:

```bash
touch backend/.env
touch frontend/.env.local
```

Create `backend/.env`:

```bash
PORT=3001
FRONTEND_URL=http://localhost:3000
DOWNLOAD_SIGNING_SECRET=replace-with-a-random-32-byte-hex-string
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SECRET_KEY=your-supabase-service-role-key

R2_ENDPOINT_URL=https://your-account-id.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=your-r2-access-key
R2_SECRET_ACCESS_KEY=your-r2-secret-key
R2_BUCKET_NAME=mike

GEMINI_API_KEY=your-gemini-key
ANTHROPIC_API_KEY=your-anthropic-key
OPENAI_API_KEY=your-openai-key
RESEND_API_KEY=your-resend-key
USER_API_KEYS_ENCRYPTION_SECRET=your-long-random-secret
```

Create `frontend/.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-supabase-anon-key
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

Supabase values come from the project dashboard. Use the project URL for `SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_URL`, the service role key for the backend `SUPABASE_SECRET_KEY`, and the anon/public key for `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`. If your Supabase project shows multiple key formats, use the legacy JWT-style anon and service role keys expected by the Supabase client libraries.

Provider keys are only needed for the models and email features you plan to use. Model provider keys can be configured in `backend/.env` for the whole instance, or per user in **Account > Models & API Keys**. If a provider key is present in `backend/.env`, that provider is available by default and the matching browser API key field is read-only.

## Install

Install each app package:

```bash
npm install --prefix backend
npm install --prefix frontend
```

## Run Locally

Start the backend:

```bash
npm run dev --prefix backend
```

Start the main app:

```bash
npm run dev --prefix frontend
```

Open `http://localhost:3000`.

## First Run

1. Sign up in the app.
2. If you did not set provider keys in `backend/.env`, open **Account > Models & API Keys** and add an Anthropic, Gemini, or OpenAI API key.
3. Create or open a project and start chatting with documents.

## Troubleshooting

**Sign-up confirmation email never arrives.** Confirmation emails are sent by Supabase Auth, not by Mike. For local development, the simplest fix is to disable email confirmation in **Supabase > Authentication > Providers > Email**. For production, configure custom SMTP in Supabase; the built-in mailer is heavily rate-limited and may be restricted on newer projects.

**The model picker shows a missing-key warning.** Add a key for that provider in **Account > Models & API Keys**, or configure the provider key in `backend/.env` and restart the backend.

**DOC or DOCX conversion fails.** Install LibreOffice locally and restart the backend so document conversion commands are available on the process path.

## Useful Checks

```bash
npm run build --prefix backend
npm run build --prefix frontend
npm run lint --prefix frontend
```

---

## ArthurLegal Integration

This fork includes the **mike-oss x ArthurLegal** integration patch (v2.0.0), adding Turkish law intelligence from [ArthurLegal v1.2.0](https://github.com/beerbottle90/ArthurLegal).

### What's Added

- **17 ArthurLegal workflows** — NDA triage, KVKK DSAR, M&A closing checklist, ISG incident, transfer pricing, employment contract, DPIA, trademark, litigation, administrative, energy, criminal defense, and more
- **22 tabular review column presets** — Turkish and international law (English Law, New York Law, EU, KVKK, arbitration, competition, employment, IP, energy, tax)
- **15 MCP proxy endpoints** (`/api/mcp/yargi/...`) for yargi-mcp-pro, covering Mevzuat, Yargitay, Danistay, Anayasa Mahkemesi, Rekabet Kurumu, KVKK, BDDK, GIB, KIK, Sayistay
- **13 Turkish practice areas** added to the practice area picker

### Optional: yargi-mcp-pro

Add to `backend/.env` to enable live legal database access:

```bash
YARGI_MCP_ENDPOINT=https://yargi-mcp-pro-production.up.railway.app/mcp
YARGI_MCP_TOKEN=your-oauth-token
```

Without this token the proxy endpoints return 500 but the rest of the app works normally.

See [`mike-oss-arthurlegal-patch-v1.0.0/CHANGELOG.md`](mike-oss-arthurlegal-patch-v1.0.0/CHANGELOG.md) for full version history.

---

## Windows Installer

A self-contained Windows installer (`.exe`) bundles Node.js 20, the compiled backend, and the Next.js standalone frontend — no prerequisites required on the end-user machine.

**Build the installer** (requires NSIS 3.x — `winget install NSIS.NSIS`):

```powershell
cd installer
.\build-win.ps1
# Output: installer\dist\MikeOSS-ArthurLegal-Setup-v2.0.0.exe (~45 MB)
```

The installer wizard prompts for Supabase URL, Supabase Secret Key, Supabase Publishable Key, and Anthropic API key. A desktop shortcut is created that starts both servers silently and opens `http://localhost:3000`.

See [`installer/README-BUILD.md`](installer/README-BUILD.md) for full details.
