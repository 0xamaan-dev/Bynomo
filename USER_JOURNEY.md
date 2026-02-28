## User Journey

This document walks through the **end‑to‑end journey** for a typical Bynomo trader, from first touch to power user.

---

## 1. First-Time Onboarding

```mermaid
flowchart TD
    A[Discover Bynomo] --> B[Land on Homepage]
    B --> C[Connect Wallet or Social Login]
    C --> D["Sign Message (non-custodial auth)"]
    D --> E["Create Profile & House Balance Record"]
    E --> F["Guided Tour (Classic & Box)"]
    F --> G[Prompt to Deposit BNB]
```

**Narrative**

- **Discovery**: User arrives from X/Twitter, TG communities, BNB Chain ecosystem pages, or referral links.
- **Trust building**: The homepage shows treasury address, audit/security links, and live markets.
- **Access**: User chooses MetaMask / WalletConnect / Privy social login; a signed message creates a **Supabase profile + house balance**.
- **Education**: Optional guided tour highlights Classic vs Box, treasury model, and oracle-based settlement before any deposit.

---

## 2. Deposit & Funding

```mermaid
sequenceDiagram
    participant U as User
    participant UI as Bynomo UI
    participant W as Wallet
    participant T as BNB Treasury
    participant DB as Supabase

    U->>UI: Click "Deposit"
    UI->>U: Show treasury address + risk disclosure
    UI->>W: Trigger BNB transfer request
    W->>T: Send BNB to treasury
    T-->>UI: Tx hash + confirmation
    UI->>DB: Credit house balance for wallet
    DB-->>UI: Updated balance
    UI-->>U: Balance updated, ready to trade
```

**Key Moments**

- User chooses an amount (e.g. 0.2 BNB).
- UI displays estimated **rounds or tiles** they can play with that amount.
- Once confirmed on-chain, house balance updates instantly and becomes the **single source of truth** for all bets.

---

## 3. Classic Mode Trade Journey

```mermaid
flowchart TD
    A[House Balance Ready] --> B["Select Asset (e.g. BTC/USDT)"]
    B --> C["Choose Round Duration (5s–1m)"]
    C --> D[Up or Down]
    D --> E[Enter Stake in BNB]
    E --> F[Confirm Bet]
    F --> G[Price Stream from Pyth Hermes]
    G --> H[Wait for Expiry]
    H --> I{Price Higher or Lower?}
    I -->|Win| J["Credit Winnings to House Balance"]
    I -->|Lose| K["Debit Stake from House Balance"]
    J --> L["View History & Share PnL"]
    K --> L
```

**Micro-journey**

- User experiments with small stakes first (e.g. 0.001–0.005 BNB).
- UI shows **live price, countdown, and potential payout**.
- After several wins/losses, user views **PnL, hit-rate, and streaks** in the profile dashboard.

---

## 4. Box Mode Trade Journey

```mermaid
flowchart TD
    A[House Balance Ready] --> B[Open Box Mode]
    B --> C["View Tiled Chart with Multipliers"]
    C --> D["Tap Tile(s) with Desired Multiplier"]
    D --> E[Enter Total Stake]
    E --> F[Confirm Bet]
    F --> G[Price Stream from Pyth Hermes]
    G --> H[Timer Countdown]
    H --> I{Price Touches Tile?}
    I -->|Yes| J["Win: Payout = Stake x Multiplier"]
    I -->|No| K["Loss: Stake Burned"]
    J --> L[Credit Winnings to House Balance]
    K --> L
```

**Player Behaviour**

- Box Mode is optimized for **higher excitement** and **social sharing** (big multipliers).
- Users often play multiple tiles or sessions in a row.
- Leaderboards and streaks can highlight **largest multiplier hits** to drive virality.

---

## 5. Withdrawal Journey

```mermaid
sequenceDiagram
    participant U as User
    participant UI as Bynomo UI
    participant DB as Supabase
    participant T as BNB Treasury
    participant W as Wallet

    U->>UI: Click "Withdraw"
    UI->>DB: Check house balance and cooldown
    DB-->>UI: Eligible amount
    U->>UI: Confirm withdrawal amount
    UI->>DB: Debit balance and create payout request
    DB->>T: Sign and send on-chain transfer
    T-->>W: Send BNB to user address
    W-->>U: BNB received in wallet
    UI-->>U: Status updated to "Completed"
```

**User Outcome**

- User can **exit fully** (0 balance) or **partially** (keep some for next sessions).
- UI encourages **re-deposit or re-engagement** via streaks, quests, or upcoming market events.

---

## 6. Lifecycle Stages

```mermaid
flowchart LR
    A[Visitor] --> B[First-time Player]
    B --> C[Engaged Trader]
    C --> D[Power User / Referrer]
    D --> E[Community Member / Governance]
```

- **Visitor**: Cold traffic, campaign clicks, or organic search.
- **First‑time Player**: Completes at least one deposit + 3 trades.
- **Engaged Trader**: Weekly active, tracks PnL, uses both Classic and Box.
- **Power User / Referrer**: High volume, uses referral links, participates in promos.
- **Community Member**: Engaged in governance, feedback loops, and long‑term roadmap.

