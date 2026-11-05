# A Little Birthday Surprise — Dreamy Interactive Storybook

An eight-scene birthday website built with React, TypeScript, Vite, Motion for React, Lucide icons, and custom CSS illustrations. It combines a cuddly teddy, two penguin friends, a dreamy seaside, and an emotional birthday finale.

## Interactive scenes

1. **Teddy welcome:** tap, click, or keyboard-activate the teddy for a hug reaction and floating hearts.
2. **Pullable letter:** tap the letter or drag it upward to bring it out of the envelope.
3. **Gift reveal:** tap the gift or press and hold it to open the box, pop out the teddy, and trigger confetti.
4. **Memory scrapbook:** upload up to two local photos and drag the polaroids around the page.
5. **Seaside friends:** drag or tap the penguins, tap the water for animated ripples, and find hidden shells and sparkle secrets.
6. **Open-when notes:** open six comforting mini letters.
7. **Birthday cake:** drag or tap fruit, figs, chocolate, and ice-cream toppings from the decorating tray onto the cake; then tap the five candles or use the blow-out button to unlock the full magical cake makeover and confetti.
8. **Emotional finale:** bring the teddy and penguins together, tap glowing lights, reveal a secret heart message, and optionally play a song selected from your device.

## Global interactions

- Swipe horizontally to move between scenes on touch screens; use the scene dots or the on-screen navigation on desktop.
- The friendship-magic meter fills as you explore and discover secrets.
- Gentle synthesized chime sounds are optional and can be switched on or off in the top bar. The browser creates sounds only in response to interaction; music never autoplays.
- Reduced-motion preferences and keyboard focus states are supported.

## Personalize it later

All messages and personalization settings are cleanly isolated in [`src/config/storyContent.ts`](src/config/storyContent.ts):

- **Friend's name:** Configured for **Soumya** in `src/config/storyContent.ts`.
- **Birthday message & letters:** Edit `letterMessage`, `openWhenNotes`, and `finaleLetterParagraphs` in `src/config/storyContent.ts`.
- **Photos:** In the Memories scene, choose up to two images using **Add your photos**. Memory URLs are safely managed locally with automatic blob revocation.
- **Music:** In the final scene, choose an audio file from your device, then press **Play music**.

## Run locally

Requires a recent Node.js installation.

```bash
npm install
npm run dev
```

Vite prints a local development URL in the terminal.

## Verify a production build

```bash
npm run build
npm run preview
```

This is a static front-end project and can be deployed to Netlify, Vercel, or GitHub Pages with appropriate Vite settings.
