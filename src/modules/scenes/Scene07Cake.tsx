import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowLeft, Sparkles, Star, Heart, PartyPopper } from 'lucide-react'
import { Confetti } from '../../shared/components/Confetti/Confetti'
import { CakeFood } from '../../shared/components/CakeFood/CakeFood'
import { DioramaStage } from '../../shared/components/DioramaStage/DioramaStage'
import { storyContent } from '../../config/storyContent'

export interface Scene07CakeProps {
  blownCandles: number[]
  sparkle: boolean
  onBlowCandle: (index: number) => void
  onBlowAllCandles: () => void
  onBack: () => void
  onNext: () => void
}

interface SmokePuff {
  id: number
  candleIndex: number
  drift: number
  delay: number
}

let smokeSeq = 0

export const Scene07Cake: React.FC<Scene07CakeProps> = ({
  blownCandles,
  sparkle,
  onBlowCandle,
  onBlowAllCandles,
  onBack,
  onNext
}) => {
  const allBlown = blownCandles.length >= 5
  const [smokePuffs, setSmokePuffs] = useState<SmokePuff[]>([])

  // Approximate candle positions as % of the candle-row width
  const candlePositions = [9, 25.5, 50, 74.5, 91] // percent left

  const handleBlowCandle = useCallback((i: number) => {
    if (blownCandles.includes(i)) return

    // Spawn 3 staggered puffs per candle blow
    const newPuffs: SmokePuff[] = [
      { id: ++smokeSeq, candleIndex: i, drift: (Math.random() - 0.5) * 14, delay: 0 },
      { id: ++smokeSeq, candleIndex: i, drift: (Math.random() - 0.5) * 18, delay: 0.13 },
      { id: ++smokeSeq, candleIndex: i, drift: (Math.random() - 0.5) * 10, delay: 0.28 },
    ]
    setSmokePuffs((old) => [...old.slice(-24), ...newPuffs])
    onBlowCandle(i)
  }, [blownCandles, onBlowCandle])

  const removePuff = useCallback((id: number) => {
    setSmokePuffs((old) => old.filter((p) => p.id !== id))
  }, [])

  return (
    <>
      <DioramaStage>
      <div className="art-stage cake-stage">
        <span className="floaty cake-f1">
          <Star size={17} />
        </span>
        <span className="floaty cake-f2">
          <Heart size={17} />
        </span>
        <div className={`cake-scene ${allBlown ? 'cake-feast' : ''}`}>
          {/* Smoke puffs layer — positioned absolutely above cake */}
          <div className="cake-smoke-layer" aria-hidden="true">
            <AnimatePresence>
              {smokePuffs.map((puff) => (
                <motion.div
                  key={puff.id}
                  className="smoke-puff"
                  style={{ left: `${candlePositions[puff.candleIndex]}%` }}
                  initial={{ opacity: 0, y: 0, scale: 0.35, x: 0 }}
                  animate={{
                    opacity: [0, 0.7, 0.5, 0],
                    y: [-2, -22, -42, -60],
                    scale: [0.35, 1, 2, 2.8],
                    x: [0, puff.drift * 0.3, puff.drift * 0.75, puff.drift],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 1.4,
                    delay: puff.delay,
                    ease: 'easeOut',
                    times: [0, 0.3, 0.65, 1],
                  }}
                  onAnimationComplete={() => removePuff(puff.id)}
                />
              ))}
            </AnimatePresence>
          </div>

          <div className="cake-candles">
            {[0, 1, 2, 3, 4].map((i) => (
              <button
                key={i}
                className={`candle ${blownCandles.includes(i) ? 'blown' : ''}`}
                onClick={() => handleBlowCandle(i)}
                aria-label={`Blow out candle ${i + 1}`}
              >
                <i />
              </button>
            ))}
          </div>
          <div className="cake-top">
            <span className="icing-swirl swirl-one" />
            <span className="icing-swirl swirl-two" />
            <span className="icing-swirl swirl-three" />
          </div>
          <div className="cake-toppings" aria-label="Birthday cake toppings">
            <span className="cake-fruit fruit-one"><CakeFood kind="strawberry" /></span>
            <span className="cake-fruit fruit-two"><CakeFood kind="grapes" /></span>
            <span className="cake-fruit fruit-fig"><CakeFood kind="fig" /></span>
            <span className="cake-fruit fruit-three"><CakeFood kind="cherry" /></span>
            <span className="cake-fruit fruit-four"><CakeFood kind="blueberry" /></span>
            <span className="cake-chocolate"><CakeFood kind="chocolate" /></span>
            <span className="cake-icecream"><CakeFood kind="ice-cream" /></span>
          </div>
          <div className="cake-body">
            <span className="cake-side-layer" />
            <span className="cake-sprinkle sprinkle-a" />
            <span className="cake-sprinkle sprinkle-b" />
            <span className="cake-sprinkle sprinkle-c" />
            <span className="cake-message">
              {allBlown ? `happy birthday ${storyContent.recipientName}` : 'make a wish'}
            </span>
          </div>
          <div className="cake-plate">
            <span />
          </div>
        </div>

        {sparkle && allBlown && (
          <>
            <Confetti active={true} />
            <motion.div
              className="cake-surprise-pop"
              initial={{ opacity: 0, scale: 0.4, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 16 }}
            >
              <PartyPopper size={17} /> cake magic unlocked! <Heart size={15} fill="currentColor" />
            </motion.div>
          </>
        )}
      </div>
      </DioramaStage>
      <div className="copy">
        <span className="script-kicker">your very own moment</span>
        <h1>
          Close your eyes.<br />Make a <em>wish.</em>
        </h1>
        <p>
          {allBlown
            ? `Your birthday cake is waiting just for you. Make a wish, ${storyContent.recipientName} — may this year bring you all the soft, happy, beautiful things you deserve!`
            : `Take a little breath, make your biggest birthday wish, ${storyContent.recipientName}, and tap each candle to blow it out. When all five are out, a little birthday magic will appear just for you.`}
        </p>
        <div className="button-row">
          <button className="secondary" onClick={onBack}>
            <ArrowLeft size={16} /> Back
          </button>
          <button
            className="primary"
            onClick={allBlown ? onNext : onBlowAllCandles}
          >
            {allBlown ? 'My wish is made' : 'Blow out the candles'} <Sparkles size={17} />
          </button>
        </div>
        <span className="microcopy">
          <Sparkles size={13} /> {blownCandles.length} of 5 candles blown out {allBlown ? '· surprise unlocked!' : ''}
        </span>
      </div>
    </>
  )
}
