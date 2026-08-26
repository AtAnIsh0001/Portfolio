import { lazy, Suspense } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { projects } from '@/data/projects'
import ProjectPreview from '@/components/projects/ProjectPreview'
import FadeIn from '@/components/FadeIn'
import Magnet from '@/components/Magnet'
import ContactButton from '@/components/ContactButton'
import { useCursor } from '@/context/CursorContext'

const ProjectCard3D = lazy(() => import('@/components/projects/ProjectCard3D'))

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const project = projects.find((p) => p.id === id)
  const { setLabel } = useCursor()

  if (!project) return <Navigate to="/projects" replace />

  return (
    <div className="min-h-screen bg-[#0C0C0C] px-4 pb-32 pt-32 sm:px-8 lg:px-12">
      <FadeIn>
        <Magnet padding={12} strength={4} className="inline-block">
          <Link
            to="/projects"
            onMouseEnter={() => setLabel('ENTER')}
            onMouseLeave={() => setLabel(null)}
            className="inline-flex items-center gap-2 font-kanit text-xs uppercase tracking-[0.25em] text-[#EDE6D8]/60 transition-colors hover:text-[#EDE6D8]"
          >
            <ArrowLeft size={14} /> All Projects
          </Link>
        </Magnet>
      </FadeIn>

      <div className="mx-auto mt-10 max-w-6xl">
        <FadeIn>
          <p className="font-kanit text-xs uppercase tracking-[0.3em]" style={{ color: project.accent }}>
            {project.index} / Case Study
          </p>
          <h1 className="font-anton mt-3 text-[13vw] uppercase leading-[0.9] text-[#EDE6D8] sm:text-7xl lg:text-8xl">
            {project.title}
          </h1>
          <p className="mt-4 font-kanit text-base uppercase tracking-wide text-[#EDE6D8]/60 sm:text-lg">
            {project.subtitle}
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-10 h-[340px] overflow-hidden rounded-[32px] sm:h-[440px]">
            <Suspense fallback={<ProjectPreview project={project} />}>
              <ProjectCard3D project={project} />
            </Suspense>
          </div>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          <FadeIn delay={0.15} className="md:col-span-2">
            <h2 className="font-kanit text-xs uppercase tracking-[0.3em] text-[#EDE6D8]/40">Overview</h2>
            <p className="mt-4 font-inter text-base leading-relaxed text-[#EDE6D8]/80 sm:text-lg">
              {project.description}
            </p>

            {project.architecture && project.architecture.length > 0 && (
              <div className="mt-10">
                <h2 className="font-kanit text-xs uppercase tracking-[0.3em] text-[#EDE6D8]/40">Architecture</h2>
                <ul className="mt-4 space-y-3">
                  {project.architecture.map((line) => (
                    <li key={line} className="flex gap-3 font-inter text-sm leading-relaxed text-[#EDE6D8]/75 sm:text-base">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: project.accent }} />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.challenges && project.challenges.length > 0 && (
              <div className="mt-10">
                <h2 className="font-kanit text-xs uppercase tracking-[0.3em] text-[#EDE6D8]/40">Key Challenges</h2>
                <div className="mt-4 space-y-5">
                  {project.challenges.map((c) => (
                    <div key={c.title} className="glass-panel rounded-2xl p-5">
                      <h3 className="font-kanit text-sm uppercase tracking-wide text-[#EDE6D8]">{c.title}</h3>
                      <p className="mt-2 font-inter text-sm leading-relaxed text-[#EDE6D8]/70">{c.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.gallery.length > 0 && (
              <div className="mt-10">
                <h2 className="font-kanit text-xs uppercase tracking-[0.3em] text-[#EDE6D8]/40">Gallery</h2>
                <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                  {project.gallery.map((src) => (
                    <img
                      key={src}
                      src={src}
                      alt={`${project.title} preview`}
                      className="h-40 w-64 flex-shrink-0 rounded-xl object-cover"
                    />
                  ))}
                </div>
              </div>
            )}
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="glass-panel rounded-2xl p-6">
              {project.role && (
                <div className="mb-5">
                  <h3 className="font-kanit text-[11px] uppercase tracking-[0.25em] text-[#EDE6D8]/40">Role</h3>
                  <p className="mt-1 font-inter text-sm text-[#EDE6D8]/80">{project.role}</p>
                </div>
              )}
              {project.timeline && (
                <div className="mb-5">
                  <h3 className="font-kanit text-[11px] uppercase tracking-[0.25em] text-[#EDE6D8]/40">Timeline</h3>
                  <p className="mt-1 font-inter text-sm text-[#EDE6D8]/80">{project.timeline}</p>
                </div>
              )}
              <div className="mb-5">
                <h3 className="font-kanit text-[11px] uppercase tracking-[0.25em] text-[#EDE6D8]/40">Stack</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-kanit text-xs uppercase tracking-wide text-[#EDE6D8]/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              {project.links && project.links.length > 0 && (
                <div className="flex flex-col gap-2">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="font-kanit text-xs uppercase tracking-wide text-[#C9A24D] hover:underline"
                    >
                      {link.label} →
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6">
              <ContactButton label="Discuss something similar" href="/contact" />
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}
