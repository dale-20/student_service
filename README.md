# Student Service Frontend

The Nuxt 4 frontend for the Student Service application. Laravel is maintained separately in `../student_service-api` and is the source of truth for data, validation, authentication, authorization, and business rules.

## Local development

```powershell
pnpm install --frozen-lockfile
Copy-Item .env.example .env
pnpm run dev
```

The application is available at `http://localhost:3000` by default. Configure `NUXT_PUBLIC_BACKEND_ORIGIN` and the versioned `NUXT_PUBLIC_API_BASE` in `.env`.

## Frontend architecture

The application enforces separation of concerns:

- `app/pages/` composes routes and feature screens.
- `app/components/` contains presentation grouped by feature or reusable responsibility.
- `app/composables/` owns shared state, API workflows, URL query state, and notifications.
- `app/config/` centralizes navigation and UI access rules.
- `app/types/` defines API, domain, form, navigation, and table contracts.
- `app/utils/` contains pure formatting, validation, and status-mapping functions.

Laravel remains the authorization, validation, business-rule, and persistence boundary. Nuxt middleware and role-aware navigation only improve the user experience.

## API authentication

The Laravel origin defaults to `http://localhost:8000`, and the API base defaults to `http://localhost:8000/api/v1`:

```env
NUXT_PUBLIC_BACKEND_ORIGIN=http://localhost:8000
NUXT_PUBLIC_API_BASE=http://localhost:8000/api/v1
```

The centralized API client uses Sanctum's first-party CSRF cookie and credentialed session requests. During local development it aligns the `localhost` and `127.0.0.1` aliases with the hostname used to open Nuxt, because cookies set for one alias are not visible from the other. Authentication secrets are never stored in browser storage. Configure the same frontend origins and stateful domains in the Laravel environment.

## Quality gate

```powershell
pnpm run quality
```

This runs ESLint, strict TypeScript checking, Vitest, and a production Nuxt build. All four checks must pass before a change is complete.

Development conventions and the definition of done are documented in [CONTRIBUTING.md](CONTRIBUTING.md). Rules for coding agents are in [AGENTS.md](AGENTS.md).
