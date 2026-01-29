@echo off
echo ================================================
echo   AI Content Analyzer - All-in-One Starter
echo ================================================
echo.

:: Store path cleanly
set "ROOT_DIR=%~dp0"
set "BACKEND_DIR=%~dp0backend"
set "STANDALONE_PAGE=%~dp0standalone\index.html"

echo [1/3] Preparing Backend...

:: Check if backend exists without using parentheses
if not exist "%BACKEND_DIR%" goto no_backend

:: Move into backend folder
pushd "%BACKEND_DIR%"

:: Check for virtual environment
if exist "venv\Scripts\python.exe" goto has_venv
echo [INFO] Creating virtual environment (this may take a minute)...
python -m venv venv
if errorlevel 1 goto python_error

:has_venv
echo [INFO] Installing/Updating dependencies...
"venv\Scripts\python.exe" -m pip install --upgrade pip > nul 2>&1
"venv\Scripts\pip.exe" install -r requirements.txt > nul 2>&1

echo [2/3] Starting Backend Server...
echo API will be available at: http://localhost:8000
start "AI-Backend" /B "venv\Scripts\python.exe" main.py

:: Return to root
popd

:: Wait for server to warm up
timeout /t 5 > nul

echo [3/3] Opening Dashboard...
echo.
start "" "%STANDALONE_PAGE%"

echo ================================================
echo   SUCCESS: Application is now running!
echo   - Web View: Opening in your browser
echo   - Backend: Running in background
echo.
echo   Press any key to stop everything and exit.
echo ================================================
pause > nul

:: Cleanup
taskkill /F /IM python.exe /T > nul 2>&1
echo Done.
exit /b

:no_backend
echo [ERROR] Could not find the backend folder at:
echo "%BACKEND_DIR%"
pause
exit /b

:python_error
echo [ERROR] Python not found or failed to create venv. 
echo Please ensure Python is installed and in your PATH.
pause
exit /b
