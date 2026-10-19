param (
    [switch]$MigrateDb
)

# Load environment variables from .env.local to ensure Cloudflare API Token is injected
if (Test-Path ".env.local") {
    Write-Host "Loading credentials from .env.local..." -ForegroundColor Cyan
    Get-Content ".env.local" | ForEach-Object {
        $line = $_.Trim()
        if ($line -notmatch '^\s*#' -and $line -match '^(.*?)=(.*)$') {
            $name = $matches[1].Trim()
            $value = $matches[2].Trim().Trim('"').Trim("'")
            [Environment]::SetEnvironmentVariable($name, $value, "Process")
        }
    }
} else {
    Write-Host "Warning: .env.local not found. Cloudflare token might be missing." -ForegroundColor Yellow
}

$env:WRANGLER_SEND_METRICS = "false"

Write-Host "Building project..." -ForegroundColor Cyan
cmd.exe /c "npm run build"

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed. Deployment aborted." -ForegroundColor Red
    exit 1
}

if ($MigrateDb) {
    Write-Host "Generating DB Migration SQL from Firebase..." -ForegroundColor Cyan
    node scripts/migrate_to_d1.cjs
    
    if (Test-Path "motionly_db.sql") {
        Write-Host "Pushing SQL to Cloudflare D1..." -ForegroundColor Cyan
        npx wrangler d1 execute motionly_db --remote --file=motionly_db.sql
    }
}

Write-Host "Deploying to Cloudflare Pages (Production)..." -ForegroundColor Cyan
cmd.exe /c "npx wrangler pages deploy dist --project-name motionly-media --branch main"

if ($LASTEXITCODE -eq 0) {
    Write-Host "Deployment finished successfully!" -ForegroundColor Green
} else {
    Write-Host "Deployment failed." -ForegroundColor Red
}
