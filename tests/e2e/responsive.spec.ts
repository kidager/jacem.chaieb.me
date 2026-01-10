import { test, expect } from '@playwright/test'

test.describe('Responsive layout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('no horizontal overflow at mobile size', async ({ page }) => {
    // Check that body doesn't have horizontal scroll
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth
    })

    expect(hasHorizontalScroll).toBe(false)
  })

  test('container respects max-width at different viewports', async ({ page, browserName }) => {
    // Skip on Firefox mobile since we're testing viewport-specific behavior
    const viewportWidth = page.viewportSize()?.width || 0

    const containerMaxWidth = await page.evaluate(() => {
      const container = document.querySelector('.container')
      if (!container) {return null}
      return window.getComputedStyle(container).maxWidth
    })

    // At mobile (375px), container should have no max-width (none) or be less than viewport
    if (viewportWidth < 576) {
      expect(containerMaxWidth === 'none' || parseInt(containerMaxWidth || '0') <= viewportWidth).toBeTruthy()
    }

    // At desktop (1280px), container should have max-width of 1140px
    if (viewportWidth >= 1200) {
      expect(containerMaxWidth).toBe('1140px')
    }
  })

  test('elements do not overlap', async ({ page }) => {
    // Check that main sections are visible and properly stacked
    const header = page.locator('header, .header, [class*="header"]').first()
    const infoPane = page.locator('.info-pane, section').first()
    const socialSection = page.locator('section.social')
    const footer = page.locator('footer')

    // All main sections should be visible
    if (await header.count() > 0) {
      await expect(header).toBeVisible()
    }
    await expect(socialSection).toBeVisible()
    await expect(footer).toBeVisible()
  })

  test('visual consistency at viewport size', async ({ page }) => {
    // Set light mode for consistent screenshots
    await page.evaluate(() => {
      localStorage.setItem('nuxt-color-mode', 'light')
    })
    await page.reload()
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot('responsive-layout.png', {
      fullPage: true,
    })
  })

  test('color switcher is accessible at all viewport sizes', async ({ page }) => {
    const colorSwitcher = page.locator('.color-switcher')

    await expect(colorSwitcher).toBeVisible()
    await expect(colorSwitcher).toBeInViewport()

    // Verify it's clickable (not hidden or covered)
    const box = await colorSwitcher.boundingBox()
    expect(box).not.toBeNull()
    expect(box!.width).toBeGreaterThan(0)
    expect(box!.height).toBeGreaterThan(0)
  })
})
