# mike-oss × ArthurLegal — Server Startup Script
# Çağıran: MikeOSS.vbs (pencere gizli)

$ErrorActionPreference = "SilentlyContinue"

$launcherDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$installDir  = Split-Path -Parent $launcherDir
$nodeExe     = Join-Path $installDir "tools\node\node.exe"
$pidFile     = Join-Path $env:TEMP "mikeoss-pids.txt"

# ── Zaten çalışıyor mu? ─────────────────────────────────────────────────────
function Test-Port($port) {
    try {
        $conn = New-Object System.Net.Sockets.TcpClient("127.0.0.1", $port)
        $conn.Close()
        return $true
    } catch { return $false }
}

if ((Test-Port 3000) -and (Test-Port 3001)) {
    Start-Process "http://localhost:3000"
    exit 0
}

# ── Backend başlat ──────────────────────────────────────────────────────────
$backendDir = Join-Path $installDir "backend"
$beProc = Start-Process -FilePath $nodeExe `
    -ArgumentList "dist/index.js" `
    -WorkingDirectory $backendDir `
    -WindowStyle Hidden -PassThru

# ── Frontend başlat ─────────────────────────────────────────────────────────
$frontendDir = Join-Path $installDir "frontend\standalone"
$env:PORT                               = "3000"
$env:HOSTNAME                           = "127.0.0.1"
$env:NEXT_TELEMETRY_DISABLED            = "1"

# .env.local'daki değerleri ortam değişkenine yükle
$envFile = Join-Path $frontendDir ".env.local"
if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
        if ($_ -match "^\s*([^#][^=]+)=(.*)$") {
            [System.Environment]::SetEnvironmentVariable($Matches[1].Trim(), $Matches[2].Trim(), "Process")
        }
    }
}

$feProc = Start-Process -FilePath $nodeExe `
    -ArgumentList "server.js" `
    -WorkingDirectory $frontendDir `
    -WindowStyle Hidden -PassThru

# PID'leri kaydet (durdurma için)
"$($beProc.Id)`n$($feProc.Id)" | Set-Content $pidFile

# ── Hazır olana kadar bekle (max 30 sn) ────────────────────────────────────
$timeout = 30
$elapsed = 0
while (-not (Test-Port 3000) -and $elapsed -lt $timeout) {
    Start-Sleep -Seconds 1
    $elapsed++
}

# ── Tarayıcıyı aç ──────────────────────────────────────────────────────────
if (Test-Port 3000) {
    Start-Process "http://localhost:3000"
} else {
    [System.Windows.Forms.MessageBox]::Show(
        "Uygulama 30 saniye içinde başlatılamadı.`n`nDetaylar icin: $installDir\backend\.env dosyasini kontrol edin.",
        "mike-oss × ArthurLegal",
        [System.Windows.Forms.MessageBoxButtons]::OK,
        [System.Windows.Forms.MessageBoxIcon]::Error
    )
}
