import { animate, spring, stagger, utils } from 'animejs'

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Reads a design token (CSS custom property) from :root. */
export const cssVar = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim()

const BURST_GLYPHS = ['♡', '✦', '✧', '♥']
const BURST_TOKENS = ['--brand-rose', '--brand-gold', '--brand-lavender', '--brand-blush']

/**
 * Entrance for a freshly mounted scene: art springs in, copy staggers up.
 * `offset` (ms) postpones everything, e.g. until the intro overlay has faded.
 */
export function revealScene(root: HTMLElement, offset = 0) {
  if (prefersReducedMotion()) return
  // Elements that already carry an inline style are driven by Motion (e.g. the finale letter);
  // animating them too would fight it, and revert() would restore a stale opacity.
  const free = (el: Element) => !el.hasAttribute('style')
  const art = Array.from(root.querySelectorAll('.art-stage')).filter(free)
  const copy = Array.from(root.querySelectorAll('.copy > *')).filter(free)

  // revert() clears inline styles afterwards so CSS :hover transforms keep working
  animate(art, {
    scale: [0.9, 1],
    rotate: [-2, 0],
    delay: 60 + offset,
    ease: spring({ bounce: 0.35, duration: 800 }),
    onComplete: (a) => a.revert(),
  })

  animate(copy, {
    opacity: [0, 1],
    translateY: [22, 0],
    filter: ['blur(5px)', 'blur(0px)'],
    delay: stagger(70, { start: 140 + offset }),
    duration: 700,
    ease: 'outExpo',
    onComplete: (a) => a.revert(),
  })
}

/** Small heart/star burst at a viewport point, used for taps on call-to-action buttons. */
export function burstAt(x: number, y: number, count = 9) {
  if (prefersReducedMotion()) return
  const colors = BURST_TOKENS.map(cssVar)
  const nodes = Array.from({ length: count }, (_, i) => {
    const el = document.createElement('span')
    el.textContent = BURST_GLYPHS[i % BURST_GLYPHS.length]
    el.setAttribute('aria-hidden', 'true')
    // z-index sits above the intro overlay (1000)
    el.style.cssText = `position:fixed;left:${x}px;top:${y}px;z-index:2000;pointer-events:none;font-size:${utils.random(11, 20)}px;color:${colors[i % colors.length]};will-change:transform,opacity`
    document.body.appendChild(el)
    return el
  })

  animate(nodes, {
    translateX: () => utils.random(-80, 80),
    translateY: () => utils.random(-110, -25),
    rotate: () => utils.random(-120, 120),
    scale: [0.5, 1.15],
    opacity: [1, 0],
    duration: () => utils.random(700, 1100),
    ease: 'outCubic',
    onComplete: () => nodes.forEach((n) => n.remove()),
  })
}
