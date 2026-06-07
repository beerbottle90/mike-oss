# Değişiklik Günlüğü — mike-oss × ArthurLegal Entegrasyon Paketi

[Keep a Changelog](https://keepachangelog.com/tr-TR/1.1.0/) formatına uygundur.
Semver: [Semantic Versioning 2.0](https://semver.org/lang/tr/).

---

## [2.0.3] — 2026-06-07 — *yargi-mcp Router Düzeltmesi*

### Düzeltildi

- **yargi-mcp proxy erişilemiyor**: `mcp-proxy.arthurlegal.ts` router yazılmıştı ancak `backend/src/index.ts`'e hiç eklenmemişti — tüm `/api/mcp/yargi/...` endpointleri 404 döndürüyordu. Import ve `app.use("/api/mcp", yargiMcpRouter)` eklenerek düzeltildi.
- **TypeScript yerel kurulu değildi**: `npm run build` global `tsc` olmadan başarısız oluyordu. `typescript` devDependency olarak eklendi.

---

## [2.0.2] — 2026-06-06 — *Iki Sayfalı Installer + OpenAI/Gemini Anahtarları*

### Eklendi

- **Installer Sayfa 1 — Veritabani:** Supabase URL, Secret Key, Publishable Key
- **Installer Sayfa 2 — AI Anahtarlari:** Anthropic, OpenAI ve Gemini API key alanlari; ucuncusu de `backend/.env`'e yaziliyor
- **Otomatik secret uretimi:** `USER_API_KEYS_ENCRYPTION_SECRET` ve `DOWNLOAD_SIGNING_SECRET` artik kurulum sirasinda otomatik doluyor — bos birakilmiyor

### Degistirildi

- Konfigurasyon sayfasi "Adim 1/2 / Adim 2/2" olarak iki sayfaya bolundu
- Alan etiketleri API key kaynak URL'lerini iceriyor

---

## [2.0.1] — 2026-06-06 — *Installer ve .env Duzeltmeleri*

### Duzeltildi

- **Installer encoding**: NSIS dili English yapildi, Turkce karakterler ASCII ile degistirildi — kurulum sihirbazindaki bozuk metin sorunu giderildi
- **Lisans sayfasi**: `schema.sql` yerine `LICENSE.txt` (MIT) gosterilecek sekilde duzeltildi
- **Supabase URL ipucu**: config sayfasina `(base URL only — no /rest/v1/ or trailing slash)` notu eklendi
- **Kurulu .env**: `USER_API_KEYS_ENCRYPTION_SECRET` ve `DOWNLOAD_SIGNING_SECRET` bos yaziliyordu — API key kaydini engelleyen bu sorun giderildi
- **`SUPABASE_URL`**: sihirbazda yanlis girilen `/rest/v1/` son ekinin neden oldugu hata duzeltildi
- **`.gitignore`**: `installer/bundle/`, `installer/dist/`, `installer/tools/` build artifact olarak eklendi

---

## [2.0.0] — 2026-06-06 — *ArthurLegal v1.2.0 Tam Entegrasyon*

ArthurLegal v1.2.0'ın 12 plugin, 17 yargı çevresi ve 15 MCP kurumunun tamamı entegre edildi. Windows yükleyici eklendi.

### Eklendi

**Workflow'lar (5 → 17):**
- MSA / Çerçeve Sözleşme İncelemesi (TBK ticari)
- İstihdam Sözleşmesi İncelemesi (4857 + TBK)
- Fesih Paketi (4857 m.17-21, Kıdem + İhbar)
- İSG Risk Değerlendirmesi (6331 + ISO 45001)
- KVKK DPIA (6698 m.12 + GDPR Mad.35)
- KVKK Yurt Dışı Aktarım Analizi (m.9)
- Rekabet Hukuku Uyum Kontrolü (4054)
- Marka Tescil Stratejisi (556 KHK + EUIPO)
- İcra Stratejisi (2004 İİK)
- İdari İtiraz Dilekçesi (2577 İYUK)
- EPDK Lisans Başvurusu (6446 EK)
- CMK 48 Saat Ceza Savunma Protokolü

**Column presets (10 → 22):**
- İngiliz Hukuku yetki maddesi
- New York Hukuku yetki maddesi
- AB/EU Hukuku yetki maddesi
- İstihdam türü sınıflandırıcı
- Kıdem + ihbar süresi çıkarıcı
- Marka hakkı maddesi
- Açık kaynak lisans uyumluluk kontrolü
- Rekabet yasağı tanımlayıcı
- Enerji lisans türü (EPDK)
- Sözleşme değeri / bedel çıkarıcı
- İdari para cezası tavanı

**MCP proxy endpoint'leri (5 → 15):**
- Mevzuat içinde arama, Anayasa Mahkemesi, Rekabet Kurumu, KVKK Kurulu, BDDK, GİB, KİK, Sayıştay, semantik karar arama, araştırma rehberi

**Pratik alanlar (+3 TR):**
- Dava Yönetimi (TR), Ceza Hukuku (TR), Büro Operasyonları (TR)

**Windows yükleyici:**
- `installer/setup.nsi` — NSIS 3.x MUI2 yükleyici, nsDialogs yapılandırma sayfası
- `installer/build-win.ps1` — build scripti (portable Node.js 20, frontend + backend build)
- `installer/launcher/` — VBScript sessiz başlatıcı + PowerShell sunucu yönetimi
- Çıktı: `installer/dist/MikeOSS-ArthurLegal-Setup-v2.0.0.exe` (~44 MB)

### Düzeltildi

- `backend/tsconfig.json`: `moduleResolution` kullanımdan kalkmış `"node"` → `"node10"` olarak değiştirildi
- `.vscode/settings.json`: workspace TypeScript 5.9.3 için `typescript.tsdk` eklendi

---

## [1.0.0] — 2026-06-06 — *İlk Entegrasyon Sürümü*

mike-oss (OSS AI legal platform) ile ArthurLegal v1.2.0 (Türk hukuku asistan paketi) entegrasyonunun ilk sürümü.

### Eklendi

**Backend patches:**
- `patches/backend/builtinWorkflows.arthurlegal.ts` — 5 yeni ArthurLegal-destekli workflow:
  - NDA Triaj (GREEN/YELLOW/RED, TR Hukuku)
  - KVKK DSAR Yanıtı (m.11 + m.28 istisna kontrolü)
  - İSG Olay Müdahalesi 0-72 Saat Runbook (üçlü-paralel risk)
  - TR M&A Kapanış Kontrol Listesi (TTK + Rekabet Kurumu + SPK)
  - Transfer Fiyatlandırması Risk Taraması (KVK m.13 + OECD TPG)
- `patches/backend/mcp-proxy.arthurlegal.ts` — yargi-mcp-pro Express proxy router:
  - Mevzuat arama ve tam metin erişimi
  - Yargı kararı arama (Yargıtay, Danıştay, AYM, KVKK, Rekabet vd.)
  - Sunucu sağlık kontrolü

**Frontend patches:**
- `patches/frontend/columnPresets.arthurlegal.ts` — 10 Türk hukuku column preset:
  - Yönetim Hukuku, Damga Vergisi, KVKK/Kişisel Veri, Tahkim Maddesi,
    Rekabet Yasağı, Tazminat Tavanı, Mücbir Sebep (TBK), Fesih Bildirimi,
    Yaptırım Riski
- `patches/frontend/practices.arthurlegal.ts` — Güncellenmiş pratik alan listesi:
  - 10 TR-spesifik alan eklendi (Ticari, Kurumsal/M&A, İş Hukuku, KVKK,
    Regülasyon, FSH/IP, İdare, Vergi, Enerji, Sermaye Piyasası)

**Knowledge dosyaları:**
- `knowledge/arthurlegal-corporate-v1.2.0-system-prompt.md` — In-house kurumsal hukuk ekibi için mike-oss system prompt (sıkıştırılmış versiyon)
- `knowledge/arthurlegal-lawfirm-v1.2.0-system-prompt.md` — Hukuk bürosu için mike-oss system prompt

**Dokümantasyon:**
- `README.md` — İngilizce genel bakış + kurulum
- `KURULUM.md` — Türkçe adım adım kurulum rehberi

### Tasarım Notları

- Bu paket mike-oss kaynak kodunu DEĞİŞTİRMEZ; üzerine ekler. Upstream güncellemeleri cherry-pick ile alınabilir.
- ArthurLegal skill engine'i (claude.ai Projects) çalıştırmak için ayrıca ArthurLegal kurulumu gerekir.
- Workflow prompt'ları self-contained olarak tasarlanmıştır — harici MCP bağlantısı olmadan da çalışır; MCP bağlantısıyla kapasite artar.
- MCP proxy opsiyoneldir; yargi-mcp-pro OAuth token olmadan devre dışı kalır.

### Bilinen Sınırlar

- `YARGI_MCP_TOKEN` olmadan mcp-proxy çalışmaz (MCP sunucu yanıtı değil, 500 döner).
- Workflow prompt'larındaki hukuki analizler model bilgisine dayanır; canlı mevzuat fetchi için yargi-mcp-pro bağlantısı gerekir.
- ArthurLegal full skill engine (70+ skill, 42+ referans dosyası) claude.ai Projects kurulumu gerektirir; bu paket sadece 5 core workflow'u kapsar.

---

[1.0.0]: https://github.com/beerbottle90/mike-oss/tree/main/mike-oss-arthurlegal-patch-v1.0.0
