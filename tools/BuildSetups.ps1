#!/usr/bin/env pwsh

# Build Setups

$project = '..\src\Vajehbaz\Vajehbaz.csproj'
$projectPath = Split-Path $project -Parent
$binPath = Join-Path $projectPath 'bin\Release\net6.0-windows\'
$version = ([xml](Get-Content $project)).Project.PropertyGroup.Version
$innoSetupPath = '.tmp\innoSetup'

## 1. Clean
if(Test-Path -LiteralPath $innoSetupPath) {Remove-Item -Recurse -Force $innoSetupPath}

## 2. Builds
### 2.1 Build win-x64  (Portable)
$binWinX64PortablePath = Join-Path $binPath 'win-x64-portable\'
dotnet publish $projectPath -c release -a x64 -o $binWinX64PortablePath `
  -p:AssemblyName="Vajehbaz-v$($version)-win-x64-portable" `
  -p:PublishSingleFile=true `
  -p:IncludeNativeLibrariesForSelfExtract=true `
  --self-contained true

### 2.2 Build win-x64
$binWinX64Path = Join-Path $binPath 'win-x64\'
dotnet publish $projectPath -c release -a x64 -o $binWinX64Path

### 2.3 Build win-x86 (Portable)
$binWinX86PortablePath = Join-Path $binPath 'win-x86-portable\'
dotnet publish $projectPath -c release -a x86 -o $binWinX86PortablePath `
  -p:AssemblyName="Vajehbaz-v$($version)-win-x86-portable" `
  -p:PublishSingleFile=true `
  -p:IncludeNativeLibrariesForSelfExtract=true `
  --self-contained true

### 2.4 Build win-x86
$binWinX86Path = Join-Path $binPath 'win-x86\'
dotnet publish $projectPath -c release -a x86 -o $binWinX86Path --self-contained false

## 3 Install InnoSetup
.tmp\innosetup.exe /verysilent /currentuser /dir=$innoSetupPath

## 4. Build Setups
### 4.1 Make sure InnoSetup is already installed
$timer = [Diagnostics.Stopwatch]::StartNew()
while (!(Test-Path -LiteralPath '.tmp\innoSetup\ISCC.exe')) {
  if ($timer.elapsed.totalseconds -gt 30) {Write-Error 'It took a long time to install innoSetup!' -ErrorAction Stop}
  Start-Sleep -Seconds 0.5
}
Start-Sleep -Seconds 5.0

### 4.2 Build win-x64 Setup
.tmp\innoSetup\ISCC 'setup-x64.iss'

### 4.3 Build win-x64 Setup (No Self Contained)
.tmp\innoSetup\ISCC 'setup-x64-nsc.iss'

### 4.4 Build win-x86 Setup
.tmp\innoSetup\ISCC 'setup-x86.iss'

### 4.5 Build win-x86 Setup (No Self Contained)
.tmp\innoSetup\ISCC 'setup-x86-nsc.iss'
