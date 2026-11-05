import React from 'react'
import { motion } from 'motion/react'
import { useDioramaParallax } from '../../hooks/useDioramaParallax'

interface DioramaStageProps {
  children: React.ReactNode
  className?: string
}

/**
 * DioramaStage — wraps content in a spring-animated 3D perspective tilt
 * driven by mouse position / device gyroscope. Drop this around `.art-stage`
 * in any scene to get the parallax diorama effect.
 *
 * Children can opt into Z-layer depth using the CSS classes:
 *   .z-bg   → translateZ(-50px)  — background layer (slow parallax)
 *   .z-mid  → translateZ(0)      — midground (neutral)
 *   .z-fg   → translateZ(+45px)  — foreground characters (fast parallax)
 *   .z-top  → translateZ(+80px)  — top particles / sparkles
 */
export const DioramaStage: React.FC<DioramaStageProps> = ({ children, className = '' }) => {
  const { rotateX, rotateY } = useDioramaParallax()

  return (
    <motion.div
      className={`diorama-wrap ${className}`}
      animate={{ rotateX, rotateY }}
      transition={{ type: 'spring', stiffness: 85, damping: 26, mass: 1 }}
      style={{ transformStyle: 'preserve-3d', perspective: '1200px' }}
    >
      {children}
    </motion.div>
  )
}

