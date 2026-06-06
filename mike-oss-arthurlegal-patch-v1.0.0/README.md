# mike-oss x ArthurLegal

AI destekli hukuki döküman asistanı — Türk hukuku sürümü.

---

## Kurulum

### 1. İndir

**[MikeOSS-ArthurLegal-Setup-v2.0.2.exe — Releases](https://github.com/beerbottle90/mike-oss/releases/latest)**

### 2. Supabase Hazırla (ücretsiz)

[supabase.com](https://supabase.com) → yeni proje oluştur → **SQL Editor** → [`backend/schema.sql`](../backend/schema.sql) içeriğini yapıştır → **Run**

### 3. Kurulum sihirbazında gir

| Alan | Nereden alınır |
|---|---|
| **Supabase URL** | Dashboard → Settings → Data API → **Project URL** |
| **Secret Key** | Dashboard → Settings → Data API → **service_role** |
| **Publishable Key** | Dashboard → Settings → Data API → **anon** |
| **Anthropic API Key** | [console.anthropic.com](https://console.anthropic.com) → API Keys |

> Supabase URL'yi `/rest/v1/` veya `/` **olmadan** gir: `https://xxxx.supabase.co`

### 4. Başlat

Kurulum biter, masaüstü kısayolu oluşur. Çift tıkla → uygulama açılır.

---

## İçerik

- **17 workflow** — NDA triaj, KVKK DSAR, M&A kapanış, istihdam, DPIA, marka, icra, enerji, ceza savunma ve daha fazlası
- **22 tabular review kolonu** — Türk ve uluslararası hukuk (English Law, New York Law, AB, KVKK, tahkim, rekabet, IP, enerji, vergi)
- **15 MCP endpoint** — Mevzuat, Yargıtay, Danıştay, AYM, Rekabet, KVKK, BDDK, GİB, KİK, Sayıştay *(opsiyonel token gerektirir)*
- **13 Türk hukuku pratik alanı**

---

## Sorun Giderme

**"Failed to save API Key"**
`C:\Program Files\MikeOSS-ArthurLegal\backend\.env` dosyasını aç,
`USER_API_KEYS_ENCRYPTION_SECRET=` satırına herhangi bir uzun rastgele metin gir, sonra restart.

**Uygulama "Cannot GET /" gösteriyor**
Görev Yöneticisi'nde tüm `node.exe` süreçlerini sonlandır, kısayoldan yeniden başlat.

**Kayıt e-postası gelmiyor**
Supabase → Authentication → Providers → Email → **Confirm email** kapat.

Detaylı kurulum: [KURULUM.md](./KURULUM.md)

---

## Sürüm Geçmişi

[CHANGELOG.md](./CHANGELOG.md) · Güncel sürüm: **v2.0.2**

## Lisans

MIT — [mike-oss](https://github.com/beerbottle90/mike-oss) + [ArthurLegal](https://github.com/beerbottle90/ArthurLegal)
