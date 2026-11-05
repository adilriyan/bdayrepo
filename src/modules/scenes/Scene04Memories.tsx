import React from 'react'
import { motion } from 'motion/react'
import { ArrowLeft, ArrowRight, Heart } from 'lucide-react'
import { DioramaStage } from '../../shared/components/DioramaStage/DioramaStage'

export interface Scene04MemoriesProps {
  photos: string[]
  onPhotosUploaded: (newPhotos: string[]) => void
  onDiscoverPhoto: (id: string) => void
  onBack: () => void
  onNext: () => void
  createSafeUrl: (file: File) => string
}

export const Scene04Memories: React.FC<Scene04MemoriesProps> = ({
  photos,
  onDiscoverPhoto,
  onBack,
  onNext
}) => {
  return (
    <>
      <DioramaStage>
      <div className="art-stage scrapbook-stage">
        <span className="floaty scrap-f1">♡</span>
        <span className="floaty scrap-f2">✦</span>
        <div className="scrapbook">
          <div className="scrap-tape" />
          <motion.div
            drag
            dragElastic={0.15}
            dragConstraints={{ left: -25, right: 25, top: -20, bottom: 20 }}
            className="polaroid polaroid-one draggable-photo"
            onTouchStart={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
            onDragEnd={() => onDiscoverPhoto('photo-one')}
          >
            <div className="photo-window photo-peach">
              {photos[0] ? (
                <img src={photos[0]} alt="Memory one" />
              ) : (
                <span>
                  <b>＋</b>
                  <small>your photo here</small>
                </span>
              )}
            </div>
            <small>Where The Story Starts</small>
          </motion.div>
          <motion.div
            drag
            dragElastic={0.15}
            dragConstraints={{ left: -25, right: 25, top: -20, bottom: 20 }}
            className="polaroid polaroid-two draggable-photo"
            onTouchStart={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
            onDragEnd={() => onDiscoverPhoto('photo-two')}
          >
            <div className="photo-window photo-lilac">
              {photos[1] ? (
                <img src={photos[1]} alt="Memory two" />
              ) : (
                <span>
                  <b>＋</b>
                  <small>The Place that Every Thing Starts</small>
                </span>
              )}
            </div>
            <small>Where The Story Starts</small>
          </motion.div>
          <div className="scrap-sticker">
            Kindred <br />spirit
          </div>
        </div>
      </div>
      </DioramaStage>
      <div className="copy">
        <span className="script-kicker">little moments, kept</span>
        <h1>
          Our bond<br />is my favourite <em>story.</em>
        </h1>
        <p>
          From the silly laughs to the talks that fixed everything — the ordinary moments with you are the ones I keep.
        </p>
        <div className="button-row">
          <button className="secondary" onClick={onBack}>
            <ArrowLeft size={16} /> Back
          </button>
          <button className="primary" onClick={onNext}>
            A few more thoughts <ArrowRight size={17} />
          </button>
        </div>
        <span className="microcopy">
          <Heart size={13} fill="currentColor" /> Photo placeholders — add your favourite memories above
        </span>
      </div>
    </>
  )
}
