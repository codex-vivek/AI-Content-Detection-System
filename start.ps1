# AI Content Analyzer - PowerShell Starter

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  AI Content Analyzer - All-in-One Starter" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

$baseDir = $PSScriptRoot
$backendDir = Join-Path $baseDir "backend"
$standalonePage = Join-Path $baseDir "standalone\index.html"

Write-Host "[1/3] Preparing Backend..." -ForegroundColor Yellow
if (-not (Test-Path $backendDir)) {
    Write-Host "[ERROR] Could not find backend folder at: $backendDir" -ForegroundColor Red
    pause
    exit
}

# Move into backend
Push-Location $backendDir

# Check for venv
if (-not (Test-Path "venv")) {
    Write-Host "[INFO] Creating virtual environment (this may take a minute)..."
    python -m venv venv
}

$pythonExe = Join-Path $backendDir "venv\Scripts\python.exe"
$pipExe = Join-Path $backendDir "venv\Scripts\pip.exe"

Write-Host "[INFO] Installing/Updating dependencies..."
& $pipExe install --upgrade pip --quiet
& $pipExe install -r requirements.txt --quiet

Write-Host "[2/3] Starting Backend Server..." -ForegroundColor Yellow
Write-Host "API will be at: http://localhost:8000"
# Start the process in the background
$backendProcess = Start-Process -FilePath $pythonExe -ArgumentList "main.py" -NoNewWindow -PassThru

# Return to root
Pop-Location

Write-Host "Waiting for server to warm up..."
Start-Sleep -Seconds 5

Write-Host "[3/3] Opening Dashboard..." -ForegroundColor Yellow
Start-Process $standalonePage

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "  SUCCESS: Application is now running!"
Write-Host "  - Web View: Opened in your browser"
Write-Host "  - Backend: Running in background (PID: $($backendProcess.Id))"
Write-Host ""
Write-Host "  PRESS ANY KEY TO STOP THE SERVER AND EXIT" -ForegroundColor Green
Write-Host "================================================"

# Wait for key press
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

Write-Host "Stopping backend server..."
Stop-Process -Id $backendProcess.Id -Force -ErrorAction SilentlyContinue
Write-Host "Bye!"
