import { defineNuxtConfig } from  'nuxt/config';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  title: 'Jacem Chaieb',
  meta: {
    charset: 'utf-8',
  },
  typescript: {
    strict: true,
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width,initial-scale=1',
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
      title: 'Jacem Chaieb',
      meta: [
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: '#eff1f5' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#1e1e2e' },
        { name: 'viewport', content: 'width=device-width,initial-scale=1' },
        { name: 'description', content: 'The personal website of Jacem Chaieb, an IT engineer currently focusing on PHP and architecture.' },
        { name: 'keywords', content: 'jacem,chaieb,developer,laravel,php,hugo,minimalist,blog,enis,kidager,jchaieb,zenchef,resengo,formitable,ankor,ankorstore,spark-it,bulldozer,kebili,tunis,sfax,tunisia,paris,france,cairo,egypt' }
      ],
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use '@/assets/style/global/colors' as *;
            @use '@/assets/style/global/breakpoints' as *;
            @use '@/assets/style/global/fonts' as *;
            @use '@/assets/style/global/reboot' as *;
          `
        }
      }
    }
  },
  modules: [
    '@nuxtjs/color-mode'
  ],
  colorMode: {
    preference: 'system',
    fallback: 'light',
    hid: 'website-color-theme-script',
    globalName: '__WEBSITE_COLOR_THEME__',
    componentName: 'ColorScheme',
    classSuffix: '-theme',
    storageKey: 'website-color-theme'
  },
  experimental: {
    // temporarely disable app manifests to correctly build the gh-pages package
    // see https://github.com/nuxt/nuxt/issues/30367
    appManifest: false,
  },
  server: {
    hmr: {
      url: 'https://jacem.dev.localhost',
    }
  }
})
