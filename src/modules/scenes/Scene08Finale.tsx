import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowLeft, RotateCcw, Heart, Music2 } from 'lucide-react'
import { Teddy } from '../../shared/components/Teddy/Teddy'
import { DioramaStage } from '../../shared/components/DioramaStage/DioramaStage'
import { storyContent } from '../../config/storyContent'

export interface Scene08FinaleProps {
  hugCount: number
  secrets: string[]
  musicPlaying: boolean
  onHug: () => void
  onGroupHug: () => void
  onDiscover: (id: string) => void
  onToggleMusic: () => void
  onBack: () => void
  onRestart: () => void
}

export const Scene08Finale: React.FC<Scene08FinaleProps> = ({
  hugCount,
  secrets,
  musicPlaying,
  onHug,
  onGroupHug,
  onDiscover,
  onToggleMusic,
  onBack,
  onRestart
}) => {
  return (
    <>
      <DioramaStage>
      <div className="art-stage finale-stage">
        <div className="finale-halo" />
        <div className="finale-lights">
          {Array.from({ length: 9 }, (_, i) => (
            <button
              key={i}
              style={{ left: `${8 + i * 10.5}%`, animationDelay: `${i * 0.24}s` }}
              onClick={() => onDiscover(`light-${i}`)}
              aria-label={`Light ${i + 1}: reveal a little magic`}
            />
          ))}
        </div>
        <Teddy big interactive hugCount={hugCount} onHug={onHug} />
        <div
          className="finale-penguins"
          aria-label="Two penguin friends by the sea"
          role="button"
          tabIndex={0}
          onClick={onGroupHug}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onGroupHug()
            }
          }}
        >
          <motion.div
            className="penguin penguin-left finale-penguin-left"
            animate={{ y: [0, -5, 0], rotate: [-3, 2, -3] }}
            transition={{ duration: 2.7, repeat: Infinity, ease: 'easeInOut' }}
            role="img"
            aria-label="Happy penguin"
          >
            <span className="penguin-wing wing-left" />
            <span className="penguin-wing wing-right" />
            <span className="penguin-belly" />
            <span className="penguin-eye eye-left" />
            <span className="penguin-eye eye-right" />
            <span className="penguin-blush blush-left" />
            <span className="penguin-blush blush-right" />
            <span className="penguin-beak" />
            <span className="penguin-feet" />
          </motion.div>
          <motion.div
            className="penguin penguin-right finale-penguin-right"
            animate={{ y: [0, -7, 0], rotate: [2, -2, 2] }}
            transition={{ duration: 2.3, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            role="img"
            aria-label="Penguin friend"
          >
            <span className="penguin-wing wing-left" />
            <span className="penguin-wing wing-right" />
            <span className="penguin-belly" />
            <span className="penguin-eye eye-left" />
            <span className="penguin-eye eye-right" />
            <span className="penguin-blush blush-left" />
            <span className="penguin-blush blush-right" />
            <span className="penguin-beak" />
            <span className="penguin-feet" />
          </motion.div>
        </div>
        <AnimatePresence>
          {hugCount > 0 && (
            <motion.div
              className="hug-burst finale-burst"
              key={`final-${hugCount}`}
              initial={{ opacity: 0, scale: 0.4, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: -12 }}
              exit={{ opacity: 0, scale: 1.4, y: -40 }}
              transition={{ duration: 0.7 }}
            >
              <span>♡</span>
              <span>♥</span>
              <span>♡</span>
              <small>one more hug!</small>
            </motion.div>
          )}
        </AnimatePresence>
        <span className="floaty final-f1">♡</span>
        <span className="floaty final-f2">✦</span>
        <span className="floaty final-f3">♡</span>
        <div className="finale-ribbon">one teddy, two penguins, one good friend</div>
      </div>
      </DioramaStage>
      <div className="copy finale-copy">
        <span className="script-kicker">a little letter, from a lot of thinking</span>
        <h1>
          Life is sweeter<br />with you <em>in it.</em>
        </h1>
        <button
          className="secret-heart"
          onClick={() => onDiscover('final-heart')}
          aria-label="Reveal a secret birthday message"
        >
          ✦ tap for one last secret
        </button>
        <motion.div
          className="final-letter"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.85, delayChildren: 0.45 }
            }
          }}
        >
          {storyContent.finaleLetterParagraphs.map((paragraph, idx) => (
            <motion.p
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: 'easeOut' } }
              }}
            >
              {paragraph}
            </motion.p>
          ))}
        </motion.div>
        {secrets.includes('final-heart') && (
          <p className="secret-final-message">
            {storyContent.secretFinalMessage}
          </p>
        )}
        <div className="music-card">
          <div className="voice-icon">
            <Music2 size={18} />
          </div>
          <div className="voice-copy">
            <strong>A LITTLE BIRTHDAY SOUNDTRACK</strong>
            <span>
              {musicPlaying
                ? 'Your birthday soundtrack is playing ♪'
                : 'Your birthday soundtrack is paused. Tap play to resume ♪'}
            </span>
          </div>
          <button
            className={`music-play ${musicPlaying ? 'is-playing' : ''}`}
            onClick={onToggleMusic}
            aria-label={musicPlaying ? 'Pause birthday music' : 'Play birthday music'}
          >
            {musicPlaying ? 'Ⅱ' : '▶'} <span>{musicPlaying ? 'Pause' : 'Play music'}</span>
          </button>
        </div>
        <div className="button-row">
          <button className="secondary" onClick={onBack}>
            <ArrowLeft size={16} /> Back
          </button>
          <button className="primary" onClick={onRestart}>
            <RotateCcw size={16} /> Hug the teddy again
          </button>
        </div>
        <span className="microcopy">
          <Heart size={13} fill="currentColor" /> made with a lot of thinking, just for you
        </span>
      </div>
    </>
  )
}
