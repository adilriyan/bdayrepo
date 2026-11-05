import { useState, useEffect, useCallback, useRef } from 'react'

export interface DioramaTilt {
  rotateX: number
  rotateY: number
}

/**
 * useDioramaParallax — returns a 3D tilt driven by mouse position on desktop
 * and device gyroscope on mobile. Values are suitable for applying as
 * `rotateX` / `rotateY` on a motion.div wrapping `.art-stage`.
 */
export function useDioramaParallax(): DioramaTilt {
  const [tilt, setTilt] = useState<DioramaTilt>({ rotateX: 0, rotateY: 0 })
  const gyroGranted = useRef(false)

  // ── Desktop: track mouse position relative to viewport centre ──
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (gyroGranted.current) return // gyro takes priority on mobile
    const nx = (e.clientX / window.innerWidth - 0.5) * 2   // -1 to 1
    const ny = (e.clientY / window.innerHeight - 0.5) * 2  // -1 to 1
    setTilt({
      rotateX: -ny * 5.5,  // tilt up/down ±5.5°
      rotateY:  nx * 7.5,  // tilt left/right ±7.5°
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!gyroGranted.current) {
      setTilt({ rotateX: 0, rotateY: 0 })
    }
  }, [])

  // ── Mobile: DeviceOrientationEvent gyroscope ──
  const handleOrientation = useCallback((e: DeviceOrientationEvent) => {
    if (e.beta === null || e.gamma === null) return
    gyroGranted.current = true
    // beta: front/back tilt -180→180 (portrait neutral ≈ 0), gamma: left/right -90→90
    const clampedBeta  = Math.max(-25, Math.min(25, (e.beta  ?? 0) - 15)) // offset for natural hold
    const clampedGamma = Math.max(-20, Math.min(20, e.gamma  ?? 0))
    setTilt({
      rotateX: -(clampedBeta  / 25) * 5.5,
      rotateY:  (clampedGamma / 20) * 7.5,
    })
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    window.addEventListener('deviceorientation', handleOrientation, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('deviceorientation', handleOrientation)
    }
  }, [handleMouseMove, handleMouseLeave, handleOrientation])

  return tilt
}

