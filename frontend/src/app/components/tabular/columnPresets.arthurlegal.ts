/**
 * mike-oss × ArthurLegal v2.0.0 — Column Presets (22 preset)
 *
 * TR Hukuku + Çok Yargılı (UK/US/DE/FR/EU) + İstihdam + IP + Uyum
 *
 * Kaynak: ArthurLegal v1.2.0 — 12 plugin haritası
 * https://github.com/beerbottle90/ArthurLegal
 */

import type { ColumnFormat } from "../shared/types";

export interface ColumnPreset {
    name: string;
    matches: RegExp;
    prompt: string;
    format: ColumnFormat;
    tags?: string[];
}

export const ARTHURLEGAL_PROMPT_PRESETS: ColumnPreset[] = [

    // =========================================================================
    // TÜRK HUKUKU — YÖNETİM HUKUKU & VERGİ
    // =========================================================================

    {
        name: "Yönetim Hukuku",
        matches: /\byönetim\s+hukuku\b|\bgoverning\s+law\s+\(TR\)\b/i,
        format: "text",
        prompt:
            'Bu sözleşmenin yönetim hukukunu belirle. Kısa biçimde yaz, örn. "Türk Hukuku (TBK)", ' +
            '"İngiliz Hukuku (English Law)", "New York Hukuku". ' +
            "Türk hukuku seçildiyse TBK m.24 geçersizlik riski var mı? Not et. Başka metin ekleme.",
        tags: ["TR"],
    },

    {
        name: "Damga Vergisi",
        matches: /\bdamga\s+vergisi\b|\bstamp\s+duty\b/i,
        format: "text",
        prompt:
            "Bu sözleşmenin Türk hukuku kapsamında damga vergisine tabi olup olmadığını belirle. " +
            "Tabi ise: sözleşme türü, DVK Bant'ı ve oran. " +
            "Muaf ise: DVK m.9 veya özel kanun kapsamındaki muafiyet sebebi. " +
            "Format: 'DVK Bant IV — Binde 7,5 — Tahmini matrah: [tutar]' veya 'Muaf — [gerekçe]'.",
        tags: ["TR", "Vergi"],
    },

    {
        name: "Damga Vergisi Tutarı",
        matches: /\bdamga\s+vergisi\s+tutar\b|\bstamp\s+duty\s+amount\b/i,
        format: "text",
        prompt:
            "Bu sözleşme için ödenmesi gereken damga vergisi tutarını hesapla. " +
            "Sözleşme bedelini DVK ilgili banda göre çarp. " +
            "Sonuç: '₺12.500 (₺500.000 × Binde 25)'. " +
            "Bedel belirsizse: 'Bedel belirsiz — noter tescil tarifesi uygulanabilir' yaz.",
        tags: ["TR", "Vergi"],
    },

    // =========================================================================
    // TÜRK HUKUKU — GİZLİLİK / KVKK
    // =========================================================================

    {
        name: "KVKK / Kişisel Veri",
        matches: /\bkvkk\b|\bkişisel\s+veri\b|\bpersonal\s+data\b|\bgdpr\b/i,
        format: "text",
        prompt:
            "Bu sözleşmede kişisel veri işleme hükümlerini özetle: " +
            "(1) Kişisel veri kapsamı, " +
            "(2) İşleme amaçları ve hukuki dayanak (6698 m.5 veya m.6), " +
            "(3) Veri aktarımı — yurt içi/yurt dışı + 6698 m.9 uyumu, " +
            "(4) Saklama süresi, " +
            "(5) Güvenlik yükümlülükleri. " +
            "Eksik veya riskli alanları 🔴/🟡 ile işaretle.",
        tags: ["TR", "Gizlilik"],
    },

    // =========================================================================
    // TÜRK HUKUKU — TİCARİ / SÖZLEŞME
    // =========================================================================

    {
        name: "Tahkim Maddesi",
        matches: /\btahkim\b|\barbitration\b|\bistac\b|\bicc\b|\bunited\s+nations\b/i,
        format: "text",
        prompt:
            "Bu sözleşmedeki uyuşmazlık çözüm mekanizmasını özetle: " +
            "(1) Tahkim mi mahkeme mi? " +
            "(2) Kurum (ISTAC/ICC/LCIA/AAA/ad hoc), " +
            "(3) Tahkim yeri, " +
            "(4) Usul hukuku, " +
            "(5) Hakem sayısı ve dil. " +
            "TTK m.5/A zorunlu arabuluculuk ön şartı var mı? " +
            "Format: '3 hakemli ISTAC — İstanbul — Türk Hukuku — Türkçe'.",
        tags: ["TR", "Dava"],
    },

    {
        name: "Rekabet Yasağı",
        matches: /\brekabet\s+yasağı\b|\bnon.?compete\b|\bnon.?solicitation\b/i,
        format: "text",
        prompt:
            "Bu sözleşmedeki rekabet yasağı hükümlerini analiz et: " +
            "(1) Kapsam ve faaliyet türü, " +
            "(2) Coğrafi alan, " +
            "(3) Süresi, " +
            "(4) TTK m.51 uyumu (iş sözleşmesi: ≤2 yıl + coğrafi sınır + makul karşılık), " +
            "(5) TBK m.444-447 uyumu (hizmet sözleşmesi). " +
            "Aşırı geniş veya süresiz yasağı 🔴 ile işaretle.",
        tags: ["TR", "Ticari"],
    },

    {
        name: "Tazminat Tavanı",
        matches: /\btazminat\s+tavan\b|\bliability\s+cap\b|\bsorumluluk\s+sınır\b/i,
        format: "text",
        prompt:
            "Bu sözleşmedeki tazminat tavanı (liability cap) hükümlerini çıkar: " +
            "(1) Tavan tutarı veya çarpanı, " +
            "(2) Tavana tabi olmayan haller (fraud, kasıt, gizlilik ihlali), " +
            "(3) Dolaylı zarar hariç tutma maddesi var mı? " +
            "Format: 'Tavan: [tutar/formül] | İstisnalar: [liste] | Dolaylı zarar: Hariç/Dahil'.",
        tags: ["Ticari"],
    },

    {
        name: "Mücbir Sebep (TBK)",
        matches: /\bmücbir\s+sebep\b|\bforce\s+majeure\b/i,
        format: "text",
        prompt:
            "Bu sözleşmedeki mücbir sebep hükümlerini TBK çerçevesinde özetle: " +
            "(1) Mücbir sebep olarak sayılan olaylar, " +
            "(2) Bildirim yükümlülüğü ve süresi, " +
            "(3) Yükümlülüklerin askıya alınması, " +
            "(4) Uzun süreli mücbir sebep halinde fesih hakkı. " +
            "TBK m.136 (borcun imkânsızlığı) ile örtüşme değerlendirmesi yap.",
        tags: ["TR", "Ticari"],
    },

    {
        name: "Fesih Bildirimi",
        matches: /\bfesih\b|\btermination\s+notice\b|\bnotice\s+period\b/i,
        format: "text",
        prompt:
            "Bu sözleşmedeki fesih bildirim sürelerini listele: " +
            "(1) Olağan fesih bildirim süresi, " +
            "(2) Haklı nedenle fesih / derhal fesih hakkı, " +
            "(3) İhbar dönemindeki yükümlülükler, " +
            "(4) İş sözleşmesi ise 4857 m.17 ihbar süreleri uyumu. " +
            "Format: 'Olağan: [süre] | Haklı neden: Derhal/[süre] | İşK.m.17 uyumu: Evet/Hayır'.",
        tags: ["TR", "İş"],
    },

    {
        name: "Yaptırım Riski",
        matches: /\byaptırım\b|\bsanction\b|\bofac\b|\bkara\s+liste\b/i,
        format: "text",
        prompt:
            "Bu sözleşmedeki tarafları ve ülkeleri yaptırım riski açısından değerlendir: " +
            "(1) Taraf adları ve ülkeleri, " +
            "(2) OFAC / AB / UK OFSI / BM yaptırım rejimi temas noktaları, " +
            "(3) Yaptırım beyan ve garanti maddesi var mı? " +
            "Yüksek riskli taraf/ülke varsa 🔴 ile işaretle ve manuel OpenSanctions taraması öner.",
        tags: ["Uyum"],
    },

    // =========================================================================
    // ÇOK YARGILı — İNGİLİZ HUKUKU
    // =========================================================================

    {
        name: "English Law",
        matches: /\benglish\s+law\b|\benglish\s+governing\s+law\b|\buk\s+law\b/i,
        format: "text",
        prompt:
            "This agreement is governed by English law. Identify: " +
            "(1) Express governing law clause — English law confirmed? " +
            "(2) Jurisdiction — English courts / ICC / LCIA / ad hoc? " +
            "(3) Any Brexit-related jurisdiction or enforcement issues? " +
            "(4) Key English law concepts: implied terms (SGA 1979 / SGSA 1982), " +
            "Unfair Contract Terms Act 1977, limitation of liability provisions. " +
            "Flag any cross-border enforcement risk with Turkey or other non-UK jurisdictions.",
        tags: ["UK"],
    },

    {
        name: "New York Law",
        matches: /\bnew\s+york\s+law\b|\bny\s+law\b|\bnew\s+york\s+governing\b/i,
        format: "text",
        prompt:
            "This agreement is governed by New York law. Identify: " +
            "(1) Governing law clause — New York law confirmed? " +
            "(2) Dispute resolution — SDNY / EDNY / AAA / ICC / JAMS / ad hoc? " +
            "(3) UCC Article 2 applicability (goods)? " +
            "(4) Statute of frauds compliance (NY GOL § 5-703)? " +
            "(5) Limitation of liability — conspicuousness requirement. " +
            "Flag any recognition/enforcement risk in Turkey (New York Convention 1958).",
        tags: ["US"],
    },

    {
        name: "EU / AB Hukuku",
        matches: /\bab\s+hukuku\b|\beu\s+law\b|\beuropean\s+union\b|\bcjeu\b|\bregulation\s+eu\b/i,
        format: "text",
        prompt:
            "Identify EU law provisions in this agreement: " +
            "(1) Governing law — Rome I (Regulation 593/2008) choice? " +
            "(2) GDPR applicability (Art.3 territorial scope)? " +
            "(3) EU competition law — Art.101/102 TFEU issues? " +
            "(4) Product liability (Directive 85/374/EEC)? " +
            "(5) Consumer protection (Directive 2019/770 digital content)? " +
            "Flag any Turkish-EU dual compliance requirements.",
        tags: ["EU"],
    },

    // =========================================================================
    // İSTİHDAM
    // =========================================================================

    {
        name: "İstihdam Türü",
        matches: /\bistihdam\s+türü\b|\bemployment\s+type\b|\biş\s+ilişkisi\b/i,
        format: "text",
        prompt:
            "Bu sözleşmedeki istihdam ilişkisinin türünü tespit et: " +
            "(1) İşçi mi (4857 m.2 — denetim + bağımlılık + organizasyon unsurları)? " +
            "(2) Bağımsız danışman / serbest meslek erbabı mı (TBK m.393 eser/hizmet)? " +
            "(3) Sahte bağımsız çalışan (fake freelancer) riski var mı? " +
            "SGK zorunluluk tespiti + vergi rejimi (ücret/serbest meslek makbuzu/KDV). " +
            "Format: 'Tür: [işçi/danışman/karma] | Sahte freelancer riski: 🔴/🟡/🟢 | SGK: Zorunlu/İsteğe bağlı'.",
        tags: ["TR", "İş"],
    },

    {
        name: "Kıdem + İhbar",
        matches: /\bkıdem\s+tazminat\b|\bihbar\s+tazminat\b|\bseverance\b/i,
        format: "text",
        prompt:
            "Bu iş sözleşmesine göre yasal kıdem ve ihbar tazminatı hesabı yap: " +
            "Kıdem tazminatı: her tam yıl 30 günlük brüt ücret (1475 m.14 — tavan kontrolü). " +
            "İhbar tazminatı tablosu: 0-6 ay → 2 hafta / 6 ay-1,5 yıl → 4 hafta / 1,5-3 yıl → 6 hafta / 3 yıl+ → 8 hafta. " +
            "Format: 'Kıdem: ₺[tutar] ([yıl] yıl) | İhbar: ₺[tutar] ([hafta] hafta) | Toplam: ₺[tutar]'.",
        tags: ["TR", "İş"],
    },

    // =========================================================================
    // FİKRİ SINAI HAKLAR
    // =========================================================================

    {
        name: "Marka Hakkı",
        matches: /\bmarka\s+hakkı\b|\btrademark\b|\btrade\s+mark\b|\b6769\b/i,
        format: "text",
        prompt:
            "Bu sözleşmedeki marka hükümlerini özetle: " +
            "(1) Hangi markalar lisanslanıyor/devrediliyor? " +
            "(2) Lisans türü — münhasır mı / münhasır değil mi / alt lisans var mı? " +
            "(3) Coğrafi kapsam ve süre, " +
            "(4) Tescil durumu ve TÜRKPATENT/EUIPO numaraları (varsa), " +
            "(5) İhlal durumunda aksiyoner kim? " +
            "6769 SMK m.148 kapsamı altında değerlendir.",
        tags: ["TR", "IP"],
    },

    {
        name: "Açık Kaynak Lisansı",
        matches: /\baçık\s+kaynak\b|\bopen\s+source\b|\bfoss\b|\bgpl\b|\bmit\s+license\b/i,
        format: "text",
        prompt:
            "This agreement references open source software. Identify: " +
            "(1) OSS components and their licenses (GPL/LGPL/MIT/Apache/BSD/AGPL), " +
            "(2) Copyleft (viral) risk — does any GPL/AGPL component require proprietary code disclosure? " +
            "(3) Attribution requirements, " +
            "(4) Patent grant / patent retaliation clauses, " +
            "(5) Compatibility with the proprietary license in this agreement. " +
            "Flag 🔴 any strong copyleft contamination risk.",
        tags: ["IP"],
    },

    // =========================================================================
    // REKABET HUKUKU
    // =========================================================================

    {
        name: "Rekabet Hukuku",
        matches: /\brekabet\s+hukuku\b|\bcompetition\s+law\b|\bantitrust\b|\b4054\b/i,
        format: "text",
        prompt:
            "Bu sözleşmedeki rekabet hukuku risklerini değerlendir: " +
            "(1) Fiyat sabitleme / bölge paylaşımı / müşteri tahsisi (4054 m.4 / TFEU Art.101), " +
            "(2) Hâkim durumun kötüye kullanılması riski (4054 m.6 / TFEU Art.102), " +
            "(3) Bilgi paylaşımı riski (rakipler arası gizli bilgi değişimi), " +
            "(4) Dikey kısıtlamalar — münhasır bölge / RPM (yeniden satış fiyatı belirleme). " +
            "Rekabet Kurumu bildirim eşiği analizi: Türkiye ciro toplamı >100M TL. " +
            "Yüksek risk → 🔴",
        tags: ["TR", "Rekabet"],
    },

    // =========================================================================
    // ENERJİ / DÜZENLEYICI
    // =========================================================================

    {
        name: "Enerji Lisansı",
        matches: /\benerji\s+lisans\b|\bepdk\b|\b6446\b|\belectricity\s+license\b/i,
        format: "text",
        prompt:
            "Bu sözleşmedeki enerji lisansı hükümlerini özetle: " +
            "(1) Lisans türü (üretim/dağıtım/tedarik/iletim/OSB), " +
            "(2) Kapasite ve lisans geçerlilik tarihi, " +
            "(3) Devir/temlik koşulları (6446 m.9 EPDK onay eşiği %10), " +
            "(4) Yatırım taahhütleri ve cezai koşullar, " +
            "(5) ÇED gereklilikleri. " +
            "Format: 'Lisans türü: [tür] | Kapasite: [MW/m³] | Geçerlilik: [tarih] | Devir kısıtı: Var/Yok'.",
        tags: ["TR", "Enerji"],
    },

    // =========================================================================
    // GENEL UYUM
    // =========================================================================

    {
        name: "Sözleşme Değeri",
        matches: /\bsözleşme\s+değeri\b|\bcontract\s+value\b|\bsözleşme\s+bedeli\b/i,
        format: "text",
        prompt:
            "Bu sözleşmenin toplam değerini belirle: " +
            "(1) Toplam sözleşme bedeli (sabit ücret / birim fiyat × miktar / aylık), " +
            "(2) Para birimi ve döviz kuru riski, " +
            "(3) Opsiyonel uzatmalar dahil azami değer, " +
            "(4) Ödeme takvimi (peşin/taksit/milestone). " +
            "Format: '[Para birimi] [Tutar] — [Ödeme modeli] — [Toplam azami değer]'.",
        tags: ["Ticari"],
    },

    {
        name: "İdari Para Cezası",
        matches: /\bidari\s+para\s+cezası\b|\badministrative\s+fine\b|\bregulatory\s+penalty\b/i,
        format: "text",
        prompt:
            "Bu sözleşmede idari para cezası ve düzenleyici yaptırım hükümlerini belirle: " +
            "(1) İdari para cezasına konu yükümlülükler, " +
            "(2) Yetkili kurum (KVKK/Rekabet/EPDK/BDDK/SPK/ÇSGB), " +
            "(3) Azami ceza tavanı (güncel tarife), " +
            "(4) Sözleşmede taraflar arası ceza paylaşımı hükmü var mı? " +
            "Yüksek ceza riski taşıyan maddeler için 🔴 ile işaretle.",
        tags: ["TR", "Uyum"],
    },
];
