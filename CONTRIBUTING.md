# Contributing to Bynomo

**Thank you for your interest in contributing to Bynomo!**

We welcome contributions from developers, designers, traders, and community members. This guide will help you get started.

---

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [How to Contribute](#how-to-contribute)
3. [Development Setup](#development-setup)
4. [Coding Standards](#coding-standards)
5. [Commit Guidelines](#commit-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Bug Reports](#bug-reports)
8. [Feature Requests](#feature-requests)

---

## Code of Conduct

By participating in this project, you agree to maintain a respectful, inclusive, and professional environment. We do not tolerate harassment, discrimination, or toxic behavior.

**Core principles:**
- Be respectful and constructive in discussions
- Focus on the code and ideas, not individuals
- Welcome newcomers and help them learn
- Give credit where credit is due

---

## How to Contribute

There are many ways to contribute to Bynomo:

### For Developers
- **Bug fixes**: Fix issues, improve error handling
- **New features**: Asset support, UI improvements, analytics
- **Performance**: Optimize rendering, reduce bundle size
- **Testing**: Add unit tests, integration tests, E2E tests
- **Documentation**: Improve README, add code comments, write guides

### For Designers
- **UI/UX improvements**: Enhance trading interface, mobile experience
- **Marketing assets**: Create graphics, animations, explainer videos
- **Branding**: Design system improvements, icon sets

### For Traders
- **Feedback**: Report bugs, suggest UX improvements
- **Beta testing**: Test new features before release
- **Asset suggestions**: Propose new Pyth price feeds to add

### For Community Members
- **Evangelism**: Share Bynomo on social media, write reviews
- **Support**: Help new users on Discord/Telegram
- **Localization**: Translate UI to other languages

---

## Development Setup

See [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) for detailed setup instructions.

**Quick start:**

```bash
# 1. Fork the repo on GitHub
# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/Bynomo.git
cd Bynomo

# 3. Install dependencies
yarn install

# 4. Set up environment
cp .env.example .env
# Edit .env with your Supabase and Privy credentials

# 5. Run development server
yarn dev
```

---

## Coding Standards

### Linting

- Run **`yarn lint`** before committing. The project uses ESLint with `eslint-config-next` (see [eslint.config.mjs](./eslint.config.mjs)).
- Fix any reported issues; the codebase should stay clean and consistent for judges and contributors.

### TypeScript

- **Use strict types**: Avoid `any`, prefer `unknown` for unsafe data
- **Add JSDoc comments** for public functions
- **Keep functions small**: <50 lines per function ideal
- **Use descriptive names**: `fetchUserBalance` not `getUB`

**Example:**

```typescript
/**
 * Fetch house balance for a user from Supabase
 * @param address - User's wallet address (lowercase)
 * @returns Promise resolving to balance in BNB
 */
async function fetchBalance(address: string): Promise<number> {
  const { data, error } = await supabase
    .from('user_balances')
    .select('balance')
    .eq('user_address', address.toLowerCase())
    .single();
  
  if (error) throw new Error(`Failed to fetch balance: ${error.message}`);
  return parseFloat(data.balance);
}
```

### React

- **Use functional components** with hooks
- **Prefer composition over inheritance**
- **Keep components focused**: One responsibility per component
- **Memoize expensive computations**: Use `useMemo`, `useCallback`
- **Avoid prop drilling**: Use Zustand store or context

**Example:**

```tsx
export const BetCard: React.FC<{ bet: BetRecord }> = React.memo(({ bet }) => {
  const formattedAmount = useMemo(() => bet.amount.toFixed(4), [bet.amount]);
  
  return (
    <div className="bet-card">
      <span>{bet.asset}</span>
      <span>{formattedAmount} BNB</span>
    </div>
  );
});
```

### Styling

- **Use Tailwind CSS** utility classes
- **Follow responsive design**: Mobile-first approach
- **Keep animations smooth**: 60fps target
- **Use design tokens**: Colors, spacing from Tailwind config

**Example:**

```tsx
<button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-xl text-white font-bold transition-all active:scale-95">
  Place Bet
</button>
```

---

## Commit Guidelines

We use **Conventional Commits** for clear, semantic commit messages.

### Format

```
<type>(<scope>): <short description>

<optional body>

<optional footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style (formatting, whitespace)
- `refactor`: Code refactoring (no functional change)
- `perf`: Performance improvements
- `test`: Add or update tests
- `chore`: Build config, dependencies

### Examples

```bash
feat(game): add Blitz mode with 2x multipliers
fix(balance): resolve race condition in deposit flow
docs(readme): add scalability architecture section
refactor(wallet): simplify BNB-only connection logic
test(api): add integration tests for bet history endpoint
```

---

## Pull Request Process

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 2. Make Your Changes

- Follow [Coding Standards](#coding-standards)
- Add tests for new features
- Update documentation if needed

### 3. Test Locally

```bash
# Run tests
npm run test

# Run linter
npm run lint

# Build to verify no errors
npm run build
```

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat(scope): description"
```

### 5. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 6. Open a Pull Request

- Go to GitHub and click "New Pull Request"
- Fill out the PR template:
  - **Title**: Same as commit message
  - **Description**: What, why, how
  - **Screenshots**: For UI changes
  - **Testing**: How you tested it
  - **Checklist**: Mark completed items

### 7. Code Review

- Maintainers will review within 48 hours
- Address feedback by pushing new commits
- Once approved, your PR will be merged!

---

## Bug Reports

**Before submitting**, please:
1. Search existing issues to avoid duplicates
2. Check if bug exists on latest version
3. Test in clean environment (incognito mode)

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment**
- OS: [e.g. macOS 14.0]
- Browser: [e.g. Chrome 120]
- Wallet: [e.g. MetaMask 11.0]
- Network: [BNB Testnet / Mainnet]

**Additional context**
Any other relevant information.
```

---

## Feature Requests

We love new ideas! Use GitHub Issues with the `enhancement` label.

### Feature Request Template

```markdown
**Is your feature related to a problem?**
Describe the problem or pain point.

**Proposed solution**
Describe your proposed feature.

**Alternatives considered**
Other solutions you've thought about.

**Additional context**
Mockups, references, examples.
```

---

## Testing Guidelines

### Unit Tests

- Test individual functions in isolation
- Mock external dependencies (Supabase, Pyth)
- Aim for >80% code coverage

```typescript
// Example: lib/utils/__tests__/formatters.test.ts
describe('formatBalance', () => {
  it('should format balance to 4 decimals', () => {
    expect(formatBalance(1.23456789)).toBe('1.2346');
  });
});
```

### Integration Tests

- Test API routes end-to-end
- Use test database (separate from production)

```typescript
// Example: app/api/balance/__tests__/deposit.test.ts
describe('POST /api/balance/deposit', () => {
  it('should credit balance after deposit', async () => {
    const response = await fetch('/api/balance/deposit', {
      method: 'POST',
      body: JSON.stringify({ userAddress: '0x123', amount: 1, txHash: '0xabc' })
    });
    expect(response.status).toBe(200);
  });
});
```

---

## Recognition

Contributors will be recognized in:
- **README.md** - "Contributors" section
- **GitHub releases** - "Thanks to @username" notes
- **Discord** - Special "Contributor" role
- **Future token airdrop** (if/when BYNOMO token launches)

---

## Getting Help

- **Discord**: [Join our server](#) (coming soon)
- **GitHub Discussions**: [Ask questions](https://github.com/0xamaan-dev/Bynomo/discussions)
- **Email**: contact@bynomo.xyz (for security issues)

---

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).

---

**Happy coding! 🚀**
