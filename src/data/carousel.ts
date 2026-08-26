export interface CarouselRole {
  id: string
  role: string
  tagline: string
  bg: string
  panel: string
  accent: string
}

export const carouselRoles: CarouselRole[] = [
  {
    id: 'ai-engineer',
    role: 'AI / ML Engineer',
    tagline: 'BSc (Hons) Computing with AI — Islington College',
    bg: '#241B0E',
    panel: '#4A3A1A',
    accent: '#C9A24D',
  },
  {
    id: 'frontend-dev',
    role: 'Front-End Developer',
    tagline: 'React · TypeScript · WebGL interfaces',
    bg: '#5C352C',
    panel: '#956959',
    accent: '#E9B48A',
  },
  {
    id: 'graphics-designer',
    role: 'Graphics Designer',
    tagline: 'Brand systems · Photoshop · Illustrator',
    bg: '#420001',
    panel: '#640000',
    accent: '#B67E7D',
  },
  {
    id: 'creative-technologist',
    role: 'Creative Technologist',
    tagline: 'Shaders · Motion · Three.js experiments',
    bg: '#151922',
    panel: '#3A2C13',
    accent: '#8C6D2F',
  },
]
