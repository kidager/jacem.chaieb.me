<template>
  <div>
    <section id="social-pane" class="text-center social">
      <a href="https://jc.tn/tw" aria-label="Twitter" target="_blank">
        <font-awesome-icon :icon="['fab', 'twitter']" />
      </a>
      <a href="https://jc.tn/gh" aria-label="Github" target="_blank">
        <font-awesome-icon :icon="['fab', 'github']" />
      </a>
      <a href="https://jc.tn/ig" aria-label="Instagram" target="_blank">
        <font-awesome-icon :icon="['fab', 'instagram']" />
      </a>
      <a href="https://jc.tn/li" aria-label="LinkedIn" target="_blank">
        <font-awesome-icon :icon="['fab', 'linkedin']" />
      </a>
      <a href="https://jc.tn/md" aria-label="Medium" target="_blank">
        <font-awesome-icon :icon="['fab', 'medium']" />
      </a>
      <a href="https://jc.tn/pgp" aria-label="GPGKey" target="_blank">
        <font-awesome-icon :icon="['fa', 'key']" />
      </a>
      <a href="https://keybase.io/kidager" aria-label="Keybase" target="_blank">
        <font-awesome-icon :icon="['fab', 'keybase']" />
      </a>
      <a href="https://jc.tn/tg" aria-label="Telegram" target="_blank">
        <font-awesome-icon :icon="['fab', 'telegram']" />
      </a>
      <a href="mailto:j.contact@chaieb.me" aria-label="Email">
        <font-awesome-icon :icon="['fas', 'envelope']" />
      </a>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.social {
  margin-top: 10px;
  margin-bottom: 20px;
  a {
    color: #526d7a;
    svg {
      width: 1em;
      margin: 2px;
    }
  }
}
</style>
