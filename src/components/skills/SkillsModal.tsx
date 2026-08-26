import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Skill } from '@/data/skills'
import { projects } from '@/data/projects'

export default function SkillsModal({ skill, onClose }: { skill: Skill | null; onClose: () => void }) {
  const relatedProject = skill?.relatedProjectId ? projects.find((p) => p.id === skill.relatedProjectId) : undefined

  return (
    <AnimatePresence>
      {skill && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />

          <motion.div
            className="glass-panel relative z-10 w-full max-w-md rounded-[28px] p-8"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-[#EDE6D8]"
              aria-label="Close skill details"
            >
              <X size={16} />
            </button>

            <p className="font-kanit text-xs uppercase tracking-[0.3em] text-[#C9A24D]">{skill.category}</p>
            <h3 className="font-anton mt-2 text-3xl uppercase text-[#EDE6D8]">{skill.name}</h3>

            <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #8C6D2F, #C9A24D)' }}
                initial={{ width: 0 }}
                animate={{ width: `${skill.proficiency}%` }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              />
            </div>
            <p className="mt-1 text-right font-kanit text-xs text-[#EDE6D8]/50">{skill.proficiency}% proficiency</p>

            <p className="mt-5 font-inter text-sm leading-relaxed text-[#EDE6D8]/75">{skill.description}</p>

            {relatedProject && (
              <Link
                to="/projects"
                onClick={onClose}
                className="mt-6 inline-block rounded-full border border-white/15 px-5 py-2.5 font-kanit text-xs uppercase tracking-wide text-[#EDE6D8] transition-colors hover:border-white/40"
              >
                See it in {relatedProject.title} →
              </Link>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
