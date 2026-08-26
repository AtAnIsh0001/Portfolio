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
  /** How the project was built — solo vs. team, and what part was mine. */
  role?: string
  timeline?: string
  /** Short, factual bullets — not narrative prose. */
  architecture?: string[]
  /** Concrete difficulties and how they were addressed. Omit rather than pad with generic filler. */
  challenges?: { title: string; detail: string }[]
  links?: { label: string; href: string }[]
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
    role: 'Solo build',
    architecture: [
      'Next.js/React/TypeScript front end for live schedules, results and standings',
      'Python service powering explainable football predictions',
      'Separate Python-driven F1 prediction engine — lap time, pit strategy, tyre strategy, fastest-lap probability',
      'Interactive Three.js circuit replay layer',
      'Docker for local orchestration/deployment of the multi-service setup',
    ],
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
    role: 'Team of 5 — Introduction to Information Systems coursework',
    timeline: 'University coursework project',
    architecture: [
      'Wireframed in Balsamiq before any code was written',
      'Static HTML/CSS/JS build — Home, Products, Blog, Research and About pages',
      'Client-side form validation with JavaScript',
      'Working add-to-cart flow',
    ],
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
    role: 'Team project — Introduction to Robotics & IoT coursework',
    architecture: [
      'ESP32 microcontroller reading turbidity and pH sensors',
      'Solenoid valve, buzzer and LED indicators driven off sensor thresholds',
      'Live monitoring over the Blynk app',
      'Version-controlled on GitHub',
    ],
    challenges: [
      {
        title: 'Validating across water conditions',
        detail:
          'Tested the rig against clean, acidic and contaminated (baking-soda) water samples to confirm the sensors and valve logic responded correctly across the range, not just in ideal conditions.',
      },
    ],
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
    role: 'Solo — Java coursework project',
    architecture: [
      'Abstract AIModel parent class',
      'ProPlan subclass — team-seat management',
      'PersonalPlan subclass — prompt purchasing & usage tracking',
      'SubscriptionGUI controller with file export/import',
    ],
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
    role: 'Solo — Fundamentals of Computing coursework',
    architecture: ['Reads raw stock records from inventory.txt', 'Parses into structured data', 'Renders an aligned, formatted stock table'],
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
    role: 'Solo — self-directed backend build',
    architecture: [
      'Express + MongoDB (Mongoose) with EJS views',
      'Routes → controllers → models structure',
      'Full create, read, update and delete flows for user records',
    ],
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
    role: 'Solo — custom front-end build',
    architecture: ['Hero banner and product showcase', 'Testimonials section', 'Newsletter capture flow', 'Hand-built HTML/CSS/JS, no framework'],
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
    featured: true,
    role: 'Solo design work — graphics design training',
    architecture: [
      'Magazine cover composition and typography (Alia)',
      'Automotive campaign print ad — rental brand',
      'Automotive campaign print ad — Challenger',
      'Music/entertainment ad compositing and retouching',
    ],
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
export const otherProjects = projects.filter((p) => !p.featured)
