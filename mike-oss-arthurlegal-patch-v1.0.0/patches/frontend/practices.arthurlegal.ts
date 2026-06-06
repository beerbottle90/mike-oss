/**
 * mike-oss × ArthurLegal v1.0.0 — Türk Hukuku Pratik Alan Güncellemesi
 *
 * Kurulum:
 *   frontend/src/app/components/workflows/practices.ts dosyasını bu içerikle değiştir.
 *   Mevcut PRACTICE_OPTIONS listesine TR-spesifik alanlar eklendi.
 *
 * Kaynak: ArthurLegal v1.2.0 — 10 plugin haritası
 * https://github.com/beerbottle90/ArthurLegal
 */

export const PRACTICE_OPTIONS = [
    // -------------------------------------------------------------------------
    // Orijinal mike-oss alanları (değiştirilmedi)
    // -------------------------------------------------------------------------
    "General Transactions",
    "Corporate",
    "Finance",
    "Litigation",
    "Real Estate",
    "Tax",
    "Employment",
    "IP",
    "Competition",
    "Tech Transactions",
    "Project Finance",
    "EC/VC",
    "Private Equity",
    "Private Credit",
    "ECM",
    "DCM",
    "Lev Fin",
    "Arbitration",

    // -------------------------------------------------------------------------
    // ArthurLegal — Türk Hukuku Eklentileri
    // -------------------------------------------------------------------------

    // Ticari sözleşmeler (TBK + TTK + ISTAC)
    "Ticari Sözleşme (TR)",

    // Kurumsal ve M&A (TTK 134-209 + Rekabet Kurumu + SPK)
    "Kurumsal / M&A (TR)",

    // İş hukuku (4857 + 5510 + 6356)
    "İş Hukuku (TR)",

    // Kişisel veri ve gizlilik (KVKK + GDPR ikili rejim)
    "KVKK / Gizlilik",

    // Regülasyon takibi (EPDK + BDDK + SPK + KGK)
    "Regülasyon (TR)",

    // Fikri sınai haklar (6769 SMK + TÜRKPATENT)
    "FSH / IP (TR)",

    // İdare hukuku (İYUK + 3 dereceli yargı)
    "İdare Hukuku (TR)",

    // Vergi hukuku (VUK + KVK + KDV + ÖTV + GİB)
    "Vergi Hukuku (TR)",

    // Enerji ve proje finansmanı (EPDK + 6446 EPK)
    "Enerji Hukuku (TR)",

    // Sermaye piyasası (SPK + KAP + MKK)
    "Sermaye Piyasası (TR)",

    // Genel
    "Others",
] as const;

export type Practice = (typeof PRACTICE_OPTIONS)[number];
