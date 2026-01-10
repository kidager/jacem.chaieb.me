import { test, expect } from '@playwright/test'

test.describe('Visual regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('light mode full page', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('nuxt-color-mode', 'light')
    })
    await page.reload()
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot('full-page-light.png', {
      fullPage: true,
    })
  })

  test('dark mode full page', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('nuxt-color-mode', 'dark')
    })
    await page.reload()
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot('full-page-dark.png', {
      fullPage: true,
    })
  })
})
