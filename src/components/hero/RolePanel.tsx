import { BrainCircuitIcon, CodeWindowIcon, PenPaletteIcon, WireframeCubeIcon, type LineIconProps } from '@/components/icons/LineIcons'
import type { CarouselRole } from '@/data/carousel'

const ICONS: Record<string, (props: LineIconProps) => JSX.Element> = {
  'ai-engineer': BrainCircuitIcon,
  'frontend-dev': CodeWindowIcon,
  'graphics-designer': PenPaletteIcon,
  'creative-technologist': WireframeCubeIcon,
}

export default function RolePanel({ role }: { role: CarouselRole }) {
  const Icon = ICONS[role.id] ?? BrainCircuitIcon

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[28px] border border-white/10"
      style={{
        background: `radial-gradient(120% 120% at 50% 0%, ${role.panel} 0%, ${role.bg} 70%)`,
      }}
    >
      <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice">
        <polygon points="100,20 170,90 150,220 50,220 30,90" fill="none" stroke={role.accent} strokeWidth="1.2" opacity="0.6" />
        <circle cx="100" cy="130" r="70" fill="none" stroke={role.accent} strokeWidth="0.8" opacity="0.4" />
        <polygon points="100,60 140,110 120,190 80,190 60,110" fill={role.accent} opacity="0.18" />
      </svg>

      <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border border-white/25 bg-white/5 backdrop-blur-md">
        <Icon size={44} color="#EDE6D8" />
      </div>

      <div className="relative z-10 mt-6 px-4 text-center">
        <p className="font-kanit text-lg font-semibold uppercase tracking-wide text-[#EAF1F5] sm:text-xl">{role.role}</p>
        <p className="mt-2 max-w-[200px] font-inter text-xs text-[#EDE6D8]/70">{role.tagline}</p>
      </div>
    </div>
  )
}
