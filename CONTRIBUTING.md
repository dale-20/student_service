# Frontend development standards

## Setup

```powershell
pnpm install --frozen-lockfile
Copy-Item .env.example .env
pnpm run dev
```

Set `NUXT_PUBLIC_API_BASE` to the Laravel API origin for the current environment. Never place a secret in a `NUXT_PUBLIC_*` variable.

## Quality commands

```powershell
pnpm run lint
pnpm run typecheck
pnpm run test
pnpm run build
```

Run all required checks with:

```powershell
pnpm run quality
```

The parent repository's CI must run `pnpm install --frozen-lockfile` followed by `pnpm run quality` from this directory. pnpm is the only supported JavaScript package manager.

## Definition of done

A frontend change is complete only when:

- linting, strict type-checking, tests, and the production build pass;
- changed behavior has appropriate tests;
- loading, empty, error, and success states are handled;
- forms correctly present Laravel validation errors;
- authorization is also enforced by Laravel;
- keyboard and screen-reader behavior has been considered;
- configuration contains no hard-coded environment URLs or secrets; and
- generated artifacts and local environment files remain untracked.

See `AGENTS.md` for the architecture and implementation rules that apply to every change.
