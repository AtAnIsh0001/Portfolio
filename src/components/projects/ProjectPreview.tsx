import type { Project } from '@/data/projects'

/** Generative abstract preview for projects with no real screenshot available, keyed off the project accent. */
export default function ProjectPreview({ project }: { project: Project }) {
  const bars = [40, 70, 55, 90, 65, 35, 80]

  return (
    <div
      className="relative flex h-full w-full items-end gap-2 overflow-hidden rounded-[24px] p-6"
      style={{ background: `linear-gradient(160deg, ${project.accent}22, #0C0C0C)` }}
    >
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-30" viewBox="0 0 400 240" preserveAspectRatio="none">
        <polyline
          points="0,180 60,140 120,160 180,90 240,110 300,50 360,80 400,40"
          fill="none"
          stroke={project.accent}
          strokeWidth="2"
        />
        <line x1="0" y1="200" x2="400" y2="200" stroke={project.accent} strokeOpacity="0.3" />
      </svg>
      <div className="relative z-10 flex h-2/3 flex-1 items-end gap-2">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-md"
            style={{ height: `${h}%`, background: project.accent, opacity: 0.25 + (i / bars.length) * 0.5 }}
          />
        ))}
      </div>
    </div>
  )
}
