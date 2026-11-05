import React, { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react'

export interface DraggablePenguinProps {
  side: 'left' | 'right'
  onDiscover: () => void
}

export const DraggablePenguin: React.FC<DraggablePenguinProps> = ({ side, onDiscover }) => {
  const x = useMotionValue(0)
  const dragCountRef = useRef(0)
  const waddle = useRef<'left' | 'right'>('left')

  // Velocity-linked tilt: drag left → lean left, drag right → lean right
  const rawRotate = useTransform(x, [-110, 0, 110], [-16, 0, 16])
  // Smooth the rotation with a spring for organic feel
  const rotate = useSpring(rawRotate, { stiffness: 160, damping: 18 })

  return (
    <motion.div
      className={`penguin penguin-${side} draggable-penguin`}
      drag
      dragConstraints={{ left: -100, right: 100, top: -45, bottom: 45 }}
      dragElastic={0.14}
      dragMomentum={false}
      style={{ touchAction: 'none', x, rotate, scale: side === 'left' ? 1.05 : 0.84 }}
      // Idle bob — will be overridden by drag
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchEnd={(e) => e.stopPropagation()}
      onDrag={() => {
        // Alternate waddle foot class every drag event
        dragCountRef.current++
        waddle.current = dragCountRef.current % 2 === 0 ? 'left' : 'right'
      }}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) + Math.abs(info.offset.y) > 10) {
          onDiscover()
        }
        // Spring the rotation back to 0 on release (handled by useSpring tracking x)
      }}
      onClick={onDiscover}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onDiscover()
        }
      }}
      aria-label={`Drag or tap the ${side} penguin`}
    >
      <span className={`penguin-wing wing-left${waddle.current === 'left' ? ' wing-step' : ''}`} />
      <span className={`penguin-wing wing-right${waddle.current === 'right' ? ' wing-step' : ''}`} />
      <span className="penguin-belly" />
      <span className="penguin-eye eye-left" />
      <span className="penguin-eye eye-right" />
      <span className="penguin-blush blush-left" />
      <span className="penguin-blush blush-right" />
      <span className="penguin-beak" />
      <span className="penguin-feet" />
    </motion.div>
  )
}
