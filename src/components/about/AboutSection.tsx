import FadeIn from '@/components/FadeIn'
import ParallaxLayer from '@/components/ParallaxLayer'
import ConstellationPortrait from '@/components/ConstellationPortrait'
import { BrainCircuitIcon, CodeWindowIcon, PenPaletteIcon, WireframeCubeIcon } from '@/components/icons/LineIcons'
import AnimatedText from './AnimatedText'

const ABOUT_TEXT =
  "With a foundation in front-end development and graphics design, and now a BSc (Hons) Computing with Artificial Intelligence student at Islington College, I focus on branding, web design, intelligent systems, and interactive 3D experiences. Let's build something incredible together!"

const CORNER_ICONS = [
  { Icon: BrainCircuitIcon, position: 'left-4 top-4 sm:left-10 sm:top-10 md:left-16', delay: 0, speed: 0.25 },
  { Icon: CodeWindowIcon, position: 'right-4 top-4 sm:right-10 sm:top-10 md:right-16', delay: 0.1, speed: -0.2 },
  { Icon: PenPaletteIcon, position: 'bottom-4 left-4 sm:bottom-10 sm:left-10 md:left-16', delay: 0.2, speed: -0.3 },
  { Icon: WireframeCubeIcon, position: 'bottom-4 right-4 sm:bottom-10 sm:right-10 md:right-16', delay: 0.3, speed: 0.2 },
]

export default function AboutSection() {
  return (
    <section id="about" className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0C0C0C] px-6 py-24 sm:px-10">
      {CORNER_ICONS.map(({ Icon, position, delay, speed }, i) => (
        <ParallaxLayer key={i} speed={speed} className={`pointer-events-none absolute ${position} hidden sm:block`}>
          <FadeIn delay={delay}>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-[#C9A24D]">
              <Icon size={26} />
            </div>
          </FadeIn>
        </ParallaxLayer>
      ))}

      <div className="mx-auto max-w-4xl text-center">
        <FadeIn>
          <p className="font-kanit mb-4 text-xs uppercase tracking-[0.35em] text-[#C9A24D]">About</p>
        </FadeIn>

        <FadeIn delay={0.1} className="mb-10 flex justify-center">
          <ConstellationPortrait width={220} />
        </FadeIn>

        <AnimatedText
          text={ABOUT_TEXT}
          className="font-kanit text-2xl leading-snug text-[#EDE6D8] sm:text-3xl md:text-4xl"
        />

        <FadeIn delay={0.2} className="mt-14 grid grid-cols-1 gap-4 text-left sm:grid-cols-2">
          <div className="glass-panel rounded-2xl p-6">
            <p className="font-kanit text-xs uppercase tracking-[0.25em] text-[#956959]">Education</p>
            <p className="mt-2 font-inter text-base font-semibold text-[#EDE6D8]">
              BSc (Hons) Computing with Artificial Intelligence
            </p>
            <p className="mt-1 font-inter text-sm text-[#EDE6D8]/60">Islington College</p>
          </div>
          <div className="glass-panel rounded-2xl p-6">
            <p className="font-kanit text-xs uppercase tracking-[0.25em] text-[#956959]">Background</p>
            <p className="mt-2 font-inter text-base font-semibold text-[#EDE6D8]">
              Front-End Development &amp; Graphics Design
            </p>
            <p className="mt-1 font-inter text-sm text-[#EDE6D8]/60">Broadway Infosys, Nepal</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.3} className="mt-14 flex justify-center">
          <div className="flex h-[200px] w-[200px] max-w-full items-center justify-center overflow-hidden rounded-2xl border border-[#C9A24D]/25 bg-[#08090A] p-5 shadow-[0_0_60px_-15px_rgba(201,162,77,0.55)]">
            <img src="/assets/logo.png" alt="Ashish Rupakheti logo" className="h-full w-full object-contain" />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
