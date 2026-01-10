import { test, expect } from '@playwright/test'

const STORAGE_KEY = 'website-color-theme'

test.describe('Theme switcher', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('cycles through modes: system -> light -> dark -> system', async ({ page }) => {
    const colorSwitcher = page.locator('.color-switcher')

    // Start with system mode (default)
    await page.evaluate((key) => {
      localStorage.setItem(key, 'system')
    }, STORAGE_KEY)
    await page.reload()
    await page.waitForLoadState('networkidle')

    // Verify system icon is shown
    await expect(colorSwitcher.locator('svg')).toBeVisible()

    // Click to switch to light
    await colorSwitcher.click()
    await expect(page.locator('html')).toHaveClass(/light-theme/)

    // Click to switch to dark
    await colorSwitcher.click()
    await expect(page.locator('html')).toHaveClass(/dark-theme/)

    // Click to switch back to system
    await colorSwitcher.click()
    // System mode inherits from OS preference, could be light or dark
    const htmlClass = await page.locator('html').getAttribute('class')
    expect(htmlClass).toMatch(/light-theme|dark-theme/)
  })

  test('persists preference after page refresh', async ({ page }) => {
    // Set to dark mode
    await page.evaluate((key) => {
      localStorage.setItem(key, 'dark')
    }, STORAGE_KEY)
    await page.reload()
    await page.waitForLoadState('networkidle')

    // Verify dark mode is active
    await expect(page.locator('html')).toHaveClass(/dark-theme/)

    // Refresh the page
    await page.reload()
    await page.waitForLoadState('networkidle')

    // Verify dark mode persists
    await expect(page.locator('html')).toHaveClass(/dark-theme/)
  })

  test('applies correct theme class for each mode', async ({ page }) => {
    // Test light mode
    await page.evaluate((key) => {
      localStorage.setItem(key, 'light')
    }, STORAGE_KEY)
    await page.reload()
    await page.waitForLoadState('networkidle')
    await expect(page.locator('html')).toHaveClass(/light-theme/)

    // Test dark mode
    await page.evaluate((key) => {
      localStorage.setItem(key, 'dark')
    }, STORAGE_KEY)
    await page.reload()
    await page.waitForLoadState('networkidle')
    await expect(page.locator('html')).toHaveClass(/dark-theme/)
  })

  test('displays correct icon for each mode', async ({ page }) => {
    const colorSwitcher = page.locator('.color-switcher')

    // System mode
    await page.evaluate((key) => {
      localStorage.setItem(key, 'system')
    }, STORAGE_KEY)
    await page.reload()
    await page.waitForLoadState('networkidle')
    await expect(colorSwitcher).toHaveScreenshot('icon-system.png')

    // Light mode
    await page.evaluate((key) => {
      localStorage.setItem(key, 'light')
    }, STORAGE_KEY)
    await page.reload()
    await page.waitForLoadState('networkidle')
    await expect(colorSwitcher).toHaveScreenshot('icon-light.png')

    // Dark mode
    await page.evaluate((key) => {
      localStorage.setItem(key, 'dark')
    }, STORAGE_KEY)
    await page.reload()
    await page.waitForLoadState('networkidle')
    await expect(colorSwitcher).toHaveScreenshot('icon-dark.png')
  })
})
