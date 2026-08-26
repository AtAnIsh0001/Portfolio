import { useState } from 'react'
import { services } from '@/data/services'
import { useCursor } from '@/context/CursorContext'
import FadeIn from '@/components/FadeIn'
import TiltCard from '@/components/TiltCard'
import ParallaxLayer from '@/components/ParallaxLayer'
import {
  BrainCircuitIcon,
  CodeWindowIcon,
  MotionTrailIcon,
  PenPaletteIcon,
  LayoutFrameIcon,
  type LineIconProps,
} from '@/components/icons/LineIcons'

const SERVICE_ICONS: Record<string, (props: LineIconProps) => JSX.Element> = {
  '01': BrainCircuitIcon,
  '02': CodeWindowIcon,
  '03': MotionTrailIcon,
  '04': PenPaletteIcon,
  '05': LayoutFrameIcon,
}

export default function ServicesSection() {
  const [hovered, setHovered] = useState<number | null>(null)
  const { setLabel } = useCursor()

  return (
    <section id="services" className="relative min-h-screen overflow-hidden bg-[#0C0C0C] px-6 pb-24 pt-32 sm:px-10 lg:px-16">
      <ParallaxLayer speed={0.3} className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute right-[-10%] top-0 h-[440px] w-[440px] rounded-full opacity-20 blur-[140px]"
          style={{ background: '#3A2C13' }}
        />
      </ParallaxLayer>

      <FadeIn>
        <p className="font-kanit text-xs uppercase tracking-[0.3em] text-[#C9A24D]">What I do</p>
        <h2 className="font-anton mb-16 mt-3 text-[13vw] uppercase leading-none text-[#EDE6D8] sm:text-6xl md:text-7xl">
          Services
        </h2>
      </FadeIn>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2">
        {services.map((service, i) => {
          const Icon = SERVICE_ICONS[service.index] ?? BrainCircuitIcon
          return (
          <FadeIn key={service.index} delay={i * 0.08}>
            <TiltCard
              intensity={6}
              className="glass-panel h-full rounded-[28px] p-8 transition-colors duration-300 hover:border-[#C9A24D]/35"
              onMouseEnter={() => {
                setHovered(i)
                setLabel('VIEW')
              }}
              onMouseLeave={() => {
                setHovered(null)
                setLabel(null)
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  className="font-anton text-4xl text-white/15 transition-colors"
                  style={{ color: hovered === i ? '#C9A24D' : undefined }}
                >
                  {service.index}
                </span>
                <Icon size={44} />
              </div>
              <h3 className="mt-4 font-kanit text-xl font-semibold uppercase tracking-wide text-[#EDE6D8] sm:text-2xl">
                {service.title}
              </h3>
              <p className="mt-3 max-w-xl font-inter text-sm text-[#EDE6D8]/60 sm:text-base">{service.description}</p>
            </TiltCard>
          </FadeIn>
          )
        })}
      </div>
    </section>
  )
}
