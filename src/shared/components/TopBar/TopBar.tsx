import React from 'react'
import { Heart } from 'lucide-react'

export interface TopBarProps {
  soundOn: boolean
  onToggleSound: () => void
  onRestart: () => void
}

export const TopBar: React.FC<TopBarProps> = ({ soundOn, onToggleSound, onRestart }) => {
  return (
    <header className="topbar">
      <a
        className="brand"
        href="#top"
        onClick={(e) => {
          e.preventDefault()
          onRestart()
        }}
      >
        <span className="brand-mark">✳</span> little things, together
      </a>
      <button
        className="top-note sound-setting"
        onClick={onToggleSound}
        aria-pressed={soundOn}
      >
        <Heart size={14} fill="currentColor" /> for someone special{' '}
        <span>{soundOn ? '♪ sound on' : 'sound off'}</span>
      </button>
    </header>
  )
}

