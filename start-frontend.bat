@echo off
setlocal
echo ================================================
echo   AI Content Analyzer - Frontend Starter
echo ================================================
echo.

set "BASE_DIR=%~dp0"
cd /d "%BASE_DIR%frontend"

echo Installing/updating dependencies...
call npm install --legacy-peer-deps

echo.
echo ================================================
echo   Starting Frontend Server...
echo   Frontend will be available at: http://localhost:3000
echo   Make sure backend is running!
echo   Press Ctrl+C to stop the server
echo ================================================
echo.

call npm run dev

pause
endlocal
