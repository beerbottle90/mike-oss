' mike-oss × ArthurLegal — Silent Launcher
' Konsol penceresi göstermeden PowerShell başlatır
Set fso = CreateObject("Scripting.FileSystemObject")
Set sh  = CreateObject("WScript.Shell")

installDir = fso.GetParentFolderName(WScript.ScriptFullName)
scriptPath = installDir & "\start-servers.ps1"

sh.Run "powershell.exe -WindowStyle Hidden -ExecutionPolicy Bypass -File """ & scriptPath & """", 0, False
