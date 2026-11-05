import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { SceneIndex } from '../../../types/story.types'
import { cssVar } from '../../motion/magicMotion'

// One design token per scene: welcome, letter, gift, memories, seaside, open-when, cake, finale
const TINT_TOKENS = ['rose', 'peach', 'gold', 'lavender', 'sea', 'rose', 'blush', 'gold'].map((n) => `--brand-${n}`)

const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent)

function makeSprite(draw: (c: CanvasRenderingContext2D) => void) {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 64
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#fff'
  draw(ctx)
  return new THREE.CanvasTexture(canvas)
}

const drawHeart = (c: CanvasRenderingContext2D) => {
  c.beginPath()
  c.moveTo(32, 56)
  c.bezierCurveTo(4, 36, 6, 8, 24, 10)
  c.bezierCurveTo(29, 11, 32, 15, 32, 19)
  c.bezierCurveTo(32, 15, 35, 11, 40, 10)
  c.bezierCurveTo(58, 8, 60, 36, 32, 56)
  c.fill()
}

const drawStar = (c: CanvasRenderingContext2D) => {
  c.beginPath()
  for (let i = 0; i < 8; i++) {
    const r = i % 2 ? 6 : 28
    const a = (i * Math.PI) / 4 - Math.PI / 2
    c.lineTo(32 + Math.cos(a) * r, 32 + Math.sin(a) * r)
  }
  c.fill()
}

interface LayerProps {
  count: number
  draw: (c: CanvasRenderingContext2D) => void
  size: number
  speed: number
  scene: SceneIndex
  energy: number
  pointer: React.RefObject<{ x: number; y: number }>
}

function Layer({ count, draw, size, speed, scene, energy, pointer }: LayerProps) {
  const group = useRef<THREE.Group>(null)
  const material = useRef<THREE.PointsMaterial>(null)
  const geometry = useRef<THREE.BufferGeometry>(null)
  const target = useMemo(() => new THREE.Color(), [])
  const tints = useMemo(() => TINT_TOKENS.map(cssVar), [])
  const texture = useMemo(() => makeSprite(draw), [draw])
  const { base, positions, rates, phases } = useMemo(() => {
    const base = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      base[i * 3] = (Math.random() - 0.5) * 16
      base[i * 3 + 1] = (Math.random() - 0.5) * 10
      base[i * 3 + 2] = -3 + Math.random() * 3.5 // keep near particles small so they never swamp the text
    }
    return {
      base,
      positions: base.slice(),
      rates: Float32Array.from({ length: count }, () => 0.15 + Math.random() * 0.35),
      phases: Float32Array.from({ length: count }, () => Math.random() * Math.PI * 2),
    }
  }, [count])

  useEffect(() => () => texture.dispose(), [texture])

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    const boost = speed * (1 + energy / 70)
    for (let i = 0; i < count; i++) {
      base[i * 3 + 1] += rates[i] * boost * dt
      if (base[i * 3 + 1] > 5.5) base[i * 3 + 1] = -5.5
      positions[i * 3] = base[i * 3] + Math.sin(t * 0.6 + phases[i]) * 0.35
      positions[i * 3 + 1] = base[i * 3 + 1]
      positions[i * 3 + 2] = base[i * 3 + 2]
    }
    geometry.current!.attributes.position.needsUpdate = true

    const k = 1 - Math.pow(0.02, dt) // frame-rate independent easing
    material.current!.color.lerp(target.set(tints[scene]), k)
    group.current!.rotation.y += (pointer.current.x * 0.18 - group.current!.rotation.y) * k
    group.current!.rotation.x += (-pointer.current.y * 0.12 - group.current!.rotation.x) * k
  })

  return (
    <group ref={group}>
      <points>
        <bufferGeometry ref={geometry}>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={material}
          map={texture}
          size={size}
          transparent
          opacity={0.4}
          depthWrite={false}
          alphaTest={0.02}
        />
      </points>
    </group>
  )
}

export interface MagicFieldProps {
  scene: SceneIndex
  /** 0–100 friendship magic; speeds the drift up */
  energy: number
}

export default function MagicField({ scene, energy }: MagicFieldProps) {
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const move = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      pointer.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])

  const n = isMobile ? 22 : 48
  return (
    <div className="magic-field" aria-hidden="true">
      <Canvas
        dpr={isMobile ? 1 : [1, 1.75]}
        camera={{ position: [0, 0, 6], fov: 55 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
      >
        <Layer count={n} draw={drawHeart} size={0.42} speed={1} scene={scene} energy={energy} pointer={pointer} />
        <Layer count={n} draw={drawStar} size={0.3} speed={1.6} scene={scene} energy={energy} pointer={pointer} />
      </Canvas>
    </div>
  )
}
