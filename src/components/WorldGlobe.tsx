import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import createGlobe from 'cobe'

export interface WorldGlobeHandle {
  /** Eases the globe's rotation until Kathmandu, Nepal sits dead-centre and facing the camera. */
  focusOnNepal: (duration?: number) => Promise<void>
}

interface WorldGlobeProps {
  size?: number
  locked?: boolean
  /** Max on-screen width in px (still clamped to a vw fraction for small viewports). */
  displaySize?: number
}

const KATHMANDU: [number, number] = [27.7172, 85.324]

const REACH_ARCS: [number, number][] = [
  [51.5074, -0.1278], // London
  [40.7128, -74.006], // New York
  [35.6762, 139.6503], // Tokyo
  [-33.8688, 151.2093], // Sydney
]

// Solved numerically so Kathmandu's marker lands centred + front-facing (see WorldGlobe README note below).
const NEPAL_PHI = 3.2216
const NEPAL_THETA = 0.4838
const IDLE_THETA = 0.3
const AUTO_ROTATE_SPEED = 0.0018
const DRAG_SENSITIVITY = 0.0055

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
}

function shortestAngleDelta(from: number, to: number) {
  const twoPi = Math.PI * 2
  let delta = (to - from) % twoPi
  if (delta > Math.PI) delta -= twoPi
  if (delta < -Math.PI) delta += twoPi
  return delta
}

const WorldGlobe = forwardRef<WorldGlobeHandle, WorldGlobeProps>(function WorldGlobe(
  { size = 640, locked = false, displaySize = 520 },
  ref,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const phiRef = useRef(0)
  const thetaRef = useRef(IDLE_THETA)
  const focusedRef = useRef(false)
  const draggingRef = useRef(false)
  const lastXRef = useRef(0)
  const velocityRef = useRef(0)
  const lockedRef = useRef(locked)

  useEffect(() => {
    lockedRef.current = locked
  }, [locked])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: size * dpr,
      height: size * dpr,
      phi: phiRef.current,
      theta: thetaRef.current,
      dark: 1,
      diffuse: 1.15,
      mapSamples: 16000,
      mapBrightness: 5.4,
      mapBaseBrightness: 0.06,
      baseColor: [0.24, 0.2, 0.13],
      markerColor: [0.92, 0.75, 0.35],
      glowColor: [0.55, 0.44, 0.24],
      opacity: 0.94,
      scale: 1,
      markers: [{ location: KATHMANDU, size: 0.1 }],
      arcs: REACH_ARCS.map((to) => ({ from: KATHMANDU, to, color: [0.79, 0.64, 0.3] as [number, number, number] })),
      arcColor: [0.79, 0.64, 0.3],
      arcWidth: 0.7,
      arcHeight: 0.28,
    })

    let running = true
    function frame() {
      if (!running) return
      if (!focusedRef.current && !draggingRef.current) {
        phiRef.current += AUTO_ROTATE_SPEED + velocityRef.current
        velocityRef.current *= 0.94
      }
      globe.update({ phi: phiRef.current, theta: thetaRef.current })
      requestAnimationFrame(frame)
    }
    const raf = requestAnimationFrame(frame)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      globe.destroy()
    }
  }, [size])

  useImperativeHandle(ref, () => ({
    focusOnNepal(duration = 1500) {
      return new Promise((resolve) => {
        focusedRef.current = true
        const startPhi = phiRef.current
        const startTheta = thetaRef.current
        const deltaPhi = shortestAngleDelta(startPhi, NEPAL_PHI)
        const deltaTheta = NEPAL_THETA - startTheta
        const start = performance.now()

        function step(now: number) {
          const t = Math.min(1, (now - start) / duration)
          const eased = easeInOutCubic(t)
          phiRef.current = startPhi + deltaPhi * eased
          thetaRef.current = startTheta + deltaTheta * eased
          if (t < 1) requestAnimationFrame(step)
          else resolve()
        }
        requestAnimationFrame(step)
      })
    },
  }))

  const onPointerDown = (e: React.PointerEvent) => {
    if (lockedRef.current) return
    draggingRef.current = true
    lastXRef.current = e.clientX
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current || lockedRef.current) return
    const delta = e.clientX - lastXRef.current
    lastXRef.current = e.clientX
    phiRef.current += delta * DRAG_SENSITIVITY
    velocityRef.current = delta * DRAG_SENSITIVITY * 0.6
  }

  const onPointerUp = () => {
    draggingRef.current = false
  }

  return (
    <div
      className="relative mx-auto"
      style={{ width: `min(62vw, ${displaySize}px)`, aspectRatio: '1', touchAction: 'none' }}
    >
      <div
        className="absolute inset-[-18%] rounded-full opacity-70 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(201,162,77,0.28), transparent 65%)' }}
      />
      <canvas
        ref={canvasRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        className="relative h-full w-full cursor-grab active:cursor-grabbing"
        style={{ width: '100%', height: '100%', contain: 'layout paint size' }}
      />
    </div>
  )
})

export default WorldGlobe
