import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowLeft, ArrowRight, Mail } from 'lucide-react'
import { DioramaStage } from '../../shared/components/DioramaStage/DioramaStage'
import { storyContent } from '../../config/storyContent'

export interface Scene06OpenWhenProps {
  openedLetters: number[]
  onToggleNote: (index: number) => void
  onBack: () => void
  onNext: () => void
}

export const Scene06OpenWhen: React.FC<Scene06OpenWhenProps> = ({
  openedLetters,
  onToggleNote,
  onBack,
  onNext
}) => {
  return (
    <>
      <DioramaStage>
      <div className="art-stage open-when-stage">
        <div className="letter-wall">
          {storyContent.openWhenNotes.map((letter, i) => {
            const isOpen = openedLetters.includes(i)
            return (
              <motion.button
                layout
                key={letter.title}
                className={`mini-envelope-3d ${isOpen ? 'mini-open' : ''}`}
                onClick={() => onToggleNote(i)}
                aria-expanded={isOpen}
                transition={{ type: 'spring', stiffness: 220, damping: 20 }}
              >
                {/* 3D Origami Envelope Flap */}
                <motion.div
                  className="mini-flap-3d"
                  animate={isOpen ? { rotateX: -175 } : { rotateX: 0 }}
                  transition={{ type: 'spring', stiffness: 180, damping: 18 }}
                >
                  <span className="mini-flap-triangle" />
                  <span className="mini-seal">♥</span>
                </motion.div>

                {/* Envelope Pocket */}
                <div className="mini-envelope-body">
                  <div className="mini-header-row">
                    <span className="mini-icon">{letter.icon}</span>
                    <strong>{letter.title}</strong>
                  </div>

                  {/* Letter sliding out in 3D */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        className="mini-letter-content"
                        initial={{ opacity: 0, y: 15, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                      >
                        <div className="mini-letter-paper">
                          <span className="mini-paper-line" />
                          <p className="mini-message">{letter.msg}</p>
                          <span className="mini-paper-sign"> ♡ with warm wishes </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <small className="mini-toggle-hint">
                    {isOpen ? 'tap to fold shut' : 'tap to unseal'}
                  </small>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>
      </DioramaStage>
      <div className="copy">
        <span className="script-kicker">for every kind of day</span>
        <h1>
          Open when you<br />need a little <em>company.</em>
        </h1>
        <p>
          Six tiny notes for six different moods. Open one now, or save the others for a day when you need them.
        </p>
        <div className="button-row">
          <button className="secondary" onClick={onBack}>
            <ArrowLeft size={16} /> Back
          </button>
          <button className="primary" onClick={onNext}>
            Make a birthday wish <ArrowRight size={17} />
          </button>
        </div>
        <span className="microcopy">
          <Mail size={13} /> {openedLetters.length} of 6 little notes opened
        </span>
      </div>
    </>
  )
}
