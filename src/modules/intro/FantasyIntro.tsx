import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { animate, splitText, stagger } from 'animejs'
import { prefersReducedMotion } from '../../shared/motion/magicMotion'
import { Sparkles, ArrowRight } from 'lucide-react'
import { storyContent } from '../../config/storyContent'

export interface FantasyIntroProps {
  show: boolean
  onEnter: () => void
  onTakeHand?: () => void
}

export const FantasyIntro: React.FC<FantasyIntroProps> = ({ show, onEnter, onTakeHand }) => {
  const [walking, setWalking] = useState(false)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)

  // Letter-by-letter title reveal, then the rest of the copy staggers up
  useEffect(() => {
    if (!show || prefersReducedMotion() || !titleRef.current || !copyRef.current) return
    const split = splitText(titleRef.current, { chars: true })
    const rest = Array.from(copyRef.current.children).filter((c) => c !== titleRef.current)
    // revert() drops the inline opacity/transform afterwards, otherwise they beat the CSS :hover transform
    const title = animate(split.chars, {
      opacity: [0, 1],
      translateY: ['0.7em', 0],
      rotate: [10, 0],
      delay: stagger(24, { start: 300 }),
      duration: 800,
      ease: 'outExpo',
      onComplete: () => split.revert(),
    })
    const copy = animate(rest, {
      opacity: [0, 1],
      translateY: [20, 0],
      delay: stagger(110, { start: 800 }),
      duration: 700,
      ease: 'outExpo',
      onComplete: (a) => a.revert(),
    })
    return () => {
      title.revert()
      copy.revert()
      split.revert()
    }
  }, [show])

  useEffect(() => {
    if (!walking) return
    const timer = window.setTimeout(() => {
      onEnter()
      setWalking(false)
    }, 2600)
    return () => window.clearTimeout(timer)
  }, [walking, onEnter])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={`fantasy-intro ${walking ? 'is-walking' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.08, filter: 'blur(12px)' }}
          transition={{ duration: 0.65 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="fantasy-title"
        >
          <div className="fantasy-sky" aria-hidden="true">
            <i className="fantasy-moon" />
            <i className="fantasy-star fs1">✦</i>
            <i className="fantasy-star fs2">✧</i>
            <i className="fantasy-star fs3">✦</i>
            <i className="fantasy-star fs4">✧</i>
            <i className="fantasy-butterfly fb1">❋</i>
            <i className="fantasy-butterfly fb2">✿</i>
          </div>
          <div className="fantasy-world" aria-hidden="true">
            <div className="fantasy-mountain mountain-back" />
            <div className="fantasy-mountain mountain-front" />
            <div className="fantasy-portal">
              <div className="portal-inner" />
              <span className="portal-spark portal-s1">✦</span>
              <span className="portal-spark portal-s2">♡</span>
              <span className="portal-spark portal-s3">✧</span>
            </div>
            <div className="fantasy-path" />
            <div className="fantasy-person">
              <i className="person-head" />
              <i className="person-hair" />
              <i className="person-body" />
              <i className="person-arm arm-a" />
              <i className="person-arm arm-b" />
              <i className="person-leg leg-a" />
              <i className="person-leg leg-b" />
              <span className="person-bag">♡</span>
            </div>
            <span className="path-glow pg1" />
            <span className="path-glow pg2" />
            <span className="path-glow pg3" />
          </div>
          <motion.div
            className="fantasy-intro-copy"
            ref={copyRef}
            animate={walking ? { y: 18, opacity: 0, scale: 0.96 } : { y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.55 }}
          >
            <span className="fantasy-overline">
              <Sparkles size={13} /> A LITTLE WORLD MADE FOR {storyContent.recipientName.toUpperCase()}
            </span>
            <h2 id="fantasy-title" ref={titleRef}>
              Ready to step<br />into <em>your own</em><br />fairy tale?
            </h2>
            <p>
              Follow the little lights. There’s a birthday wish, a few secrets, and a whole lot of kind thoughts waiting inside.
            </p>
            <button
              className="fantasy-enter"
              onClick={() => {
                setWalking(true)
                onTakeHand?.()
              }}
              disabled={walking}
            >
              {walking ? (
                <>Walking into wonder… <Sparkles size={17} /></>
              ) : (
                <>Take my hand <ArrowRight size={17} /></>
              )}
            </button>
            <span className="fantasy-hint">
              <span>✦</span> best entered with a little imagination <span>✦</span>
            </span>
          </motion.div>
          {walking && (
            <motion.div
              className="fantasy-walk-caption"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span>✨</span> following the magic…
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
