# Claude Code Instructions

## Project Overview

Personal website for Jacem Chaieb - a minimalist single-page site built with Nuxt 3.

## Tech Stack

- **Framework**: Nuxt 3 (Vue 3)
- **Styling**: SCSS with CSS variables
- **Color Mode**: `@nuxtjs/color-mode` (system/light/dark)
- **Testing**: Playwright (visual + e2e)
- **Deployment**: Firebase Hosting
- **Package Manager**: Yarn

## Development Environment

This project uses Docker for development. Always use `just` commands instead of running yarn directly.

### Common Commands

```bash
just up              # Start containers
just logs            # View logs
just yarn <cmd>      # Run yarn commands in container
just sh              # Shell into container
just test            # Run Playwright e2e tests
just test-update-snapshots  # Update baseline screenshots
just eslint          # Run eslint
just stylelint       # Run stylelint
```

### Local URLs

- Dev server: http://localhost:3000 (inside container)
- HMR configured for: https://jacem.dev.localhost

## Project Structure

```
app.vue                    # Main app entry
components/
├── ColorSwitcher.vue      # Theme toggle (system/light/dark)
├── Header.vue             # Page header
├── Footer.vue             # Page footer
├── FullName.vue           # Name display
├── InfoPane.vue           # Bio section
├── ProfilePicture.vue     # Avatar
└── SocialPane.vue         # Social links
assets/style/global/       # SCSS variables (colors, breakpoints, fonts)
tests/e2e/                 # Playwright tests
tests/screenshots/         # Visual regression baselines
```

## Color Mode

The site uses `@nuxtjs/color-mode` with custom configuration:

- **Storage key**: `website-color-theme`
- **Class suffix**: `-theme` (results in `light-theme`, `dark-theme`)
- **Modes**: system, light, dark
- **Cycle order**: system → light → dark → system

To test theme in Playwright:
```typescript
await page.evaluate(() => {
  localStorage.setItem('website-color-theme', 'dark')
})
await page.reload()
```

## Responsive Breakpoints

Defined in `assets/style/global/_breakpoints.scss`:
- 576px, 768px, 992px, 1200px

Test viewports: 375px (mobile), 1280px (desktop)

## Testing

### Test Files

- `visual.spec.ts` - Full page screenshots (light/dark modes)
- `theme.spec.ts` - Color mode toggle functionality
- `links.spec.ts` - Social link verification
- `responsive.spec.ts` - Layout at different viewports

### Running Tests

```bash
just test                    # Run all tests
just test-update-snapshots   # Update baselines after intentional changes
just test tests/e2e/theme.spec.ts  # Run specific test file
```

### CI

Tests run on every PR via `.github/workflows/e2e-tests.yml`

## Social Links

Links use `jc.tn` shortlinks. The email link redirects to `mailto:` and cannot be HTTP-fetched.

## Code Conventions

- Vue components use `<script setup>` where possible
- SCSS variables imported globally via `nuxt.config.ts`
- Dark mode styles use `.dark-theme &` selector
- All social links open in new tab with `aria-label`

## Deployment

- **Preview**: Auto-deploys PRs to Firebase preview channel
- **Production**: Deploys on merge to main via release-please
