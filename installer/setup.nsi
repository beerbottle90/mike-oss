; mike-oss × ArthurLegal — NSIS Installer Script
; NSIS 3.x gerektirir: https://nsis.sourceforge.io
; Build: makensis setup.nsi  veya build-win.ps1 aracılığıyla

Unicode True
SetCompressor /SOLID lzma

!define APP_NAME     "mike-oss × ArthurLegal"
!define APP_SLUG     "MikeOSS-ArthurLegal"
!define APP_VERSION  "2.0.0"
!define APP_PUBLISHER "beerbottle90"
!define APP_URL      "https://github.com/beerbottle90/mike-oss"
!define INST_KEY     "Software\${APP_SLUG}"
!define UNINST_KEY   "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APP_SLUG}"

Name "${APP_NAME} v${APP_VERSION}"
OutFile "${DIST}\${APP_SLUG}-Setup-v${APP_VERSION}.exe"
InstallDir "$PROGRAMFILES64\${APP_SLUG}"
InstallDirRegKey HKLM "${INST_KEY}" "InstallDir"
RequestExecutionLevel admin
ShowInstDetails show

; ── Modern UI ─────────────────────────────────────────────────────────────
!include "MUI2.nsh"
!include "nsDialogs.nsh"
!include "LogicLib.nsh"
!include "FileFunc.nsh"

!define MUI_ABORTWARNING
!define MUI_ICON   "${__FILEDIR__}\resources\icon.ico"
!define MUI_UNICON "${__FILEDIR__}\resources\icon.ico"

; Sayfalar
!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_LICENSE "${BUNDLE}\backend\schema.sql"
Page custom ConfigPageCreate ConfigPageLeave
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH
!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES

!insertmacro MUI_LANGUAGE "Turkish"

; ── Konfigürasyon sayfası değişkenleri ────────────────────────────────────
Var Dialog
Var LblSupabaseUrl
Var TxtSupabaseUrl
Var LblSupabaseKey
Var TxtSupabaseKey
Var LblAnthropicKey
Var TxtAnthropicKey
Var LblPublishableKey
Var TxtPublishableKey

Var ValSupabaseUrl
Var ValSupabaseKey
Var ValAnthropicKey
Var ValPublishableKey

Function ConfigPageCreate
    nsDialogs::Create 1018
    Pop $Dialog
    ${If} $Dialog == error
        Abort
    ${EndIf}

    ; Başlık
    ${NSD_CreateLabel} 0 0 100% 20u "API Yapılandırması"
    Pop $0
    SetCtlColors $0 0x1a1a2e TRANSPARENT

    ; Supabase URL
    ${NSD_CreateLabel} 0 30u 100% 12u "Supabase URL (https://xxxx.supabase.co)"
    Pop $LblSupabaseUrl
    ${NSD_CreateText} 0 44u 100% 14u "https://xxxxxxxxxxxxxx.supabase.co"
    Pop $TxtSupabaseUrl

    ; Supabase Secret Key
    ${NSD_CreateLabel} 0 64u 100% 12u "Supabase Secret Key (sb_secret_...)"
    Pop $LblSupabaseKey
    ${NSD_CreatePassword} 0 78u 100% 14u ""
    Pop $TxtSupabaseKey

    ; Supabase Publishable Key
    ${NSD_CreateLabel} 0 98u 100% 12u "Supabase Publishable Key (sb_publishable_...)"
    Pop $LblPublishableKey
    ${NSD_CreatePassword} 0 112u 100% 14u ""
    Pop $TxtPublishableKey

    ; Anthropic API Key
    ${NSD_CreateLabel} 0 132u 100% 12u "Anthropic API Key (sk-ant-api03-...)"
    Pop $LblAnthropicKey
    ${NSD_CreatePassword} 0 146u 100% 14u ""
    Pop $TxtAnthropicKey

    ; Bilgi notu
    ${NSD_CreateLabel} 0 170u 100% 24u "Not: Bu değerleri şimdi girmezseniz kurulum tamamlandıktan sonra $INSTDIR\backend\.env dosyasını düzenleyebilirsiniz."
    Pop $0

    nsDialogs::Show
FunctionEnd

Function ConfigPageLeave
    ${NSD_GetText} $TxtSupabaseUrl    $ValSupabaseUrl
    ${NSD_GetText} $TxtSupabaseKey    $ValSupabaseKey
    ${NSD_GetText} $TxtPublishableKey $ValPublishableKey
    ${NSD_GetText} $TxtAnthropicKey   $ValAnthropicKey
FunctionEnd

