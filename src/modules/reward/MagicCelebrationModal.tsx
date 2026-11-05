import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Heart, Sparkles, CakeSlice, Star, ArrowRight } from 'lucide-react'
import { Confetti } from '../../shared/components/Confetti/Confetti'
import { storyContent } from '../../config/storyContent'

export interface MagicCelebrationModalProps {
  show: boolean
  onDismiss: () => void
  onContinue: () => void
}

export const MagicCelebrationModal: React.FC<MagicCelebrationModalProps> = ({
  show,
  onDismiss,
  onContinue
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="magic-100-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="magic-100-title"
        >
          <Confetti active={true} />
          <motion.div
            className="magic-100-card"
            initial={{ y: 35, scale: 0.82, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 150, damping: 16 }}
          >
            <div className="magic-100-emblem">
              <Heart size={34} fill="currentColor" />
              <Sparkles size={19} />
            </div>
            <span className="script-kicker">you found every little bit of magic</span>
            <h2 id="magic-100-title">100% friendship magic!</h2>
            <p>
              Every tiny secret led here, {storyContent.recipientName}. Your friendship is the real birthday gift, and I have been thinking that it is the best part of this whole little adventure.
            </p>
            <div className="magic-100-reward">
              <CakeSlice size={20} />
              <span>Perfect friend status unlocked</span>
              <Star size={17} fill="currentColor" />
            </div>
            <button className="primary" onClick={onContinue}>
              Keep the celebration going <ArrowRight size={17} />
            </button>
            <button className="magic-dismiss" onClick={onDismiss}>
              I'll explore a little more
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
