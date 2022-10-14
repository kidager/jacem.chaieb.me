<script setup>
// import '~/assets/style/main.scss'
</script>

<style scoped>
.container, .container-fluid, .container-lg, .container-md, .container-sm, .container-xl {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
}
.container {
  overflow: auto;
  max-width: 680px;
  padding: 0 15px;
}


/* @media (min-width: 1200px)
.container, .container-lg, .container-md, .container-sm, .container-xl {
    max-width: 1140px;
}
@media (min-width: 992px)
.container, .container-lg, .container-md, .container-sm {
    max-width: 960px;
}
@media (min-width: 768px)
.container, .container-md, .container-sm {
    max-width: 720px;
}
@media (min-width: 576px)
.container, .container-sm {
    max-width: 540px;
} */
</style>

<template>
  <div class="container">
    <Header />

    <InfoPane />

    <SocialPane />

    <Footer />
  </div>
</template>
