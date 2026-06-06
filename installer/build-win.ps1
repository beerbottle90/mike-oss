# mike-oss x ArthurLegal - Windows Installer Build Script
# Gereksinimler: Node.js 20+, NSIS 3.x (winget install NSIS.NSIS)
#
# Kullanim:
#   cd installer
#   .\build-win.ps1
#
# Cikti: installer\dist\MikeOSS-ArthurLegal-Setup.exe

$ErrorActionPreference = "Stop"

$ROOT     = Split-Path -Parent $PSScriptRoot
$DIST     = "$PSScriptRoot\dist"
$BUNDLE   = "$PSScriptRoot\bundle"
$NODE_VER = "20.19.2"
$NODE_URL = "https://nodejs.org/dist/v$NODE_VER/node-v$NODE_VER-win-x64.zip"
$NODE_ZIP = "$PSScriptRoot\tools\node.zip"
$NODE_DIR = "$PSScriptRoot\tools\node"

Write-Host "=== mike-oss x ArthurLegal - Windows Installer Build ===" -ForegroundColor Cyan

# -- 1. Dizinleri hazirla ----------------------------------------------------
New-Item -ItemType Directory -Force $DIST   | Out-Null
New-Item -ItemType Directory -Force $BUNDLE | Out-Null
New-Item -ItemType Directory -Force "$PSScriptRoot\tools" | Out-Null

# -- 2. Portable Node.js indir -----------------------------------------------
if (-not (Test-Path $NODE_DIR)) {
    Write-Host "[1/6] Portable Node.js $NODE_VER indiriliyor..." -ForegroundColor Yellow
    Invoke-WebRequest -Uri $NODE_URL -OutFile $NODE_ZIP -UseBasicParsing
    Expand-Archive -Path $NODE_ZIP -DestinationPath "$PSScriptRoot\tools" -Force
    Rename-Item "$PSScriptRoot\tools\node-v$NODE_VER-win-x64" $NODE_DIR
    Remove-Item $NODE_ZIP
    Write-Host "   Node.js hazir: $NODE_DIR" -ForegroundColor Green
} else {
    Write-Host "[1/6] Portable Node.js zaten mevcut, atlaniyor." -ForegroundColor Gray
}

$env:PATH = "$NODE_DIR;$env:PATH"

# -- 3. Backend bagimliliklar kur + derle ------------------------------------
Write-Host "[2/6] Backend bagimliliklar kuruluyor (dev dahil)..." -ForegroundColor Yellow
Push-Location "$ROOT\backend"
& "$NODE_DIR\npm.cmd" ci --quiet
if ($LASTEXITCODE -ne 0 -and $LASTEXITCODE -ne 255) { Write-Error "Backend npm ci basarisiz!"; exit 1 }
Write-Host "[3/6] Backend TypeScript derleniyor..." -ForegroundColor Yellow
& "$NODE_DIR\npm.cmd" run build
if ($LASTEXITCODE -ne 0) { Write-Error "Backend build basarisiz!"; exit 1 }
# Bundle icin yalnizca production bagimliliklar kur
& "$NODE_DIR\npm.cmd" ci --omit=dev --quiet
if ($LASTEXITCODE -ne 0 -and $LASTEXITCODE -ne 255) { Write-Error "Backend prod npm ci basarisiz!"; exit 1 }
Pop-Location

# -- 4. Frontend bagimliliklar kur + derle -----------------------------------
Write-Host "[4/6] Frontend derleniyor (Next.js standalone)..." -ForegroundColor Yellow
Push-Location "$ROOT\frontend"
& "$NODE_DIR\npm.cmd" ci --quiet
if ($LASTEXITCODE -ne 0 -and $LASTEXITCODE -ne 255) { Write-Error "Frontend npm ci basarisiz!"; exit 1 }
$env:NEXT_TELEMETRY_DISABLED = "1"
& "$NODE_DIR\npm.cmd" run build
if ($LASTEXITCODE -ne 0) { Write-Error "Frontend build basarisiz!"; exit 1 }
Pop-Location

# -- 5. Bundle klasorunu hazirla ---------------------------------------------
Write-Host "[5/6] Paket hazirlaniyor..." -ForegroundColor Yellow
Remove-Item -Recurse -Force $BUNDLE -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force $BUNDLE | Out-Null

# Backend - sadece dist + uretim node_modules
$beBundle = "$BUNDLE\backend"
New-Item -ItemType Directory -Force $beBundle | Out-Null
Copy-Item "$ROOT\backend\dist"         "$beBundle\dist"         -Recurse
Copy-Item "$ROOT\backend\node_modules" "$beBundle\node_modules" -Recurse
Copy-Item "$ROOT\backend\.env.example" "$beBundle\.env.example" -ErrorAction SilentlyContinue
Copy-Item "$ROOT\backend\schema.sql"   "$beBundle\schema.sql"   -ErrorAction SilentlyContinue

# Frontend - Next.js standalone ciktisi
$feBundle = "$BUNDLE\frontend"
New-Item -ItemType Directory -Force $feBundle | Out-Null
Copy-Item "$ROOT\frontend\.next\standalone" "$feBundle\standalone" -Recurse
New-Item -ItemType Directory -Force "$feBundle\standalone\.next" | Out-Null
Copy-Item "$ROOT\frontend\.next\static"     "$feBundle\standalone\.next\static" -Recurse
Copy-Item "$ROOT\frontend\public"           "$feBundle\standalone\public" -Recurse

# Launcher + runtime araclari
Copy-Item "$PSScriptRoot\launcher" "$BUNDLE\launcher" -Recurse
Copy-Item $NODE_DIR "$BUNDLE\tools\node" -Recurse

# -- 6. NSIS ile installer olustur ------------------------------------------
Write-Host "[6/6] NSIS installer olusturuluyor..." -ForegroundColor Yellow
$nsisCmd = Get-Command makensis.exe -ErrorAction SilentlyContinue
$nsis = if ($nsisCmd) { $nsisCmd.Source } else { $null }
if (-not $nsis) {
    $nsis = "C:\Program Files (x86)\NSIS\makensis.exe"
}
if (-not (Test-Path $nsis)) {
    Write-Warning "NSIS bulunamadi. Kurmak icin: winget install NSIS.NSIS"
    Write-Host "Bundle klasoru hazir: $BUNDLE" -ForegroundColor Yellow
    exit 0
}

& $nsis /V2 /DROOT="$ROOT" /DBUNDLE="$BUNDLE" /DDIST="$DIST" "$PSScriptRoot\setup.nsi"
if ($LASTEXITCODE -ne 0) { Write-Error "NSIS derleme hatasi!"; exit 1 }

Write-Host ""
Write-Host "=== TAMAMLANDI ===" -ForegroundColor Green
Write-Host "Installer: $DIST\MikeOSS-ArthurLegal-Setup.exe" -ForegroundColor Cyan
