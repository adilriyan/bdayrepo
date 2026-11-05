import React from 'react'
import { motion } from 'motion/react'
import { Heart } from 'lucide-react'
import type { SceneIndex } from '../../../types/story.types'

export interface ProgressBarProps {
  scene: SceneIndex
  friendshipMagic: number
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ scene, friendshipMagic }) => {
  return (
    <>
      <div className="step-row">
        <span className="eyebrow">A BIRTHDAY MINI ADVENTURE</span>
        <span className="step-count" aria-label={`Scene ${scene + 1} of 8`}>
          0{scene + 1} <span>/</span> 08
        </span>
      </div>
      <div
        className="progress"
        role="progressbar"
        aria-label="Birthday story progress"
        aria-valuemin={1}
        aria-valuemax={8}
        aria-valuenow={scene + 1}
      >
        <motion.div
          className="progress-fill"
          animate={{ width: `${((scene + 1) / 8) * 100}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        />
      </div>
      <div
        className={`friendship-meter ${friendshipMagic >= 100 ? 'meter-complete' : ''}`}
        aria-label={`Magic meter ${friendshipMagic} percent`}
      >
        <span>
          <Heart size={12} fill="currentColor" /> our magic
        </span>
        <div>
          <i style={{ width: `${friendshipMagic}%` }} />
        </div>
        <small>{friendshipMagic}%</small>
      </div>
    </>
  )
}

