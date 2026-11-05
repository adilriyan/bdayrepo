import React from 'react'
import { ArrowLeft, ArrowRight, Heart } from 'lucide-react'
import { DioramaStage } from '../../shared/components/DioramaStage/DioramaStage'
import { DraggablePenguin } from '../../shared/components/Penguin/DraggablePenguin'
import type { Ripple } from '../../types/story.types'

export interface Scene05SeasideProps {
  ripples: Ripple[]
  secrets: string[]
  onTouchWater: (e: React.PointerEvent<HTMLDivElement>) => void
  onDiscover: (id: string) => void
  onBack: () => void
  onNext: () => void
}

export const Scene05Seaside: React.FC<Scene05SeasideProps> = ({
  ripples,
  secrets,
  onTouchWater,
  onDiscover,
  onBack,
  onNext
}) => {
  return (
    <>
      <DioramaStage>
      <div className="art-stage sea-stage" onPointerDown={onTouchWater}>
        <div className="sea-sky">
          <span className="sea-sun" />
          <span className="sea-cloud cloud-one" />
          <span className="sea-cloud cloud-two" />
        </div>
        <div className="ocean ocean-back" />
        <div className="ocean ocean-front" />
        <span className="sea-sparkle sea-sparkle-one">✦</span>
        <span className="sea-sparkle sea-sparkle-two">✧</span>
        <span className="sea-heart">♡</span>
        <DraggablePenguin side="left" onDiscover={() => onDiscover('penguin-left')} />
        <DraggablePenguin side="right" onDiscover={() => onDiscover('penguin-right')} />
        <div className="sea-message">
          two little penguins, in this together <span>♡</span>
        </div>
        {ripples.map((r) => (
          <i
            key={r.id}
            className="water-ripple"
            style={{ left: `${r.x}%`, top: `${r.y}%` }}
          />
        ))}
        <button
          className={`hidden-shell shell-one ${secrets.includes('shell-one') ? 'found' : ''}`}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation()
            onDiscover('shell-one')
          }}
          aria-label="Find a hidden seashell"
        >
          🐚
        </button>
        <button
          className={`hidden-shell shell-two ${secrets.includes('shell-two') ? 'found' : ''}`}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation()
            onDiscover('shell-two')
          }}
          aria-label="Find another hidden seashell"
        >
          ✦
        </button>
        <div className="secret-toast" aria-live="polite">
          {secrets.length > 0
            ? `you found ${secrets.length} little bit${secrets.length === 1 ? '' : 's'} of magic ♡`
            : 'tap the sea, drag the penguins, find the hidden shells'}
        </div>
      </div>
      </DioramaStage>
      <div className="copy">
        <span className="script-kicker">a tiny seaside detour</span>
        <h1>
          Side by side,<br />through every <em>sea.</em>
        </h1>
        <p>
          If life gets stormy, we’ll waddle through it together. If the sun comes out, we’ll find a little ocean to dance beside. We are in this together — flippers, silly laughs, and all.
        </p>
        <div className="button-row">
          <button className="secondary" onClick={onBack}>
            <ArrowLeft size={16} /> Back
          </button>
          <button className="primary" onClick={onNext}>
            Keep our story going <ArrowRight size={17} />
          </button>
        </div>
        <span className="microcopy">
          <Heart size={13} fill="currentColor" /> two penguins, side by side on this journey
        </span>
      </div>
    </>
  )
}

