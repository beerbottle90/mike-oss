/**
 * mike-oss × ArthurLegal v2.0.0 — Backend Workflow Tanımları (17 workflow)
 *
 * Bu dosya backend/src/lib/builtinWorkflows.ts içine import edilir.
 * 12 plugin alanını kapsar: commercial, corporate, employment, privacy,
 * regulatory, ip, litigation, tax, administrative, energy-finance,
 * criminal-defense, firm-operations
 *
 * Kaynak: ArthurLegal CorporateAssistant + LawFirm v1.2.0
 * https://github.com/beerbottle90/ArthurLegal
 */

export const ARTHURLEGAL_WORKFLOWS: { id: string; title: string; prompt_md: string }[] = [

    // =========================================================================
    // COMMERCIAL-LEGAL
    // =========================================================================

    {
        id: "arthurlegal-nda-triage-tr",
        title: "NDA Triaj — TR Hukuku (GREEN / YELLOW / RED)",
        prompt_md: `## NDA Triaj — Türk Hukuku

Yüklenen NDA belgesini ArthurLegal triaj playbook'una göre değerlendir.

### Adım 1 — Temel Sınıflandırma

| # | Soru | Bulgu |
|---|---|---|
| 1 | Mutual mi / One-way mi? | |
| 2 | Süre (yıl veya belirsiz)? | |
| 3 | Yönetim hukuku? | |
| 4 | Uyuşmazlık forumu? | |
| 5 | Rekabet yasağı / non-solicitation var mı? | |
| 6 | Kişisel veri içeriyor mu? | |
| 7 | Taraflardan biri yabancı mı? | |

### Adım 2 — GREEN / YELLOW / RED Triaj

**Yasal çerçeve:** TBK m.27 (geçersizlik) · TTK m.51 (rekabet yasağı) · 6698 KVKK · DVK Bant IV

| Madde | Seviye | Gerekçe |
|---|---|---|
| Karşılıklılık dengesi | 🟢/🟡/🔴 | |
| Süre uygunluğu (≤3 yıl=🟢 / 3–5 yıl=🟡 / >5 yıl veya süresiz=🔴) | | |
| Yönetim hukuku seçimi (TBK m.24) | | |
| Rekabet yasağı TTK m.51 uyumu | | |
| KVKK kişisel veri boyutu | | |
| Yaptırım riski (taraf/ülke) | | |
| Damga vergisi yükümlülüğü | | |
| Forum/tahkim dengesi | | |

**Seviyeler:** 🔴 Bloklayıcı · 🟠 Yüksek · 🟡 Orta · 🟢 Piyasa standardı

### Adım 3 — Müzakere Önerileri

🔴 bulgular → madde değişiklik önerisi · 🟡 bulgular → alternatif taslak dil

### Adım 4 — Sıradaki Adımlar

Karşı öneri taslağı / Damga vergisi hesabı / Yaptırım taraması (OpenSanctions) / Diğer

**⚠️ Taslaktır — Avukat incelemesi gerekir.**`,
    },

    {
        id: "arthurlegal-msa-review-tr",
        title: "MSA / Çerçeve Sözleşme Triajı — TR Hukuku",
        prompt_md: `## MSA / Çerçeve Hizmet Sözleşmesi Triajı — Türk Hukuku

Yüklenen MSA veya çerçeve sözleşmeyi ArthurLegal commercial-legal playbook'una göre analiz et.

### Adım 1 — Temel Bilgiler

| # | Kriter | Bulgu |
|---|---|---|
| 1 | Sözleşme türü (MSA / hizmet çerçeve / tedarik) | |
| 2 | Taraflar ve rolleri | |
| 3 | Sözleşme bedeli / ödeme modeli | |
| 4 | Süre ve yenileme mekanizması | |
| 5 | Yönetim hukuku | |
| 6 | Uyuşmazlık çözüm forumu | |
| 7 | Bağlı SOW / siparişler mevcut mu? | |

### Adım 2 — Risk Triajı

| Madde | Seviye | Gerekçe |
|---|---|---|
| Hizmet tanımı / kapsam belirsizliği | 🟢/🟡/🔴 | |
| Tazminat tavanı (TBK m.115) | | |
| Mutual indemnity dengesi | | |
| Değişiklik / varyasyon kontrolü | | |
| Fesih hakları ve bildirimi (TBK m.408-410) | | |
| Fikri mülkiyet sahipliği (6769 SMK) | | |
| Gizlilik süresi ve kapsamı | | |
| Devir yasağı / alt-yüklenici kısıtı | | |
| Damga vergisi (DVK — beher imzalı nüsha) | | |
| TTK m.5/A arabuluculuk şartı | | |

### Adım 3 — Kritik Maddeler

🔴 bulgular için spesifik redline önerisi · 🟡 bulgular için alternatif dil

### Adım 4 — Sıradaki Adımlar

SOW şablonu / Redline hazırlama / Damga vergisi hesabı / Yaptırım taraması

**⚠️ Taslaktır — Avukat incelemesi gerekir.**`,
    },

    // =========================================================================
    // CORPORATE-LEGAL
    // =========================================================================

    {
        id: "arthurlegal-closing-checklist-tr",
        title: "TR M&A Kapanış Kontrol Listesi — A.Ş. Devralması",
        prompt_md: `## Türk Hukuku — M&A Kapanış Kontrol Listesi

Yüklenen işlem belgelerini incele. Kapanış öncesi aksiyonları kategorize et.

### 1. Kurumsal Onaylar (TTK m.134–209)

| # | Aksiyon | Dayanak | Durum |
|---|---|---|---|
| 1 | Hedef YK devir onay kararı | TTK m.374 | |
| 2 | Alıcı YK/GK onay kararı | TTK m.408 + esas sözleşme | |
| 3 | Esas sözleşme devir kısıtı kontrolü | TTK m.490 | |
| 4 | Pay defteri devir kaydı | TTK m.499 | |
| 5 | Hamiline senetlerde MKK kaydı | TTK m.489/A | |

### 2. Düzenleyici Onaylar

| # | Onay | Eşik | Süre | Durum |
|---|---|---|---|---|
| 1 | Rekabet Kurumu izni | Ciro >100M TL | 30 iş günü | |
| 2 | SPK (hedef halka açık ise) | Tebliğ II-26.1 | — | |
| 3 | BDDK (banka/finansal kurum) | — | 60 gün | |
| 4 | EPDK lisans devri (6446 m.9) | Lisanslı enerji | — | |
| 5 | TCMB bildirimi (yabancı alıcı) | — | 30 gün | |

### 3. Vergi Yükümlülükleri

| # | Yükümlülük | Dayanak | Oran | Durum |
|---|---|---|---|---|
| 1 | Pay devri damga vergisi | DVK Bant IV | Binde 7,5 | |
| 2 | KV — sermaye kazancı | KVK m.5 iştirak istisnası | %0/%25 | |
| 3 | KDV muafiyeti | KDVK m.17/4-g | Muaf | |
| 4 | Transfer fiyatlandırması (grup içi) | KVK m.13 | — | |

### 4. İşgücü / İK

4857 m.6 işyeri devri · TİS varsa 6356 m.19 sendika bildirimi · Kilit personel retention / TBK m.444-447

### 5. Kapanış Sonrası

Ticaret Sicil tescil (15 gün, TTK m.36) · KAP açıklaması (aynı gün) · VERBİS güncelleme (30 gün) · SPA representations doğrulama

**⚠️ Taslaktır — M&A avukatı + vergi müşaviri incelemesi gerekir.**`,
    },

    // =========================================================================
    // EMPLOYMENT-LEGAL
    // =========================================================================

    {
        id: "arthurlegal-employment-contract-tr",
        title: "İstihdam Sözleşmesi İncelemesi — 4857 + TBK Uyum",
        prompt_md: `## İstihdam Sözleşmesi İncelemesi — Türk İş Hukuku

Yüklenen iş/hizmet sözleşmesini 4857 İş Kanunu ve TBK m.393-447 çerçevesinde analiz et.

### Adım 1 — İstihdam Türü Tespiti

| Kriter | Değerlendirme |
|---|---|
| İşçi mi / bağımsız hizmet mi / danışman mı? | |
| 4857 m.2 iş ilişkisi unsurları (denetim/bağımlılık/organizasyon) var mı? | |
| Sahte bağımsız çalışan (fake freelancer) riski | 🔴/🟡/🟢 |
| Birden fazla işveren riski | |

### Adım 2 — Kritik Maddeler Triajı

| Madde | Seviye | Yasal Standart | Bulgular |
|---|---|---|---|
| Ücret ve ödeme tarihi | 🟢/🟡/🔴 | AGS üzeri, ayda en az 1 ödeme | |
| Çalışma süresi | | ≤45 saat/hafta (İşK m.63) | |
| Fazla mesai hükmü | | İşK m.41 + onay | |
| Rekabet yasağı | | TTK m.51 / TBK m.444-447 | |
| Gizlilik hükmü | | Makul kapsam | |
| İhbar süresi | | İşK m.17 kıdem bazlı | |
| Deneme süresi | | ≤2 ay (İşK m.15) | |
| Yer değişikliği | | İşK m.22 değişiklik usulü | |
| KVKK çalışan verisi | | 6698 m.5/f.2(c) | |

### Adım 3 — Hak Hakkaniyeti Özeti

Kıdem tazminatı hesabı (İşK m.14) + İhbar tazminatı tablosu + Aylık maliyet (brüt/net/işveren maliyeti)

### Adım 4 — Sıradaki Adımlar

Redline hazırlama / Kıdem hesabı / KVKK aydınlatma metni / Sendika üyelik kontrolü

**⚠️ Taslaktır — İş hukuku avukatı incelemesi gerekir.**`,
    },

    {
        id: "arthurlegal-termination-package-tr",
        title: "Fesih Paketi Hesaplama — 4857 m.17-21",
        prompt_md: `## İşçi Fesih Paketi Hesaplama — 4857 İş Kanunu

Çalışan bilgilerini girerek yasal hakları hesapla.

### Adım 1 — Çalışan Profili

| Bilgi | Değer |
|---|---|
| İşe başlama tarihi | |
| Fesih tarihi | |
| Kıdem süresi (yıl-ay-gün) | |
| Son brüt aylık ücret (TL) | |
| Fesih türü (işveren/işçi/olağanüstü) | |
| Kıdem tazminatı tavanı (güncel) | |

### Adım 2 — Hak Hesabı

**Kıdem tazminatı (1475 m.14):**
- Her tam yıl için 30 günlük brüt ücret
- Tavan: [Güncel kıdem tazminatı tavanı × çalışma yılı]
- Kesinti: GV muafiyeti (GVK m.25/7)

**İhbar tazminatı (4857 m.17):**

| Kıdem | İhbar Süresi |
|---|---|
| 0–6 ay | 2 hafta |
| 6 ay – 1,5 yıl | 4 hafta |
| 1,5 – 3 yıl | 6 hafta |
| 3 yıl+ | 8 hafta |

**Kullanılmayan yıllık izin (4857 m.59):**
- Hak edilen izin günü × brüt günlük ücret

**Diğer:** Yemek/ulaşım nakdi karşılığı · Fazla mesai alacağı · Bonus

### Adım 3 — SGK / Vergi Yükümlülükleri

- Kıdem tazminatı: SGK primine tabi değil; GV muaf
- İhbar tazminatı: SGK'ya tabi değil; GV'ye tabi
- İzin ücreti: GV + SGK'ya tabi

### Adım 4 — Geçersiz Fesih Riski (4857 m.18-21)

30+ işçi çalışan işyerinde, 6+ ay kıdemli işçi için işe iade hakkı var mı?
Yeniden işe almama tazminatı: 4-8 aylık brüt ücret

**⚠️ Taslaktır — İş hukuku avukatı incelemesi gerekir.**`,
    },

    {
        id: "arthurlegal-isg-incident",
        title: "İSG Olay Müdahalesi — 0/1/24/72 Saat Runbook",
        prompt_md: `## İSG İş Kazası / Meslek Hastalığı Müdahale Runbook

Yüklenen olay raporunu incele. BIST listeli şirketler için KAP kontrolü dahildir.

### FAZ 0 — İlk Bilgi Toplama

| Bilgi | Değer |
|---|---|
| Olay tarihi ve saati | |
| Olay yeri | |
| Yaralı / hayatını kaybeden kişi sayısı | |
| Yaralı durumu (ağır/hafif/ölüm) | |
| Şirket BIST listeli mi? | |
| Yüklenici/alt işveren var mı? | |
| SGK bildirimi yapıldı mı? | |

### FAZ 1 — 0–1 SAAT: Acil Adımlar

1. Olay yerini koru — delil koruma, fotoğraf/video
2. **Kolluk bildirimi** (ölüm/ağır yaralanma → Cumhuriyet Savcılığı + emniyet) — TCK m.85/89
3. **ÇSGB bildirimi** — kazadan itibaren ≤3 iş günü (İşK m.77 + İSGK 6331 m.14)
4. **SGK e-bildirimi** — ≤3 iş günü (5510 m.13)
5. **KAP kontrolü** — BIST listeli + önemli olay eşiği → aynı gün açıklama (SPK Tebliği II-15.1)

### FAZ 2 — 0–24 SAAT: Hukuki Güvence

İç soruşturma ekibi · Tanık ifadeleri (yazılı+imzalı) · Delil koruma (CCTV + bakım defterleri) · Sigorta bildirimi

### FAZ 3 — 0–72 SAAT: Üçlü Risk Matrisi

| Risk | Dayanak | Yaptırım | Aciliyet |
|---|---|---|---|
| Cezai | TCK m.85/89, İşK m.105 | Hapis + para cezası | 🔴 |
| Tazminat | BK m.49, İşK m.21 | Maddi + manevi | 🔴 |
| İdari | ÇSGB, SGK, EPDK | Para cezası, durdurma | 🟠 |

**⚠️ Taslaktır — İSG uzmanı + ceza avukatı incelemesi gerekir.**`,
    },

    // =========================================================================
    // PRIVACY-LEGAL
    // =========================================================================

    {
        id: "arthurlegal-kvkk-dsar",
        title: "KVKK DSAR Yanıtı — Veri Sahibi Başvurusu (m.11)",
        prompt_md: `## KVKK m.11 — Veri Sahibi Başvurusu Yanıt Taslağı

Yüklenen DSAR başvurusunu incele ve yanıt taslağı üret.

### Adım 1 — Başvuru Değerlendirmesi

| Kriter | Değerlendirme |
|---|---|
| Hangi m.11 hakkı? | |
| Kimlik teyidi var mı? | |
| Başvuru tarihi | |
| 30 günlük cevap tarihi | |
| m.28 istisnası uygulanabilir mi? | |

**m.11 hakları:** bilgi talep · erişim · düzeltme · silme/yok etme · itiraz · zarar giderme
**m.28 istisnaları:** kişisel güvenlik · devlet sırrı · soruşturma · istatistik/araştırma

### Adım 2 — Yanıt Mektubu Taslağı

Şirket antetli kağıda; tam kabul / kısmi kabul (m.28 gerekçeli) / red seçeneklerinden uygun olanı uygula.
Her durumda KVK Kurulu'na itiraz hakkını belirt (m.14 — 30 gün).

### Adım 3 — Kontrol Noktaları

- [ ] Kimlik teyidi yapıldı
- [ ] 30 günlük süre hesaplandı
- [ ] VERBİS log kaydı
- [ ] DPO onayı alındı
- [ ] Üçüncü taraf aktarımı değerlendirildi

**⚠️ Taslaktır — Avukat / DPO incelemesi gerekir.**`,
    },

    {
        id: "arthurlegal-kvkk-dpia",
        title: "KVKK DPIA — Veri Koruma Etki Analizi",
        prompt_md: `## KVKK Veri Koruma Etki Analizi (DPIA)

Yüklenen işleme faaliyeti açıklamasını KVKK + AB GDPR Art.35 karşılaştırmalı DPIA çerçevesinde değerlendir.

### Adım 1 — DPIA Zorunluluğu Testi

Şu yüksek riskli işleme faaliyetlerinden biri var mı?
- Otomatik karar verme / profilleme (KVKK m.11/son)
- Sistematik hassas veri işleme (m.6)
- Büyük ölçekli kişisel veri izleme
- Yeni teknoloji / biyometri kullanımı

**Değerlendirme:** 2+ faktör → DPIA zorunlu · 1 faktör → ihtiyari

### Adım 2 — İşleme Faaliyeti Tanımı

| Unsur | Açıklama |
|---|---|
| Kişisel veri kategorileri | |
| Veri sahipleri | |
| İşleme amaçları | |
| Hukuki dayanak (m.5 veya m.6) | |
| Üçüncü taraf aktarımı | |
| Saklama süresi | |
| Güvenlik önlemleri | |

### Adım 3 — Risk Değerlendirmesi

| Risk | Seviye | Kontrol |
|---|---|---|
| Yetkisiz erişim | 🔴/🟡/🟢 | |
| Veri ihlali | | |
| Amaç dışı kullanım | | |
| Yurt dışı aktarım uyumu | | |
| Veri sahibi hakkı engellemesi | | |

### Adım 4 — Risk Azaltma Planı

Her 🔴/🟡 risk için: teknik kontrol · idari kontrol · DPO danışma · KVK Kurul önceden danışma (gerekiyorsa)

### Adım 5 — Karar

DPIA onay / şartlı onay / red + gerekçe

**⚠️ Taslaktır — DPO + KVKK uzmanı incelemesi gerekir.**`,
    },

    {
        id: "arthurlegal-kvkk-cross-border",
        title: "Sınır Ötesi Veri Transferi — KVKK m.9 + Uyum",
        prompt_md: `## Sınır Ötesi Kişisel Veri Transferi — KVKK m.9 Analizi

Yüklenen sözleşme / işleme faaliyetini 6698 KVKK m.9 kapsamında değerlendir.

### Adım 1 — Transfer Gerçekleşiyor mu?

| Kriter | Değerlendirme |
|---|---|
| Alıcı ülke | |
| Alıcı kuruluş türü | |
| Aktarılan veri kategorileri | |
| Aktarım mekanizması | |

### Adım 2 — Uyum Yolu Tespiti (KVKK m.9)

**Yeterli koruma kararı:** KVK Kurulu'nun yeterlilik kararı verdiği ülke mi?

**Yeterli koruma yoksa — alternatif mekanizmalar:**
1. Veri sahibinin açık rızası (m.9/1-a)
2. Sözleşme gerekliliği (m.9/1-b)
3. Kamu yararı (m.9/1-c)
4. İlgili kişi çıkarı (m.9/1-d)
5. Bağlayıcı Şirket Kuralları — BCR (m.9/5)
6. Taahhütname + KVK Kurul izni (m.9/3)

**AB GDPR standart sözleşme maddeleri (SCCs):** Türk hukuku ile karşılaştırmalı değerlendirme

### Adım 3 — Risk Matris

| Risk | Seviye | Önlem |
|---|---|---|
| Uyum mekanizması eksikliği | 🔴/🟡/🟢 | |
| Alıcı ülke yaptırım riski | | |
| Hassas veri (m.6) aktarımı | | |
| GDPR çift rejim uyumsuzluğu | | |

### Adım 4 — Uyum Planı

Eksik mekanizma tamamlama · DPA güncelleme · KVK Kurul başvurusu (gerekiyorsa) · Çalışan bildirimi

**⚠️ Taslaktır — KVKK uzmanı + DPO incelemesi gerekir.**`,
    },

    // =========================================================================
    // REGULATORY-LEGAL
    // =========================================================================

    {
        id: "arthurlegal-competition-filing-tr",
        title: "Rekabet Kurumu Bildirim Değerlendirmesi — M/A + Hâkim Durum",
        prompt_md: `## Rekabet Kurumu Bildirim Değerlendirmesi

Yüklenen işlem bilgilerini 4054 Rekabet Kanunu çerçevesinde değerlendir.

### Adım 1 — Bildirim Zorunluluğu Testi

**Birleşme/Devralma Eşiği (Tebliğ 2010/4):**

| Kriter | Eşik | Değerlendirme |
|---|---|---|
| Tarafların Türkiye ciroları toplamı | >100M TL | |
| En az 2 tarafın ayrı ayrı Türkiye ciroları | Her biri >30M TL | |
| Teknoloji sektörü / dijital platform | Özel eşikler | |

**Sonuç:** Bildirim zorunlu mu? Evet / Hayır / Belirsiz (hukuki görüş gerekli)

### Adım 2 — Bildirim Paketi

Zorunlu ise:

| Belge | Durum |
|---|---|
| Form CO (Türkçe) | |
| Taraf profilleri (pazar payı, ciro) | |
| İşlem belgesi (SPA/LOI/MOU) | |
| Pazar tanımı analizi | |
| Yoğunlaşma analizi (HHI) | |

**Süre:** Kapanış öncesinde ön bildirim · Kurul 30 iş günü içinde karar (uzatılabilir)

### Adım 3 — Hâkim Durum Riski (4054 m.6)

Birleşme sonrası pazar payı >40%? → Hâkim durum şüphesi
Pazar yapısı (HHI): <1000 = düşük / 1000-1800 = orta / >1800 = yüksek yoğunlaşma

### Adım 4 — Önerilen Aksiyonlar

Ön görüşme talebi (Rekabet Kurumu) · Taahhüt paketi hazırlığı · Ekonomik analiz komisyonu

**⚠️ Taslaktır — Rekabet hukuku uzmanı incelemesi gerekir.**`,
    },

    // =========================================================================
    // IP-LEGAL
    // =========================================================================

    {
        id: "arthurlegal-trademark-strategy-tr",
        title: "Marka Araştırma + Tescil Stratejisi — 6769 SMK",
        prompt_md: `## Marka Araştırma ve Tescil Stratejisi — Sınai Mülkiyet Kanunu 6769

### Adım 1 — Marka Değerlendirmesi

| Unsur | Değerlendirme |
|---|---|
| Tescil edilmek istenen marka | |
| Niyet edilen mal/hizmetler (Nice sınıfları) | |
| Hedef pazarlar (TR / AB / ABD / JP) | |
| Marka türü (kelime / şekil / birleşik / ses) | |

### Adım 2 — Tescil Edilemezlik Riskleri (6769 m.5-6)

| Risk | Seviye | Açıklama |
|---|---|---|
| Tanımlayıcılık / jenerik olma | 🔴/🟡/🟢 | m.5/1(b) |
| Karıştırılma ihtimali (önceki marka) | | m.6 |
| Coğrafi işaret çakışması | | m.5/1(c) |
| Kamu ahlakı / yanıltıcılık | | m.5/1(e-f) |
| Tanınmış marka saldırısı | | m.6/4 |

### Adım 3 — Tescil Stratejisi

**TÜRKPATENT yolu:**
- Online başvuru (marka.turkpatent.gov.tr)
- Yayın → 2 ay itiraz süresi → tescil
- Resmi ücret: Sınıf başına güncel tarife

**Madrid Protokolü (uluslararası):**
- Türkiye kaynak başvurusu + Madrid Office
- Hedef ülkeler için ek ücret

### Adım 4 — Koruma Takvimi

Başvuru tarihi → Yayın (≈2-3 ay) → İtiraz süresi (2 ay) → Tescil (itiraz yoksa) → 10 yıl koruma → Yenileme

### Adım 5 — Sıradaki Adımlar

TÜRKPATENT ön araştırma · Coğrafi genişleme planı · İhlal izleme kurulumu · Lisans/devir stratejisi

**⚠️ Taslaktır — Marka vekili incelemesi gerekir.**`,
    },

    // =========================================================================
    // LITIGATION-LEGAL
    // =========================================================================

    {
        id: "arthurlegal-enforcement-iik-tr",
        title: "İcra Takibi Başlatma Kontrol Listesi — İİK",
        prompt_md: `## İcra Takibi Başlatma — İcra ve İflas Kanunu

Yüklenen alacak belgelerini incele. İcra takibi stratejisi ve süreç haritası üret.

### Adım 1 — Alacak Profili

| Bilgi | Değer |
|---|---|
| Alacak türü (senetle/senetsiz/ilamlı) | |
| Alacak tutarı | |
| Vade / vadesi geçen kısım | |
| Borçlu türü (gerçek/tüzel) | |
| Borçlunun bilinen mal varlığı | |
| Zamanaşımı kontrolü | |

### Adım 2 — Takip Türü Seçimi

| Takip Türü | Koşul | Avantaj |
|---|---|---|
| İlamlı icra (İİK m.32) | Mahkeme kararı / noter senedi var | Hemen haciz |
| İlamsız icra — genel (m.42) | Her türlü alacak | Hızlı |
| Kambiyo senedi takibi (m.167) | Bono/çek/poliçe | 7 günlük itiraz süresi |
| İhtiyati haciz (m.257) | Aciliyet + kaçma riski | Varlık koruma |

### Adım 3 — Takip Süreci

**İlamsız takip akışı:**
1. İcra dairesi takip talebi + ödeme emri gönderimi
2. Borçlu itiraz süresi: **7 gün** (İİK m.62) / kambiyo: **5 gün** (m.168)
3. İtiraz edilmezse → haciz talebi
4. İtiraz edilirse → itirazın iptali davası (İİK m.67) veya itirazın kaldırılması (m.68)

### Adım 4 — Haciz Stratejisi

Taşınır / taşınmaz / banka hesabı / ücret / iştirak payı haczi — öncelik sırası belirle

### Adım 5 — Masraf ve Süre Tahmini

İcra harcı (alacak %4,55 oranında) + vekâlet ücreti + tebligat + süre tahmini (uzlaşma / dava / ihale)

**⚠️ Taslaktır — İcra avukatı incelemesi gerekir.**`,
    },

    // =========================================================================
    // ADMINISTRATIVE-LEGAL
    // =========================================================================

    {
        id: "arthurlegal-iyuk-petition-tr",
        title: "İYUK İdari Dava Süre + Dilekçe Hazırlığı",
        prompt_md: `## İdare Mahkemesi Davası — İYUK Süre ve Strateji

Yüklenen idari işlem / karara karşı dava açma stratejisini hazırla.

### Adım 1 — İdari İşlem Profili

| Bilgi | Değer |
|---|---|
| İdari işlemin türü | |
| İşlemi yapan kurum | |
| İşlem tarihi / tebliğ tarihi | |
| Konusu | |
| Öngörülen dava türü | |

### Adım 2 — Süre Analizi (KRİTİK)

| Dava Türü | Süre | Dayanak | Durum |
|---|---|---|---|
| Genel idari işlem | **60 gün** | İYUK m.7 | |
| Vergi davası | **30 gün** | İYUK m.7 + VUK m.377 | |
| ÇED kararı | **30 gün** | İYUK m.20/A | |
| ÇED — Danıştay temyiz | **15 gün** | İYUK m.20/A | |
| Tam yargı davası (tazminat) | **1 yıl** | İYUK m.13 | |
| İdari başvuru sonrası dava | **60 gün** | İYUK m.11 | |

⚠️ **Süreler hak düşürücüdür** — tebligat tarihinden itibaren başlar

### Adım 3 — Ön Başvuru Zorunluluğu (İYUK m.11)

İdareye başvuru yapıldı mı? → 60 günlük cevap bekle (sessiz red) → ardından dava aç
Bazı hallerde zorunlu değil (bağlı yetki işlemleri)

### Adım 4 — Yetki Mahkemesi

**3 Dereceli İdari Yargı:**
- İdare Mahkemesi (ilk derece — genel)
- Vergi Mahkemesi (ilk derece — vergi)
- Bölge İdare Mahkemesi (itiraz — BİM)
- Danıştay (temyiz / ilk derece — büyük davalar + ÇED)

### Adım 5 — Dilekçe Taslağı Unsurları

Davacı/davalı · işlem türü · ihlal edilen hukuki normlar · talep (iptal/tam yargı) · yürütmeyi durdurma talebi

**⚠️ Taslaktır — İdare hukuku avukatı incelemesi gerekir.**`,
    },

    // =========================================================================
    // TAX-LEGAL
    // =========================================================================

    {
        id: "arthurlegal-transfer-pricing",
        title: "Transfer Fiyatlandırması Risk Taraması (KVK m.13 + OECD)",
        prompt_md: `## Transfer Fiyatlandırması Risk Taraması

KVK m.13 + OECD Transfer Fiyatlandırması Rehberi çerçevesinde değerlendir.

### Adım 1 — İlişkili Taraf Tespiti (KVK m.13/f.2)

| Taraf | İlişki | Kontrol % | İlişkili mi? |
|---|---|---|---|
| | | | |

**Kriterler:** Sermayede >%10 · oy hakkında >%10 · YK çoğunluk atama · ortak üst şirket

### Adım 2 — İşlem Analizi

| İşlem | Tutar | Yön | Yöntem | Risk |
|---|---|---|---|---|
| | | | | |

**OECD yöntemleri:** CUP · RPM · Cost-Plus · TNMM · Kâr Bölüşüm

### Adım 3 — Dokümantasyon Kontrolü

| Belge | Eşik | Mevcut? | Risk |
|---|---|---|---|
| Yıllık TP Raporu | >13M TL | | |
| CbCR | Grup ciro >750M EUR | | |
| Ana Dosya | >750M EUR | | |
| Yerel Dosya | >13M TL | | |
| APA | İsteğe bağlı | | |

### Adım 4 — Risk Değerlendirmesi

Emsalsiz işlem · dokümantasyon eksikliği · çapraz sınır kar transferi · GİB özelge uyumsuzluğu · BEPS riski

**Yaptırım:** KVK m.13/f.7 — emsale aykırı bedel = dağıtılmış kâr → %25 KV + gecikme faizi + vergi ziyaı cezası

**⚠️ Taslaktır — Vergi müşaviri + TP uzmanı incelemesi gerekir.**`,
    },

    // =========================================================================
    // ENERGY-FINANCE
    // =========================================================================

    {
        id: "arthurlegal-epdk-license-transfer",
        title: "EPDK Lisans Devir Kontrol Listesi — 6446 m.9",
        prompt_md: `## EPDK Enerji Lisansı Devir Kontrol Listesi

Yüklenen enerji M&A işlemi belgelerini 6446 Elektrik Piyasası Kanunu m.9 kapsamında incele.

### Adım 1 — Lisans Profili

| Bilgi | Değer |
|---|---|
| Lisans türü (üretim/dağıtım/tedarik/iletim/OSB) | |
| Lisans sahibi şirket | |
| Lisans numarası ve geçerlilik tarihi | |
| Kurulu güç / kapasite | |
| Devralma yapısı (pay devri / lisans devri) | |

### Adım 2 — EPDK Başvuru Koşulları (6446 m.9 + EPDK Yönetmeliği)

| Koşul | Durum |
|---|---|
| Pay devrinde EPDK onayı zorunlu mu? (%10 eşik) | |
| Doğrudan lisans devrinde ön izin | Zorunlu |
| Teknik yeterlilik belgesi | |
| Mali yeterlilik belgesi | |
| Tarife bağlılığı / yatırım taahhütleri | |

**Süre:** EPDK 30 iş günü içinde karar (uzatılabilir)

### Adım 3 — Düzenleyici Çakışmalar

| Kurum | Zorunluluk | Süre |
|---|---|---|
| Rekabet Kurumu | Ciro eşiği >100M TL | 30 iş günü |
| SPK (halka açık ise) | Tebliğ II-26.1 | — |
| TCMB (yabancı alıcı) | Bildirim | 30 gün |

### Adım 4 — Lisans Sonrası Yükümlülükler

Kapasite taahhüdü güncelleme · Ticaret Sicil değişikliği · VERBİS güncelleme · KAP açıklama

### Adım 5 — Kritik Riskler

Lisansın devir yasağı maddesi · Yatırım yükümlülüğü devri · Çevre / ÇED koşulları · Bağlantı anlaşması devri

**⚠️ Taslaktır — Enerji hukuku + düzenleyici uzmanı incelemesi gerekir.**`,
    },

    // =========================================================================
    // CRIMINAL-DEFENSE (LawFirm only)
    // =========================================================================

    {
        id: "arthurlegal-cmk-detention-runbook",
        title: "CMK 48 Saat Gözaltı Müdahale Runbook",
        prompt_md: `## CMK Gözaltı Müdahale Runbook — 48 Saat Avukat Protokolü

**Kullanıcı:** Müvekkilin gözaltına alındığı bilgisi ulaştı. Acil aksiyon listesini sun.

### FAZ 0 — İlk Temas (0–2 Saat)

**Kritik süreler (CMK m.91-94):**
- Gözaltı azami süresi: **24 saat** (toplu suçlarda Cumhuriyet Savcısı kararıyla +1 gün, ÖYM suçlarında daha uzun)
- Yakınlara bildirim: **Derhal** (CMK m.95)
- Avukata erişim: **Gözaltı başından itibaren** (CMK m.149-154) — vazgeçilemez

| Aksiyon | Süre | Durum |
|---|---|---|
| Gözaltı yerini tespit et (emniyet/jandarma) | Hemen | |
| Müvekkil ile ilk görüşme (CMK m.154 — izole görüşme) | Hemen | |
| Yakınlara bildirim (CMK m.95) | Hemen | |
| Suç isnat edildi mi? Hangi suç? | İlk görüşmede | |
| Arama kararı var mı? (CMK m.116-119) | | |
| Dijital aygıt el koyma var mı? | | |

### FAZ 1 — 2–24 SAAT: İfade ve Tutuklama Öncesi

**İfade alma (CMK m.147-149):**
- Susma hakkı → müvekkili bilgilendir (CMK m.147/e)
- Avukatsız ifade vermeme hakkı (CMK m.148)
- Dijital delil ihtiyatı — telefon şifresi verme

**Tutuklama (CMK m.100):**
- Tutuklama itirazı: Sulh Ceza Hâkimliği → **24 saat** içinde karar (CMK m.102)
- Tutuklama kararına itiraz: **7 gün** içinde (CMK m.104)

### FAZ 2 — 24–48 SAAT: Salıverilme veya Tutuklama

| Seçenek | Aksiyon |
|---|---|
| Salıverilme | İdari takip kararı var mı? Seyahat yasağı? |
| Tutuklanma | Tutuklama itirazı hazırla (CMK m.104) |
| Adli kontrol (CMK m.109) | İmza / yurt dışı yasağı şartları |

### Kritik Hak Hatırlatmaları

- TCK m.30 hata hükmü (kasten işleme itiraz)
- Yurt dışı çıkış yasağı → pasaport teslimi
- Mal varlığı dondurma riski (MASAK + TCK m.282)

**⚠️ Bu runbook bir taslaktır. Baroya kayıtlı ceza avukatı yönlendirmesi şarttır.**`,
    },

    // =========================================================================
    // FIRM-OPERATIONS (LawFirm only)
    // =========================================================================

    {
        id: "arthurlegal-new-client-intake",
        title: "Yeni Müvekkil Kabul + Çatışma + MASAK KYC",
        prompt_md: `## Yeni Müvekkil Kabul Prosedürü

Avukatlık K. m.38 (ret zorunluluğu) · m.164/A (ücret sözleşmesi) · 5549 MASAK

### Adım 1 — Çatışma (Çıkar Çatışması) Kontrolü (Av. K. m.38)

| Kontrol | Durum |
|---|---|
| Müvekkil adı / unvanı mevcut/eski müvekkillerle çakışıyor mu? | |
| Karşı taraf adı mevcut müvekkillerle çakışıyor mu? | |
| Büro personeli kişisel çatışma bildirimi? | |
| **Sonuç:** Çatışma var mı? | Evet / Hayır |

Çatışma varsa → ret + yazılı bildirim

### Adım 2 — MASAK KYC (5549 Sayılı Kanun)

**Gerçek kişi müvekkil:**
- [ ] Nüfus cüzdanı / pasaport fotokopisi (canlı teyit)
- [ ] İkametgâh belgesi
- [ ] Ekonomik profil (işlem tutarına göre)

**Tüzel kişi müvekkil:**
- [ ] Ticaret sicil gazetesi + güncel imza sirküleri
- [ ] Vergi levhası
- [ ] %25+ pay sahibi gerçek kişi tespiti (nihai faydalanan sahip)
- [ ] YK üyeleri listesi

**Şüpheli işlem bildirimi:** Şüphe oluşursa MASAK'a otomatik bildirim (5549 m.4)

### Adım 3 — Avukatlık Ücret Sözleşmesi (Av. K. m.164/A)

| Unsur | Durum |
|---|---|
| Yazılı ve imzalı mı? | |
| İş tanımı net mi? | |
| Ücret KDV dahil/hariç belirtilmiş mi? | |
| Ödeme planı ve vade tarihleri | |
| Fatura kesim yükümlülüğü | |
| Avanslar | |

Ücret sözleşmesi olmadan dava takibi → Av. K. m.164 baro tarifesi uygulanır

### Adım 4 — Görevlendirme Akışı

- Görevlendirme yazısı / engagement letter hazırla
- İş dosyası aç (fiziki + dijital)
- Vekaletname türü belirle (genel / özel / boşanma)
- TTK m.5/A arabuluculuk kontrolü (ticari dava ise)

**⚠️ MASAK KYC formu büronuzun MASAK uyum politikasına göre özelleştirilmelidir.**`,
    },
];
