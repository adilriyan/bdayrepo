import React, { useState, useRef, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import photo1 from '../assets/w-1920 (1).webp'
import photo2 from '../assets/w-1920.webp'
import birthdaySong from '../assets/birthday-song.mp3'

import type { SceneIndex, Ripple } from '../types/story.types'
import { playDiscoverSound, playWaxSealPop, playPaperRustle, playGiftPop } from '../shared/audio/soundSynth'
import { useSafeObjectUrls } from '../shared/hooks/useSafeObjectUrl'
import { FantasyIntro } from '../modules/intro/FantasyIntro'
import { MagicCelebrationModal } from '../modules/reward/MagicCelebrationModal'
import { TopBar } from '../shared/components/TopBar/TopBar'
import { ProgressBar } from '../shared/components/ProgressBar/ProgressBar'
import { Footer } from '../shared/components/Footer/Footer'
import { LazyMagicField } from '../shared/components/MagicField/LazyMagicField'
import { burstAt, revealScene } from '../shared/motion/magicMotion'

import { Scene01Welcome } from '../modules/scenes/Scene01Welcome'
import { Scene02Letter } from '../modules/scenes/Scene02Letter'
import { Scene03Gift } from '../modules/scenes/Scene03Gift'
import { Scene04Memories } from '../modules/scenes/Scene04Memories'
import { Scene05Seaside } from '../modules/scenes/Scene05Seaside'
import { Scene06OpenWhen } from '../modules/scenes/Scene06OpenWhen'
import { Scene07Cake } from '../modules/scenes/Scene07Cake'
import { Scene08Finale } from '../modules/scenes/Scene08Finale'

export function App() {
  const [scene, setScene] = useState<SceneIndex>(0)
  const [showFantasyIntro, setShowFantasyIntro] = useState(true)
  const [opened, setOpened] = useState(false)
  const [giftOpen, setGiftOpen] = useState(false)
  const [sparkle, setSparkle] = useState(false)
  const [openedLetters, setOpenedLetters] = useState<number[]>([])
  const [blownCandles, setBlownCandles] = useState<number[]>([])
  const [magicCelebrationDismissed, setMagicCelebrationDismissed] = useState(false)
  const defaultPhotos: string[] = [photo1, photo2]
  const [photos, setPhotos] = useState<string[]>(defaultPhotos)
  const [hugCount, setHugCount] = useState(0)
  const musicUrl = birthdaySong
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [soundOn, setSoundOn] = useState(true)
  const [secrets, setSecrets] = useState<string[]>([])
  const [ripples, setRipples] = useState<Ripple[]>([])
  const [letterPulled, setLetterPulled] = useState(false)
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)

  const audioTick = useRef(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { createSafeUrl, clearAllUrls } = useSafeObjectUrls()

  const discover = useCallback((id: string) => {
    setSecrets((old) => (old.includes(id) ? old : [...old, id]))
    if (soundOn) {
      playDiscoverSound()
    }
  }, [soundOn])

  const next = useCallback(() => {
    setScene((s) => (Math.min(7, s + 1) as SceneIndex))
    setOpened(false)
    setGiftOpen(false)
    setSparkle(false)
  }, [])

  const back = useCallback(() => {
    setScene((s) => (Math.max(0, s - 1) as SceneIndex))
    setOpened(false)
    setGiftOpen(false)
  }, [])

  const restart = useCallback(() => {
    setShowFantasyIntro(true)
    setMagicCelebrationDismissed(false)
    setScene(0)
    setOpened(false)
    setGiftOpen(false)
    setSparkle(false)
    setOpenedLetters([])
    setBlownCandles([])
    setHugCount(0)
    setSecrets([])
    setRipples([])
    setLetterPulled(false)
    clearAllUrls()
    setPhotos(defaultPhotos)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setMusicPlaying(false)
  }, [clearAllUrls])

  const touchWater = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const id = ++audioTick.current
    setRipples((old) => [
      ...old.slice(-7),
      {
        id,
        x: ((e.clientX - r.left) / r.width) * 100,
        y: ((e.clientY - r.top) / r.height) * 100
      }
    ])
    if (id % 3 === 0) {
      discover('ocean-' + Math.floor(id / 3))
    }
  }

  const sceneTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    // Avoid triggering scene swipe if user touched an interactive input or draggable element
    const target = e.target as HTMLElement
    if (target.closest('.draggable-photo, .draggable-penguin, .letter-paper, input, button, .candle')) {
      return
    }
    setTouchStart({ x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY })
  }

  const sceneTouchEnd = (e: React.TouchEvent<HTMLElement>) => {
    if (!touchStart) return
    const dx = e.changedTouches[0].clientX - touchStart.x
    const dy = e.changedTouches[0].clientY - touchStart.y
    if (Math.abs(dx) > 90 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      if (dx < 0) next()
      else back()
    }
    setTouchStart(null)
  }

  const startMusic = useCallback(async () => {
    if (!audioRef.current || !musicUrl) return
    try {
      await audioRef.current.play()
      setMusicPlaying(true)
    } catch {
      setMusicPlaying(false)
    }
  }, [musicUrl])

  const toggleMusic = async () => {
    if (!audioRef.current || !musicUrl) return
    if (musicPlaying) {
      audioRef.current.pause()
      setMusicPlaying(false)
    } else {
      try {
        await audioRef.current.play()
        setMusicPlaying(true)
      } catch {
        setMusicPlaying(false)
      }
    }
  }


  const friendshipMagic = Math.min(
    100,
    secrets.length * 12 +
      hugCount * 8 +
      openedLetters.length * 4 +
      (giftOpen ? 8 : 0) +
      (opened ? 8 : 0) +
      blownCandles.length * 2
  )

  useEffect(() => {
    if (friendshipMagic >= 100 && !magicCelebrationDismissed) {
      setSparkle(true)
    }
  }, [friendshipMagic, magicCelebrationDismissed])

  // Stable ref callback: runs once per mounted scene (the motion.div is keyed by scene)
  // The first scene is revealed from the intro's onEnter instead, so it isn't played behind the overlay.
  const sceneRef = useCallback((el: HTMLDivElement | null) => {
    if (el && !document.querySelector('.fantasy-intro')) revealScene(el)
  }, [])

  // Heart/star burst on call-to-action taps only (dots, toggles and in-scene props stay quiet)
  useEffect(() => {
    const onTap = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest('.primary:not(:disabled), .secondary:not(:disabled), .fantasy-enter:not(:disabled)')) {
        burstAt(e.clientX, e.clientY)
      }
    }
    document.addEventListener('pointerdown', onTap)
    return () => document.removeEventListener('pointerdown', onTap)
  }, [])

  // Arrow keys move between scenes (not while typing, nor while the intro or a dialog is open)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return
      if ((e.target as HTMLElement).closest('input, textarea, select')) return
      if (document.querySelector('[role="dialog"]')) return
      if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') back()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, back])

  return (
    <main className="page-shell">
      <audio
        ref={audioRef}
        src={musicUrl}
        loop
        preload="auto"
        onPlay={() => setMusicPlaying(true)}
        onPause={() => setMusicPlaying(false)}
      />
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <LazyMagicField scene={scene} energy={friendshipMagic} />

      <FantasyIntro
        show={showFantasyIntro}
        onTakeHand={startMusic}
        onEnter={() => {
          setShowFantasyIntro(false)
          discover('fantasy-entry')
          const scene = document.querySelector<HTMLElement>('.scene')
          if (scene) revealScene(scene, 350) // wait out the intro's fade
        }}
      />

      <TopBar
        soundOn={soundOn}
        onToggleSound={() => setSoundOn((v) => !v)}
        onRestart={restart}
      />

      <section
        className="experience"
        id="top"
        onTouchStart={sceneTouchStart}
        onTouchEnd={sceneTouchEnd}
      >
        <ProgressBar scene={scene} friendshipMagic={friendshipMagic} />

        <AnimatePresence mode="wait">
          <motion.div
            className="scene"
            key={scene}
            ref={sceneRef}
            initial={{ opacity: 0, y: 22, scale: 0.985, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -16, scale: 0.99, filter: 'blur(3px)' }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          >
            {scene === 0 && (
              <Scene01Welcome
                hugCount={hugCount}
                onHug={() => {
                  setHugCount((n) => n + 1)
                  discover('teddy-hug')
                }}
                onNext={next}
              />
            )}

            {scene === 1 && (
              <Scene02Letter
                opened={opened}
                letterPulled={letterPulled}
                onToggleEnvelope={() => {
                  const nextOpened = !opened
                  setOpened(nextOpened)
                  setLetterPulled(nextOpened)
                  discover('letter')
                  if (soundOn) {
                    if (nextOpened) playWaxSealPop()
                    else playPaperRustle()
                  }
                }}
                onPullLetter={() => {
                  setLetterPulled(true)
                  setOpened(true)
                  discover('letter')
                  if (soundOn) playPaperRustle()
                }}
                onBack={back}
                onNext={next}
              />
            )}

            {scene === 2 && (
              <Scene03Gift
                giftOpen={giftOpen}
                onToggleGift={() => {
                  const nextGift = !giftOpen
                  setGiftOpen(nextGift)
                  setSparkle(true)
                  discover('gift')
                  if (soundOn && nextGift) playGiftPop()
                }}
                onOpenGift={() => {
                  setGiftOpen(true)
                  setSparkle(true)
                  discover('gift')
                  if (soundOn) playGiftPop()
                }}
                onBack={back}
                onNext={next}
              />
            )}

            {scene === 3 && (
              <Scene04Memories
                photos={photos}
                onPhotosUploaded={(newPhotos) => setPhotos(newPhotos)}
                onDiscoverPhoto={(id) => discover(id)}
                onBack={back}
                onNext={next}
                createSafeUrl={createSafeUrl}
              />
            )}

            {scene === 4 && (
              <Scene05Seaside
                ripples={ripples}
                secrets={secrets}
                onTouchWater={touchWater}
                onDiscover={discover}
                onBack={back}
                onNext={next}
              />
            )}

            {scene === 5 && (
              <Scene06OpenWhen
                openedLetters={openedLetters}
                onToggleNote={(index) =>
                  setOpenedLetters((old) => {
                    const willOpen = !old.includes(index)
                    if (soundOn && willOpen) playPaperRustle()
                    return willOpen ? [...old, index] : old.filter((n) => n !== index)
                  })
                }
                onBack={back}
                onNext={next}
              />
            )}

            {scene === 6 && (
              <Scene07Cake
                blownCandles={blownCandles}
                sparkle={sparkle}
                onBlowCandle={(index) => {
                  setBlownCandles((old) => (old.includes(index) ? old : [...old, index]))
                  setSparkle(true)
                  if (blownCandles.length >= 4) {
                    discover('cake-feast')
                    discover('wish')
                  }
                }}
                onBlowAllCandles={() => {
                  setBlownCandles([0, 1, 2, 3, 4])
                  setSparkle(true)
                  discover('wish')
                  discover('cake-feast')
                }}
                onBack={back}
                onNext={next}
              />
            )}

            {scene === 7 && (
              <Scene08Finale
                hugCount={hugCount}
                secrets={secrets}
                musicPlaying={musicPlaying}
                onHug={() => {
                  setHugCount((n) => n + 1)
                  discover('teddy-hug')
                }}
                onGroupHug={() => {
                  setHugCount((n) => n + 1)
                  discover('group-hug')
                }}
                onDiscover={discover}
                onToggleMusic={toggleMusic}
                onBack={back}
                onRestart={restart}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <MagicCelebrationModal
          show={friendshipMagic >= 100 && !magicCelebrationDismissed}
          onDismiss={() => setMagicCelebrationDismissed(true)}
          onContinue={() => {
            setMagicCelebrationDismissed(true)
            setSparkle(false)
            discover('magic-100-reward')
          }}
        />

        <Footer
          scene={scene}
          secretsCount={secrets.length}
          onSelectScene={(i) => {
            setScene(i)
            setOpened(false)
            setGiftOpen(false)
            setSparkle(false)
          }}
          onRestart={restart}
        />
      </section>

      <div className="bottom-stamp">
        A VERY SMALL INTERNET CORNER <span>✳</span> MADE WITH AFFECTION
      </div>
    </main>
  )
}
