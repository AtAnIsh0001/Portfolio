import { lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { Project } from '@/data/projects'
import ProjectPreview from './ProjectPreview'
import { useCursor } from '@/context/CursorContext'

const ProjectCard3D = lazy(() => import('./ProjectCard3D'))

export default function ProjectsModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const { setLabel } = useCursor()

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
            data-cursor="CLOSE"
          />

          <motion.div
            className="glass-panel relative z-10 grid max-h-[90vh] w-full max-w-5xl grid-cols-1 gap-6 overflow-y-auto rounded-[32px] p-6 sm:p-10 md:grid-cols-2"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          >
            <button
              type="button"
              onClick={onClose}
              onMouseEnter={() => setLabel('CLOSE')}
              onMouseLeave={() => setLabel(null)}
              className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[#EDE6D8] transition-colors hover:border-white/40"
              aria-label="Close project details"
            >
              <X size={18} />
            </button>

            <div className="h-[280px] sm:h-[360px] md:h-full">
              <Suspense fallback={<ProjectPreview project={project} />}>
                <ProjectCard3D project={project} />
              </Suspense>
            </div>

            <div className="flex flex-col justify-center">
              <p className="font-kanit text-xs uppercase tracking-[0.3em] text-[#C9A24D]">{project.index} / Case Study</p>
              <h3 className="font-anton mt-2 text-3xl uppercase leading-none text-[#EDE6D8] sm:text-4xl">
                {project.title}
              </h3>
              <p className="mt-2 font-kanit text-sm uppercase tracking-wide text-[#EDE6D8]/60">{project.subtitle}</p>
              <p className="mt-5 font-inter text-sm leading-relaxed text-[#EDE6D8]/75 sm:text-base">
                {project.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-kanit text-xs uppercase tracking-wide text-[#EDE6D8]/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {project.gallery.length > 0 && (
                <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
                  {project.gallery.map((src) => (
                    <img
                      key={src}
                      src={src}
                      alt={`${project.title} preview`}
                      className="h-20 w-32 flex-shrink-0 rounded-lg object-cover"
                    />
                  ))}
                </div>
              )}

              <p className="mt-6 font-kanit text-xs uppercase tracking-wide text-[#EDE6D8]/40">
                Drag the card to inspect it in 360°
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
