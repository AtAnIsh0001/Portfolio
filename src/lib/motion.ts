export const EASE_LUXE = [0.4, 0, 0.2, 1] as const
export const CAROUSEL_TRANSITION_MS = 380

export const springSoft = { type: 'spring', stiffness: 120, damping: 18, mass: 0.6 } as const
export const springSnappy = { type: 'spring', stiffness: 300, damping: 26, mass: 0.4 } as const
export const springCursor = { type: 'spring', stiffness: 500, damping: 40, mass: 0.5 } as const

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: EASE_LUXE },
  }),
}
