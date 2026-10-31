// Automated Deployment and Code Quality Verification Script
import fs from 'fs';
import path from 'path';

console.log('--- SunPower Solutions Deployment & Quality Check ---');

const checks = [];

// 1. Check frontend dist build
const frontendDist = path.resolve('frontend/dist/index.html');
const hasFrontendDist = fs.existsSync(frontendDist);
checks.push({ name: 'Frontend Production Build (dist/index.html)', pass: hasFrontendDist });

// 2. Check backend dist build
const backendDist = path.resolve('backend/dist/server.js');
const hasBackendDist = fs.existsSync(backendDist);
checks.push({ name: 'Backend Production Build (dist/server.js)', pass: hasBackendDist });

// 3. Check environment examples
const hasFrontendEnv = fs.existsSync(path.resolve('frontend/.env.example'));
const hasBackendEnv = fs.existsSync(path.resolve('backend/.env.example'));
checks.push({ name: 'Environment Example Files (.env.example)', pass: hasFrontendEnv && hasBackendEnv });

// 4. Verify no .env secrets are committed
const rootEnv = fs.existsSync(path.resolve('.env'));
const frontendEnv = fs.existsSync(path.resolve('frontend/.env'));
const backendEnv = fs.existsSync(path.resolve('backend/.env'));
checks.push({ name: 'No Real .env Secrets Stored in Repo', pass: !rootEnv && !frontendEnv && !backendEnv });

// 5. Check real data artifacts
const rawData = fs.existsSync(path.resolve('data/raw/nasa_power_jodhpur_raw.json'));
const cleanData = fs.existsSync(path.resolve('data/clean/solar_comparison_clean.json'));
checks.push({ name: 'Real Data Artifacts (NASA POWER Raw & Clean)', pass: rawData && cleanData });

console.table(checks);

const allPassed = checks.every(c => c.pass);
if (allPassed) {
  console.log('✓ All Pre-Deployment Quality Checks Passed Successfully!');
  process.exit(0);
} else {
  console.error('✗ Some checks failed. Please review the table above.');
  process.exit(1);
}
