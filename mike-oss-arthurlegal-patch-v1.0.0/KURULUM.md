# Kurulum Rehberi — mike-oss x ArthurLegal v2.0.2

---

## Yöntem 1 — Windows Installer (Önerilen)

### Gereksinimler

Kurulumdan önce bir **Supabase projesi** oluşturman gerekiyor (ücretsiz): [supabase.com](https://supabase.com)

---

### Adım 1 — Supabase Veritabanı Şemasını Kur

Supabase Dashboard → **SQL Editor** → yeni sorgu aç → [`backend/schema.sql`](../backend/schema.sql) dosyasının tüm içeriğini yapıştır → **Run**

> Bu adımı atlama. Tablo yoksa uygulama ilk kullanımda hata verir.

---

### Adım 2 — API Anahtarlarını Topla

| Değer | Nereden Alınır |
|---|---|
| **Supabase URL** | Supabase Dashboard → Settings → Data API → **Project URL** |
| **Supabase Secret Key** | Supabase Dashboard → Settings → Data API → **service_role** anahtarı |
| **Supabase Publishable Key** | Supabase Dashboard → Settings → Data API → **anon** anahtarı |
| **Anthropic API Key** | [console.anthropic.com](https://console.anthropic.com) → API Keys |

> **Supabase URL formatı:** yalnızca ana adresi gir — `https://xxxx.supabase.co`
> Sonuna `/rest/v1/` veya `/` **ekleme**.

---

### Adım 3 — Installer'ı Çalıştır

`MikeOSS-ArthurLegal-Setup-v2.0.2.exe` dosyasına çift tıkla.

Sihirbaz yukarıdaki 4 değeri sorar ve `.env` dosyalarını otomatik yazar.
Kurulum tamamlandığında masaüstü kısayolu oluşturulur.

---

### Adım 4 — Uygulamayı Başlat

Masaüstündeki **mike-oss x ArthurLegal** kısayoluna çift tıkla.
Sunucular arka planda başlar, `http://localhost:3000` otomatik açılır.

---

### Kurulum Sonrası Yapılandırma

Değerleri sonradan değiştirmek istersen:

```
C:\Program Files\MikeOSS-ArthurLegal\backend\.env
C:\Program Files\MikeOSS-ArthurLegal\frontend\standalone\.env.local
```

Düzenledikten sonra masaüstü kısayolunu tekrar çalıştır (uygulama zaten açıksa önce kapat).

---

### Sorun Giderme (Installer)

**"Failed to save API Key" hatası**
`backend\.env` dosyasında `USER_API_KEYS_ENCRYPTION_SECRET=` satırı boş bırakılmış.
Aşağıdaki gibi rastgele bir değer üret ve doldur, ardından restart et:
```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Ekran "Cannot GET /" gösteriyor**
Backend port 3000'e bağlanmış, frontend çalışmıyor.
Tüm Node process'lerini kapat (Görev Yöneticisi → node.exe) ve kısayoldan yeniden başlat.

**Kayıt onay e-postası gelmiyor**
Supabase Dashboard → Authentication → Providers → Email → **Confirm email** kapat.

**"Failed to save Anthropic API Key" hâlâ devam ediyor**
Supabase'de `user_api_keys` tablosu yok demektir — Adım 1'deki SQL'i çalıştır.

---

## Yöntem 2 — Geliştirici Kurulumu (Kaynak Koddan)

### Gereksinimler

- Node.js 20+, npm
- Supabase projesi
- Cloudflare R2 veya S3-uyumlu depolama
- En az bir AI sağlayıcı anahtarı (Anthropic, Gemini veya OpenAI)

### Veritabanı

Supabase SQL Editor → `backend/schema.sql` içeriğini çalıştır (bir kez).

### Ortam Değişkenleri

**`backend/.env`**

```bash
PORT=3001
FRONTEND_URL=http://localhost:3000

SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SECRET_KEY=your-service-role-key

# İkisi de zorunlu — boş bırakma
DOWNLOAD_SIGNING_SECRET=64-karakter-rastgele-hex
USER_API_KEYS_ENCRYPTION_SECRET=64-karakter-rastgele-hex

R2_ENDPOINT_URL=https://hesap-id.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=mike

ANTHROPIC_API_KEY=
GEMINI_API_KEY=
OPENAI_API_KEY=
RESEND_API_KEY=

# Opsiyonel — yargi-mcp-pro TR hukuk veritabanı
YARGI_MCP_ENDPOINT=https://yargi-mcp-pro-production.up.railway.app/mcp
YARGI_MCP_TOKEN=
```

**`frontend/.env.local`**

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-anon-key
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

Rastgele secret üretmek için:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Kurulum ve Çalıştırma

```bash
npm install --prefix backend
npm install --prefix frontend

# Terminal 1
npm run dev --prefix backend

# Terminal 2
npm run dev --prefix frontend
```

`http://localhost:3000` aç.

---

## Doğrulama

1. `http://localhost:3000` → giriş yap
2. **Workflows** → "NDA Triaj" görünüyor mu? ✓
3. **Tabular Review** → kolon ekle → "Damga Vergisi" preset geliyor mu? ✓
4. **Account > Models & API Keys** → Anthropic key kaydediliyor mu? ✓
5. Practice alanı dropdown → "KVKK / Gizlilik" görünüyor mu? ✓

---

## YARGI_MCP_TOKEN Hakkında

Bu alan opsiyoneldir. Boş bırakırsan `/api/mcp/yargi/...` endpoint'leri çalışmaz ama uygulamanın geri kalanı (workflow, tabular review, sohbet) normal çalışır.

Token, yargi-mcp-pro servisine erişim için OAuth 2.0 Bearer token'dır. Erişim için servis sağlayıcısıyla iletişime geç.

---

## Destek

- Sorunlar: https://github.com/beerbottle90/mike-oss/issues
- ArthurLegal: https://github.com/beerbottle90/ArthurLegal
