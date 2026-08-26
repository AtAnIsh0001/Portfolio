import Magnet from '@/components/Magnet'
import ParallaxLayer from '@/components/ParallaxLayer'
import ContactButton from '@/components/ContactButton'
import AvatarMorph from './AvatarMorph'
import ParticleHeading from './ParticleHeading'
import HeroObject3D from './HeroObject3D'

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden px-6 pb-16 pt-28 sm:px-10 lg:px-16">
      <ParallaxLayer speed={0.4} className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -left-40 top-10 h-[420px] w-[420px] rounded-full opacity-25 blur-[130px]"
          style={{ background: '#8C6D2F' }}
        />
      </ParallaxLayer>
      <ParallaxLayer speed={-0.3} className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -right-32 bottom-0 h-[360px] w-[360px] rounded-full opacity-20 blur-[120px]"
          style={{ background: '#C9A24D' }}
        />
      </ParallaxLayer>

      <div className="relative z-30 grid flex-1 grid-cols-1 items-center gap-10 lg:grid-cols-[1.3fr_0.7fr]">
        <div>
          <p className="font-kanit mb-3 text-xs uppercase tracking-[0.35em] text-[#C9A24D]">
            AI Computing Student · Front-End Developer · Graphics Designer
          </p>
          <ParticleHeading
            lines={["Hi, I'm", 'Ashish']}
            className="hero-heading text-[13vw] leading-[0.9] sm:text-[8.5vw] lg:text-[6.2vw]"
          />
          <p className="mt-6 max-w-md font-inter text-sm text-[#EDE6D8]/70 sm:text-base">
            I&apos;m a BSc (Hons) Computing with Artificial Intelligence student at Islington College who builds
            intelligent systems, interactive 3D experiences, and brand-grade interfaces.
          </p>
          <div className="mt-8">
            <Magnet padding={80} strength={4} cursorLabel="ENTER">
              <ContactButton />
            </Magnet>
          </div>
        </div>

        <div className="relative hidden justify-self-center pt-10 lg:block lg:translate-y-12 xl:translate-y-16">
          <HeroObject3D className="absolute -left-20 top-16 -z-10 h-[220px] w-[220px] xl:-left-28 xl:h-[260px] xl:w-[260px]" />
          <AvatarMorph />
        </div>
      </div>

      <div className="relative z-30 mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-4 font-kanit text-[11px] uppercase tracking-[0.25em] text-[#EDE6D8]/40 sm:flex-row">
        <span>Kathmandu, Nepal — Available for collaboration</span>
        <span>Scroll to explore ↓</span>
      </div>
    </section>
  )
}
