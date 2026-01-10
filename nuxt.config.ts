import { defineNuxtConfig } from 'nuxt/config';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
            @use '@/assets/style/global/fonts' as *;
          `
        }
      }
    },
    server: {
      hmr: {
        clientPort: 443,
        host: 'jacem.dev.localhost',
        protocol: 'wss',
      }
    },
    build: {
      cssMinify: true,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: undefined,
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

  compatibilityDate: '2025-01-10',
})
