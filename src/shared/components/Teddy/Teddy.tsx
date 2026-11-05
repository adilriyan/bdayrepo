import React, { useEffect, useRef } from 'react'
import { motion, useAnimation } from 'motion/react'

export interface TeddyProps {
  big?: boolean
  interactive?: boolean
  hugCount?: number
  onHug?: () => void
}

export const Teddy: React.FC<TeddyProps> = ({ big = false, interactive = false, hugCount = 0, onHug }) => {
  const controls = useAnimation()
  const earLeftControls = useAnimation()
  const earRightControls = useAnimation()
  const bowControls = useAnimation()
  const prevHugCount = useRef(0)

  useEffect(() => {
    if (hugCount <= 0 || hugCount === prevHugCount.current) return
    prevHugCount.current = hugCount

    // Squash → stretch → spring settle on the body
    controls.start({
      scaleX: [1, 1.18, 0.9, 1.04, 1],
      scaleY: [1, 0.78, 1.13, 0.97, 1],
      transition: {
        duration: 0.55,
        times: [0, 0.15, 0.38, 0.65, 1],
        ease: 'easeInOut',
      },
    })

    // Ears jiggle with slight delay (secondary motion)
    earLeftControls.start({
      rotate: [0, -18, 12, -6, 0],
      transition: { duration: 0.6, delay: 0.06, ease: 'easeInOut' },
    })
    earRightControls.start({
      rotate: [0, 18, -12, 6, 0],
      transition: { duration: 0.6, delay: 0.08, ease: 'easeInOut' },
    })

    // Bow wobble with even more delay
    bowControls.start({
      rotate: [0, 22, -14, 8, 0],
      scale: [1, 1.3, 0.9, 1.05, 1],
      transition: { duration: 0.55, delay: 0.1, ease: 'easeInOut' },
    })
  }, [hugCount, controls, earLeftControls, earRightControls, bowControls])

  return (
    // Outer wrapper: CSS-driven idle float so it's always running independently
    <div className={`teddy-idle-wrap ${big ? 'teddy-idle-big' : ''}`}>
    <motion.div
      className={`teddy ${big ? 'teddy-big' : ''} ${interactive ? 'teddy-interactive' : ''}`}
      animate={controls}
      onClick={interactive ? onHug : undefined}
      onKeyDown={interactive ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onHug?.()
        }
      } : undefined}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? 'button' : 'img'}
      aria-label={interactive ? 'Give the teddy a hug' : 'Cute illustrated teddy bear'}
    >
      <motion.span className="ear ear-left" animate={earLeftControls} style={{ display: 'block' }}>
        <i />
      </motion.span>
      <motion.span className="ear ear-right" animate={earRightControls} style={{ display: 'block' }}>
        <i />
      </motion.span>
      <span className="head">
        <i className="eye eye-left" />
        <i className="eye eye-right" />
        <i className="cheek cheek-left" />
        <i className="cheek cheek-right" />
        <i className="muzzle" />
        <i className="nose" />
        <i className="mouth" />
      </span>
      <span className="body">
        <i className="belly" />
        <i className="heart-patch">♥</i>
      </span>
      <span className="arm arm-left" />
      <span className="arm arm-right" />
      <span className="leg leg-left" />
      <span className="leg leg-right" />
      <motion.span className="bow" animate={bowControls} style={{ display: 'block' }}>✦</motion.span>
    </motion.div>
    </div>
  )
}
