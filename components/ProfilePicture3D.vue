<template>
  <div ref="container"></div>
</template>

<script>
import * as THREE from 'three';

export default {
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      profilePicture: null,
      depthMap: null,
      uniforms: null
    };
  },
  mounted() {
    this.initThreeJS();
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('deviceorientation', this.handleDeviceOrientation);
  },
  beforeDestroy() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('deviceorientation', this.handleDeviceOrientation);
  },
  methods: {
    initThreeJS() {
      const container = this.$refs.container;
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);

      const textureLoader = new THREE.TextureLoader();
      this.profilePicture = textureLoader.load('~assets/img/jacem.chaieb.512.webp');
      this.depthMap = textureLoader.load('~assets/img/jacem.chaieb.depthmap.512.webp');

      this.uniforms = {
        u_image: { type: 't', value: this.profilePicture },
        u_depth: { type: 't', value: this.depthMap },
        u_mouse: { type: 'v2', value: new THREE.Vector2() },
        u_resolution: { type: 'v2', value: new THREE.Vector2(container.clientWidth, container.clientHeight) }
      };

      const material = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D u_image;
          uniform sampler2D u_depth;
          uniform vec2 u_mouse;
          uniform vec2 u_resolution;
          varying vec2 vUv;
          void main() {
            vec2 uv = vUv;
            vec4 color = texture2D(u_image, uv);
            vec4 depth = texture2D(u_depth, uv);
            vec2 mouse = u_mouse / u_resolution * 2.0 - 1.0;
            uv += mouse * (depth.r - 0.5) * 0.1;
            gl_FragColor = texture2D(u_image, uv);
          }
        `
      });

      const geometry = new THREE.PlaneGeometry(1, 1);
      const mesh = new THREE.Mesh(geometry, material);
      this.scene.add(mesh);

      this.camera.position.z = 1;

      this.animate();
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
    },
    handleMouseMove(event) {
      this.uniforms.u_mouse.value.x = event.clientX;
      this.uniforms.u_mouse.value.y = event.clientY;
    },
    handleDeviceOrientation(event) {
      this.uniforms.u_mouse.value.x = event.gamma; // In degree in the range [-90,90]
      this.uniforms.u_mouse.value.y = event.beta;  // In degree in the range [-180,180]
    }
  }
};
</script>

<style scoped>
div {
  width: 100%;
  height: 100%;
}
</style>
