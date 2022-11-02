<script>
import { Buffer } from 'buffer'

export default {
  data() { return {
    links: [
      {
        url: 'https://jc.tn/tw',
        label: 'Twitter',
        icon: ['fab', 'twitter'],
      },
      {
        url: 'https://jc.tn/gh',
        label: 'Github',
        icon: ['fab', 'github'],
      },
      {
        url: 'https://jc.tn/ig',
        label: 'Instagram',
        icon: ['fab', 'instagram'],
      },
      {
        url: 'https://jc.tn/li',
        label: 'LinkedIn',
        icon: ['fab', 'linkedin'],
      },
      {
        url: 'https://jc.tn/md',
        label: 'Medium',
        icon: ['fab', 'medium'],
      },
      {
        url: 'https://jc.tn/pgp',
        label: 'GPGKey',
        icon: ['fa', 'key'],
      },
      {
        url: 'https://keybase.io/kidager',
        label: 'Keybase',
        icon: ['fab', 'keybase'],
      },
      {
        url: 'https://jc.tn/tg',
        label: 'Telegram',
        icon: ['fab', 'telegram'],
      },
      {
        url: Buffer.from('bWFpbHRvOg==', 'base64').toString() // mailto:
          + Buffer.from('ai5jb250YWN0QGNoYWllYi5tZQ==', 'base64').toString() // email address
          + '?subject=[Contact] Jacem Chaieb Website',
        label: 'Email',
        icon: ['fas', 'envelope']
      },
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
    ><font-awesome-icon :icon="link.icon" /></a>
  </section>
</template>

<style lang="scss" scoped>
section {
  margin: 1vw 0 2vw;

  a svg {
    color: $social-icons-color;
    width: 1em;
    margin: 0 5px;
  }
}
</style>
