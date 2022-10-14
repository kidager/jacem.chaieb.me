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
        { name: 'theme-color', content: '#ffffff' },
        { name: 'viewport', content: 'width=device-width,initial-scale=1' },
        { name: 'description', content: 'The personal website of Jacem Chaieb, an IT engineer currently focusing on PHP and architecture.' },
        { name: 'keywords', content: 'jacem,chaieb,developer,hugo,minimalist,blog,enis,kidager,jchaieb,spark-it,bulldozer,kebili,tunis,sfax,tunisia,paris,france,cairo,egypt' }
      ],
    }
  },
  build: {
    transpile: [
      '@fortawesome/vue-fontawesome',
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/free-regular-svg-icons',
      '@fortawesome/free-brands-svg-icons'
    ]
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/style/global/variables.scss" as *;'
        }
      }
    }
  },
  // theme: {
  //   dark: true,
  //   colors: {
  //     primary: '#ff0000'
  //   }
  // },
  server: {
    hmr: {
      url: 'https://jacem.dev.localhost',
    }
  }
})
