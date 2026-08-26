import { useState } from 'react'
import { skillCategories, skills, type Skill } from '@/data/skills'
import SkillBar from './SkillBar'
import SkillsModal from './SkillsModal'
import CertificationsSection from './CertificationsSection'
import FadeIn from '@/components/FadeIn'
import { BrainCircuitIcon, CodeWindowIcon, ChipSignalIcon, PenPaletteIcon, type LineIconProps } from '@/components/icons/LineIcons'

const CATEGORY_ICONS: Record<string, (props: LineIconProps) => JSX.Element> = {
  'AI / ML & Programming': BrainCircuitIcon,
  'Web Engineering': CodeWindowIcon,
  'IoT & Systems': ChipSignalIcon,
  'Creative & Design': PenPaletteIcon,
}

export default function SkillsSection() {
  const [active, setActive] = useState<Skill | null>(null)

  return (
    <section id="skills" className="relative min-h-screen bg-[#0C0C0C] px-6 pb-28 pt-32 sm:px-10 lg:px-16">
      <FadeIn>
        <p className="font-kanit text-xs uppercase tracking-[0.3em] text-[#C9A24D]">Capabilities</p>
        <h2 className="font-anton mt-3 text-[11vw] uppercase leading-none text-[#EDE6D8] sm:text-6xl">Skills</h2>
      </FadeIn>

      <div className="mt-16 flex flex-col gap-16">
        {skillCategories.map((category, ci) => {
          const Icon = CATEGORY_ICONS[category] ?? BrainCircuitIcon
          return (
          <FadeIn key={category} delay={ci * 0.1}>
            <div className="mb-8 flex items-center gap-3">
              <Icon size={30} />
              <h3 className="font-kanit text-sm uppercase tracking-[0.25em] text-[#EDE6D8]/50">{category}</h3>
            </div>
            <div className="grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2">
              {skills
                .filter((s) => s.category === category)
                .map((skill, i) => (
                  <SkillBar key={skill.id} skill={skill} onOpen={() => setActive(skill)} delay={i * 0.08} />
                ))}
            </div>
          </FadeIn>
          )
        })}
      </div>

      <CertificationsSection />

      <SkillsModal skill={active} onClose={() => setActive(null)} />
    </section>
  )
}
