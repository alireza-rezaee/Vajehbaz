// https://github.com/DomGries/InnoDependencyInstaller

#define AppName "Vajehbaz"
#define AppExeName AppName+".exe"
#define MyAppURL "https://alireza-rezaee.github.io/Vajehbaz/"
#define Architecture "x64"
#define Platform "win-x64"
#define BinDir "..\src\Vajehbaz\bin\Release\net6.0-windows\"
#define SourceAppDir "..\src\Vajehbaz\bin\Release\net6.0-windows\win-x64\"

//Return app version in SemVer (for example: 4.0.2.3 => 4.0.2)
#define AppVersion() \
   GetVersionComponents(SourceAppDir + AppExeName, \
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
OutputDir={#BinDir}\Setups
DefaultGroupName={#AppName}
OutputBaseFilename=VajehbazSetup-v{#AppVersion}-{#Platform}
SetupIconFile=setup.ico
UninstallDisplayIcon={app}\{#AppExeName}
PrivilegesRequired=lowest
DisableFinishedPage=yes
DisableDirPage=yes
DisableReadyPage=yes
DisableReadyMemo=yes
DisableProgramGroupPage=yes


[Files]
Source: "{#SourceAppDir}\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs
Source: ".tmp\dotnet\windowsdesktop-runtime-{#Platform}.exe"; DestDir: "{tmp}"; Flags: ignoreversion deleteafterinstall; AfterInstall : InstallDotNet;

[Icons]
Name: "{group}\{#AppName}"; Filename: "{app}\{#AppExeName}"
Name: "{userdesktop}\{#AppName}"; Filename: "{app}\{#AppExeName}"

[Run]
Filename: {app}\{#AppExeName}; Flags: nowait postinstall skipifsilent

[Code]
procedure InstallDotNet;
var
  StatusText: string;
  ResultCode: Integer;
begin
  StatusText := WizardForm.StatusLabel.Caption;
  WizardForm.StatusLabel.Caption := 'Installing .NET Desktop Runtime';
  WizardForm.ProgressGauge.Style := npbstMarquee;
  try
    Exec(ExpandConstant('{tmp}\windowsdesktop-runtime-{#Platform}.exe'), '/install /quiet /norestart', '', SW_HIDE, ewWaitUntilTerminated, ResultCode)
  finally
    WizardForm.StatusLabel.Caption := StatusText;
    WizardForm.ProgressGauge.Style := npbstNormal;
  end;
end;
