<template>
  <section class="text-center">
    <h3 class="intro">
      Computer Science Engineer <br>
      FullStack Web Developer
    </h3>
    <h4 class="description">
      ✨ Be a light in a too often dim world ✨
    </h4>
  </section>
</template>

<style lang="scss" scoped>
section {
  margin: 1vh 0 2vh;

  * {
    margin: 0 0 0.5rem;
    line-height: 1.2;
    font-weight: 200;
  }

  .intro {
    font-family: $font-family-serif;
    font-size: 1.75rem;
    color: $text-color-subtext-0;
    .dark-theme & {
      color: $dark-text-color-subtext-0;
    }
  }

  .description {
    font-size: 1rem;
    color: $text-color-subtext-1;
    .dark-theme & {
      color: $dark-text-color-subtext-1;
    }
  }
}
</style>
