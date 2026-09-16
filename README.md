# Student Service Frontend

The Nuxt 4 frontend for the Student Service application. Laravel is maintained separately in `../student_service-api` and is the source of truth for data, validation, authentication, authorization, and business rules.

## Local development

```powershell
pnpm install --frozen-lockfile
Copy-Item .env.example .env
pnpm run dev
```

The application is available at `http://localhost:3000` by default. Configure the Laravel origin with `NUXT_PUBLIC_API_BASE` in `.env`.

## Quality gate

```powershell
pnpm run quality
```

This runs ESLint, strict TypeScript checking, Vitest, and a production Nuxt build. All four checks must pass before a change is complete.

Development conventions and the definition of done are documented in [CONTRIBUTING.md](CONTRIBUTING.md). Rules for coding agents are in [AGENTS.md](AGENTS.md).
