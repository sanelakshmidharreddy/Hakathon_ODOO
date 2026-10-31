@echo off
REM SunPower Solutions — Windows Automated Project Setup Script
echo ====================================================
echo SunPower Solutions — Full Stack Setup (Windows)
echo ====================================================

echo [1/3] Setting up Frontend...
cd frontend
call npm install
call npm run build
cd ..

echo [2/3] Setting up Backend...
cd backend
call npm install
call npm run build
cd ..

echo [3/3] Running Verification...
node scripts/deploy-check.js

echo ====================================================
echo Setup Complete!
echo Frontend: cd frontend ^&^& npm run dev
echo Backend:  cd backend ^&^& npm run dev
echo ====================================================
