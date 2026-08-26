import { skills, type Skill } from './skills'

export interface MarqueeTile {
  label: string
  tag: string
}

const SHORT_TAG: Record<Skill['category'], string> = {
  'AI / ML & Programming': 'AI / ML',
  'Web Engineering': 'Web',
  'IoT & Systems': 'Systems',
  'Creative & Design': 'Design',
}

const tiles: MarqueeTile[] = skills.map((skill) => ({
  label: skill.name,
  tag: SHORT_TAG[skill.category],
}))

// Every real skill appears in the marquee, alternating into two rows so each
// row mixes categories rather than clumping one category per row.
export const marqueeRowRight: MarqueeTile[] = tiles.filter((_, i) => i % 2 === 0)
export const marqueeRowLeft: MarqueeTile[] = tiles.filter((_, i) => i % 2 === 1)
