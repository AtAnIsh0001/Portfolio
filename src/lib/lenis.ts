import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null
let rafId: number | null = null

export function startSmoothScroll(): Lenis {
  if (lenis) return lenis

  lenis = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  return lenis
}

export function stopSmoothScroll() {
  if (rafId) cancelAnimationFrame(rafId)
  lenis?.destroy()
  lenis = null
}

export function getLenis(): Lenis | null {
  return lenis
}
