#!/usr/bin/env pwsh

# Download the latest stable InnoSetup
# Human Readable Page: https://jrsoftware.org/isdl.php#stable
$outdir = New-Item -ItemType Directory -Force -Path '.tmp'
$outFilename = Join-Path $outdir 'innosetup.exe'
Invoke-WebRequest 'https://jrsoftware.org/download.php/is.exe' -OutFile $outFilename
