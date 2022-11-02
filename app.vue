<script setup>
import '~/assets/style/main.scss'
</script>

<template>
  <div class="container">
    <Header />
    <InfoPane />
    <SocialPane />
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
div.container {
  margin-right: auto;
  margin-left: auto;

  overflow: auto;
  padding: 0 15px;

  @media screen and (min-width: 576px) {
    max-width: 540px;
  }
  @media screen and (min-width: 768px) {
    max-width: 720px;
  }
  @media screen and (min-width: 992px) {
    max-width: 960px;
  }
  @media screen and (min-width: 1200px) {
    max-width: 1140px;
  }
}
</style>
