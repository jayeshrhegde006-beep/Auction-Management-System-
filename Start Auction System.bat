@echo off
echo ========================================
echo Starting Online Auction System
echo ========================================
echo.

REM Start the server in a new window
echo Starting Server...
start "Auction Server" cmd /k "cd /d "%~dp0server" && npm start"

REM Wait a few seconds for the server to initialize
timeout /t 5 /nobreak >nul

REM Start the client in a new window
echo Starting Client...
start "Auction Client" cmd /k "cd /d "%~dp0client" && npm start"

REM Wait a few more seconds for the client to start
timeout /t 8 /nobreak >nul

REM Open the browser
echo Opening browser...
start http://localhost:3000

echo.
echo ========================================
echo System is starting up!
echo Server: Running in separate window
echo Client: Running in separate window
echo Browser: Opening at http://localhost:3000
echo ========================================
echo.
echo Press any key to exit this window (servers will continue running)
pause >nul
