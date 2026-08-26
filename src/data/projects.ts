export interface Project {
  id: string
  index: string
  title: string
  subtitle: string
  description: string
  stack: string[]
  /** Path to a real screenshot/asset, or null to render a generated abstract preview instead of misrepresenting placeholder art as a screenshot. */
  image: string | null
  gallery: string[]
  accent: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'velostatiq',
    index: '01',
    title: 'VeloStatiq',
    subtitle: 'Cinematic Football & F1 Analytics Workspace',
    description:
      'A cinematic football and Formula One analytics workspace built with Next.js, React, TypeScript and Python. Live schedules, results and standings sit alongside explainable football predictions and a Python-driven F1 prediction engine covering lap time, pit strategy, tyre strategy and fastest-lap probability — with an interactive Three.js circuit replay.',
    stack: ['Next.js', 'React', 'TypeScript', 'Python', 'Three.js', 'Docker'],
    image: null,
    gallery: [],
    accent: '#C9A24D',
    featured: true,
  },
  {
    id: 'ecomart',
    index: '02',
    title: 'Eco-Mart',
    subtitle: 'Group E-Commerce Website for Sustainable Products',
    description:
      'A 5-person Introduction to Information Systems coursework project: an e-commerce site selling eco-friendly, sustainable goods (bamboo bottles, jute bags, wooden combs). Wireframed in Balsamiq, then built in HTML, CSS and JavaScript across Home, Products, Blog, Research and About pages, with JS form validation and a working add-to-cart flow.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Balsamiq'],
    image: '/assets/graphics/ecomart-home.png',
    gallery: ['/assets/graphics/ecomart-home.png', '/assets/graphics/ecomart-products.png'],
    accent: '#956959',
    featured: true,
  },
  {
    id: 'aqua-pure',
    index: '03',
    title: 'Aqua-Pure',
    subtitle: 'IoT Water Quality Monitoring & Purification System',
    description:
      'An Introduction to Robotics & IoT group coursework project: a smart water-purification rig built around an ESP32 microcontroller reading turbidity and pH sensors, driving a solenoid valve, buzzer and LED indicators, monitored live over the Blynk app and version-controlled on GitHub. Tested against clean, acidic and contaminated (baking-soda) water samples.',
    stack: ['ESP32', 'Arduino IDE', 'C++', 'Blynk', 'IoT'],
    image: null,
    gallery: [],
    accent: '#8C6D2F',
    featured: true,
  },
  {
    id: 'ai-subscription-manager',
    index: '04',
    title: 'AI Subscription Plan Manager',
    subtitle: 'Java OOP Subscription & Prompt-Usage System',
    description:
      'A Java coursework project modelling an AI-subscription platform: an abstract AIModel parent class with ProPlan (team-seat management) and PersonalPlan (prompt purchasing & usage) subclasses, driven by a SubscriptionGUI controller with file export/import. Verified with six structured test cases and a written error-analysis of the logic bugs found along the way.',
    stack: ['Java', 'OOP', 'BlueJ'],
    image: null,
    gallery: [],
    accent: '#5C352C',
  },
  {
    id: 'medstore',
    index: '05',
    title: 'MedStore Inventory System',
    subtitle: 'File-Based Pharmacy Stock Manager',
    description:
      'A Fundamentals of Computing coursework project in Python: reads raw stock records for a wholesale medical supplier from inventory.txt, parses them into structured data, and renders an aligned, formatted stock table — practical file I/O, string processing and data-structure fundamentals.',
    stack: ['Python', 'File I/O'],
    image: null,
    gallery: [],
    accent: '#9C6B4F',
  },
  {
    id: 'crud-app',
    index: '06',
    title: 'User Management CRUD App',
    subtitle: 'Full-Stack Create/Read/Update/Delete Practice Build',
    description:
      'A self-directed backend-fundamentals build: an Express + MongoDB (Mongoose) app with EJS views, structured as routes → controllers → models, implementing full create, read, update and delete flows for user records.',
    stack: ['Node.js', 'Express', 'MongoDB', 'EJS'],
    image: null,
    gallery: [],
    accent: '#252321',
  },
  {
    id: 'food-dx',
    index: '07',
    title: 'Food DX',
    subtitle: 'Restaurant & Food-Delivery Front-End',
    description:
      'A fully custom HTML, CSS and JavaScript restaurant front-end — hero banner, product showcase, testimonials and a newsletter capture flow, hand-built from static markup with no framework overhead.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    image: '/assets/food-dx/banner.png',
    gallery: [
      '/assets/food-dx/banner.png',
      '/assets/food-dx/burger.png',
      '/assets/food-dx/salad.png',
      '/assets/food-dx/breakfast.png',
    ],
    accent: '#E9B48A',
  },
  {
    id: 'graphics-showcase',
    index: '08',
    title: 'Brand & Graphics Design',
    subtitle: 'Visual Identity, Print & Ad Campaigns',
    description:
      'A curated set of branding and advertising work from my graphics design training — magazine covers, automotive campaigns and print ads composited and retouched in Photoshop and Illustrator.',
    stack: ['Photoshop', 'Illustrator', 'InDesign'],
    image: '/assets/graphics/alia-magazine-cover.png',
    gallery: [
      '/assets/graphics/alia-magazine-cover.png',
      '/assets/graphics/car-rent.png',
      '/assets/graphics/challenger.png',
      '/assets/graphics/music-ad.jpg',
    ],
    accent: '#B67E7D',
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
export const otherProjects = projects.filter((p) => !p.featured)
