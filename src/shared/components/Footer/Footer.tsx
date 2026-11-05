import React from 'react'
import { Heart, RotateCcw } from 'lucide-react'
import type { SceneIndex } from '../../../types/story.types'
import { sceneNames } from '../../../config/storyContent'

export interface FooterProps {
  scene: SceneIndex
  secretsCount: number
  onSelectScene: (scene: SceneIndex) => void
  onRestart: () => void
}

export const Footer: React.FC<FooterProps> = ({
  scene,
  secretsCount,
  onSelectScene,
  onRestart
}) => {
  return (
    <footer className="footer">
      <span>
        a little gift with <Heart size={12} fill="currentColor" /> from me
      </span>
      <div className="dots">
        {([0, 1, 2, 3, 4, 5, 6, 7] as SceneIndex[]).map((i) => (
          <button
            key={i}
            className={scene === i ? 'active' : ''}
            aria-current={scene === i ? 'step' : undefined}
            onClick={() => onSelectScene(i)}
            aria-label={`Go to scene ${i + 1}: ${sceneNames[i]}`}
          />
        ))}
      </div>
      <span className="secret-count">✦ {secretsCount} secrets</span>
      <button className="restart" onClick={onRestart}>
        <RotateCcw size={13} /> replay
      </button>
    </footer>
  )
}

