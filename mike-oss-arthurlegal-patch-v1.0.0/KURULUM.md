# Kurulum Rehberi — mike-oss × ArthurLegal Entegrasyon Paketi v1.0.0

Bu paket, [mike-oss](https://github.com/beerbottle90/mike-oss) legal platform'una
[ArthurLegal v1.2.0](https://github.com/beerbottle90/ArthurLegal) Türk hukuku zekasını ekler.

---

## Ön Koşullar

- Çalışan bir mike-oss kurulumu (bkz. [mike-oss README](../README.md))
- Node.js 20+, npm
- (Opsiyonel) yargi-mcp-pro OAuth token — TR mevzuat/yargı entegrasyonu için

---

## Adım 1 — Yeni Workflow'ları Ekle

`backend/src/lib/builtinWorkflows.ts` dosyasını düzenle:

```typescript
// Dosyanın başına ekle:
import { ARTHURLEGAL_WORKFLOWS } from "./builtinWorkflows.arthurlegal";

// BUILTIN_WORKFLOWS dizisinin sonuna spread et:
export const BUILTIN_WORKFLOWS = [
    // ... mevcut workflow'lar ...
    ...ARTHURLEGAL_WORKFLOWS,
];
```

Kaynak dosyayı kopyala:

```bash
cp mike-oss-arthurlegal-patch-v1.0.0/patches/backend/builtinWorkflows.arthurlegal.ts \
   backend/src/lib/builtinWorkflows.arthurlegal.ts
```

---

## Adım 2 — TR Column Preset'leri Ekle

`frontend/src/app/components/tabular/columnPresets.ts` dosyasını düzenle:

```typescript
// Dosyanın başına ekle:
import { ARTHURLEGAL_PROMPT_PRESETS } from "./columnPresets.arthurlegal";

// PROMPT_PRESETS dizisini genişlet:
export const PROMPT_PRESETS: ColumnPreset[] = [
    // ... mevcut preset'ler ...
    ...ARTHURLEGAL_PROMPT_PRESETS,
];
```

Kaynak dosyayı kopyala:

```bash
cp mike-oss-arthurlegal-patch-v1.0.0/patches/frontend/columnPresets.arthurlegal.ts \
   frontend/src/app/components/tabular/columnPresets.arthurlegal.ts
```

---

## Adım 3 — Pratik Alanları Güncelle

`frontend/src/app/components/workflows/practices.ts` dosyasını değiştir:

```bash
cp mike-oss-arthurlegal-patch-v1.0.0/patches/frontend/practices.arthurlegal.ts \
   frontend/src/app/components/workflows/practices.ts
```

---

## Adım 4 — (Opsiyonel) yargi-mcp-pro MCP Proxy

**4a. Router dosyasını kopyala:**

```bash
cp mike-oss-arthurlegal-patch-v1.0.0/patches/backend/mcp-proxy.arthurlegal.ts \
   backend/src/routes/mcp-proxy.arthurlegal.ts
```

**4b. `backend/src/index.ts` dosyasına router'ı ekle:**

```typescript
import yargiMcpRouter from "./routes/mcp-proxy.arthurlegal";
// ...
app.use("/api/mcp", yargiMcpRouter);
```

**4c. `backend/.env` dosyasına ekle:**

```bash
YARGI_MCP_ENDPOINT=https://yargi-mcp-pro-production.up.railway.app/mcp
YARGI_MCP_TOKEN=<OAuth access token>
```

> **Token nasıl alınır?**
> 1. [claude.ai](https://claude.ai) → Proje oluştur → Connectors → Custom MCP ekle
> 2. Endpoint: `https://yargi-mcp-pro-production.up.railway.app/mcp`
> 3. OAuth akışını tamamla → access token'ı kopyala → `.env`'e yapıştır

---

## Adım 5 — (Opsiyonel) ArthurLegal System Prompt Entegrasyonu

mike-oss chat'inde ArthurLegal hukuki zekasını etkinleştirmek için:

**Seçenek A — Per-project system message:**

`backend/src/routes/projectChat.ts` veya `chat.ts` içinde system message'a ekle:

```typescript
import fs from "fs";
const arthurLegalPrompt = fs.readFileSync(
    "mike-oss-arthurlegal-patch-v1.0.0/knowledge/arthurlegal-corporate-v1.2.0-system-prompt.md",
    "utf-8"
);
// messages dizisine system role olarak ekle:
const systemMessage = { role: "system", content: arthurLegalPrompt };
```

**Seçenek B — Workflow prompt prefix:**

Her workflow çalıştırıldığında, workflow prompt'unun başına ArthurLegal context'ini ekle.

---

## Adım 6 — Build ve Test

```bash
# Backend derle
npm run build --prefix backend

# Frontend derle
npm run build --prefix frontend

# Lint
npm run lint --prefix frontend

# Geliştirme modunda çalıştır
npm run dev --prefix backend
npm run dev --prefix frontend
```

---

## Doğrulama

1. `http://localhost:3000` aç
2. Workflows sekmesine git → "NDA Triaj" görünüyor mu? ✓
3. Tabular Review → yeni kolon ekle → "Damga Vergisi" yazdığında preset geliyor mu? ✓
4. Practices dropdown'ında "KVKK / Gizlilik" görünüyor mu? ✓
5. (MCP kurulduysa) `POST /api/mcp/yargi/health` → sunucu sağlık yanıtı geliyor mu? ✓

---

## Sorun Giderme

| Sorun | Çözüm |
|---|---|
| TypeScript derleme hatası | `builtinWorkflows.arthurlegal.ts` import'unu kontrol et |
| Workflow prompt'u görünmüyor | Backend restart et |
| MCP 500 hatası | `YARGI_MCP_TOKEN` env değişkenini kontrol et |
| Column preset çalışmıyor | `columnPresets.ts`'deki spread operatörü kontrol et |

---

## Destek

- mike-oss issues: https://github.com/beerbottle90/mike-oss/issues
- ArthurLegal: https://github.com/beerbottle90/ArthurLegal
