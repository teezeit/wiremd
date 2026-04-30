import { test, expect } from '@playwright/test'

const DOCS_URL = '/wiremd/guide/overview.html'

test('editor nav link resolves to /wiremd/editor/ without base doubling', async ({ page }) => {
  await page.goto(DOCS_URL)
  await page.waitForLoadState('networkidle')

  const editorHref = await page.locator('nav a:has-text("Editor")').first().getAttribute('href')
  expect(editorHref).toBe('/wiremd/editor/')
})

test('logo click from docs navigates to landing page', async ({ page }) => {
  await page.goto(DOCS_URL)
  await page.waitForLoadState('networkidle')

  await page.locator('.VPNavBarTitle a').first().click()
  await page.waitForLoadState('networkidle')

  expect(page.url()).toBe('https://tobiashoelzer.com/wiremd/')
  await expect(page.locator('.ln')).toBeVisible()   // landing nav
  await expect(page.locator('.VPNav')).toHaveCount(0) // no vitepress nav
})

test('editor opens from docs nav', async ({ page, context }) => {
  await page.goto(DOCS_URL)
  await page.waitForLoadState('networkidle')

  const [editorPage] = await Promise.all([
    context.waitForEvent('page'),
    page.locator('nav a:has-text("Editor")').first().click(),
  ])
  await editorPage.waitForLoadState('networkidle')

  expect(editorPage.url()).toContain('/wiremd/editor/')
  await expect(editorPage.locator('#monaco-container')).toBeVisible()
})
