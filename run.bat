@echo off
chcp 65001 >nul
cd /d "%~dp0"
start "" chrome "%~dp0index.html" 2>nul || start "" "%~dp0index.html"
