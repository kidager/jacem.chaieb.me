<template>
  <DepthMapImage
    class="profile-picture"
    :image="image"
    :depth-map="depthMap"
    horizontal=50
    vertical=50
    max-tilt=15
  >
  </DepthMapImage>
</template>

<script>
import image from '@/assets/img/jacem.chaieb.512.webp'
import depthMap from '@/assets/img/jacem.chaieb.512.depth.webp'

export default {
  data () {
    return {
      image: image,
      depthMap: depthMap,
    }
  }
}
</script>

<style lang="scss" scoped>
$imgSize: min(400px, 50vw);

.profile-picture {
  width: $imgSize;
  height: $imgSize;

  display: inline-block;

  border-radius: 50%!important;
  border: 0.25px solid $text-color;

  vertical-align: middle;
}
</style>
