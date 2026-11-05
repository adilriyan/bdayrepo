import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Teddy } from '../../shared/components/Teddy/Teddy'
import { DioramaStage } from '../../shared/components/DioramaStage/DioramaStage'
import { storyContent } from '../../config/storyContent'

export interface Scene01WelcomeProps {
  hugCount: number
  onHug: () => void
  onNext: () => void
}

export const Scene01Welcome: React.FC<Scene01WelcomeProps> = ({ hugCount, onHug, onNext }) => {
  return (
    <>
      <DioramaStage>
      <div className="art-stage welcome-stage">
        <div className="sun-disc z-bg" />
        <span className="floaty f1 z-bg">♡</span>
        <span className="floaty f2 z-bg">✦</span>
        <span className="floaty f3 z-bg">♡</span>
        <span className="floaty f4 z-bg">✧</span>
        <div className="z-fg">
          <Teddy big interactive hugCount={hugCount} onHug={onHug} />
        </div>
        <AnimatePresence>
          {hugCount > 0 && (
            <motion.div
              className="hug-burst"
              key={hugCount}
              initial={{ opacity: 0, scale: 0.4, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: -12 }}
              exit={{ opacity: 0, scale: 1.4, y: -40 }}
              transition={{ duration: 0.7 }}
              aria-live="polite"
            >
              <span>♡</span>
              <span>♥</span>
              <span>♡</span>
              <small>hug received!</small>
            </motion.div>
          )}
        </AnimatePresence>
        <span className="tiny-label label-left">a bear hug</span>
        <span className="tiny-label label-right">just for you</span>
      </div>
      </DioramaStage>
      <div className="copy">
        <span className="script-kicker">{storyContent.welcomeKicker}</span>
        <h1>
          Hey, <em>{storyContent.recipientName}.</em><br />
          I made you a little something.
        </h1>
        <p>{storyContent.welcomeBody}</p>
        <button className="primary" onClick={onNext}>
          {storyContent.welcomeButton} <ArrowRight size={17} />
        </button>
        <span className="microcopy">
          <Sparkles size={13} /> {storyContent.welcomeMicrocopy}
        </span>
      </div>
    </>
  )
}

