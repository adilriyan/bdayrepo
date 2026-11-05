import React from 'react'

export interface ConfettiProps {
  active: boolean
}

const CONFETTI_COLORS = ['var(--brand-rose)', 'var(--brand-gold)', 'var(--brand-sage)', 'var(--brand-lavender)']

export const Confetti: React.FC<ConfettiProps> = ({ active }) => {
  if (!active) return null

  return (
    <div className="confetti" aria-hidden="true">
      {Array.from({ length: 38 }, (_, i) => (
        <i
          key={i}
          style={{
            left: `${(i * 37) % 100}%`,
            animationDelay: `${(i % 11) * 0.09}s`,
            background: CONFETTI_COLORS[i % 4],
            transform: `rotate(${i * 29}deg)`
          }}
        />
      ))}
    </div>
  )
}

