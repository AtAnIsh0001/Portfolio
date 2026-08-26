import { lazy, Suspense } from 'react'
import { usePrefersReducedMotion, useWebGLSupport } from '@/lib/hooks'

const AmbientCanvas = lazy(() => import('./AmbientCanvas'))

/** Sparse gold dust drifting across every page — a practical-atmosphere pass composited on top with additive blending. */
export default function AmbientAtmosphere() {
  const webgl = useWebGLSupport()
  const reducedMotion = usePrefersReducedMotion()

  if (!webgl || reducedMotion) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[25]"
      style={{ mixBlendMode: 'screen', opacity: 0.6 }}
      aria-hidden
    >
      <Suspense fallback={null}>
        <AmbientCanvas />
      </Suspense>
    </div>
  )
}
