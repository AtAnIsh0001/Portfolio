import { EASE_LUXE } from './motion'

export const drawContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

export const drawPath = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: 0.8, ease: EASE_LUXE } },
}

export function drawPathTo(targetOpacity: number) {
  return {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: targetOpacity, transition: { duration: 0.8, ease: EASE_LUXE } },
  }
}

export const drawShape = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE_LUXE } },
}

export function nodePulse(delay = 1.1) {
  return {
    initial: { opacity: 0, scale: 0.6 },
    animate: { opacity: [0, 1, 0.55, 1] as number[], scale: [0.6, 1.2, 1, 1.15] as number[] },
    transition: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' as const, delay },
  }
}
