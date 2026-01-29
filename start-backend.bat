@echo off
echo ================================================
echo   AI Content Analyzer - Backend Starter
echo ================================================
echo.

set "BACKEND_DIR=%~dp0backend"

if not exist "%BACKEND_DIR%" goto no_backend
pushd "%BACKEND_DIR%"

if exist "venv\Scripts\python.exe" goto has_venv
echo [INFO] Creating virtual environment...
python -m venv venv

:has_venv
echo [INFO] Installing/Updating dependencies...
"venv\Scripts\python.exe" -m pip install -r requirements.txt

echo.
echo ================================================
echo   Starting Backend Server...
echo   Working Dir: %CD%
echo   Backend will be available at: http://localhost:8000
echo   Press Ctrl+C to stop the server
echo ================================================
echo.

"venv\Scripts\python.exe" main.py

popd
pause
exit /b

:no_backend
echo [ERROR] Backend folder not found at:
echo "%BACKEND_DIR%"
pause
exit /b
