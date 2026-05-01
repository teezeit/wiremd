import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: 'https://teezeit.github.io',
    ...devices['Desktop Chrome'],
  },
  projects: [{ name: 'chromium', use: devices['Desktop Chrome'] }],
})
