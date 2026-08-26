import { motion } from 'framer-motion'
import type { Skill } from '@/data/skills'
import { useCursor } from '@/context/CursorContext'

export default function SkillBar({ skill, onOpen, delay }: { skill: Skill; onOpen: () => void; delay: number }) {
  const { setLabel } = useCursor()

  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={() => setLabel('INSPECT')}
      onMouseLeave={() => setLabel(null)}
      className="group w-full text-left"
    >
      <div className="mb-2 flex items-baseline justify-between">
        <span className="font-kanit text-sm uppercase tracking-wide text-[#EDE6D8] transition-colors group-hover:text-white">
          {skill.name}
        </span>
        <span className="font-kanit text-xs tabular-nums text-[#EDE6D8]/50">{skill.proficiency}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #8C6D2F, #C9A24D)' }}
          initial={{ width: '0%' }}
          whileInView={{ width: `${skill.proficiency}%` }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay }}
        />
      </div>
    </button>
  )
}