; ── Ana Kurulum Bölümü ─────────────────────────────────────────────────────
Section "Ana Uygulama (Zorunlu)" SecMain
    SectionIn RO

    SetOutPath $INSTDIR
    File /r "${BUNDLE}\*"

    ; .env dosyalarını oluştur
    Call WriteEnvFiles

    ; Launcher kısayolları
    CreateDirectory "$SMPROGRAMS\${APP_NAME}"
    CreateShortcut  "$DESKTOP\${APP_NAME}.lnk" \
                    "$INSTDIR\launcher\MikeOSS.vbs" "" \
                    "$INSTDIR\launcher\icon.ico" 0
    CreateShortcut  "$SMPROGRAMS\${APP_NAME}\${APP_NAME}.lnk" \
                    "$INSTDIR\launcher\MikeOSS.vbs" "" \
                    "$INSTDIR\launcher\icon.ico" 0
    CreateShortcut  "$SMPROGRAMS\${APP_NAME}\Kaldır.lnk" \
                    "$INSTDIR\Uninstall.exe"

    ; Registry
    WriteRegStr   HKLM "${INST_KEY}" "InstallDir" "$INSTDIR"
    WriteRegStr   HKLM "${INST_KEY}" "Version"    "${APP_VERSION}"
    WriteRegStr   HKLM "${UNINST_KEY}" "DisplayName"    "${APP_NAME}"
    WriteRegStr   HKLM "${UNINST_KEY}" "DisplayVersion"  "${APP_VERSION}"
    WriteRegStr   HKLM "${UNINST_KEY}" "Publisher"       "${APP_PUBLISHER}"
    WriteRegStr   HKLM "${UNINST_KEY}" "UninstallString" "$INSTDIR\Uninstall.exe"
    WriteRegStr   HKLM "${UNINST_KEY}" "URLInfoAbout"    "${APP_URL}"
    WriteRegStr   HKLM "${UNINST_KEY}" "InstallLocation" "$INSTDIR"
    WriteRegDWORD HKLM "${UNINST_KEY}" "NoModify"        1
    WriteRegDWORD HKLM "${UNINST_KEY}" "NoRepair"        1

    ; Kurulu boyut
    ${GetSize} "$INSTDIR" "/S=0K" $0 $1 $2
    IntFmt $0 "0x%08X" $0
    WriteRegDWORD HKLM "${UNINST_KEY}" "EstimatedSize" "$0"

    WriteUninstaller "$INSTDIR\Uninstall.exe"
SectionEnd

; ── .env Dosyalarını Yaz ──────────────────────────────────────────────────
Function WriteEnvFiles
    ; Backend .env
    FileOpen  $0 "$INSTDIR\backend\.env" w
    FileWrite $0 "PORT=3001$\r$\n"
    FileWrite $0 "FRONTEND_URL=http://localhost:3000$\r$\n"
    FileWrite $0 "$\r$\n"
    FileWrite $0 "# Supabase$\r$\n"
    FileWrite $0 "SUPABASE_URL=$ValSupabaseUrl$\r$\n"
    FileWrite $0 "SUPABASE_SECRET_KEY=$ValSupabaseKey$\r$\n"
    FileWrite $0 "$\r$\n"
    FileWrite $0 "# LLM API Keys$\r$\n"
    FileWrite $0 "ANTHROPIC_API_KEY=$ValAnthropicKey$\r$\n"
    FileWrite $0 "GEMINI_API_KEY=$\r$\n"
    FileWrite $0 "OPENAI_API_KEY=$\r$\n"
    FileWrite $0 "$\r$\n"
    FileWrite $0 "# Storage (Cloudflare R2 veya S3-uyumlu)$\r$\n"
    FileWrite $0 "R2_ENDPOINT_URL=$\r$\n"
    FileWrite $0 "R2_ACCESS_KEY_ID=$\r$\n"
    FileWrite $0 "R2_SECRET_ACCESS_KEY=$\r$\n"
    FileWrite $0 "R2_BUCKET_NAME=mike$\r$\n"
    FileWrite $0 "$\r$\n"
    FileWrite $0 "# ArthurLegal × yargi-mcp-pro (opsiyonel)$\r$\n"
    FileWrite $0 "YARGI_MCP_ENDPOINT=https://yargi-mcp-pro-production.up.railway.app/mcp$\r$\n"
    FileWrite $0 "YARGI_MCP_TOKEN=$\r$\n"
    FileWrite $0 "$\r$\n"
    FileWrite $0 "DOWNLOAD_SIGNING_SECRET=$\r$\n"
    FileWrite $0 "USER_API_KEYS_ENCRYPTION_SECRET=$\r$\n"
    FileWrite $0 "RESEND_API_KEY=$\r$\n"
    FileClose $0

    ; Frontend .env.local
    FileOpen  $1 "$INSTDIR\frontend\standalone\.env.local" w
    FileWrite $1 "NEXT_PUBLIC_SUPABASE_URL=$ValSupabaseUrl$\r$\n"
    FileWrite $1 "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=$ValPublishableKey$\r$\n"
    FileWrite $1 "NEXT_PUBLIC_API_BASE_URL=http://localhost:3001$\r$\n"
    FileClose $1
FunctionEnd

; ── Kaldırma ──────────────────────────────────────────────────────────────
Section "Uninstall"
    ; Çalışan sunucuları durdur
    ExecWait '"$INSTDIR\tools\node\node.exe" "$INSTDIR\launcher\stop-servers.js"'

    RMDir /r "$INSTDIR\backend"
    RMDir /r "$INSTDIR\frontend"
    RMDir /r "$INSTDIR\launcher"
    RMDir /r "$INSTDIR\tools"
    Delete "$INSTDIR\Uninstall.exe"
    RMDir  "$INSTDIR"

    Delete "$DESKTOP\${APP_NAME}.lnk"
    RMDir /r "$SMPROGRAMS\${APP_NAME}"

    DeleteRegKey HKLM "${INST_KEY}"
    DeleteRegKey HKLM "${UNINST_KEY}"
SectionEnd
