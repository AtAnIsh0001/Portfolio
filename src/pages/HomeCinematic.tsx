import { lazy, Suspense } from 'react'
import MarqueeSection from '@/components/MarqueeSection'
import AboutSection from '@/components/about/AboutSection'
import { useWebGLSupport, usePrefersReducedMotion } from '@/lib/hooks'
import { useDeviceTier } from '@/lib/deviceTier'

const HomeCanvasExperience = lazy(() => import('@/components/home/HomeCanvasExperience'))

/**
 * Cinematic rebuild of Home — a scroll-driven 3D journey behind the DOM content.
 * Work in progress (Phase 3 of the rebuild plan): the camera-rig backbone is wired
 * up and hosts the avatar-dissolve and particle-portrait beats; the projects-as-
 * objects beat and the about/contact beats are still on the current DOM sections
 * below. Not yet the live index route — preview at /cinematic.
 */
export default function HomeCinematic() {
  const webglOk = useWebGLSupport()
  const reducedMotion = usePrefersReducedMotion()
  const tier = useDeviceTier()
  const showCanvasJourney = webglOk && !reducedMotion && tier !== 'low'

  return (
    <div className="relative">
      {showCanvasJourney && (
        <Suspense fallback={null}>
          <HomeCanvasExperience />
        </Suspense>
      )}

      <section
        data-beat="avatar"
        className="relative z-10 flex h-[160vh] flex-col items-center justify-center px-6 text-center"
      >
        <div className="sticky top-1/3 flex flex-col items-center gap-4">
          <p className="font-kanit text-xs uppercase tracking-[0.35em] text-[#C9A24D]">Ashish Rupakheti</p>
          <h1 className="font-anton text-[14vw] uppercase leading-[0.85] text-[#EDE6D8] sm:text-8xl">
            AI &amp; Creative
            <br />
            Developer
          </h1>
          {!showCanvasJourney && (
            <div className="mt-6 h-64 w-64 overflow-hidden rounded-full border border-[#C9A24D]/30">
              <img src="/assets/avatar-photo.png" alt="Ashish Rupakheti" className="h-full w-full object-cover" />
            </div>
          )}
        </div>
      </section>

      <section
        data-beat="particles"
        className="relative z-10 flex h-[160vh] flex-col items-center justify-center px-6 text-center"
      >
        <div className="sticky top-1/3 flex flex-col items-center gap-4">
          <p className="font-kanit text-xs uppercase tracking-[0.3em] text-[#C9A24D]">Full-Stack · AI · IoT · Design</p>
          <h2 className="font-anton text-[9vw] uppercase leading-none text-[#EDE6D8] sm:text-6xl">
            Built From Real Systems
          </h2>
        </div>
      </section>

      <MarqueeSection />
      <AboutSection />
    </div>
  )
}
