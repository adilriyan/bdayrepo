import { lazy, Suspense } from 'react'
import type { MagicFieldProps } from './MagicField'
import { prefersReducedMotion } from '../../motion/magicMotion'

const MagicField = lazy(() => import('./MagicField'))

function hasWebGL() {
  try {
    return !!document.createElement('canvas').getContext('webgl')
  } catch {
    return false
  }
}

// Evaluated once: no WebGL or reduced motion -> keep the CSS ambient background only.
const enabled = hasWebGL() && !prefersReducedMotion()

export function LazyMagicField(props: MagicFieldProps) {
  if (!enabled) return null
  return (
    <Suspense fallback={null}>
      <MagicField {...props} />
    </Suspense>
  )
}
