import type { Project } from '@/data/projects'
import ProjectPreview from './ProjectPreview'
import { useCursor } from '@/context/CursorContext'

export default function MoreProjectsGrid({ projects, onOpen }: { projects: Project[]; onOpen: (p: Project) => void }) {
  const { setLabel } = useCursor()

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <button
          key={project.id}
          type="button"
          onClick={() => onOpen(project)}
          onMouseEnter={() => setLabel('INSPECT')}
          onMouseLeave={() => setLabel(null)}
          className="glass-panel group flex flex-col overflow-hidden rounded-[24px] text-left transition-transform hover:-translate-y-1"
        >
          <div className="relative h-40 w-full overflow-hidden">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <ProjectPreview project={project} />
            )}
            <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
          <div className="flex flex-1 flex-col gap-2 p-6">
            <p className="font-kanit text-xs uppercase tracking-[0.25em] text-[#C9A24D]">{project.index}</p>
            <h3 className="font-kanit text-lg font-semibold uppercase tracking-wide text-[#EDE6D8]">{project.title}</h3>
            <p className="font-inter text-sm text-[#EDE6D8]/60">{project.subtitle}</p>
            <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
              {project.stack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 px-2.5 py-1 font-kanit text-[10px] uppercase tracking-wide text-[#EDE6D8]/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}
