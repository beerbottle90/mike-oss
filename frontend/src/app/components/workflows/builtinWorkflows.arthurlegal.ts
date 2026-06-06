/**
 * mike-oss × ArthurLegal v2.0.0 — Frontend Built-in Workflow Tanımları (17 workflow)
 *
 * 12 plugin alanı: commercial, corporate, employment, privacy,
 * regulatory, ip, litigation, tax, administrative, energy-finance,
 * criminal-defense, firm-operations
 *
 * Kaynak: ArthurLegal v1.2.0
 * https://github.com/beerbottle90/ArthurLegal
 */

import type { MikeWorkflow } from "../shared/types";

export const ARTHURLEGAL_BUILT_IN_WORKFLOWS: MikeWorkflow[] = [

    // =========================================================================
    // COMMERCIAL-LEGAL
    // =========================================================================

    {
        id: "arthurlegal-nda-triage-tr",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "NDA Triaj — TR Hukuku (GREEN / YELLOW / RED)",
        type: "assistant",
        practice: "Ticari Sözleşme (TR)",
        columns_config: null,
        prompt_md:
            "## NDA Triaj — Türk Hukuku\n\n" +
            "Yüklenen NDA belgesini TBK m.27 · TTK m.51 · 6698 KVKK · DVK çerçevesinde değerlendir. " +
            "Mutual/one-way ayrımı, süre uygunluğu (≤3 yıl=🟢 / >5 yıl=🔴), yönetim hukuku, " +
            "rekabet yasağı, KVKK boyutu, yaptırım riski, damga vergisi ve tahkim dengesi için " +
            "🔴 Bloklayıcı / 🟠 Yüksek / 🟡 Orta / 🟢 Piyasa standardı ata. " +
            "🔴 bulgular için redline önerisi, 🟡 bulgular için alternatif dil sun. " +
            "**⚠️ Taslaktır — Avukat incelemesi gerekir.**",
    },

    {
        id: "arthurlegal-msa-review-tr",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "MSA / Çerçeve Sözleşme Triajı — TR Hukuku",
        type: "assistant",
        practice: "Ticari Sözleşme (TR)",
        columns_config: null,
        prompt_md:
            "## MSA / Çerçeve Hizmet Sözleşmesi Triajı — Türk Hukuku\n\n" +
            "Yüklenen MSA veya çerçeve sözleşmeyi analiz et: kapsam belirsizliği, tazminat tavanı (TBK m.115), " +
            "mutual indemnity dengesi, değişiklik kontrolü, fesih (TBK m.408-410), fikri mülkiyet sahipliği (6769 SMK), " +
            "gizlilik süresi, devir yasağı, damga vergisi (DVK), TTK m.5/A arabuluculuk şartı. " +
            "Her madde için 🔴/🟠/🟡/🟢 ata; 🔴 bulgular için spesifik redline öner. " +
            "**⚠️ Taslaktır — Avukat incelemesi gerekir.**",
    },

    // =========================================================================
    // CORPORATE-LEGAL
    // =========================================================================

    {
        id: "arthurlegal-closing-checklist-tr",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "TR M&A Kapanış Kontrol Listesi — A.Ş. Devralması",
        type: "assistant",
        practice: "Kurumsal / M&A (TR)",
        columns_config: null,
        prompt_md:
            "## Türk Hukuku — M&A Kapanış Kontrol Listesi\n\n" +
            "Yüklenen işlem belgelerini incele. Kapanış aksiyonlarını 5 kategoride sun: " +
            "(1) Kurumsal onaylar — TTK m.374/408/499/489A · MKK kaydı; " +
            "(2) Düzenleyici onaylar — Rekabet Kurumu (>100M TL, 30 iş günü) · SPK · BDDK · EPDK (6446 m.9) · TCMB; " +
            "(3) Vergi — pay devri damga vergisi (DVK Bant IV binde 7,5) · KVK m.5 · KDVK m.17/4-g · KVK m.13; " +
            "(4) İşgücü — 4857 m.6 · 6356 m.19 · TBK m.444-447; " +
            "(5) Kapanış sonrası — ticaret sicil (15 gün) · KAP · VERBİS (30 gün). " +
            "**⚠️ Taslaktır — M&A avukatı + vergi müşaviri incelemesi gerekir.**",
    },

    // =========================================================================
    // EMPLOYMENT-LEGAL
    // =========================================================================

    {
        id: "arthurlegal-employment-contract-tr",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "İstihdam Sözleşmesi İncelemesi — 4857 + TBK Uyum",
        type: "assistant",
        practice: "İş Hukuku (TR)",
        columns_config: null,
        prompt_md:
            "## İstihdam Sözleşmesi İncelemesi — Türk İş Hukuku\n\n" +
            "Yüklenen sözleşmeyi 4857 İş Kanunu + TBK m.393-447 çerçevesinde analiz et. " +
            "İstihdam türü tespiti (işçi/bağımsız/danışman — fake freelancer riski), " +
            "kritik maddeler: ücret · çalışma süresi (≤45 saat/hafta İşK m.63) · fazla mesai · " +
            "rekabet yasağı (TTK m.51/TBK m.444-447) · gizlilik · ihbar süresi (İşK m.17) · " +
            "deneme süresi (≤2 ay İşK m.15) · KVKK çalışan verisi. " +
            "Her madde için risk seviyesi + kıdem tazminatı hesabı + aylık işveren maliyeti. " +
            "**⚠️ Taslaktır — İş hukuku avukatı incelemesi gerekir.**",
    },

    {
        id: "arthurlegal-termination-package-tr",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "Fesih Paketi Hesaplama — 4857 m.17-21",
        type: "assistant",
        practice: "İş Hukuku (TR)",
        columns_config: null,
        prompt_md:
            "## İşçi Fesih Paketi Hesaplama — 4857 İş Kanunu\n\n" +
            "Çalışan bilgilerini (işe başlama · fesih tarihi · brüt ücret · fesih türü) girerek hesapla: " +
            "(1) Kıdem tazminatı (1475 m.14 — her tam yıl 30 günlük brüt ücret, tavan kontrolü, GVK m.25/7 muafiyeti); " +
            "(2) İhbar tazminatı (4857 m.17 kıdeme göre 2-8 hafta); " +
            "(3) Kullanılmayan yıllık izin ücreti (4857 m.59); " +
            "(4) Geçersiz fesih riski — 30+ işçi + 6+ ay kıdem → işe iade + 4-8 ay tazminat (m.18-21); " +
            "(5) SGK/GV yükümlülükleri tablosu. " +
            "**⚠️ Taslaktır — İş hukuku avukatı incelemesi gerekir.**",
    },

    {
        id: "arthurlegal-isg-incident",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "İSG Olay Müdahalesi — 0/1/24/72 Saat Runbook",
        type: "assistant",
        practice: "İş Hukuku (TR)",
        columns_config: null,
        prompt_md:
            "## İSG İş Kazası / Meslek Hastalığı Müdahale Runbook\n\n" +
            "Yüklenen olay raporunu incele. BIST listeli şirketler için KAP kontrolü dahildir.\n\n" +
            "FAZ 0: Olay profili (tarih/yer/yaralı/BIST/yüklenici/SGK).\n" +
            "FAZ 1 (0-1 saat): Delil koruma · kolluk bildirimi (ölüm/ağır → TCK m.85/89) · " +
            "ÇSGB bildirimi ≤3 iş günü (İSGK 6331 m.14) · SGK e-bildirimi ≤3 iş günü (5510 m.13) · KAP kontrolü.\n" +
            "FAZ 2 (0-24 saat): İç soruşturma · tanık ifadeleri · sigorta bildirimi.\n" +
            "FAZ 3 (0-72 saat): Üçlü risk matrisi — cezai (TCK m.85/89) · tazminat (BK m.49) · idari (ÇSGB/SGK).\n\n" +
            "**⚠️ Taslaktır — İSG uzmanı + ceza avukatı incelemesi gerekir.**",
    },

    // =========================================================================
    // PRIVACY-LEGAL
    // =========================================================================

    {
        id: "arthurlegal-kvkk-dsar",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "KVKK DSAR Yanıtı — Veri Sahibi Başvurusu (m.11)",
        type: "assistant",
        practice: "KVKK / Gizlilik",
        columns_config: null,
        prompt_md:
            "## KVKK m.11 — Veri Sahibi Başvurusu Yanıt Taslağı\n\n" +
            "Yüklenen DSAR başvurusunu değerlendir: hangi m.11 hakkı (bilgi/erişim/düzeltme/silme/itiraz/zarar), " +
            "kimlik teyidi, 30 günlük süre, m.28 istisnası uygulanabilirliği. " +
            "Şirket antetli yanıt taslağı yaz: tam kabul / kısmi kabul (m.28 gerekçeli) / red. " +
            "Her durumda KVK Kurulu'na itiraz hakkını belirt (m.14 — 30 gün). " +
            "Kontrol noktaları: kimlik teyidi · VERBİS log · DPO onayı · üçüncü taraf aktarımı. " +
            "**⚠️ Taslaktır — Avukat / DPO incelemesi gerekir.**",
    },

    {
        id: "arthurlegal-kvkk-dpia",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "KVKK DPIA — Veri Koruma Etki Analizi",
        type: "assistant",
        practice: "KVKK / Gizlilik",
        columns_config: null,
        prompt_md:
            "## KVKK Veri Koruma Etki Analizi (DPIA)\n\n" +
            "Yüklenen işleme faaliyetini KVKK + GDPR Art.35 karşılaştırmalı çerçevede değerlendir. " +
            "DPIA zorunluluğu testi (profilleme/hassas veri/büyük ölçek/biyometri). " +
            "İşleme faaliyeti tanımı: veri kategorileri · veri sahipleri · amaç · hukuki dayanak (m.5/m.6) · " +
            "aktarım · saklama · güvenlik önlemleri. " +
            "Risk matrisi: yetkisiz erişim · veri ihlali · amaç dışı kullanım · yurt dışı aktarım. " +
            "Her 🔴/🟡 risk için azaltma planı + DPO danışma + KVK Kurul önceden danışma (gerekiyorsa). " +
            "**⚠️ Taslaktır — DPO + KVKK uzmanı incelemesi gerekir.**",
    },

    {
        id: "arthurlegal-kvkk-cross-border",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "Sınır Ötesi Veri Transferi — KVKK m.9 Analizi",
        type: "assistant",
        practice: "KVKK / Gizlilik",
        columns_config: null,
        prompt_md:
            "## Sınır Ötesi Kişisel Veri Transferi — KVKK m.9 Analizi\n\n" +
            "Yüklenen sözleşme/işleme faaliyetini 6698 KVKK m.9 kapsamında değerlendir. " +
            "Alıcı ülke yeterlilik kararı var mı? Yoksa alternatif mekanizma: " +
            "açık rıza (m.9/1-a) · sözleşme gerekliliği (m.9/1-b) · BCR (m.9/5) · taahhütname+KVK Kurul izni (m.9/3). " +
            "AB GDPR SCCs ile karşılaştırmalı değerlendirme. " +
            "Risk matrisi: uyum eksikliği · alıcı ülke yaptırım riski · hassas veri (m.6) · GDPR çift rejim. " +
            "Uyum planı: eksik mekanizma tamamlama · DPA güncelleme · KVK Kurul başvurusu. " +
            "**⚠️ Taslaktır — KVKK uzmanı + DPO incelemesi gerekir.**",
    },

    // =========================================================================
    // REGULATORY-LEGAL
    // =========================================================================

    {
        id: "arthurlegal-competition-filing-tr",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "Rekabet Kurumu Bildirim Değerlendirmesi",
        type: "assistant",
        practice: "Regülasyon (TR)",
        columns_config: null,
        prompt_md:
            "## Rekabet Kurumu Bildirim Değerlendirmesi — 4054 Sayılı Kanun\n\n" +
            "Yüklenen işlemi 4054 Rekabet Kanunu çerçevesinde değerlendir. " +
            "Bildirim eşiği: tarafların Türkiye ciro toplamı >100M TL + en az 2 tarafın ayrı ayrı Türkiye cirosu >30M TL (Tebliğ 2010/4). " +
            "Bildirim gerekiyorsa: Form CO paketi · pazar tanımı · HHI analizi · süre (30 iş günü). " +
            "Hâkim durum riski (4054 m.6): birleşme sonrası pazar payı >40%? " +
            "HHI değerlendirmesi: <1000=düşük / 1000-1800=orta / >1800=yüksek. " +
            "Öneriler: ön görüşme talebi · taahhüt paketi · ekonomik analiz. " +
            "**⚠️ Taslaktır — Rekabet hukuku uzmanı incelemesi gerekir.**",
    },

    // =========================================================================
    // IP-LEGAL
    // =========================================================================

    {
        id: "arthurlegal-trademark-strategy-tr",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "Marka Araştırma + Tescil Stratejisi — 6769 SMK",
        type: "assistant",
        practice: "FSH / IP (TR)",
        columns_config: null,
        prompt_md:
            "## Marka Araştırma ve Tescil Stratejisi — 6769 Sınai Mülkiyet Kanunu\n\n" +
            "Tescil edilmek istenen markayı 6769 SMK çerçevesinde değerlendir. " +
            "Tescil edilemezlik riskleri: tanımlayıcılık/jeneriklik (m.5/1-b) · karıştırılma ihtimali (m.6) · " +
            "coğrafi işaret çakışması · kamu ahlakı/yanıltıcılık · tanınmış marka saldırısı (m.6/4). " +
            "TÜRKPATENT yolu: başvuru → yayın (≈2-3 ay) → 2 aylık itiraz → tescil (10 yıl). " +
            "Madrid Protokolü (uluslararası genişleme). " +
            "Sıradaki adımlar: TÜRKPATENT ön araştırma · coğrafi genişleme · ihlal izleme · lisans/devir stratejisi. " +
            "**⚠️ Taslaktır — Marka vekili incelemesi gerekir.**",
    },

    // =========================================================================
    // LITIGATION-LEGAL
    // =========================================================================

    {
        id: "arthurlegal-enforcement-iik-tr",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "İcra Takibi Başlatma Kontrol Listesi — İİK",
        type: "assistant",
        practice: "Dava Yönetimi (TR)",
        columns_config: null,
        prompt_md:
            "## İcra Takibi Başlatma — İcra ve İflas Kanunu\n\n" +
            "Yüklenen alacak belgelerini incele. İcra stratejisi üret. " +
            "Alacak profili: tür (senetle/senetsiz/ilamlı) · tutar · vadesi · borçlu türü · zamanaşımı. " +
            "Takip türü seçimi: ilamlı (İİK m.32) · ilamsız genel (m.42) · kambiyo (m.167 — bono/çek/poliçe, 5 günlük itiraz) · ihtiyati haciz (m.257). " +
            "İlamsız takip akışı: ödeme emri → borçlu 7 günlük itiraz (m.62) → itirazın iptali (m.67) veya kaldırılması (m.68) → haciz. " +
            "Haciz stratejisi: taşınır/taşınmaz/banka/ücret/pay. " +
            "Masraf: icra harcı %4,55 + vekâlet + tebligat. " +
            "**⚠️ Taslaktır — İcra avukatı incelemesi gerekir.**",
    },

    // =========================================================================
    // ADMINISTRATIVE-LEGAL
    // =========================================================================

    {
        id: "arthurlegal-iyuk-petition-tr",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "İYUK İdari Dava Süre + Dilekçe Hazırlığı",
        type: "assistant",
        practice: "İdare Hukuku (TR)",
        columns_config: null,
        prompt_md:
            "## İdare Mahkemesi Davası — İYUK Süre ve Strateji\n\n" +
            "Yüklenen idari işlemi incele. Dava stratejisi sun.\n\n" +
            "**Kritik süreler (hak düşürücü):**\n" +
            "- Genel idari işlem: 60 gün (İYUK m.7)\n" +
            "- Vergi davası: 30 gün (İYUK m.7 + VUK m.377)\n" +
            "- ÇED kararı: 30 gün ivedi — BİM yok, Danıştay temyiz 15 gün (İYUK m.20/A)\n" +
            "- Tam yargı (tazminat) davası: 1 yıl (İYUK m.13)\n\n" +
            "İdareye ön başvuru (İYUK m.11): 60 günlük sessiz red sonrası dava aç.\n" +
            "Yetki mahkemesi: İdare Mah. → BİM → Danıştay (3 dereceli idari yargı).\n" +
            "Dilekçe unsurları: davacı/davalı · işlem türü · ihlal edilen norm · iptal/tam yargı talebi · yürütmeyi durdurma.\n\n" +
            "**⚠️ Taslaktır — İdare hukuku avukatı incelemesi gerekir.**",
    },

    // =========================================================================
    // TAX-LEGAL
    // =========================================================================

    {
        id: "arthurlegal-transfer-pricing",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "Transfer Fiyatlandırması Risk Taraması (KVK m.13 + OECD)",
        type: "assistant",
        practice: "Vergi Hukuku (TR)",
        columns_config: null,
        prompt_md:
            "## Transfer Fiyatlandırması Risk Taraması\n\n" +
            "KVK m.13 + OECD TPG çerçevesinde değerlendir.\n\n" +
            "İlişkili taraf tespiti: sermayede >%10 · oy hakkında >%10 · YK çoğunluk atama · ortak üst şirket.\n\n" +
            "Her işlem için: tutar · yön · uygun yöntem (CUP/RPM/Cost-Plus/TNMM/Kâr Bölüşüm) · 🔴/🟡/🟢 risk.\n\n" +
            "Dokümantasyon eşikleri: Yıllık TP Raporu (>13M TL) · CbCR (>750M EUR grup ciro) · Ana Dosya · Yerel Dosya · APA.\n\n" +
            "Risk faktörleri: emsalsiz işlem · dokümantasyon eksikliği · çapraz sınır kar transferi · GİB özelge uyumsuzluğu · BEPS.\n\n" +
            "Yaptırım: KVK m.13/f.7 → %25 KV + gecikme faizi + vergi ziyaı cezası.\n\n" +
            "**⚠️ Taslaktır — Vergi müşaviri + TP uzmanı incelemesi gerekir.**",
    },

    // =========================================================================
    // ENERGY-FINANCE
    // =========================================================================

    {
        id: "arthurlegal-epdk-license-transfer",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "EPDK Lisans Devir Kontrol Listesi — 6446 m.9",
        type: "assistant",
        practice: "Enerji Hukuku (TR)",
        columns_config: null,
        prompt_md:
            "## EPDK Enerji Lisansı Devir Kontrol Listesi — 6446 Elektrik Piyasası Kanunu m.9\n\n" +
            "Yüklenen enerji M&A işlem belgelerini incele.\n\n" +
            "Lisans profili: tür (üretim/dağıtım/tedarik/iletim/OSB) · lisans numarası · kapasite · devir yapısı (pay/lisans).\n\n" +
            "EPDK koşulları: pay devrinde %10 eşik → EPDK onayı · doğrudan lisans devrinde ön izin · teknik+mali yeterlilik. Süre: 30 iş günü.\n\n" +
            "Düzenleyici çakışmalar: Rekabet Kurumu (>100M TL) · SPK (halka açık) · TCMB (yabancı alıcı).\n\n" +
            "Kritik riskler: lisans devir yasağı maddesi · yatırım taahhüdü devri · ÇED koşulları · bağlantı anlaşması.\n\n" +
            "Kapanış sonrası: kapasite taahhüdü güncelleme · ticaret sicil · VERBİS · KAP.\n\n" +
            "**⚠️ Taslaktır — Enerji hukuku + düzenleyici uzmanı incelemesi gerekir.**",
    },

    // =========================================================================
    // CRIMINAL-DEFENSE (LawFirm)
    // =========================================================================

    {
        id: "arthurlegal-cmk-detention-runbook",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "CMK 48 Saat Gözaltı Müdahale Runbook",
        type: "assistant",
        practice: "Ceza Hukuku (TR)",
        columns_config: null,
        prompt_md:
            "## CMK Gözaltı Müdahale Runbook — 48 Saat Avukat Protokolü\n\n" +
            "FAZ 0 (0-2 saat): Gözaltı yerini tespit · CMK m.154 izole görüşme · yakınlara bildirim (CMK m.95) · suç isnadı tespiti.\n\n" +
            "FAZ 1 (2-24 saat):\n" +
            "- Müvekkili susma hakkı konusunda bilgilendir (CMK m.147/e)\n" +
            "- Avukatsız ifade verme yok (CMK m.148)\n" +
            "- Dijital aygıt şifresi verme\n" +
            "- Gözaltı azami süre: 24 saat (toplu suçlarda uzatılabilir CMK m.91)\n\n" +
            "FAZ 2 (24-48 saat): Tutuklama kararı? → Sulh Ceza Hâkimliği (24 saat içinde karar CMK m.102).\n" +
            "Tutuklama itirazı: 7 gün içinde (CMK m.104). Adli kontrol alternatifi (CMK m.109).\n\n" +
            "Ek riskler: yurt dışı çıkış yasağı · mal varlığı dondurma (MASAK + TCK m.282) · TCK m.30 hata savunması.\n\n" +
            "**⚠️ Baroya kayıtlı ceza avukatı yönlendirmesi şarttır.**",
    },

    // =========================================================================
    // FIRM-OPERATIONS (LawFirm)
    // =========================================================================

    {
        id: "arthurlegal-new-client-intake",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "Yeni Müvekkil Kabul + Çatışma + MASAK KYC",
        type: "assistant",
        practice: "Büro Operasyonları (TR)",
        columns_config: null,
        prompt_md:
            "## Yeni Müvekkil Kabul Prosedürü — Avukatlık K. + 5549 MASAK\n\n" +
            "Adım 1 — Çatışma kontrolü (Av. K. m.38): mevcut/eski müvekkillerle çakışma · karşı taraf çakışması · personel bildirimi. Çatışma varsa → ret + yazılı bildirim.\n\n" +
            "Adım 2 — MASAK KYC (5549 Sayılı Kanun):\n" +
            "- Gerçek kişi: nüfus cüzdanı (canlı teyit) + ikametgâh\n" +
            "- Tüzel kişi: ticaret sicil + imza sirküleri + vergi levhası + %25+ pay sahibi nihai faydalanan sahip\n" +
            "- Şüpheli işlem → MASAK otomatik bildirim (5549 m.4)\n\n" +
            "Adım 3 — Ücret sözleşmesi (Av. K. m.164/A): yazılı + imzalı · iş tanımı · ücret KDV dahil/hariç · ödeme planı · fatura yükümlülüğü.\n\n" +
            "Adım 4 — Görevlendirme: engagement letter · iş dosyası · vekaletname türü · TTK m.5/A arabuluculuk kontrolü.\n\n" +
            "**⚠️ MASAK KYC formunu büronuzun uyum politikasına göre özelleştirin.**",
    },
];
