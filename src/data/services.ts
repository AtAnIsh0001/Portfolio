export interface ServiceItem {
  index: string
  title: string
  description: string
}

export const services: ServiceItem[] = [
  {
    index: '01',
    title: 'AI & Machine Learning',
    description:
      'Applied AI coursework and prototypes from my BSc (Hons) Computing with Artificial Intelligence — predictive models, data pipelines, and explainable ML features.',
  },
  {
    index: '02',
    title: 'Web Development',
    description:
      'Full front-end builds in React, TypeScript and Next.js, backed by Node.js — from data-heavy dashboards to marketing sites.',
  },
  {
    index: '03',
    title: 'Motion & Interactive Design',
    description:
      'Scroll-driven storytelling with GSAP, Framer Motion and custom WebGL shaders — physics-based, tactile, and built for 60fps.',
  },
  {
    index: '04',
    title: 'Branding & Graphics Design',
    description:
      'Visual identity, posters and print collateral crafted in Photoshop, Illustrator and InDesign.',
  },
  {
    index: '05',
    title: 'UI / UX & Web Design',
    description:
      'Interface systems designed in Figma and shipped as production-ready, accessible, responsive experiences.',
  },
]
