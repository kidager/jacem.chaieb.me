import { ref, computed, onMounted, onUnmounted } from 'vue'

interface GyroscopeOptions {
  boundaryLimit?: number
  shakeThreshold?: number
  sensitivity?: number
}

interface DeviceOrientationEventWithPermission {
  requestPermission?: () => Promise<'granted' | 'denied'>
}

export function useGyroscope(options: GyroscopeOptions = {}) {
  const {
    boundaryLimit = 0.5,
    shakeThreshold = 15,
    sensitivity = 30
  } = options

  const position = ref({ x: 0, y: 0 })
  const isSupported = ref(false)
  const permissionGranted = ref(false)

  // Check if permission request is needed (iOS 13+)
  const needsPermissionRequest = computed(() => {
    const DOEvent = DeviceOrientationEvent as unknown as DeviceOrientationEventWithPermission
    return typeof DOEvent.requestPermission === 'function'
  })

  const baseline = { beta: 0, gamma: 0 }
  let lastShakeTime = 0

  const clamp = (value: number, min: number, max: number) =>
    Math.max(min, Math.min(max, value))

  const handleOrientation = (event: DeviceOrientationEvent) => {
    if (event.beta === null || event.gamma === null) {return}

    const x = clamp((event.gamma - baseline.gamma) / sensitivity, -boundaryLimit, boundaryLimit)
    const y = clamp((event.beta - baseline.beta) / sensitivity, -boundaryLimit, boundaryLimit)

    position.value = { x, y }
  }

  const handleMotion = (event: DeviceMotionEvent) => {
    const acceleration = event.accelerationIncludingGravity
    if (!acceleration || acceleration.x === null || acceleration.y === null || acceleration.z === null) {return}

    const magnitude = Math.sqrt(
      acceleration.x * acceleration.x +
      acceleration.y * acceleration.y +
      acceleration.z * acceleration.z
    )

    const now = Date.now()
    if (magnitude > shakeThreshold && now - lastShakeTime > 500) {
      lastShakeTime = now
      resetBaseline()
    }
  }

  const resetBaseline = () => {
    // Capture current orientation as new baseline on next event
    const captureBaseline = (event: DeviceOrientationEvent) => {
      if (event.beta !== null && event.gamma !== null) {
        baseline.beta = event.beta
        baseline.gamma = event.gamma
        position.value = { x: 0, y: 0 }
      }
      window.removeEventListener('deviceorientation', captureBaseline)
    }
    window.addEventListener('deviceorientation', captureBaseline, { once: true })
  }

  const requestPermission = async (): Promise<boolean> => {
    // Check if DeviceOrientationEvent.requestPermission exists (iOS 13+)
     
    const DOEvent = DeviceOrientationEvent as unknown as DeviceOrientationEventWithPermission
    if (typeof DOEvent.requestPermission === 'function') {
      try {
        const permission = await DOEvent.requestPermission()
        permissionGranted.value = permission === 'granted'
        if (permissionGranted.value) {
          startListening()
        }
        return permissionGranted.value
      } catch {
        permissionGranted.value = false
        return false
      }
    }

    // Non-iOS devices don't need permission
    permissionGranted.value = true
    startListening()
    return true
  }

  const startListening = () => {
    // Capture initial baseline
    resetBaseline()

    window.addEventListener('deviceorientation', handleOrientation)
    window.addEventListener('devicemotion', handleMotion)
  }

  const stopListening = () => {
    window.removeEventListener('deviceorientation', handleOrientation)
    window.removeEventListener('devicemotion', handleMotion)
  }

  onMounted(() => {
    // Check for gyroscope support
    isSupported.value = 'DeviceOrientationEvent' in window
  })

  onUnmounted(() => {
    stopListening()
  })

  return {
    position,
    isSupported,
    permissionGranted,
    needsPermissionRequest,
    requestPermission,
    resetBaseline
  }
}
