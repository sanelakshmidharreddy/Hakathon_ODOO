#!/usr/bin/env bash
# SunPower Solutions — Automated Project Setup Script
set -e

echo "===================================================="
echo "SunPower Solutions — Full Stack Setup"
echo "===================================================="

echo "[1/3] Setting up Frontend..."
cd frontend
npm install
npm run build
cd ..

echo "[2/3] Setting up Backend..."
cd backend
npm install
npm run build
cd ..

echo "[3/3] Running Verification..."
node scripts/deploy-check.js

echo "===================================================="
echo "Setup Complete! To run locally:"
echo "Frontend: cd frontend && npm run dev (http://localhost:5173)"
echo "Backend:  cd backend && npm run dev  (http://localhost:5000)"
echo "===================================================="
