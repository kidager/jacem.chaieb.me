// WebGL features are not supported in Opera Mini - graceful fallback to static image handles this
/* eslint-disable compat/compat */
import { ref, watch, onMounted, onUnmounted, type Ref } from 'vue'
import * as THREE from 'three'

interface ParallaxOptions {
  intensity?: number
  easingFactor?: number
  boundaryLimit?: number
  imageSrc?: string
  depthMapSrc?: string
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform sampler2D uImage;
  uniform sampler2D uDepthMap;
  uniform vec2 uMouse;
  uniform float uIntensity;

  varying vec2 vUv;

  void main() {
    float depth = texture2D(uDepthMap, vUv).r;
    vec2 displacement = uMouse * depth * uIntensity;
    vec4 color = texture2D(uImage, vUv + displacement);
    gl_FragColor = color;
  }
`

export function useParallaxEffect(
  canvas: Ref<HTMLCanvasElement | null>,
  container: Ref<HTMLElement | null>,
  options: ParallaxOptions = {}
) {
  const {
    intensity = 0.03,
    easingFactor = 0.1,
    boundaryLimit = 0.5,
    imageSrc = '/img/jacem.chaieb.512.webp',
    depthMapSrc = '/img/jacem.chaieb.depth.png'
  } = options

  const isSupported = ref(false)
  const isReady = ref(false)

  let renderer: THREE.WebGLRenderer | null = null
  let scene: THREE.Scene | null = null
  let camera: THREE.OrthographicCamera | null = null
  let material: THREE.ShaderMaterial | null = null
  let animationId: number | null = null

  const current = { x: 0, y: 0 }
  const target = { x: 0, y: 0 }

  const clamp = (value: number, min: number, max: number) =>
    Math.max(min, Math.min(max, value))

  const setTarget = (x: number, y: number) => {
    target.x = clamp(x, -boundaryLimit, boundaryLimit)
    target.y = clamp(y, -boundaryLimit, boundaryLimit)
  }

  const resetToCenter = () => {
    target.x = 0
    target.y = 0
  }

  const init = async () => {
    if (!canvas.value || !container.value) {return false}

    // Check WebGL support
    try {
      const testCanvas = document.createElement('canvas')
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl')
      if (!gl) {
        isSupported.value = false
        return false
      }
      isSupported.value = true
    } catch {
      isSupported.value = false
      return false
    }

    const rect = container.value.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const dpr = Math.min(window.devicePixelRatio, 2)

    // Create renderer
    renderer = new THREE.WebGLRenderer({
      canvas: canvas.value,
      antialias: false,
      alpha: true
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(dpr)

    // Create scene
    scene = new THREE.Scene()

    // Create orthographic camera
    camera = new THREE.OrthographicCamera(
      -width / 2, width / 2,
      height / 2, -height / 2,
      0.1, 1000
    )
    camera.position.z = 1

    // Load textures
    const textureLoader = new THREE.TextureLoader()

    try {
      const [imageTexture, depthTexture] = await Promise.all([
        new Promise<THREE.Texture>((resolve, reject) => {
          textureLoader.load(imageSrc, resolve, undefined, reject)
        }),
        new Promise<THREE.Texture>((resolve, reject) => {
          textureLoader.load(depthMapSrc, resolve, undefined, reject)
        })
      ])

      // Create shader material
      material = new THREE.ShaderMaterial({
        uniforms: {
          uImage: { value: imageTexture },
          uDepthMap: { value: depthTexture },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uIntensity: { value: intensity }
        },
        vertexShader,
        fragmentShader
      })

      // Create plane geometry
      const geometry = new THREE.PlaneGeometry(width, height)
      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)

      isReady.value = true
      startAnimation()
      return true
    } catch {
      isSupported.value = false
      return false
    }
  }

  const animate = () => {
    if (!renderer || !scene || !camera || !material) {return}

    // Lerp current position toward target
    current.x += (target.x - current.x) * easingFactor
    current.y += (target.y - current.y) * easingFactor

    // Update shader uniform
    const mouseUniform = material.uniforms.uMouse
    if (mouseUniform?.value) {
      mouseUniform.value.set(current.x, -current.y)
    }

    renderer.render(scene, camera)
    animationId = requestAnimationFrame(animate)
  }

  const startAnimation = () => {
    if (animationId) {return}
    animate()
  }

  const stopAnimation = () => {
    if (animationId) {
      cancelAnimationFrame(animationId)
      animationId = null
    }
  }

  const handleVisibilityChange = () => {
    if (document.hidden) {
      stopAnimation()
    } else {
      startAnimation()
    }
  }

  const handleResize = () => {
    if (!renderer || !camera || !container.value) {return}

    const rect = container.value.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    renderer.setSize(width, height)

    camera.left = -width / 2
    camera.right = width / 2
    camera.top = height / 2
    camera.bottom = -height / 2
    camera.updateProjectionMatrix()
  }

  const dispose = () => {
    stopAnimation()

    if (material) {
      material.dispose()
      const imageUniform = material.uniforms.uImage
      if (imageUniform?.value?.dispose) {
        imageUniform.value.dispose()
      }
      const depthUniform = material.uniforms.uDepthMap
      if (depthUniform?.value?.dispose) {
        depthUniform.value.dispose()
      }
    }

    if (scene) {
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose()
        }
      })
    }

    if (renderer) {
      renderer.dispose()
    }

    renderer = null
    scene = null
    camera = null
    material = null
  }

  onMounted(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    document.removeEventListener('visibilitychange', handleVisibilityChange)
    window.removeEventListener('resize', handleResize)
    dispose()
  })

  // Watch for canvas/container changes
  watch([canvas, container], () => {
    if (canvas.value && container.value && !isReady.value) {
      init()
    }
  })

  return {
    isSupported,
    isReady,
    init,
    setTarget,
    resetToCenter,
    dispose
  }
}
