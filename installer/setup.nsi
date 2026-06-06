; mike-oss x ArthurLegal - NSIS Installer Script
; NSIS 3.x required: https://nsis.sourceforge.io
; Build: makensis setup.nsi  or via build-win.ps1

Unicode True
SetCompressor /SOLID lzma

!define APP_NAME     "mike-oss x ArthurLegal"
!define APP_SLUG     "MikeOSS-ArthurLegal"
!define APP_VERSION  "2.0.2"
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

; -- Modern UI ------------------------------------------------------------------
!include "MUI2.nsh"
!include "nsDialogs.nsh"
!include "LogicLib.nsh"
!include "FileFunc.nsh"

!define MUI_ABORTWARNING
!define MUI_ICON   "${__FILEDIR__}\resources\icon.ico"
!define MUI_UNICON "${__FILEDIR__}\resources\icon.ico"

; Pages
!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_LICENSE "${__FILEDIR__}\LICENSE.txt"
Page custom SupabasePageCreate SupabasePageLeave
Page custom ApiKeysPageCreate  ApiKeysPageLeave
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH
!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES

!insertmacro MUI_LANGUAGE "English"

; -- Variables -----------------------------------------------------------------
; Supabase page
Var Dialog1
Var LblSupabaseUrl
Var TxtSupabaseUrl
Var LblSupabaseSecret
Var TxtSupabaseSecret
Var LblSupabasePublishable
Var TxtSupabasePublishable

; AI keys page
Var Dialog2
Var LblAnthropicKey
Var TxtAnthropicKey
Var LblOpenAIKey
Var TxtOpenAIKey
Var LblGeminiKey
Var TxtGeminiKey

; Captured values
Var ValSupabaseUrl
Var ValSupabaseSecret
Var ValSupabasePublishable
Var ValAnthropicKey
Var ValOpenAIKey
Var ValGeminiKey

; ==============================================================================
; PAGE 1 — Supabase / Database
; ==============================================================================
Function SupabasePageCreate
    nsDialogs::Create 1018
    Pop $Dialog1
    ${If} $Dialog1 == error
        Abort
    ${EndIf}

    ${NSD_CreateLabel} 0 0 100% 16u "Step 1 of 2 — Database Configuration (Supabase)"
    Pop $0

    ${NSD_CreateLabel} 0 22u 100% 10u "Supabase URL  (base URL only — no /rest/v1/ or trailing slash)"
    Pop $LblSupabaseUrl
    ${NSD_CreateText} 0 34u 100% 14u "https://xxxxxxxxxxxx.supabase.co"
    Pop $TxtSupabaseUrl

    ${NSD_CreateLabel} 0 56u 100% 10u "Supabase Secret Key  (service_role)"
    Pop $LblSupabaseSecret
    ${NSD_CreatePassword} 0 68u 100% 14u ""
    Pop $TxtSupabaseSecret

    ${NSD_CreateLabel} 0 90u 100% 10u "Supabase Publishable Key  (anon)"
    Pop $LblSupabasePublishable
    ${NSD_CreatePassword} 0 102u 100% 14u ""
    Pop $TxtSupabasePublishable

    ${NSD_CreateLabel} 0 124u 100% 30u "Where to find these: Supabase Dashboard -> Settings -> Data API -> Project URL / service_role / anon"
    Pop $0

    ${NSD_CreateLabel} 0 160u 100% 20u "You can leave all fields blank and edit the .env files manually after installation."
    Pop $0

    nsDialogs::Show
FunctionEnd

Function SupabasePageLeave
    ${NSD_GetText} $TxtSupabaseUrl         $ValSupabaseUrl
    ${NSD_GetText} $TxtSupabaseSecret      $ValSupabaseSecret
    ${NSD_GetText} $TxtSupabasePublishable $ValSupabasePublishable
FunctionEnd

; ==============================================================================
; PAGE 2 — AI Provider API Keys
; ==============================================================================
Function ApiKeysPageCreate
    nsDialogs::Create 1018
    Pop $Dialog2
    ${If} $Dialog2 == error
        Abort
    ${EndIf}

    ${NSD_CreateLabel} 0 0 100% 16u "Step 2 of 2 — AI Provider Keys"
    Pop $0

    ${NSD_CreateLabel} 0 22u 100% 10u "Anthropic API Key  (sk-ant-api03-...)  [required for Claude models]"
    Pop $LblAnthropicKey
    ${NSD_CreatePassword} 0 34u 100% 14u ""
    Pop $TxtAnthropicKey

    ${NSD_CreateLabel} 0 56u 100% 10u "OpenAI API Key  (sk-...)  [optional]"
    Pop $LblOpenAIKey
    ${NSD_CreatePassword} 0 68u 100% 14u ""
    Pop $TxtOpenAIKey

    ${NSD_CreateLabel} 0 90u 100% 10u "Google Gemini API Key  [optional]"
    Pop $LblGeminiKey
    ${NSD_CreatePassword} 0 102u 100% 14u ""
    Pop $TxtGeminiKey

    ${NSD_CreateLabel} 0 124u 100% 20u "Anthropic: console.anthropic.com -> API Keys"
    Pop $0
    ${NSD_CreateLabel} 0 144u 100% 20u "OpenAI: platform.openai.com -> API Keys"
    Pop $0
    ${NSD_CreateLabel} 0 164u 100% 20u "Gemini: aistudio.google.com -> Get API Key"
    Pop $0

    nsDialogs::Show
FunctionEnd

