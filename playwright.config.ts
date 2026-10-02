import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './test/e2e',
  fullyParallel: false,
  workers: 1,
  timeout: 60000,
  expect: { timeout: 15000 },
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:3100', trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'], channel: 'chrome' } }],
  webServer: [
    { command: 'node test/e2e/start-api.mjs', url: 'http://127.0.0.1:8100/up', timeout: 120000, reuseExistingServer: false },
    {
      command: 'pnpm run dev --host 127.0.0.1 --port 3100',
      url: 'http://127.0.0.1:3100/login',
      timeout: 120000,
      reuseExistingServer: false,
      env: { NUXT_PUBLIC_API_BASE: 'http://127.0.0.1:8100/api/v1', NUXT_PUBLIC_BACKEND_ORIGIN: 'http://127.0.0.1:8100' },
    },
  ],
})
