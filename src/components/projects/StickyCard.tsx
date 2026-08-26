import { useRef } from 'react'
import type { MouseEvent } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import type { Project } from '@/data/projects'
import ProjectPreview from './ProjectPreview'
import Magnet from '@/components/Magnet'
import { useCursor } from '@/context/CursorContext'

export default function StickyCard({
  project,
  index,
  total,
  onOpen,
}: {
  project: Project
  index: number
  total: number
  onOpen: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { setLabel } = useCursor()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const isLast = index === total - 1
  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.88])
  const brightness = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.55])

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [4, -4]), { stiffness: 200, damping: 24 })
  const rotateY = useSpring(useTransform(px, [0, 1], [-4, 4]), { stiffness: 200, damping: 24 })

  const handlePointerMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }
  const handlePointerLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <div ref={ref} className="sticky h-[85vh]" style={{ top: `calc(96px + ${index * 3}vh)`, zIndex: index + 1 }}>
      <motion.div
        onMouseMove={handlePointerMove}
        onMouseLeave={handlePointerLeave}
        style={{
          scale,
          rotateX,
          rotateY,
          transformPerspective: 1400,
          filter: useTransform(brightness, (b) => `brightness(${b})`),
        }}
        className="glass-panel flex h-full w-full flex-col overflow-hidden rounded-[60px] border-2 border-[#EDE6D8]/20 p-6 sm:p-10"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="font-kanit text-xs uppercase tracking-[0.3em] text-[#C9A24D]">Project {project.index}</p>
            <h3 className="font-anton mt-2 text-4xl uppercase leading-none text-[#EDE6D8] sm:text-6xl">
              {project.title}
            </h3>
            <p className="mt-2 font-kanit text-sm uppercase tracking-wide text-[#EDE6D8]/60">{project.subtitle}</p>
          </div>
          <Magnet padding={16} strength={6} className="hidden flex-shrink-0 sm:block">
            <button
              type="button"
              onClick={onOpen}
              onMouseEnter={() => setLabel('INSPECT')}
              onMouseLeave={() => setLabel(null)}
              data-cursor="INSPECT"
              className="rounded-full border border-white/20 px-6 py-3 font-kanit text-xs uppercase tracking-wide text-[#EDE6D8] transition-colors hover:border-white/50"
            >
              Live Project
            </button>
          </Magnet>
        </div>

        <button
          type="button"
          onClick={onOpen}
          onMouseEnter={() => setLabel('INSPECT')}
          onMouseLeave={() => setLabel(null)}
          className="relative mt-6 flex-1 cursor-pointer overflow-hidden rounded-[32px]"
        >
          {project.image ? (
            <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
          ) : (
            <ProjectPreview project={project} />
          )}
          <span className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </button>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/15 px-3 py-1 font-kanit text-xs uppercase tracking-wide text-[#EDE6D8]/70"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
