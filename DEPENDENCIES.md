# Dependencies & Credits

Bynomo is built with open-source dependencies. This document lists all runtime and development dependencies with credits and licenses where applicable.

**License:** This project is [MIT licensed](./LICENSE). Third-party packages have their own licenses; see `node_modules/<package>/LICENSE` or their repositories.

---

## Core application

| Package | Version | Purpose | Link / Credit |
|--------|---------|---------|----------------|
| **next** | 16.x | React framework, SSR, API routes | [nextjs.org](https://nextjs.org/) |
| **react** / **react-dom** | 19.x | UI library | [react.dev](https://react.dev/) |
| **typescript** | 5.x | Type safety | [typescriptlang.org](https://www.typescriptlang.org/) |

---

## Frontend & UI

| Package | Purpose | Credit |
|---------|---------|--------|
| **tailwindcss** | Utility-first CSS | [tailwindcss.com](https://tailwindcss.com/) |
| **framer-motion** | Animations | [framer.com/motion](https://www.framer.com/motion/) |
| **recharts** | Charts (price, Box mode) | [recharts.org](https://recharts.org/) |
| **lucide-react** | Icons | [lucide.dev](https://lucide.dev/) |
| **zustand** | Global state (prices, rounds, UI) | [github.com/pmndrs/zustand](https://github.com/pmndrs/zustand) |
| **@tanstack/react-query** | Server state & caching | [tanstack.com/query](https://tanstack.com/query/latest) |

---

## Blockchain & wallet (BNB Chain)

| Package | Purpose | Credit |
|---------|---------|--------|
| **wagmi** | React hooks for Ethereum/BNB | [wagmi.sh](https://wagmi.sh/) |
| **viem** | Low-level chain interaction | [viem.sh](https://viem.sh/) |
| **ethers** | Legacy/compat for BNB transfers | [docs.ethers.org](https://docs.ethers.org/) |
| **connectkit** | Wallet connection UI (MetaMask, WalletConnect) | [connectkit.com](https://connectkit.com/) |
| **@privy-io/react-auth** | Social login & embedded wallets | [privy.io](https://privy.io/) |

---

## Oracle & data

| Package | Purpose | Credit |
|---------|---------|--------|
| **@pythnetwork/hermes-client** | Real-time price feeds for settlement | [Pyth Network](https://pyth.network/) |
| **@supabase/supabase-js** | Database, auth, realtime | [supabase.com](https://supabase.com/) |

---

## Backend & tooling

| Package | Purpose | Credit |
|---------|---------|--------|
| **@vercel/analytics** | Analytics (optional) | [vercel.com](https://vercel.com/) |
| **@vercel/speed-insights** | Performance insights (optional) | [vercel.com](https://vercel.com/) |

---

## Additional dependencies (from package.json)

- **d3-scale**, **d3-shape** — Chart scales and shapes (Recharts/custom charts).
- **rxjs** — Reactive streams (Pyth Hermes).
- **face-api.js** — Face detection (GridScan).
- **three**, **ogl**, **postprocessing** — 3D/WebGL (GridScan, RippleGrid).

---

## Development dependencies

| Package | Purpose |
|---------|---------|
| **eslint** / **eslint-config-next** | Linting and code quality |
| **jest** / **@testing-library/react** / **@testing-library/jest-dom** | Unit and component tests |
| **supabase** (CLI) | Migrations and local Supabase |
| **ts-node** | Running TypeScript scripts |
| **fast-check** | Property-based testing |

---

## External services (not npm packages)

- **BNB Chain (BSC)** — Network for deposits, withdrawals, treasury. [bnbchain.org](https://www.bnbchain.org/)
- **Pyth Hermes** — Oracle price feeds. [pyth.network](https://pyth.network/)
- **Supabase** — Hosted PostgreSQL. [supabase.com](https://supabase.com/)
- **WalletConnect** — Wallet connection protocol. [walletconnect.com](https://walletconnect.com/)
- **Privy** — Social login / embedded wallets. [privy.io](https://privy.io/)

---

## Summary

All dependencies are declared in `package.json`. Install with:

```bash
yarn install
```

No secrets or API keys are bundled; configuration is via `.env` (see [.env.example](./.env.example) and [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)).
