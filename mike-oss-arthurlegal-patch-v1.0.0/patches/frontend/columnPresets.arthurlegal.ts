/**
 * mike-oss × ArthurLegal v1.0.0 — Türk Hukuku Column Presets
 *
 * Kurulum:
 *   frontend/src/app/components/tabular/columnPresets.ts dosyasına ekle:
 *
 *     import { ARTHURLEGAL_PROMPT_PRESETS } from "./columnPresets.arthurlegal";
 *     export const PROMPT_PRESETS: ColumnPreset[] = [
 *       ...existingPresets,
 *       ...ARTHURLEGAL_PROMPT_PRESETS,
 *     ];
 *
 * Kaynak: ArthurLegal v1.2.0 — commercial-legal + corporate-legal skills
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
    // -------------------------------------------------------------------------
    // Türkiye Yönetim Hukuku
    // -------------------------------------------------------------------------
    {
        name: "Yönetim Hukuku",
        matches: /\byönetim\s+hukuku\b|\bgoverning\s+law\s+\(TR\)\b/i,
        format: "text",
        prompt:
            'Bu sözleşmenin yönetim hukukunu belirle. Kısa biçimde yargı alanını yaz, örn. "Türk Hukuku (TBK)", "İngiliz Hukuku (English Law)", "New York Hukuku". ' +
            'Sözleşmede Türk hukuku seçildiyse ve hukuk seçimi maddesi TBK m. 24 kapsamında geçersizlik riski taşıyorsa bunu not et. ' +
            'Başka metin ekleme.',
        tags: ["TR"],
    },

    // -------------------------------------------------------------------------
    // Damga Vergisi Yükümlülüğü
    // -------------------------------------------------------------------------
    {
        name: "Damga Vergisi",
        matches: /\bdamga\s+vergisi\b|\bstamp\s+duty\b/i,
        format: "text",
        prompt:
            "Bu sözleşmenin Türk hukuku kapsamında damga vergisine tabi olup olmadığını belirle. " +
            "Tabi ise: sözleşme türünü (örn. kira, hizmet, kredi, hisse devri), DVK Bant'ını ve geçerli oranı yaz. " +
            "Muaf ise: DVK m.9 veya özel kanun kapsamındaki muafiyet sebebini belirt. " +
            "Format: 'DVK Bant IV — Binde 7,5 — Tahmini matrah: [tutar]' veya 'Muaf — [gerekçe]'.",
        tags: ["TR", "Vergi"],
    },

    // -------------------------------------------------------------------------
    // Damga Vergisi Tutarı
    // -------------------------------------------------------------------------
    {
        name: "Damga Vergisi Tutarı",
        matches: /\bdamga\s+vergisi\s+tutar\b|\bstamp\s+duty\s+amount\b/i,
        format: "text",
        prompt:
            "Bu sözleşme için ödenmesi gereken damga vergisi tutarını hesapla. " +
            "Hesaplama: Sözleşme bedelini DVK ilgili banda göre çarp. " +
            "Sonucu TL cinsinden yaz, örn. '₺12.500 (sözleşme bedeli ₺500.000 × Binde 25 = ₺12.500)'. " +
            "Bedel belirsizse 'Bedel belirsiz — noter tescil tarifesi uygulanabilir' yaz.",
        tags: ["TR", "Vergi"],
    },

    // -------------------------------------------------------------------------
    // KVKK / Kişisel Veri İşleme
    // -------------------------------------------------------------------------
    {
        name: "KVKK / Kişisel Veri",
        matches: /\bkvkk\b|\bkişisel\s+veri\b|\bpersonal\s+data\b|\bgdpr\b/i,
        format: "text",
        prompt:
            "Bu sözleşmede kişisel veri işleme hükümlerini özetle: " +
            "(1) Kişisel veri tanımı ve kapsamı, " +
            "(2) Veri işleme amaçları ve hukuki dayanağı (6698 m.5 veya m.6), " +
            "(3) Veri aktarımı (yurt içi / yurt dışı) ve 6698 m.9 uyumu, " +
            "(4) Veri saklama süresi, " +
            "(5) Veri güvenliği yükümlülükleri. " +
            "Eksik veya riskli alanları 🔴/🟡 ile işaretle.",
        tags: ["TR", "Gizlilik"],
    },

    // -------------------------------------------------------------------------
    // Tahkim / Uyuşmazlık Çözümü
    // -------------------------------------------------------------------------
    {
        name: "Tahkim Maddesi",
        matches: /\btahkim\b|\barbitration\b|\bistac\b|\bicc\b|\bunited\s+nations\b/i,
        format: "text",
        prompt:
            "Bu sözleşmedeki uyuşmazlık çözüm mekanizmasını özetle: " +
            "(1) Tahkim mi yoksa mahkeme mi? " +
            "(2) Kurum (ISTAC, ICC, LCIA, AAA, vs.) veya ad hoc, " +
            "(3) Tahkim yeri / oturma yeri, " +
            "(4) Uygulanacak usul hukuku, " +
            "(5) Hakem sayısı ve dil. " +
            "TTK m. 5/A zorunlu arabuluculuk ön şartı var mı? " +
            "Format: '3 hakemli ISTAC tahkimi — İstanbul — Türk Hukuku — Türkçe'.",
        tags: ["TR", "Dava"],
    },

    // -------------------------------------------------------------------------
    // Rekabet Yasağı
    // -------------------------------------------------------------------------
    {
        name: "Rekabet Yasağı",
        matches: /\brekabet\s+yasağı\b|\bnon.?compete\b|\bnon.?solicitation\b/i,
        format: "text",
        prompt:
            "Bu sözleşmedeki rekabet yasağı / non-compete hükümlerini analiz et: " +
            "(1) Yasağın kapsamı (faaliyet türü, coğrafi alan), " +
            "(2) Süresi, " +
            "(3) TTK m. 51 uyumluluğu (iş sözleşmesinde ≤2 yıl + coğrafi sınır + makul karşılık), " +
            "(4) TBK m. 444–447 uyumluluğu (hizmet sözleşmesi için). " +
            "Aşırı geniş veya süresiz yasağı 🔴 ile işaretle.",
        tags: ["TR", "Ticari"],
    },

    // -------------------------------------------------------------------------
    // Tazminat Tavanı
    // -------------------------------------------------------------------------
    {
        name: "Tazminat Tavanı",
        matches: /\btazminat\s+tavan\b|\bliability\s+cap\b|\bsorumluluk\s+sınır\b/i,
        format: "text",
        prompt:
            "Bu sözleşmedeki tazminat tavanı (liability cap) hükümlerini çıkar: " +
            "(1) Tavan tutarı veya çarpanı (örn. '12 aylık ücret', '2× sözleşme bedeli'), " +
            "(2) Tavana tabi olmayan haller (fraud, willful misconduct, gizlilik ihlali), " +
            "(3) Dolaylı zarar hariç tutma maddesi var mı? " +
            "Format: 'Tavan: [tutar/formül] | İstisnalar: [liste] | Dolaylı zarar: Hariç/Dahil'.",
        tags: ["Ticari"],
    },

    // -------------------------------------------------------------------------
    // Mücbir Sebep (Türk Hukuku)
    // -------------------------------------------------------------------------
    {
        name: "Mücbir Sebep (TBK)",
        matches: /\bmücbir\s+sebep\b|\bforce\s+majeure\b/i,
        format: "text",
        prompt:
            "Bu sözleşmedeki mücbir sebep hükümlerini TBK çerçevesinde özetle: " +
            "(1) Mücbir sebep olarak sayılan olaylar, " +
            "(2) Bildirim yükümlülüğü ve süresi, " +
            "(3) Mücbir sebep süresince yükümlülüklerin askıya alınması, " +
            "(4) Uzun süreli mücbir sebep halinde fesih hakkı ve koşulları. " +
            "TBK m. 136 (borcun imkânsızlığı) ile örtüşme değerlendirmesi yap.",
        tags: ["TR", "Ticari"],
    },

    // -------------------------------------------------------------------------
    // Fesih Bildirimi Süresi
    // -------------------------------------------------------------------------
    {
        name: "Fesih Bildirimi",
        matches: /\bfesih\b|\btermination\s+notice\b|\bnotice\s+period\b/i,
        format: "text",
        prompt:
            "Bu sözleşmedeki fesih bildirim sürelerini listele: " +
            "(1) Olağan fesih için bildirim süresi, " +
            "(2) Haklı nedenle fesih için bildirim süresi veya derhal fesih hakkı, " +
            "(3) İhbar dönemindeki yükümlülükler, " +
            "(4) İş sözleşmesi ise 4857 m. 17 ihbar süreleri uyumu. " +
            "Format: 'Olağan: [süre] | Haklı neden: Derhal / [süre] | İş K. uyumu: Evet/Hayır'.",
        tags: ["TR", "İş"],
    },

    // -------------------------------------------------------------------------
    // Yaptırım / Kara Liste Kontrolü
    // -------------------------------------------------------------------------
    {
        name: "Yaptırım Riski",
        matches: /\byaptırım\b|\bsanction\b|\bofac\b|\bkara\s+liste\b/i,
        format: "text",
        prompt:
            "Bu sözleşmedeki tarafları ve ilgili ülkeleri yaptırım riski açısından değerlendir: " +
            "(1) Taraf adları ve ülkeleri, " +
            "(2) Potansiyel OFAC / AB / UK OFSI / BM yaptırım rejimi temas noktaları, " +
            "(3) Yaptırım beyan ve garanti maddesi var mı? " +
            "Yüksek riskli taraf / ülke varsa 🔴 ile işaretle ve manuel OpenSanctions taraması öner.",
        tags: ["Uyum"],
    },
];
