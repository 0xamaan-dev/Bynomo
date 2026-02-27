## Bynomo developer notes

- Keep `.env` local and never commit secrets. Use `.env.example` as the reference template when sharing configuration.
- Run `yarn dev` for local iteration and `yarn test` / `yarn lint` before opening a pull request.
- Supabase migrations live under `supabase/migrations` and should be applied via the provided scripts, not edited in place on the database.
- When touching contracts or treasury logic, double‑check that the BNB treasury address matches the latest one in `bsc.address` and the docs.
- Prefer small, focused pull requests that keep the app deployable on BNB Chain at every commit.

