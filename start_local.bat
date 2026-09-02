@echo off
echo ===================================================
echo Starting CCidLara Web Local Server (Port 8080)...
echo ===================================================
echo Opening http://localhost:8080 in your default browser...
start http://localhost:8080
python -m http.server 8080
pause
