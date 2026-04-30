import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: 'https://tobiashoelzer.com',
    ...devices['Desktop Chrome'],
  },
  projects: [{ name: 'chromium', use: devices['Desktop Chrome'] }],
})
