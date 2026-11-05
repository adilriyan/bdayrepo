// Singleton AudioContext to prevent context exhaustion leaks

let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {})
  }
  return audioCtx
}

export function playChime(freq = 880, duration = 0.13, gainLevel = 0.035) {
  try {
    const ctx = getAudioContext()
    if (!ctx) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, ctx.currentTime)
    gain.gain.setValueAtTime(gainLevel, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration - 0.01)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + duration)
  } catch {
    // Graceful fallback if audio is blocked
  }
}

export function playDiscoverSound() {
  playChime(880, 0.13, 0.035)
}

export function playWaxSealPop() {
  try {
    const ctx = getAudioContext()
    if (!ctx) return
    // Resonant pop sound
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(320, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.09)
    gain.gain.setValueAtTime(0.08, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.1)

    // Secondary subtle chime shimmer
    setTimeout(() => playChime(987.77, 0.15, 0.03), 50)
  } catch {}
}

export function playPaperRustle() {
  try {
    const ctx = getAudioContext()
    if (!ctx) return
    // Soft gentle chime for letter slide
    playChime(784, 0.14, 0.03)
    setTimeout(() => playChime(1046.5, 0.18, 0.035), 70)
  } catch {}
}

export function playGiftPop() {
  try {
    const ctx = getAudioContext()
    if (!ctx) return
    // Upward spring pop
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(260, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(620, ctx.currentTime + 0.14)
    gain.gain.setValueAtTime(0.09, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.16)

    // Triad celebration flourish
    setTimeout(() => playChime(659.25, 0.12, 0.03), 100)
    setTimeout(() => playChime(880, 0.16, 0.04), 180)
    setTimeout(() => playChime(1174.66, 0.22, 0.045), 260)
  } catch {}
}

export function playCelebrationSound() {
  playChime(587.33, 0.12, 0.03)
  setTimeout(() => playChime(880, 0.18, 0.04), 80)
  setTimeout(() => playChime(1174.66, 0.25, 0.045), 160)
}
