import { spawn, spawnSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'

// Each run gets a new SQLite file. The application's configured database is never used.
const directory = resolve('.data')
mkdirSync(directory, { recursive: true })
const database = resolve(directory, `api-e2e-${process.pid}-${Date.now()}.sqlite`)
writeFileSync(database, '', { flag: 'wx' })
const apiRoot = resolve('../student_service-api')
const discovered = process.platform === 'win32'
  ? spawnSync('powershell.exe', ['-NoProfile', '-Command', "php -r 'echo PHP_BINARY;'"], { encoding: 'utf8' })
  : spawnSync('php', ['-r', 'echo PHP_BINARY;'], { encoding: 'utf8' })
if (discovered.status !== 0) throw new Error(`PHP must be available on PATH to run API browser tests. ${discovered.stderr || discovered.error?.message || ''}`)
const php = discovered.stdout.trim()
const env = {
  ...process.env,
  APP_ENV: 'testing',
  APP_DEBUG: 'false',
  APP_CONFIG_CACHE: resolve(directory, `unused-e2e-config-${process.pid}.php`),
  DB_CONNECTION: 'sqlite',
  DB_DATABASE: database,
  DB_URL: '',
  SESSION_DRIVER: 'database',
  SESSION_DOMAIN: '',
  SESSION_COOKIE: 'studentis_e2e_session',
  CACHE_STORE: 'array',
  MAIL_MAILER: 'array',
  QUEUE_CONNECTION: 'sync',
  SANCTUM_STATEFUL_DOMAINS: '127.0.0.1:3100',
  FRONTEND_URLS: 'http://127.0.0.1:3100',
  APP_URL: 'http://127.0.0.1:8100',
}
for (const command of [['migrate', '--force'], ['db:seed', '--force']]) {
  const result = spawnSync(php, ['artisan', ...command], { cwd: apiRoot, env, stdio: 'inherit' })
  if (result.status !== 0) throw new Error('Isolated API test database setup failed.')
}
const server = spawn(php, ['artisan', 'serve', '--host=127.0.0.1', '--port=8100', '--no-reload'], { cwd: apiRoot, env, stdio: 'inherit' })
server.on('exit', code => process.exit(code ?? 0))
process.on('SIGTERM', () => server.kill())
process.on('SIGINT', () => server.kill())
