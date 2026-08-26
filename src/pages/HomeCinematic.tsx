import { lazy, Suspense, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MarqueeSection from '@/components/MarqueeSection'
import AboutSection from '@/components/about/AboutSection'
import ConstellationPortrait from '@/components/ConstellationPortrait'
import Magnet from '@/components/Magnet'
import { featuredProjects } from '@/data/projects'
import { useWebGLSupport, usePrefersReducedMotion } from '@/lib/hooks'
import { useDeviceTier } from '@/lib/deviceTier'

gsap.registerPlugin(ScrollTrigger)

const HomeCanvasExperience = lazy(() => import('@/components/home/HomeCanvasExperience'))

const ProjectPills = () => (
  <div className="flex flex-wrap items-center justify-center gap-3">
    {featuredProjects.map((p) => (
      <span
        key={p.id}
        className="rounded-full border border-white/15 bg-black/30 px-4 py-2 font-kanit text-xs uppercase tracking-wide text-[#EDE6D8]/70"
      >
        {p.title}
      </span>
    ))}
  </div>
)

const ViewProjectsCta = () => (
  <Magnet padding={16} strength={6}>
    <Link
      to="/projects"
      className="mt-2 inline-flex items-center gap-2 rounded-full border border-[#C9A24D]/50 px-7 py-3 font-kanit text-sm uppercase tracking-[0.2em] text-[#EDE6D8] transition-colors hover:border-[#C9A24D]"
    >
      View all projects
    </Link>
  </Magnet>
)

/**
 * Compact, non-scroll-driven version of the same three beats — used whenever
 * prefers-reduced-motion is on, WebGL is unavailable, or the device tier is
 * 'low'. Crucially this is normal document height, not the tall scroll-scrub
 * sections with the canvas hidden: an accessibility preference should reduce
 * the experience, not leave several empty viewport-heights of dead scroll.
 */
function HomeStatic() {
  return (
    <div className="relative">
      <section className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="font-kanit text-xs uppercase tracking-[0.35em] text-[#C9A24D]">Ashish Rupakheti</p>
        <h1 className="font-anton text-[13vw] uppercase leading-[0.85] text-[#EDE6D8] sm:text-7xl">
          AI &amp; Creative
          <br />
          Developer
        </h1>
        <div className="mt-4 h-56 w-56 overflow-hidden rounded-full border border-[#C9A24D]/30">
          <img src="/assets/avatar-photo.png" alt="Ashish Rupakheti" className="h-full w-full object-cover" />
        </div>
      </section>

      <section className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="font-kanit text-xs uppercase tracking-[0.3em] text-[#C9A24D]">Full-Stack · AI · IoT · Design</p>
        <h2 className="font-anton text-[9vw] uppercase leading-none text-[#EDE6D8] sm:text-6xl">
          Built From Real Systems
        </h2>
        <ConstellationPortrait width={220} />
      </section>

      <section className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="font-kanit text-xs uppercase tracking-[0.3em] text-[#C9A24D]">Selected Work</p>
        <h2 className="font-anton text-[9vw] uppercase leading-none text-[#EDE6D8] sm:text-6xl">
          Real Projects, Not Demos
        </h2>
        <ProjectPills />
        <ViewProjectsCta />
      </section>

      <MarqueeSection />
      <AboutSection />
    </div>
  )
}

/** The full scroll-driven cinematic journey — one persistent 3D canvas behind three data-beat sections. */
function HomeCanvasJourney() {
  const avatarSectionRef = useRef<HTMLElement>(null)
  const avatarHeadingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!avatarSectionRef.current || !avatarHeadingRef.current) return
    const trigger = ScrollTrigger.create({
      trigger: avatarSectionRef.current,
      start: 'top top',
      end: '45% top',
      scrub: 1,
      onUpdate: (self) => {
        gsap.set(avatarHeadingRef.current, { opacity: 1 - self.progress, y: -self.progress * 40 })
      },
    })
    return () => trigger.kill()
  }, [])

  return (
    <div className="relative">
      <Suspense fallback={null}>
        <HomeCanvasExperience />
      </Suspense>

      <section
        ref={avatarSectionRef}
        data-beat="avatar"
        className="relative z-10 flex h-[160vh] flex-col items-center px-6 text-center"
      >
        <div ref={avatarHeadingRef} className="sticky top-[14%] flex flex-col items-center gap-4">
          <p className="font-kanit text-xs uppercase tracking-[0.35em] text-[#C9A24D]">Ashish Rupakheti</p>
          <h1 className="font-anton text-[13vw] uppercase leading-[0.85] text-[#EDE6D8] sm:text-7xl">
            AI &amp; Creative
            <br />
            Developer
          </h1>
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

      <section
        data-beat="projects"
        className="relative z-10 flex h-[240vh] flex-col items-center justify-center px-6 text-center"
      >
        <div className="sticky top-1/3 flex flex-col items-center gap-6">
          <p className="font-kanit text-xs uppercase tracking-[0.3em] text-[#C9A24D]">Selected Work</p>
          <h2 className="font-anton text-[9vw] uppercase leading-none text-[#EDE6D8] sm:text-6xl">
            Real Projects, Not Demos
          </h2>
          <ProjectPills />
          <ViewProjectsCta />
        </div>
      </section>

      <MarqueeSection />
      <AboutSection />
    </div>
  )
}

/**
 * Cinematic rebuild of Home. Work in progress (Phase 4 of the rebuild plan):
 * avatar-dissolve, particle-portrait and projects-as-objects beats are wired up;
 * the about/contact beats below are still the existing DOM sections for now.
 * Not yet the live index route — preview at /cinematic.
 */
export default function HomeCinematic() {
  const webglOk = useWebGLSupport()
  const reducedMotion = usePrefersReducedMotion()
  const tier = useDeviceTier()
  const showCanvasJourney = webglOk && !reducedMotion && tier !== 'low'

  return showCanvasJourney ? <HomeCanvasJourney /> : <HomeStatic />
}
