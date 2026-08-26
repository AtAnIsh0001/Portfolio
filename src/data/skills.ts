export interface Skill {
  id: string
  name: string
  category: 'AI / ML & Programming' | 'Web Engineering' | 'IoT & Systems' | 'Creative & Design'
  proficiency: number
  description: string
  relatedProjectId?: string
}

export const skills: Skill[] = [
  // AI / ML & Programming
  {
    id: 'python',
    name: 'Python',
    category: 'AI / ML & Programming',
    proficiency: 80,
    description: 'File I/O, string processing and data structures for MedStore; data pipelines behind the VeloStatiq F1 prediction engine.',
    relatedProjectId: 'medstore',
  },
  {
    id: 'java-oop',
    name: 'Java & OOP',
    category: 'AI / ML & Programming',
    proficiency: 75,
    description: 'Inheritance and polymorphism modelling an AI subscription platform — abstract base class, two concrete plan types, a GUI controller.',
    relatedProjectId: 'ai-subscription-manager',
  },
  {
    id: 'ai-systems',
    name: 'Applied AI Systems',
    category: 'AI / ML & Programming',
    proficiency: 74,
    description: 'BSc (Hons) Computing with Artificial Intelligence coursework — algorithms, data structures, intelligent systems design.',
  },
  {
    id: 'embedded-c',
    name: 'C++ / Embedded',
    category: 'AI / ML & Programming',
    proficiency: 66,
    description: 'Sensor-driven control logic for the Aqua-Pure ESP32 build, written and flashed via the Arduino IDE.',
    relatedProjectId: 'aqua-pure',
  },

  // Web Engineering
  {
    id: 'react',
    name: 'React',
    category: 'Web Engineering',
    proficiency: 92,
    description: 'Primary UI library for every production build in this portfolio, including VeloStatiq and this site itself.',
    relatedProjectId: 'velostatiq',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Web Engineering',
    proficiency: 88,
    description: 'Strict typing across front-end and Node.js services.',
  },
  {
    id: 'threejs',
    name: 'Three.js / WebGL',
    category: 'Web Engineering',
    proficiency: 70,
    description: 'Custom shaders, R3F scenes and postprocessing behind this site’s hero and 360° project inspector.',
  },
  {
    id: 'nodejs',
    name: 'Node.js / Express',
    category: 'Web Engineering',
    proficiency: 82,
    description: 'REST-style routes, controllers and models behind the User Management CRUD app, backed by MongoDB.',
    relatedProjectId: 'crud-app',
  },
  {
    id: 'html-css-js',
    name: 'HTML / CSS / JavaScript',
    category: 'Web Engineering',
    proficiency: 90,
    description: 'Hand-built, framework-free front-ends — Eco-Mart’s five-page e-commerce site and the Food DX restaurant build.',
    relatedProjectId: 'ecomart',
  },
  {
    id: 'gsap',
    name: 'GSAP & Motion',
    category: 'Web Engineering',
    proficiency: 80,
    description: 'ScrollTrigger-driven timelines and physics-based UI motion.',
  },

  // IoT & Systems
  {
    id: 'iot-esp32',
    name: 'ESP32 / IoT',
    category: 'IoT & Systems',
    proficiency: 68,
    description: 'Turbidity + pH sensing, solenoid valve control and live Blynk-app monitoring for the Aqua-Pure water system.',
    relatedProjectId: 'aqua-pure',
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    category: 'IoT & Systems',
    proficiency: 84,
    description: 'Version control across every coursework and personal project, including collaborative IoT team repos.',
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'IoT & Systems',
    proficiency: 65,
    description: 'Containerised deployment for full-stack apps like VeloStatiq.',
    relatedProjectId: 'velostatiq',
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'IoT & Systems',
    proficiency: 70,
    description: 'Schema design and Mongoose models behind the CRUD app’s user records.',
    relatedProjectId: 'crud-app',
  },

  // Creative & Design
  {
    id: 'photoshop',
    name: 'Photoshop',
    category: 'Creative & Design',
    proficiency: 90,
    description: 'Photo compositing, retouching and ad design — see the Brand & Graphics showcase.',
    relatedProjectId: 'graphics-showcase',
  },
  {
    id: 'illustrator',
    name: 'Illustrator',
    category: 'Creative & Design',
    proficiency: 85,
    description: 'Vector branding, logotypes and print layouts.',
    relatedProjectId: 'graphics-showcase',
  },
  {
    id: 'indesign',
    name: 'InDesign',
    category: 'Creative & Design',
    proficiency: 75,
    description: 'Multi-page layout and editorial design.',
  },
  {
    id: 'figma-balsamiq',
    name: 'Figma & Balsamiq',
    category: 'Creative & Design',
    proficiency: 86,
    description: 'Interface design systems and wireframing — Eco-Mart’s pages were blueprinted in Balsamiq before a line of HTML was written.',
    relatedProjectId: 'ecomart',
  },
]

export const skillCategories = ['AI / ML & Programming', 'Web Engineering', 'IoT & Systems', 'Creative & Design'] as const
