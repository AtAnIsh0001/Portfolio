import { lazy, Suspense } from 'react'
import { useWebGLSupport, usePrefersReducedMotion } from '@/lib/hooks'

const HeroObjectCanvas = lazy(() => import('./HeroObjectCanvas'))

export default function HeroObject3D({ className }: { className?: string }) {
  const webglOk = useWebGLSupport()
  const reducedMotion = usePrefersReducedMotion()

  if (!webglOk || reducedMotion) return null

  return (
    <div className={`pointer-events-none ${className ?? ''}`} aria-hidden>
      <Suspense fallback={null}>
        <HeroObjectCanvas />
      </Suspense>
    </div>
  )
}
