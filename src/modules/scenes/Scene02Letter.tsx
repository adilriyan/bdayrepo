import React, { useRef, useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Heart, ArrowLeft, ArrowRight, Mail } from 'lucide-react'
import { DioramaStage } from '../../shared/components/DioramaStage/DioramaStage'
import { storyContent } from '../../config/storyContent'

export interface Scene02LetterProps {
  opened: boolean
  letterPulled: boolean
  onToggleEnvelope: () => void
  onPullLetter: () => void
  onBack: () => void
  onNext: () => void
}

export const Scene02Letter: React.FC<Scene02LetterProps> = ({
  opened,
  letterPulled,
  onToggleEnvelope,
  onPullLetter,
  onBack,
  onNext
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [canScroll, setCanScroll] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Split message into readable storybook paragraphs
  const paragraphs = useMemo(() => {
    return storyContent.letterMessage
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean)
  }, [])

  // Check if content overflows container when letter is pulled
  useEffect(() => {
    if (letterPulled && scrollRef.current) {
      const el = scrollRef.current
      setCanScroll(el.scrollHeight > el.clientHeight + 6)
    } else {
      setScrolled(false)
      setScrollProgress(0)
    }
  }, [letterPulled])

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget
    const maxScroll = target.scrollHeight - target.clientHeight
    const progress = maxScroll > 0 ? target.scrollTop / maxScroll : 0
    setScrollProgress(progress)

    if (target.scrollTop > 16) {
      if (!scrolled) setScrolled(true)
    } else {
      if (scrolled) setScrolled(false)
    }
  }

  // Envelope wheel interaction: scrolling down/up pulls out the letter
  const handleWrapperWheel = (e: React.WheelEvent) => {
    if (opened && !letterPulled && (e.deltaY > 0 || e.deltaY < 0)) {
      onPullLetter()
    }
  }

  return (
    <>
      <DioramaStage>
      <div className={`art-stage envelope-stage ${opened ? 'is-open' : ''}`}>
        <div
          className="origami-envelope-wrapper"
          onWheel={handleWrapperWheel}
        >
          {/* Back plate of envelope with luxury patterned inner lining */}
          <div className="env-back">
            <div className="env-lining" aria-hidden="true">
              <span className="lining-star ls1">✦</span>
              <span className="lining-heart lh1">♡</span>
              <span className="lining-star ls2">✧</span>
              <span className="lining-heart lh2">♡</span>
            </div>
          </div>

          {/* 3D Folding Top Flap: placed before letter in DOM so letter is in front */}
          <motion.div
            className="env-flap-3d"
            animate={opened ? { rotateX: -175 } : { rotateX: 0 }}
            transition={{
              type: 'spring',
              stiffness: 130,
              damping: 17,
              mass: 0.9
            }}
          >
            <div className="env-flap-front">
              <span className="flap-crease" />
            </div>
            <div className="env-flap-back">
              <div className="env-lining-flap" />
            </div>
          </motion.div>

          {/* Letter Paper with 3D depth - glides out smoothly after flap opens */}
          <motion.div
            className={`letter-paper ${letterPulled ? 'letter-pulled' : ''}`}
            drag={opened && !letterPulled ? 'y' : false}
            dragConstraints={{ top: -125, bottom: 0 }}
            dragElastic={0.12}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
            initial={false}
            animate={
              opened
                ? {
                    y: letterPulled ? -118 : -40,
                    z: letterPulled ? 42 : 16,
                    scale: letterPulled ? 1.03 : 1,
                    opacity: 1,
                    rotateX: letterPulled ? 1.5 : 0
                  }
                : { y: 25, z: 0, scale: 0.94, opacity: 0, rotateX: 0 }
            }
            transition={{
              type: 'spring',
              stiffness: 140,
              damping: 18,
              delay: opened ? 0.22 : 0 // Flap opens first, then letter glides up elegantly
            }}
            onDragEnd={(_, info) => {
              if (info.offset.y < -20) {
                onPullLetter()
              }
            }}
            onClick={() => {
              if (!opened) {
                onToggleEnvelope()
              } else if (!letterPulled) {
                onPullLetter()
              }
            }}
            style={{
              pointerEvents: opened ? 'auto' : 'none'
            }}
          >
            {/* Parchment scroll rolled edge curls */}
            <div className="parchment-curl-top" aria-hidden="true" />
            <div className="parchment-curl-bottom" aria-hidden="true" />

            <div className="letter-sheen" />

            {/* Fixed Header Zone with Reading Progress Bar */}
            <div className="letter-header-zone">
              <div className="letter-top">
                <span>{storyContent.letterTop}</span>
                <Heart size={13} fill="currentColor" />
              </div>
              <div className="letter-reading-track" aria-hidden="true">
                <div
                  className="letter-reading-bar"
                  style={{ transform: `scaleX(${scrollProgress})` }}
                />
              </div>
              <div className="letter-line" />
            </div>

            {/* Scrollable Letter Body */}
            <div
              className="letter-scroll-content"
              ref={scrollRef}
              onScroll={handleScroll}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
            >
              <p className="letter-salutation">{storyContent.letterSalutation}</p>
              {paragraphs.map((paragraph, idx) => (
                <p key={idx} className="letter-paragraph">
                  {paragraph}
                </p>
              ))}
              <div className="letter-sign">
                {storyContent.letterSign} <span>♡</span>
              </div>
              <div className="letter-scroll-end" aria-hidden="true">
                <span>✦</span>
                <span>with all my affection</span>
                <span>✦</span>
              </div>
            </div>

            {/* Floating animated scroll hint prompt */}
            <AnimatePresence>
              {letterPulled && canScroll && !scrolled && (
                <motion.button
                  className="letter-scroll-hint"
                  type="button"
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    scrollRef.current?.scrollBy({ top: 90, behavior: 'smooth' })
                  }}
                  aria-label="Scroll down to read more"
                >
                  <span>scroll to read</span>
                  <motion.span
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    ↓
                  </motion.span>
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Front Pocket of Envelope - Symmetrical Origami folds */}
          <div className="env-front-pocket">
            <span className="env-front-left" />
            <span className="env-front-right" />
            <span className="env-front-bottom" />
          </div>

          {/* Wax Seal with 3D Breaking/Popping Motion */}
          <AnimatePresence>
            {!opened && (
              <motion.button
                className="wax wax-interactive"
                onClick={onToggleEnvelope}
                initial={{ scale: 0.4, opacity: 0, rotateZ: -20 }}
                animate={{ scale: 1, opacity: 1, rotateZ: 0 }}
                exit={{
                  scale: 0.5,
                  opacity: 0,
                  y: -36,
                  rotateX: 45,
                  rotateZ: -30,
                  transition: { duration: 0.28, ease: 'easeOut' }
                }}
                whileHover={{ scale: 1.08, rotateZ: 4 }}
                whileTap={{ scale: 0.92 }}
                aria-label="Break the wax seal to open the letter"
              >
                <span className="wax-rim" />
                <span className="wax-emblem">♥</span>
                <span className="wax-sparkle">✦</span>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Interactive touch hit zone for closing / re-folding */}
          {opened && (
            <button
              className="env-close-hit"
              onClick={onToggleEnvelope}
              aria-label="Close the envelope gently"
            >
              <span className="env-hint">
                {letterPulled ? 'tap to fold letter back' : 'tap letter to read · tap here to fold'}
              </span>
            </button>
          )}

          {!opened && (
            <span className="env-hint env-hint-closed">tap seal to open</span>
          )}
        </div>

        <span className="floaty env-f1">✧</span>
        <span className="floaty env-f2">♡</span>
      </div>
      </DioramaStage>

      <div className="copy">
        <span className="script-kicker">sealed with a thought</span>
        <h1>
          {opened ? (
            <>
              A few thoughts from<br />
              <em>your friend.</em>
            </>
          ) : (
            <>
              You’ve got <em>mail.</em><br />
              The very cute kind.
            </>
          )}
        </h1>
        <p>
          {opened
            ? 'No fancy reason. I just thought you should know that you are a very good friend to have.'
            : 'There’s a tiny letter tucked inside. Go on, break the seal.'}
        </p>
        <div className="button-row">
          <button className="secondary" onClick={onBack}>
            <ArrowLeft size={16} /> Back
          </button>
          <button
            className="primary"
            onClick={!opened ? onToggleEnvelope : onNext}
          >
            {!opened ? 'Open letter' : 'What’s the gift?'} <ArrowRight size={17} />
          </button>
        </div>
        <span className="microcopy">
          <Mail size={13} />{' '}
          {opened ? 'a little reminder to keep forever' : 'one little tap opens a few kind thoughts'}
        </span>
      </div>
    </>
  )
}
