/**
 * Verification script for BNB deposit and withdrawal.
 * Ensures BNB config, components, and env are present.
 */

import * as fs from 'fs';
import * as path from 'path';

const results: { name: string; passed: boolean; message: string }[] = [];

console.log('=== BNB Deposit & Withdrawal Verification ===\n');

// BNB config and client
const bnbFiles = ['lib/bnb/config.ts', 'lib/bnb/client.ts', 'lib/bnb/backend-client.ts'];
for (const file of bnbFiles) {
  const exists = fs.existsSync(path.join(process.cwd(), file));
  results.push({
    name: `${file} exists`,
    passed: exists,
    message: exists ? '✓' : '✗ Not found',
  });
}

// UI components
const uiFiles = ['components/balance/DepositModal.tsx', 'components/balance/WithdrawModal.tsx', 'components/balance/BalanceDisplay.tsx'];
for (const file of uiFiles) {
  const exists = fs.existsSync(path.join(process.cwd(), file));
  results.push({ name: `${file} exists`, passed: exists, message: exists ? '✓' : '✗ Not found' });
}

// DepositModal uses BNB (getBNBConfig / wagmi / privy)
const depositPath = path.join(process.cwd(), 'components/balance/DepositModal.tsx');
if (fs.existsSync(depositPath)) {
  const content = fs.readFileSync(depositPath, 'utf-8');
  results.push({
    name: 'DepositModal uses BNB (getBNBConfig or wagmi)',
    passed: content.includes('getBNBConfig') || content.includes('wagmi'),
    message: content.includes('getBNBConfig') ? '✓ BNB deposit' : '✗ Missing BNB integration',
  });
}

// Withdraw API uses BNB backend
const withdrawRoutePath = path.join(process.cwd(), 'app/api/balance/withdraw/route.ts');
if (fs.existsSync(withdrawRoutePath)) {
  const content = fs.readFileSync(withdrawRoutePath, 'utf-8');
  results.push({
    name: 'Withdraw API uses transferBNBFromTreasury',
    passed: content.includes('transferBNBFromTreasury'),
    message: content.includes('transferBNBFromTreasury') ? '✓' : '✗ Missing',
  });
}

// .env.example has BNB vars
const envExamplePath = path.join(process.cwd(), '.env.example');
if (fs.existsSync(envExamplePath)) {
  const content = fs.readFileSync(envExamplePath, 'utf-8');
  const hasTreasury = content.includes('NEXT_PUBLIC_TREASURY_ADDRESS');
  const hasSupabase = content.includes('NEXT_PUBLIC_SUPABASE');
  results.push({
    name: '.env.example has BNB treasury and Supabase',
    passed: hasTreasury && hasSupabase,
    message: hasTreasury && hasSupabase ? '✓' : '✗ Missing vars',
  });
}

// Print
let passed = 0;
results.forEach((r) => {
  if (r.passed) passed++;
  console.log(`${r.passed ? '✓' : '✗'} ${r.name}: ${r.message}`);
});
console.log(`\n${passed}/${results.length} checks passed.`);
process.exit(passed === results.length ? 0 : 1);
