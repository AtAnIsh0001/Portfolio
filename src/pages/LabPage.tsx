import { lazy, Suspense, useEffect, useState } from 'react'
import ParticlePortrait from '@/components/home/ParticlePortrait'
import { projects } from '@/data/projects'

const ProjectCard3D = lazy(() => import('@/components/projects/ProjectCard3D'))

/**
 * Dev-only scratch route for validating Phase 2 3D/shader work in isolation
 * before it's wired into the real scroll journey. Not part of the shipped site
 * — the route is only registered when running the Vite dev server.
 */
export default function LabPage() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let dir = 1
    const id = setInterval(() => {
      setProgress((p) => {
        let next = p + dir * 0.01
        if (next >= 1) {
          next = 1
          dir = -1
        } else if (next <= 0) {
          next = 0
          dir = 1
        }
        return next
      })
    }, 30)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="min-h-screen space-y-16 bg-[#0C0C0C] p-8 text-[#EDE6D8]">
      <section>
        <h2 className="font-anton mb-4 text-2xl uppercase">Particle Portrait — progress {progress.toFixed(2)}</h2>
        <div className="h-[520px] w-full max-w-2xl rounded-2xl border border-white/10 bg-black/40">
          <ParticlePortrait progress={progress} density="high" />
        </div>
      </section>

      <section>
        <h2 className="font-anton mb-4 text-2xl uppercase">Project Card 3D + Bloom/Vignette</h2>
        <div className="h-[440px] w-full max-w-2xl rounded-2xl border border-white/10 bg-black/40">
          <Suspense fallback={null}>
            <ProjectCard3D project={projects[0]} />
          </Suspense>
        </div>
      </section>
    </div>
  )
}
