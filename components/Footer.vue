<template>
  <div>
    <footer class="text-center footer">
      <hr>
      <h6 class="text-center copyright">
        Built with
        <span style='font-size:15px;'>&#128150;</span>
        using <a href="https://v3.nuxtjs.org/" target="_blank">Nuxt</a>.
      </h6>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  /* height: 50px; */
  margin-top: 10px;
  color: #8b8b8b;

  hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0;
    border-top: 1px solid rgba(0,0,0,.1);
    background-color: transparent;
  }

  h6 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    line-height: 1.2;
    font-size: 1rem;
    font-size: 12px;
    font-weight: 200;
  }
}

</style>
