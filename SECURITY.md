# Security Policy

## Reporting a Vulnerability

**We take security seriously.** If you discover a security vulnerability in Bynomo, please report it responsibly.

### How to Report

**DO NOT** open a public GitHub issue for security vulnerabilities.

Instead, email us at:
**amaansayyad2001@gmail.com**

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Your contact information (for follow-up)

### Response Timeline

- **24 hours**: Initial acknowledgment
- **72 hours**: Preliminary assessment
- **7 days**: Fix deployed (for critical issues)
- **30 days**: Public disclosure (coordinated with reporter)

### Bug Bounty Program

We plan to launch a bug bounty program via **Immunefi** in Q2 2026.

**Estimated rewards:**
- **Critical** (treasury drain, oracle manipulation): $5,000 - $50,000
- **High** (balance manipulation, unauthorized withdrawals): $1,000 - $5,000
- **Medium** (front-running, DoS): $500 - $1,000
- **Low** (UI bugs, data leaks): $100 - $500

---

## Security Measures

### Smart Contract Security
- **Audit**: CertiK or OpenZeppelin audit planned (Q2 2026)
- **Multi-sig**: Treasury upgrade to 3-of-5 Gnosis Safe (Q2 2026)
- **Time-locks**: 48-hour delay on critical parameter changes
- **Pause mechanism**: Emergency stop for all deposits/bets

### Backend Security
- **API rate limiting**: Max 100 req/min per IP
- **Input validation**: All user inputs sanitized (Zod schemas)
- **SQL injection prevention**: Parameterized queries only
- **Environment secrets**: Never exposed to client (Vercel env vars)

### Oracle Security
- **Pyth Network**: Cryptographic price attestations
- **Staleness checks**: Reject prices older than 60 seconds
- **Circuit breaker**: Pause if price deviation >5% from backup oracle
- **Fallback oracle**: Chainlink planned for redundancy (Q2 2026)

### Treasury Security
- **Private key storage**: AWS Secrets Manager or HashiCorp Vault (production)
- **Hot/Cold wallet split**: Max $10K in hot wallet, rest in multi-sig cold storage
- **Withdrawal limits**: Max $5K per transaction (manual approval for larger)
- **Insurance fund**: 5% of fees reserved for exploit coverage

### Frontend Security
- **CSP headers**: Content Security Policy to prevent XSS
- **SRI**: Subresource Integrity for CDN assets
- **HTTPS only**: Force HTTPS in production
- **Session security**: HttpOnly cookies, SameSite=Strict

---

## Known Limitations

### Current Design
- **Centralized treasury**: Single EOA (upgrade to multi-sig in Q2 2026)
- **Off-chain settlement**: Bets not recorded on-chain (trade-off for speed)
- **Trust assumption**: Users trust treasury operator for withdrawals

### Mitigations
- **Transparency**: All treasury transactions visible on BscScan
- **Verifiable**: Users can verify house balance matches Supabase records
- **Exit plan**: Multi-sig upgrade path documented in [ROADMAP.md](./ROADMAP.md)

---

## Security Best Practices for Users

### Wallet Security
- Use **hardware wallets** (Ledger, Trezor) for large amounts
- Never share your seed phrase or private key
- Use strong, unique passwords for MetaMask/wallet apps
- Enable 2FA on connected accounts (Gmail, Twitter for Privy)

### Safe Trading
- Start with **demo mode** (triple-click BYNOMO logo)
- Only deposit what you can afford to lose
- Verify treasury address matches official docs
- Check transaction details before confirming

### Reporting Suspicious Activity
If you notice suspicious activity (unauthorized withdrawals, balance discrepancies), immediately:
1. Email **amaansayyad2001@gmail.com**
2. Include wallet address, timestamp, transaction hash
3. Do NOT withdraw remaining funds (preserve evidence)

---

## Disclosure Policy

Bynomo follows **Coordinated Vulnerability Disclosure (CVD)**:

1. Security researcher reports vulnerability privately
2. Bynomo team confirms and develops fix
3. Fix is deployed (no public disclosure until patched)
4. Public disclosure 30 days after fix (credit to reporter)
5. Bug bounty paid (if applicable)

---

## Security Updates

Subscribe to security updates:
- **GitHub Watch**: Click "Watch" → "Custom" → "Security alerts"
- **Twitter**: [@BYNOMOProtocol](#) (coming soon)
- **Email**: security@bynomo.xyz (subscribe to mailing list)

---

## Contact

For non-security issues, use:
- **GitHub Issues**: [Report bugs or request features](https://github.com/0xamaan-dev/Bynomo/issues)
- **Discord**: [Join our community](#) (coming soon)
- **Email**: support@bynomo.xyz

---

**Last Updated:** February 27, 2026
