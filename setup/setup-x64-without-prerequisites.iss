// https://github.com/DomGries/InnoDependencyInstaller

#define AppName "Vajehbaz"
#define AppExeName AppName+".exe"
#define dotnet_version "6.0.6"
#define MyAppURL "https://alireza-rezaee.github.io/Vajehbaz/"
#define Platform "x64"

//Return app version in SemVer (for example: 4.0.2.3 => 4.0.2)
#define AppVersion() \
   GetVersionComponents("..\x64\"+AppExeName, \
       Local[0], Local[1], Local[2], Local[3]), \
   Str(Local[0]) + "." + Str(Local[1]) + "." + Str(Local[2])

[Setup]  
AppId={{64847BF6-6691-4CF6-98D7-4692205872F7}
AppName={#AppName}
AppVersion={#AppVersion}
AppVerName={#AppName} {#AppVersion}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}
DefaultDirName={userappdata}\{#AppName}
OutputDir=..\.
DefaultGroupName={#AppName}
OutputBaseFilename=VajehbazSetup-{#AppVersion}-{#Platform}-without-prerequisites
SetupIconFile=setup.ico
UninstallDisplayIcon={app}\{#AppExeName}
PrivilegesRequired=lowest
DisableFinishedPage=yes
DisableDirPage=yes
DisableReadyPage=yes
DisableReadyMemo=yes
DisableProgramGroupPage=yes


[Files]
Source: "..\{#Platform}\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs

[Icons]
Name: "{group}\{#AppName}"; Filename: "{app}\{#AppExeName}"
Name: "{userdesktop}\{#AppName}"; Filename: "{app}\{#AppExeName}"

[Run]
Filename: {app}\{#AppExeName}; Flags: nowait postinstall skipifsilent
