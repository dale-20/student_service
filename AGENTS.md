# Student Service Frontend Rules

These rules apply to every change in this Nuxt application.

## Required quality gate

- Use pnpm exclusively. Do not create npm or Yarn lockfiles.
- Run `pnpm run quality` before considering a change complete.
- Do not suppress lint or TypeScript errors without a documented, narrow reason.
- Add or update tests whenever behavior changes or a defect is fixed.
- Never commit `.env`, credentials, generated `.nuxt` files, `.output`, or `node_modules`.

## Architecture

- Use Nuxt 4 conventions and keep application code under `app/`.
- Use pages for route composition, components for presentation, composables for reusable stateful behavior, and utilities for pure functions.
- Organize business UI by feature as the application grows. Keep `components/base/` for truly reusable primitives only.
- Laravel is the source of truth for validation, authorization, and business rules. Frontend checks improve UX but never replace backend enforcement.
- Use one typed API client/composable for the Laravel API. Do not repeat base URLs, auth behavior, or common error handling in pages.
- Use `useFetch` or `useAsyncData` for initial/SSR data and `$fetch` for event-driven mutations.
- Store environment-dependent values in `runtimeConfig`; only intentionally public values belong under `runtimeConfig.public`.

## Vue and TypeScript

- Prefer `<script setup lang="ts">` and the Composition API.
- Keep strict TypeScript enabled. Avoid `any`; model API payloads, resources, pagination, and validation errors explicitly.
- Keep component props and emitted events typed.
- Use `useState` only for small shared client state. Add a state library only when complexity justifies it.
- Never render untrusted HTML with `v-html`.
- Preserve SSR safety: browser APIs and DOM side effects belong in client-only code or `onMounted`.

## User experience

- Every asynchronous view needs intentional loading, empty, error, and success states.
- Forms must display Laravel `422` field errors and prevent accidental duplicate submission.
- Use semantic HTML, keyboard-accessible controls, associated labels, visible focus states, and meaningful alternative text.
- Nuxt route middleware may control navigation UX, but Laravel policies remain the authorization boundary.

## Testing

- Put pure utility tests in `test/unit/`.
- Put tests requiring Nuxt runtime behavior in `test/nuxt/`.
- Add end-to-end coverage for critical user journeys when those journeys are implemented.
- Test observable behavior rather than implementation details.
