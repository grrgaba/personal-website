# Rename .jfif image files to friendlier .jpg names
Write-Host "Renaming image files..."

$mapping = @{
    "assets\bg.jfif" = "assets\bg.jpg"
    "assets\dark.jfif" = "assets\dark.jpg"
    "diary\trips\2025\09_Sentinel\BdgyW0tkQsSS7Ds_GnmqrA.jfif" = "diary\trips\2025\09_Sentinel\sentinel-1.jpg"
    "diary\trips\2025\09_Sentinel\AmN9FhoWTXmCCDL-8akZ6w.jfif" = "diary\trips\2025\09_Sentinel\sentinel-2.jpg"
    "diary\trips\2025\09_Sentinel\s-A3oVQhRaOfxHfwRH194w.jfif" = "diary\trips\2025\09_Sentinel\sentinel-3.jpg"
    "diary\trips\2025\09_Sentinel\ZCrXrBunSASjaAqPH3_-0g.jfif" = "diary\trips\2025\09_Sentinel\sentinel-4.jpg"
}

$root = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $root

foreach ($k in $mapping.Keys) {
    $src = Join-Path $root $k
    $dest = Join-Path $root $mapping[$k]
    if (Test-Path $src) {
        try {
            Move-Item -LiteralPath $src -Destination $dest -Force
            Write-Host "Renamed $k -> $($mapping[$k])"
        } catch {
            Write-Warning "Failed to rename $k: $_"
        }
    } else {
        Write-Host "Not found: $k"
    }
}

Write-Host "Done."