# Değişiklik Günlüğü — mike-oss × ArthurLegal Entegrasyon Paketi

[Keep a Changelog](https://keepachangelog.com/tr-TR/1.1.0/) formatına uygundur.
Semver: [Semantic Versioning 2.0](https://semver.org/lang/tr/).

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
