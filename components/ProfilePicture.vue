<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useParallaxEffect } from '~/composables/useParallaxEffect'
import { useGyroscope } from '~/composables/useGyroscope'
import profileImage from '~/assets/img/jacem.chaieb.512.webp'
import depthMap from '~/assets/img/jacem.chaieb.depth.png'

const containerRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

const webglInitialized = ref(false)
const isMobile = ref(false)
const gyroscopeActivated = ref(false)

const {
  isReady: parallaxReady,
  init: initParallax,
  setTarget,
  resetToCenter
} = useParallaxEffect(canvasRef, containerRef, {
  imageSrc: profileImage,
  depthMapSrc: depthMap
})

const {
  position: gyroPosition,
  isSupported: gyroSupported,
  needsPermissionRequest: gyroNeedsPermission,
  requestPermission: requestGyroPermission
} = useGyroscope({
  boundaryLimit: 0.5,
  shakeThreshold: 15,
  sensitivity: 30
})

// Show canvas if WebGL is ready, otherwise show fallback image
const showCanvas = computed(() => webglInitialized.value && parallaxReady.value)

// Detect mobile by checking for hover capability
const detectMobile = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = !window.matchMedia('(hover: hover)').matches
  }
}

// Handle mouse movement for desktop
const handleMouseMove = (event: MouseEvent) => {
  if (!containerRef.value || isMobile.value) {return}

  const rect = containerRef.value.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  // Calculate normalized position relative to center
  // Use a larger range for mouse detection
  const rangeX = window.innerWidth / 2
  const rangeY = window.innerHeight / 2

  // Invert direction and tone down the effect on desktop
  const desktopScale = 0.5
  const x = -((event.clientX - centerX) / rangeX) * desktopScale
  const y = -((event.clientY - centerY) / rangeY) * desktopScale

  setTarget(x, y)
}

const handleMouseLeave = () => {
  if (!isMobile.value) {
    resetToCenter()
  }
}

// Handle tap to request gyroscope permission on mobile (iOS only)
const handleTap = async () => {
  // Only needed on iOS where permission requires user gesture
  if (!isMobile.value || gyroscopeActivated.value || !gyroSupported.value || !gyroNeedsPermission.value) {return}

  const granted = await requestGyroPermission()
  if (granted) {
    gyroscopeActivated.value = true
  }
}

// Watch gyroscope position and update parallax
let gyroWatchStop: (() => void) | null = null

onMounted(async () => {
  detectMobile()

  // Initialize WebGL
  webglInitialized.value = true
  await initParallax()

  // Set up desktop mouse tracking
  if (!isMobile.value) {
    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
  }

  // Set up gyroscope watching for mobile
  if (isMobile.value && gyroSupported.value) {
    const { watch } = await import('vue')
    gyroWatchStop = watch(gyroPosition, (pos) => {
      if (gyroscopeActivated.value) {
        setTarget(pos.x, pos.y)
      }
    })

    // Auto-activate on Android (no permission request needed)
    // iOS requires user gesture, so tap is still needed there
    if (!gyroNeedsPermission.value) {
      const granted = await requestGyroPermission()
      if (granted) {
        gyroscopeActivated.value = true
      }
    }
  }
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseleave', handleMouseLeave)
  if (gyroWatchStop) {
    gyroWatchStop()
  }
})
</script>

<template>
  <div
    ref="containerRef"
    class="profile-picture"
    @click="handleTap"
  >
    <canvas
      v-show="showCanvas"
      ref="canvasRef"
    />
    <img
      v-show="!showCanvas"
      src="~assets/img/jacem.chaieb.512.webp"
      alt="jacem chaieb"
    >
  </div>
</template>

<style lang="scss" scoped>
$imgSize: min(300px, 50vw);

.profile-picture {
  width: $imgSize;
  height: $imgSize;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
  border: 0.25px solid $borders;

  .dark-theme & {
    border: 0.25px solid $dark-borders;
  }

  canvas,
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