Function ApiKeysPageLeave
    ${NSD_GetText} $TxtAnthropicKey $ValAnthropicKey
    ${NSD_GetText} $TxtOpenAIKey    $ValOpenAIKey
    ${NSD_GetText} $TxtGeminiKey    $ValGeminiKey
FunctionEnd

; ==============================================================================
; MAIN INSTALL SECTION
; ==============================================================================
Section "Core Application (Required)" SecMain
    SectionIn RO

    SetOutPath $INSTDIR
    File /r "${BUNDLE}\*"

    Call WriteEnvFiles

    ; Shortcuts
    CreateDirectory "$SMPROGRAMS\${APP_NAME}"
    CreateShortcut "$DESKTOP\${APP_NAME}.lnk" \
                   "$INSTDIR\launcher\MikeOSS.vbs" "" \
                   "$INSTDIR\launcher\icon.ico" 0
    CreateShortcut "$SMPROGRAMS\${APP_NAME}\${APP_NAME}.lnk" \
                   "$INSTDIR\launcher\MikeOSS.vbs" "" \
                   "$INSTDIR\launcher\icon.ico" 0
    CreateShortcut "$SMPROGRAMS\${APP_NAME}\Uninstall.lnk" \
                   "$INSTDIR\Uninstall.exe"

    ; Registry
    WriteRegStr   HKLM "${INST_KEY}" "InstallDir" "$INSTDIR"
    WriteRegStr   HKLM "${INST_KEY}" "Version"    "${APP_VERSION}"
    WriteRegStr   HKLM "${UNINST_KEY}" "DisplayName"     "${APP_NAME}"
    WriteRegStr   HKLM "${UNINST_KEY}" "DisplayVersion"  "${APP_VERSION}"
    WriteRegStr   HKLM "${UNINST_KEY}" "Publisher"       "${APP_PUBLISHER}"
    WriteRegStr   HKLM "${UNINST_KEY}" "UninstallString" "$INSTDIR\Uninstall.exe"
    WriteRegStr   HKLM "${UNINST_KEY}" "URLInfoAbout"    "${APP_URL}"
    WriteRegStr   HKLM "${UNINST_KEY}" "InstallLocation" "$INSTDIR"
    WriteRegDWORD HKLM "${UNINST_KEY}" "NoModify"        1
    WriteRegDWORD HKLM "${UNINST_KEY}" "NoRepair"        1

    ${GetSize} "$INSTDIR" "/S=0K" $0 $1 $2
    IntFmt $0 "0x%08X" $0
    WriteRegDWORD HKLM "${UNINST_KEY}" "EstimatedSize" "$0"

    WriteUninstaller "$INSTDIR\Uninstall.exe"
SectionEnd

; ==============================================================================
; WRITE .ENV FILES
; ==============================================================================
Function WriteEnvFiles
    ; Backend .env
    FileOpen  $R0 "$INSTDIR\backend\.env" w
    FileWrite $R0 "PORT=3001$\r$\n"
    FileWrite $R0 "FRONTEND_URL=http://localhost:3000$\r$\n"
    FileWrite $R0 "$\r$\n"
    FileWrite $R0 "# Supabase$\r$\n"
    FileWrite $R0 "SUPABASE_URL=$ValSupabaseUrl$\r$\n"
    FileWrite $R0 "SUPABASE_SECRET_KEY=$ValSupabaseSecret$\r$\n"
    FileWrite $R0 "$\r$\n"
    FileWrite $R0 "# LLM API Keys$\r$\n"
    FileWrite $R0 "ANTHROPIC_API_KEY=$ValAnthropicKey$\r$\n"
    FileWrite $R0 "OPENAI_API_KEY=$ValOpenAIKey$\r$\n"
    FileWrite $R0 "GEMINI_API_KEY=$ValGeminiKey$\r$\n"
    FileWrite $R0 "$\r$\n"
    FileWrite $R0 "# Storage (Cloudflare R2 or S3-compatible)$\r$\n"
    FileWrite $R0 "R2_ENDPOINT_URL=$\r$\n"
    FileWrite $R0 "R2_ACCESS_KEY_ID=$\r$\n"
    FileWrite $R0 "R2_SECRET_ACCESS_KEY=$\r$\n"
    FileWrite $R0 "R2_BUCKET_NAME=mike$\r$\n"
    FileWrite $R0 "$\r$\n"
    FileWrite $R0 "# ArthurLegal x yargi-mcp-pro (optional)$\r$\n"
    FileWrite $R0 "YARGI_MCP_ENDPOINT=https://yargi-mcp-pro-production.up.railway.app/mcp$\r$\n"
    FileWrite $R0 "YARGI_MCP_TOKEN=$\r$\n"
    FileWrite $R0 "$\r$\n"
    FileWrite $R0 "DOWNLOAD_SIGNING_SECRET=mikeoss-dl-$INSTDIR$\r$\n"
    FileWrite $R0 "USER_API_KEYS_ENCRYPTION_SECRET=mikeoss-enc-$INSTDIR$\r$\n"
    FileWrite $R0 "RESEND_API_KEY=$\r$\n"
    FileClose $R0

    ; Frontend .env.local
    FileOpen  $R1 "$INSTDIR\frontend\standalone\.env.local" w
    FileWrite $R1 "NEXT_PUBLIC_SUPABASE_URL=$ValSupabaseUrl$\r$\n"
    FileWrite $R1 "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=$ValSupabasePublishable$\r$\n"
    FileWrite $R1 "NEXT_PUBLIC_API_BASE_URL=http://localhost:3001$\r$\n"
    FileClose $R1
FunctionEnd

; ==============================================================================
; UNINSTALL
; ==============================================================================
Section "Uninstall"
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
