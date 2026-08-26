import { lazy, Suspense, useState } from 'react'
import { motion } from 'framer-motion'
import Magnet from '@/components/Magnet'
import { useWebGLSupport, usePrefersReducedMotion } from '@/lib/hooks'

const AvatarCanvas = lazy(() => import('./AvatarCanvas'))

export default function AvatarMorph() {
  const [hovered, setHovered] = useState(false)
  const webglOk = useWebGLSupport()
  const reducedMotion = usePrefersReducedMotion()

  return (
    <Magnet padding={150} strength={3} cursorLabel="VIEW" className="relative mx-auto w-[260px] sm:w-[320px]">
      <motion.div
        className="relative"
        animate={reducedMotion ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div
          className="relative aspect-[933/1400] w-full overflow-hidden rounded-[24px] border border-[#C9A24D]/25 bg-[#0B0B0D] shadow-[0_0_60px_-15px_rgba(201,162,77,0.55)]"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img
            src="/assets/avatar-3d.png"
            alt="Ashish Rupakheti stylised avatar"
            className="absolute inset-0 h-full w-full object-contain transition-opacity duration-700"
            style={{ opacity: hovered ? 0 : 1 }}
          />
          <img
            src="/assets/avatar-photo.png"
            alt="Ashish Rupakheti"
            className="absolute inset-0 h-full w-full object-contain transition-opacity duration-700"
            style={{ opacity: hovered ? 1 : 0 }}
          />

          {webglOk && (
            <Suspense fallback={null}>
              <div className="absolute inset-0">
                <AvatarCanvas hovered={hovered} />
              </div>
            </Suspense>
          )}
        </div>

        <div
          className="pointer-events-none absolute inset-x-6 -bottom-4 h-8 rounded-full opacity-70 blur-xl"
          style={{ background: 'radial-gradient(closest-side, #C9A24D, transparent)' }}
          aria-hidden
        />

        <p className="mt-6 text-center font-kanit text-[10px] uppercase tracking-[0.3em] text-[#C9A24D]/70">
          Hover to reveal
        </p>
      </motion.div>
    </Magnet>
  )
}
