# Download the latest stable InnoSetup
$outdir = New-Item -ItemType Directory -Force -Path '.tmp'
$outFilename = Join-Path $outdir 'innosetup.exe'
Invoke-WebRequest 'https://jrsoftware.org/download.php/is.exe' -OutFile $outFilename
