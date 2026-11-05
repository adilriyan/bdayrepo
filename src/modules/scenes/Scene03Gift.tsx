import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowLeft, ArrowRight, Gift, Heart, Sparkles } from 'lucide-react'
import { Teddy } from '../../shared/components/Teddy/Teddy'
import { Confetti } from '../../shared/components/Confetti/Confetti'
import { DioramaStage } from '../../shared/components/DioramaStage/DioramaStage'

export interface Scene03GiftProps {
  giftOpen: boolean
  onToggleGift: () => void
  onOpenGift: () => void
  onBack: () => void
  onNext: () => void
}

export const Scene03Gift: React.FC<Scene03GiftProps> = ({
  giftOpen,
  onToggleGift,
  onOpenGift,
  onBack,
  onNext
}) => {
  return (
    <>
      <DioramaStage>
      <div className={`art-stage gift-stage ${giftOpen ? 'gift-open' : ''}`}>
        <span className="floaty gift-f1">✦</span>
        <span className="floaty gift-f2">♡</span>
        <span className="floaty gift-f3">✧</span>

        {/* 3D Contact Shadow */}
        <motion.div
          className="gift-shadow-3d"
          animate={
            giftOpen
              ? { scale: 1.18, opacity: 0.45, filter: 'blur(14px)' }
              : { scale: 1, opacity: 0.3, filter: 'blur(9px)' }
          }
          transition={{ type: 'spring', stiffness: 120, damping: 15 }}
        />

        {/* 3D Gift Box Container */}
        <div className="gift-box-3d">
          {/* Deep Cavity Interior */}
          <div className="gift-interior">
            <span className="interior-shadow" />
            <span className="interior-glow" />
          </div>

          {/* Teddy Emerging from Box */}
          <AnimatePresence>
            {giftOpen && (
              <motion.div
                className="gift-teddy-3d"
                initial={{ y: 75, scale: 0.5, rotate: -8, opacity: 0 }}
                animate={{
                  y: -52,
                  scale: 1.05,
                  rotate: [ -8, 4, -2, 0 ],
                  opacity: 1
                }}
                exit={{ y: 70, scale: 0.5, opacity: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 170,
                  damping: 12,
                  mass: 0.9,
                  delay: 0.05
                }}
              >
                <Teddy />
                <motion.div
                  className="gift-teddy-burst"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1.2 }}
                  exit={{ opacity: 0 }}
                >
                  <Sparkles size={20} className="burst-spark bs1" />
                  <Sparkles size={16} className="burst-spark bs2" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Front & Sides of the Box */}
          <div className="gift-body-3d">
            <div className="gift-ribbon-vertical" />
            <div className="gift-ribbon-horizontal" />
            <span className="gift-highlight" />
          </div>

          {/* 3D Spring-loaded Lid */}
          <motion.div
            className="gift-lid-3d"
            animate={
              giftOpen
                ? {
                    y: -115,
                    x: 36,
                    z: 70,
                    rotateX: -38,
                    rotateY: 22,
                    rotateZ: -16,
                    scale: 1.04
                  }
                : {
                    y: 0,
                    x: 0,
                    z: 0,
                    rotateX: 0,
                    rotateY: 0,
                    rotateZ: 0,
                    scale: 1
                  }
            }
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 13,
              mass: 0.8
            }}
          >
            <div className="gift-lid-face">
              <span className="lid-ribbon-v" />
              <span className="lid-ribbon-h" />
              <div className="gift-bow">
                <span className="bow-loop bow-left" />
                <span className="bow-loop bow-right" />
                <span className="bow-center">♥</span>
              </div>
            </div>
            <div className="gift-lid-rim" />
          </motion.div>
        </div>

        {/* Interactive Hit Area */}
        <button
          className="gift-hit"
          onPointerDown={(e) => {
            e.currentTarget.dataset.down = String(Date.now())
          }}
          onPointerUp={(e) => {
            if (Date.now() - Number(e.currentTarget.dataset.down || Date.now()) > 350) {
              e.currentTarget.dataset.held = 'yes'
              onOpenGift()
            }
          }}
          onClick={(e) => {
            if (e.currentTarget.dataset.held === 'yes') {
              e.currentTarget.dataset.held = 'no'
              return
            }
            onToggleGift()
          }}
          aria-label={giftOpen ? 'Close gift box' : 'Open surprise gift box'}
        >
          <span className="gift-tap-hint">
            {giftOpen ? 'tap to close box' : 'tap or hold to unwrap'}
          </span>
        </button>

        {giftOpen && <Confetti active={giftOpen} />}
      </div>
      </DioramaStage>

      <div className="copy">
        <span className="script-kicker">surprise, surprise!</span>
        <h1>
          {giftOpen ? (
            <>A whole lot of <em>togetherness.</em></>
          ) : (
            <>One last little<br /><em>surprise.</em></>
          )}
        </h1>
        <p>
          {giftOpen
            ? 'Imagine this teddy delivering the biggest, squishiest birthday hug. That’s me, in spirit.'
            : 'A tiny box with a big thought inside. Ready?'}
        </p>
        <div className="button-row">
          <button className="secondary" onClick={onBack}>
            <ArrowLeft size={16} /> Back
          </button>
          <button className="primary" onClick={giftOpen ? onNext : onOpenGift}>
            {giftOpen ? (
              <>Continue to memories <ArrowRight size={17} /></>
            ) : (
              <>Open your gift <Gift size={17} /></>
            )}
          </button>
        </div>
        <span className="microcopy">
          <Heart size={13} fill="currentColor" /> celebrating our bond and happy moments
        </span>
      </div>
    </>
  )
}
