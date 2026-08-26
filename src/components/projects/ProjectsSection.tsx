import { useState } from 'react'
import { featuredProjects, otherProjects, type Project } from '@/data/projects'
import StickyCard from './StickyCard'
import MoreProjectsGrid from './MoreProjectsGrid'
import ProjectsModal from './ProjectsModal'
import FadeIn from '@/components/FadeIn'

export default function ProjectsSection() {
  const [active, setActive] = useState<Project | null>(null)

  return (
    <section id="projects" className="relative min-h-screen bg-[#0C0C0C] px-4 pb-32 pt-32 sm:px-8 lg:px-12">
      <div className="mb-16 px-2 sm:px-6">
        <p className="font-kanit text-xs uppercase tracking-[0.3em] text-[#C9A24D]">Selected Work</p>
        <h2 className="font-anton mt-3 text-[11vw] uppercase leading-none text-[#EDE6D8] sm:text-6xl">Projects</h2>
      </div>

      <div className="relative flex flex-col gap-10">
        {featuredProjects.map((project, i) => (
          <StickyCard
            key={project.id}
            project={project}
            index={i}
            total={featuredProjects.length}
            onOpen={() => setActive(project)}
          />
        ))}
      </div>

      <div className="mt-28 px-2 sm:px-6">
        <FadeIn>
          <p className="font-kanit text-xs uppercase tracking-[0.3em] text-[#C9A24D]">Also built</p>
          <h3 className="font-anton mt-3 text-3xl uppercase leading-none text-[#EDE6D8] sm:text-4xl">More Projects</h3>
        </FadeIn>

        <div className="mt-10">
          <MoreProjectsGrid projects={otherProjects} onOpen={setActive} />
        </div>
      </div>

      <ProjectsModal project={active} onClose={() => setActive(null)} />
    </section>
  )
}
