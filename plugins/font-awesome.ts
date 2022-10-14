import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faKey, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faGithub, faInstagram, faLinkedin, faMedium, faKeybase, faTelegram } from '@fortawesome/free-brands-svg-icons'

// This is important, we are going to let Nuxt.js worry about the CSS
config.autoAddCss = false

export default defineNuxtPlugin((nuxtApp) => {
  library.add(faTwitter, faGithub, faInstagram, faLinkedin, faMedium, faKeybase, faTelegram, faKey, faEnvelope)

  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})
