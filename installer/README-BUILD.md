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

Çıktı: `installer\dist\MikeOSS-ArthurLegal-Setup-v2.0.0.exe`

## Kurulum Akışı (Son Kullanıcı)

1. `MikeOSS-ArthurLegal-Setup.exe` indir ve çalıştır
2. Kurulum sihirbazında API anahtarlarını gir:
   - **Supabase URL** (örn. `https://xxxx.supabase.co`)
   - **Supabase Secret Key** (`sb_secret_...`)
   - **Supabase Publishable Key** (`sb_publishable_...`)
   - **Anthropic API Key** (`sk-ant-api03-...`)
3. Kurulum dizinini seç (varsayılan: `C:\Program Files\MikeOSS-ArthurLegal`)
4. "Yükle" → masaüstü kısayolu oluşturulur

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
| **Installer (.exe)** | **~60-80 MB** (LZMA sıkıştırma) |
| **Kurulu boyut** | **~200 MB** |
