/**
 * mike-oss × ArthurLegal v1.0.0 — Ek Workflow'lar
 *
 * Bu dosya backend/src/lib/builtinWorkflows.ts dosyasına import edilir.
 * Mevcut BUILTIN_WORKFLOWS dizisine spread ile eklenmelidir:
 *
 *   import { ARTHURLEGAL_WORKFLOWS } from "./builtinWorkflows.arthurlegal";
 *   export const BUILTIN_WORKFLOWS = [...existingWorkflows, ...ARTHURLEGAL_WORKFLOWS];
 *
 * Kaynak: ArthurLegal CorporateAssistant + LawFirm v1.2.0
 * https://github.com/beerbottle90/ArthurLegal
 */

export const ARTHURLEGAL_WORKFLOWS: { id: string; title: string; prompt_md: string }[] = [
    // -------------------------------------------------------------------------
    // 1. NDA TRİAJ (Türk Hukuku)
    // -------------------------------------------------------------------------
    {
        id: "arthurlegal-nda-triage-tr",
        title: "NDA Triaj — TR Hukuku (GREEN / YELLOW / RED)",
        prompt_md: `## NDA Triaj — Türk Hukuku

Yüklenen NDA belgesini ArthurLegal triaj playbook'una göre değerlendir.
**Çıktıyı inline olarak ver — DOCX üretme.**

---

### Adım 1 — Temel Sınıflandırma

Aşağıdaki soruları belgeden cevapla:

| # | Soru | Bulgu |
|---|---|---|
| 1 | Mutual mi / One-way mi? | |
| 2 | Süre (yıl veya belirsiz süresiz)? | |
| 3 | Yönetim hukuku (governing law)? | |
| 4 | Uyuşmazlık çözüm forumu? | |
| 5 | Rekabet yasağı / non-solicitation var mı? | |
| 6 | Gizlilik yükümlülüğünün kapsamı (kişisel veri içeriyor mu)? | |
| 7 | Taraflardan biri yabancı uyruklu / yabancı hukuk entitesi mi? | |

---

### Adım 2 — GREEN / YELLOW / RED Triaj

Her madde için TR hukuku standardı:

**TBK m. 27 (geçersizlik), TTK m. 51 (rekabet yasağı), 6698 KVKK, DVK (damga vergisi)**

| Madde | Seviye | Gerekçe |
|---|---|---|
| Karşılıklılık dengesi | 🟢/🟡/🔴 | |
| Süre uygunluğu (≤3 yıl = 🟢; 3–5 yıl = 🟡; >5 yıl veya süresiz = 🔴) | | |
| Yönetim hukuku seçimi | | |
| Rekabet yasağının TTK m.51 uyumluluğu | | |
| KVKK kişisel veri işleme boyutu | | |
| Yaptırım riski (karşı taraf veya ülke) | | |
| Damga vergisi yükümlülüğü (DVK bant IV) | | |
| Forum / tahkim dengesi | | |

**Seviye tanımları:**
- 🔴 Bloklayıcı — sözleşme imzalanmaz
- 🟠 Yüksek — avukat müzakeresi şart
- 🟡 Orta — standart müzakere noktası
- 🟢 Düşük / Piyasa standardı

---

### Adım 3 — Müzakere Önerileri

🔴 bulgular için spesifik madde değişiklik önerisi yaz.
🟡 bulgular için alternatif taslak dil öner.

---

### Adım 4 — Sıradaki Adımlar

3-5 seçenek sun:
- Karşı öneri taslağı hazırla
- Damga vergisi hesapla
- Yaptırım taraması başlat (OpenSanctions)
- Başka

---

**⚠️ Taslaktır — Avukat incelemesi gerekir.**
`,
    },

    // -------------------------------------------------------------------------
    // 2. KVKK DSAR YANIT TASLAGI
    // -------------------------------------------------------------------------
    {
        id: "arthurlegal-kvkk-dsar",
        title: "KVKK DSAR Yanıtı — Veri Sahibi Başvurusu (m.11)",
        prompt_md: `## KVKK m.11 — Veri Sahibi Başvurusu Yanıt Taslağı

Yüklenen veri sahibi başvurusunu (DSAR) incele ve yanıt taslağı üret.
**Çıktıyı inline ver.**

---

### Adım 1 — Başvuru Değerlendirmesi

| Kriter | Değerlendirme |
|---|---|
| Başvuru türü (m.11 hangi hak?) | |
| Kimlik teyit bilgisi var mı? | |
| Başvuru tarihi | |
| 30 günlük cevap tarihi | |
| m.28 istisnası uygulanabilir mi? | |

**KVKK m.11 hakları:** bilgi talep etme, erişim, düzeltme, silme/yok etme, itiraz, zarar giderme

**KVKK m.28 istisnaları (kapsam dışı haller):**
- Kişisel veri üçüncü kişilere verilmemişse sadece o kişiyi ilgilendiren
- Resmi istatistik ve araştırma amaçlı anonim veri
- Devlet sırrı niteliğindeki veri
- Soruşturma / kovuşturma amaçlı işleme
- Disiplin, suç önleme ve terör amaçlı

---

### Adım 2 — Yanıt Taslağı

\`\`\`
[ŞİRKET ANTETLI KAĞIDI]

Tarih: [GG.AA.YYYY]
Konu: 6698 Sayılı Kişisel Verilerin Korunması Kanunu m.11 Kapsamında Başvurunuza İlişkin Yanıtımız

Sayın [VERİ SAHİBİ ADI],

[Tarih] tarihli başvurunuz, Şirketimiz [ŞİRKET ADI] KVKK Veri Sorumlusu sıfatıyla alınmış ve incelenmiştir.

BAŞVURU İÇERİĞİ:
[Başvurudan özetlenen talepler]

DEĞERLENDİRME:
[Aşağıdaki seçeneklerden uygun olanı kullan:]

SEÇENEK A — TAM KABUL:
Talebiniz KVKK m.11 kapsamında değerlendirilmiş olup [talep içeriği] aşağıda sunulmaktadır:
[İlgili bilgi / düzeltme / silme işlemi açıklaması]

SEÇENEK B — KISMI KABUL / m.28 İSTİSNASI:
Talebinizin [X] kısmı kabul edilmiş; [Y] kısmı ise KVKK m.28/[f. no] kapsamında istisna dahilinde olduğundan karşılanamamaktadır. İstisna gerekçesi: [açıklama].

SEÇENEK C — RED:
Talebiniz, KVKK m.28 uyarınca [gerekçe] sebebiyle karşılanamamaktadır. Bu karara itiraz hakkınız KVKK m.14 uyarınca KVK Kurulu'na başvuru yoluyla kullanılabilir.

KVK KURULU BAŞVURUSU:
Yanıtımıza itiraz etmek istemeniz halinde, bu yanıtın tarafınıza ulaşmasından itibaren 30 gün içinde Kişisel Verileri Koruma Kurulu'na (kvkk.gov.tr) başvurabilirsiniz.

Saygılarımızla,
[İMZALAYAN]
[UNVAN]
[ŞİRKET]
\`\`\`

---

### Adım 3 — Kontrol Noktaları

- [ ] Kimlik teyidi yapıldı mı?
- [ ] 30 günlük süre hesaplandı mı?
- [ ] Kayıt altına alındı mı (VERBIS log)?
- [ ] DPO / KVKK Sorumlusu onayı alındı mı?
- [ ] Üçüncü taraf aktarım söz konusu ise ek değerlendirme yapıldı mı?

---

**⚠️ Taslaktır — Avukat / DPO incelemesi gerekir.**
`,
    },

    // -------------------------------------------------------------------------
    // 3. İSG OLAY MÜDAHALE RUNBOOK (0-72 SAAT)
    // -------------------------------------------------------------------------
    {
        id: "arthurlegal-isg-incident",
        title: "İSG Olay Müdahalesi — 0/1/24/72 Saat Runbook",
        prompt_md: `## İSG İş Kazası / Meslek Hastalığı Müdahale Runbook

Yüklenen olay raporunu / bilgileri incele. Gerekli aksiyonları faz bazlı sun.
**BIST listeli şirketler için KAP açıklama kontrolü dahildir.**

---

### FAZ 0 — İlk Bilgi Toplama (Şimdi)

Belgeden veya kullanıcıdan şunları çıkar:

| Bilgi | Değer |
|---|---|
| Olay tarihi ve saati | |
| Olay yeri (tesis / şantiye / araç) | |
| Yaralı / hayatını kaybeden kişi sayısı | |
| Yaralı durumu (ağır / hafif / ölüm) | |
| Şirket BIST listeli mi? | |
| Yüklenici / alt işveren ilişkisi var mı? | |
| SGK bildirimi yapıldı mı? | |

---

### FAZ 1 — 0–1 SAAT: Acil Adımlar

**Hukuki zorunluluklar:**

1. **Olay yerine müdahale:** Yaralıyı güvene al, kaza yerini koru (delil koruma). Fotoğraf / video belgele.
2. **Kolluk bildirimi:** Ölüm veya ağır yaralanma → Cumhuriyet Savcılığı + emniyet/jandarma (5237 TCK m. 87 riski).
3. **ÇSGB/İSG bildirimi:** Çalışma ve Sosyal Güvenlik Bakanlığı iş müfettişi tebliği — kaza anından itibaren **3 iş günü** içinde (İşK m. 77 + İSGK 6331 m. 14).
4. **SGK bildirimi:** İş kazası e-bildirimi → kazadan itibaren **3 iş günü** (5510 SSK m. 13).
5. **KAP kontrolü:** Şirket BIST listeli ise → olay "önemli olay" eşiğini aşıyor mu? (SPK Tebliği II-15.1 madde 5) → Evet ise **aynı gün** KAP açıklaması.

---

### FAZ 2 — 0–24 SAAT: Hukuki Güvence

1. **İç soruşturma ekibi kur:** İSG uzmanı + İK + Hukuk + mühendis.
2. **Tanık ifadeleri al:** Yazılı, imzalı, tarihli. İmza tarihine dikkat — avukat hazır bulunabilir.
3. **Delil koruma:** CCTV kayıtları, bakım / kontrol defterleri, vardiya çizelgeleri — imha edilmemesi için yazılı talimat.
4. **İşveren vekili tespiti:** Cezai sorumluluk zinciri — TCK m. 85 (taksirle ölüm), m. 89 (taksirle yaralanma) + İşK m. 105 (idari para cezası).
5. **Sigorta bildirimi:** İşveren sorumluluk sigortası + ferdi kaza sigortası → poliçe bildirim süresini kontrol et.
6. **Yüklenici/alt işveren:** 4857 m. 2 asıl işveren-alt işveren zinciri riski → alt işverenin ihmali asıl işverene yüklenebilir.

---

### FAZ 3 — 0–72 SAAT: Hukuki Değerlendirme

**Üçlü Paralel Risk Matrisi:**

| Risk Türü | Yasal Dayanak | Olası Yaptırım | Aciliyet |
|---|---|---|---|
| Cezai (bireysel) | TCK m. 85/89, İşK m. 105 | Hapis + para cezası | 🔴 |
| Tazminat (hukuki) | BK m. 49, İşK m. 21, 6331 m. 14 | Maddi + manevi tazminat | 🔴 |
| İdari | ÇSGB denetim, SGK, EPDK (enerji) | Para cezası, faaliyet durdurma | 🟠 |

**Risk faktörleri:**
- Ekipman bakım kaydı eksikliği → 🔴
- İSG eğitimi belgesi eksikliği → 🔴
- İSG uzmanı atama kaydı yok → 🟠
- KKD (kişisel koruyucu donanım) teslim belgesi yok → 🔴
- Benzer önceki olay kaydı var → 🔴 (ihmal karine derecesine çıkabilir)

---

### Kontrol Listesi Özeti

- [ ] Kaza yeri korundu
- [ ] ÇSGB/müfettiş bildirimi yapıldı (≤3 iş günü)
- [ ] SGK e-bildirimi yapıldı (≤3 iş günü)
- [ ] KAP açıklama değerlendirmesi yapıldı
- [ ] Tanık ifadeleri alındı
- [ ] Sigorta bildirimi yapıldı
- [ ] Ceza avukatı bilgilendirildi (ağır yaralanma/ölümde)
- [ ] Çalışma durdurma emri riski değerlendirildi

---

**⚠️ Taslaktır — İSG uzmanı + ceza avukatı incelemesi gerekir.**
`,
    },

    // -------------------------------------------------------------------------
    // 4. TR M&A KAPANIS KONTROL LİSTESİ
    // -------------------------------------------------------------------------
    {
        id: "arthurlegal-closing-checklist-tr",
        title: "TR M&A Kapanış Kontrol Listesi — A.Ş. Devralması",
        prompt_md: `## Türk Hukuku — M&A Kapanış Kontrol Listesi

Yüklenen işlem belgelerini ve şirkete ilişkin bilgileri incele.
Kapanış öncesi tamamlanması gereken aksiyonları kategorize et.
**Çıktıyı inline ver; opsiyonel DOCX için kullanıcıya sor.**

---

### 1. Kurumsal Onaylar (TTK m. 134–209)

| # | Aksiyon | Yasal Dayanak | Sorumlu | Durum |
|---|---|---|---|---|
| 1 | Hedef YK devir onay kararı | TTK m. 374 | Hedef YK | |
| 2 | Alıcı YK/GK onay kararı (eşik varsa) | TTK m. 408 + esas sözleşme | Alıcı YK | |
| 3 | Esas sözleşme devir kısıtlaması kontrolü | TTK m. 490 | Hukuk | |
| 4 | Pay defteri devir kaydı | TTK m. 499 | Şirket | |
| 5 | Hamiline yazılı senetlerde MKK kaydı | TTK m. 489/A | MKK | |
| 6 | Sözleşme devir bildirimleri (consent / notice) | SPA ilgili madde | Hukuk | |

---

### 2. Düzenleyici Onaylar

| # | Onay | Eşik / Koşul | Süre | Durum |
|---|---|---|---|---|
| 1 | **Rekabet Kurumu** birleşme/devralma izni | Yıllık ciro >100M TL (2024 eşiği) veya pazar payı eşiği | 30 iş günü + uzatma | |
| 2 | **SPK** — Hedef halka açık şirket ise | SPK Tebliği II-26.1 | Kamuoyu açıklaması + izin | |
| 3 | **Bankacılık:** BDDK onayı | Banka/finansal kurum hedef ise | 60 gün | |
| 4 | **Enerji:** EPDK lisans devir onayı | Lisanslı enerji şirketi ise | 6446 m. 9 | |
| 5 | **Yabancı yatırım:** TCMB bildirim | Yabancı alıcı ise | 30 gün | |

---

### 3. Vergi Yükümlülükleri

| # | Aksiyon | Yasal Dayanak | Oran | Durum |
|---|---|---|---|---|
| 1 | Pay devri damga vergisi | DVK Bant IV | Binde 7,5 | |
| 2 | Kurumlar vergisi etkisi (sermaye kazancı) | KVK m. 5 iştirak istisnası | %0 (varsa istisna) / %25 | |
| 3 | KDV muafiyeti (tam hisse devri) | KDVK m. 17/4-g | Muaf | |
| 4 | Transfer fiyatlandırması (grup içi ise) | KVK m. 13 | — | |
| 5 | İlişkili taraf bildirimi (KVK m. 13) | — | — | |

---

### 4. İşgücü / İK

| # | Aksiyon | Yasal Dayanak | Durum |
|---|---|---|---|
| 1 | 4857 m. 6 işyeri devri bildirimi | İşçi + sendika bildirimi | |
| 2 | TİS (toplu iş sözleşmesi) varsa sendika bildirimi | 6356 TİSGLK m. 19 | |
| 3 | Kilit personel retention / non-compete kontrol | TBK m. 444–447 | |

---

### 5. Kapanış Sonrası (Post-Closing)

| # | Aksiyon | Süre | Durum |
|---|---|---|---|
| 1 | Ticaret Sicil tescil + ilan | 15 gün (TTK m. 36) | |
| 2 | KAP açıklaması (hedef/alıcı halka açık ise) | Aynı gün | |
| 3 | VERBİS güncellemesi (veri sorumlusu değişikliği) | 30 gün | |
| 4 | SPA representations doğrulama | Closing date | |
| 5 | Hesaplama (Net Working Capital / tazminat) | SPA takvimi | |

---

**⚠️ Taslaktır — M&A avukatı ve vergi müşaviri incelemesi gerekir.**
`,
    },

    // -------------------------------------------------------------------------
    // 5. TRANSFER FİYATLANDIRMASI RİSK TARAMASI
    // -------------------------------------------------------------------------
    {
        id: "arthurlegal-transfer-pricing",
        title: "Transfer Fiyatlandırması Risk Taraması (KVK m.13 + OECD)",
        prompt_md: `## Transfer Fiyatlandırması Risk Taraması

Yüklenen sözleşme(ler) ve işlem bilgilerini KVK m.13 + OECD TPG çerçevesinde değerlendir.
**Çıktıyı inline ver.**

---

### Adım 1 — İlişkili Taraf Tespiti (KVK m.13/f.2)

| Taraf | İlişki Türü | Kontrol Yüzdesi | İlişkili Taraf mı? |
|---|---|---|---|
| | | | |
| | | | |

**İlişkili taraf kriterleri (KVK m.13):**
- Sermayede >%10 doğrudan / dolaylı pay
- Oy hakkında >%10 kontrol
- Yönetim kurulunda çoğunluk atama yetkisi
- Ortak üst şirket (kardeş şirket dahil)

---

### Adım 2 — İşlem Analizi

| İşlem | Miktar (TL/USD) | Yön | Yöntem Uygunluğu | Risk |
|---|---|---|---|---|
| | | | | |

**OECD uyumlu transfer fiyatlandırması yöntemleri:**
- **CUP** (Karşılaştırılabilir Kontrol Dışı Fiyat) — Emtia / standart hizmetler için ideal
- **RPM** (Yeniden Satış Fiyatı) — Distribütör yapıları için
- **Cost-Plus** — Üretim / hizmet şirketleri için
- **TNMM** (Net Marj) — Rutin fonksiyon şirketleri için
- **Kâr Bölüşüm** — Benzersiz değerli varlıklar / entegre işlemler için

---

### Adım 3 — Dokümantasyon Kontrolü (KVK m.13/f.4 + Tebliğ 1 Seri No'lu)

| Belge | Zorunlu mu? | Mevcut mu? | Risk |
|---|---|---|---|
| Yıllık Transfer Fiyatlandırması Raporu | >13 Milyon TL | | |
| Ülke Bazlı Rapor (CbCR) | Konsolide ciro >750M EUR | | |
| Ana Dosya (Master File) | >750M EUR grup cirosu | | |
| Yerel Dosya (Local File) | >13M TL ilişkili işlem | | |
| Peşin Fiyatlandırma Anlaşması (APA) | İsteğe bağlı (5 yıl) | | |

---

### Adım 4 — Risk Değerlendirmesi

| Risk Faktörü | Seviye | Gerekçe |
|---|---|---|
| Emsalsiz / piyasa fiyatı dışı işlem | 🔴/🟡/🟢 | |
| Dokümantasyon eksikliği | | |
| Çapraz sınır indirim kullanımı (kar transferi şüphesi) | | |
| GİB özelge uyumsuzluğu | | |
| BEPS riski (Base Erosion & Profit Shifting) | | |

**Yaptırım:** KVK m.13/f.7 — emsale aykırı bedel farkı dağıtılmış kâr sayılır → %25 KV + gecikme faizi + vergi ziyaı cezası.

---

### Adım 5 — Öneriler

1. Yüksek riskli işlemler için: emsallere uygun fiyat analizi + danışman raporu
2. Dokümantasyon eksikliği için: rapor tamamlama takvimi
3. APA başvurusu uygunluk değerlendirmesi
4. GİB özelge talebi önerisi (varsa belirsizlik)

---

**⚠️ Taslaktır — Vergi müşaviri ve transfer fiyatlandırması uzmanı incelemesi gerekir.**
`,
    },
];
