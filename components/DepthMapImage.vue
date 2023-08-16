<template>
  <div
    ref="gl"
    class="depth-map-image"
    :mounted="mounted"
    :data-image-original="image"
    :data-image-depth="depthMap"
    :data-horizontal-threshold="horizontal"
    :data-vertical-threshold="vertical"
  >
    <img :src="image" alt="profile picture backup" />
  </div>
</template>

<script>
  import Sketch from '@/webgl/sketch';

  // Component
  export default {
    name: 'depth-map-image',
    inheritAttrs: true,
    props: {
      image: {
        type: String,
        required: true,
      },
      depthMap: {
        type: String,
        required: true,
      },
      horizontal: {
        type: [Number, String],
        default: 50,
      },
      vertical: {
        type: [Number, String],
        default: 50,
      },
    },
    created() {
      this.$sketch = null;
    },
    mounted() {
      this.$nextTick(this.mounted);
    },
    methods: {
      mounted() {
        try {
          this.$sketch = new Sketch(this.$refs.gl);
        } catch (e) {
          console.error(e);
        }
      },
    },
  };
</script>

<style scoped lang="scss">
.depth-map-image {
  overflow: hidden;
  & > img {
    width: 100%;
    height: 100%;
  }
}
</style>
