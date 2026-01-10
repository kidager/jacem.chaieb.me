import { test, expect } from '@playwright/test'

const expectedLinks = [
  { label: 'Github', url: 'https://jc.tn/gh' },
  { label: 'LinkedIn', url: 'https://jc.tn/li' },
  { label: 'Medium', url: 'https://jc.tn/md' },
  { label: 'GPGKey', url: 'https://jc.tn/pgp' },
  { label: 'Keybase', url: 'https://keybase.io/kidager' },
  { label: 'Telegram', url: 'https://jc.tn/tg' },
  { label: 'Email', url: 'https://jc.tn/c-email' },
]

test.describe('Links verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('all social links have correct href values', async ({ page }) => {
    const socialSection = page.locator('section.social')

    for (const link of expectedLinks) {
      const anchor = socialSection.locator(`a[aria-label="${link.label}"]`)
      await expect(anchor).toHaveAttribute('href', link.url)
    }
  })

  test('all social links open in new tab', async ({ page }) => {
    const socialSection = page.locator('section.social')

    for (const link of expectedLinks) {
      const anchor = socialSection.locator(`a[aria-label="${link.label}"]`)
      await expect(anchor).toHaveAttribute('target', '_blank')
    }
  })

  test('all social links have accessible aria-labels', async ({ page }) => {
    const socialSection = page.locator('section.social')
    const links = socialSection.locator('a')

    const count = await links.count()
    expect(count).toBe(expectedLinks.length)

    for (let i = 0; i < count; i++) {
      const ariaLabel = await links.nth(i).getAttribute('aria-label')
      expect(ariaLabel).toBeTruthy()
      expect(ariaLabel!.length).toBeGreaterThan(0)
    }
  })
})
