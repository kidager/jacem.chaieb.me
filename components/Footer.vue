<template>
  <div>
    <footer class="text-center">
      <hr>
      <h6>
        Built with
        <span>&#128150;</span>
        using <a
          target="_blank"
          href="https://v3.nuxtjs.org/"
        >Nuxt</a>.
      </h6>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
footer {
  height: 50px;
  margin: 1vh 0;
  color: $social-icons-color;
  .dark-theme & {
    color: $dark-social-icons-color;
  }

  hr {
    margin: 1rem 0 1rem;

    border: 0;
    border-top: 1px solid rgba($borders, .75);
    .dark-theme & {
      border-top: 1px solid rgba($dark-borders, .75);
    }
    background-color: transparent;
  }

  h6 {
    margin-top: 0;
    line-height: 1.2;
    font-size: 12px;
    font-weight: 300;

    span {
      font-size:15px;
    }
  }
}
</style>
