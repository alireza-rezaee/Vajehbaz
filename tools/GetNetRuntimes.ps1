$runtimes = @{
	'windowsdesktop-runtime-win-x86.exe' = 'https://aka.ms/dotnet/6.0/windowsdesktop-runtime-win-x86.exe';
	'windowsdesktop-runtime-win-x64.exe' = 'https://aka.ms/dotnet/6.0/windowsdesktop-runtime-win-x64.exe'
}

# Download Runtimes
# Note: This will download all selected runtimes
$outdir = New-Item -ItemType Directory -Force -Path '.tmp\dotnet'
foreach ($runtime in $runtimes.GetEnumerator()){
    $outFilename = Join-Path $outdir $runtime.Key
    Invoke-WebRequest $runtime.Value -OutFile $outFilename
}
