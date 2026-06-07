# Windows Installer Build Kılavuzu

## Gereksinimler

1. **Node.js 20+** — [nodejs.org](https://nodejs.org) (build makinede)
2. **NSIS 3.x** — Windows installer derleyicisi

   ```powershell
   winget install NSIS.NSIS
   ```

## Installer Oluşturma

```powershell
cd installer
.\build-win.ps1
```

Çıktı: `installer\dist\MikeOSS-ArthurLegal-Setup-v2.0.3.exe`

## Kurulum Akışı (Son Kullanıcı)

1. `MikeOSS-ArthurLegal-Setup.exe` indir ve çalıştır
2. **Sayfa 1 — Veritabanı:**
   - **Supabase URL** (örn. `https://xxxx.supabase.co` — sonda `/` veya `/rest/v1/` olmasın)
   - **Supabase Secret Key** (`sb_secret_...`)
   - **Supabase Publishable Key** (`sb_publishable_...`)
3. **Sayfa 2 — AI Anahtarları:**
   - **Anthropic API Key** (`sk-ant-api03-...`) — zorunlu
   - **OpenAI API Key** (`sk-...`) — opsiyonel
   - **Google Gemini API Key** — opsiyonel
4. Kurulum dizinini seç (varsayılan: `C:\Program Files\MikeOSS-ArthurLegal`)
5. "Yükle" → masaüstü kısayolu oluşturulur; gizli değerler otomatik üretilir

## Kullanım

- **Masaüstü kısayolu** → uygulamayı başlatır
- Konsolsuz başlatır, sunucular hazır olunca `http://localhost:3000` otomatik açılır
- Zaten çalışıyorsa yeni pencere açmak yerine direkt tarayıcıya gider

## Yapılandırmayı Sonradan Değiştirme

`C:\Program Files\MikeOSS-ArthurLegal\backend\.env` ve  
`C:\Program Files\MikeOSS-ArthurLegal\frontend\standalone\.env.local`  
dosyalarını düzenle, uygulamayı yeniden başlat.

## Tahmini Boyutlar

| Bileşen | Boyut |
|---|---|
| Portable Node.js 20 | ~45 MB |
| Frontend standalone | ~40 MB |
| Backend dist + modules | ~30 MB |
| **Installer (.exe)** | **~45 MB** (LZMA sikistirma) |
| **Kurulu boyut** | **~200 MB** |
