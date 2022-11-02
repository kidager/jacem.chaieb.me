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
  color: $grey-500;

  hr {
    margin: 1rem 0 1rem;

    border: 0;
    border-top: 1px solid rgba(0,0,0,.1);
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
