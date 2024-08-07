<template>
  <img
    src="~assets/img/jacem.chaieb.512.webp"
    alt="jacem chaieb"
    class="text-center"
  >
</template>

<style lang="scss" scoped>
$imgSize: min(300px, 50vw);

img {
  width: $imgSize;
  height: $imgSize;

  border-radius: 50%!important;
  border: 0.25px solid $borders;
  vertical-align: middle;

  .dark-theme & {
    border: 0.25px solid $dark-borders;
  }
}
</style>
