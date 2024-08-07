<script>
import IconEmail from '@/components/icons/social/IconEmail.vue'
import IconGithub from '@/components/icons/social/IconGithub.vue'
import IconGPGKey from '@/components/icons/social/IconGPGKey.vue'
import IconKeybase from '@/components/icons/social/IconKeybase.vue'
import IconLinkedIn from '@/components/icons/social/IconLinkedIn.vue'
import IconMedium from '@/components/icons/social/IconMedium.vue'
import IconTelegram from '@/components/icons/social/IconTelegram.vue'

export default {
  data() { return {
    links: [
      {icon: IconGithub,   label: 'Github',   url: 'https://jc.tn/gh'},
      {icon: IconLinkedIn, label: 'LinkedIn', url: 'https://jc.tn/li'},
      {icon: IconMedium,   label: 'Medium',   url: 'https://jc.tn/md'},
      {icon: IconGPGKey,   label: 'GPGKey',   url: 'https://jc.tn/pgp'},
      {icon: IconKeybase,  label: 'Keybase',  url: 'https://keybase.io/kidager'},
      {icon: IconTelegram, label: 'Telegram', url: 'https://jc.tn/tg'},
      {icon: IconEmail,    label: 'Email',    url: 'https://jc.tn/c-email'},
    ],
  }},
}
</script>

<template>
  <section class="text-center social">
    <hr>
    <a
      v-for="link in links"
      :key="link.url"
      :href="link.url"
      :aria-label="link.label"
      target="_blank"
    ><component :is="{...link.icon}" /></a>
  </section>
</template>

<style lang="scss" scoped>
section {
  margin: 1vw 0 2vw;

  a svg {
    color: $social-icons-color;
    height: 1.5em;
    width: auto;
    margin: 0 5px;

    .dark-theme & {
      color: $dark-social-icons-color;
    }
  }
}
</style>
