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
      'Next.js/React/TypeScript front end; scenario inputs hit a Next.js API route, which spawns a Python 3 (standard-library only) subprocess to compute predictions',
      'Strict separation of concerns: live results/standings/pit data come only from the Jolpica F1 API, forecasts come only from local historical CSV archives — never blended',
      'Lap-time model blends historical best pace with a circuit benchmark, plus consistency, temperature, rain and fuel-load penalty terms',
      'Fastest-lap probability computed via a bounded sigmoid over a composite score',
      'Robust statistics (median-based, not raw averages) to keep anomalous pit-stop outliers from skewing the model',
      'Three.js circuit replay animates recorded lap pacing onto an approximate track shape — an explicit illustrative reconstruction, since free timing feeds carry no GPS trace',
      'Dockerized deployment bundling the Node/Next.js server and Python engine together',
    ],
    challenges: [
      {
        title: 'No real telemetry to animate the circuit replay with',
        detail:
          'Public timing feeds give lap durations, not GPS traces, so there was no way to build a geometrically accurate 3D replay. Rather than fake precision, the replay is treated explicitly as an illustrative reconstruction driven by real lap-pacing data.',
      },
      {
        title: 'Pit-stop data full of outliers',
        detail:
          'Red flags and penalties produce occasional pit stops many times longer than normal, which would badly skew a simple average. Switched to median-based statistics for pit-window and pace calculations instead of raw means.',
      },
      {
        title: 'Cold-start drivers with no local history',
        detail:
          'A driver with no rows in the local CSV archive falls back to a same-circuit field median rather than guessing — and the system explicitly reports a zero-sample count and lowers its own confidence score instead of presenting false certainty.',
      },
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
    role: 'Team of 5 — Introduction to Information Systems coursework; collaborative front-end build',
    timeline: 'Autumn Semester, Islington College',
    architecture: [
      'Wireframed in Balsamiq across Home, Products, Blog, About Us and Research pages before any code was written',
      'Vanilla HTML/CSS/JS build using Flexbox layout — no framework',
      'Cart persisted client-side via localStorage — add, remove, change quantity, running subtotal',
      'Client-side form validation on the contact form (name length, email format, minimum message length)',
      'A dedicated Research page documenting the glassmorphism styling against reference sites (Apple, Stripe, Figma, Vercel)',
    ],
    challenges: [
      {
        title: 'Layout and responsiveness took longer than planned',
        detail:
          'As a team we hit more friction than expected getting page layout, interactive elements like the cart, and responsiveness working consistently across five pages — worked through with team coordination, tutor guidance, and better time management as the project progressed.',
      },
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
    role: 'Team of 5 — Introduction to Robotics & IoT coursework (CC4003NI)',
    architecture: [
      'ESP32 Dev Module reading a pH sensor and a turbidity sensor, each averaged over 10 samples to cut sensor noise',
      'Safe-range logic (pH 6.5–8.0, turbidity under a calibrated threshold) drives a relay-controlled solenoid valve plus red/green LED and buzzer feedback',
      '16x2 I2C LCD for live on-device readouts',
      'Built and bench-tested module by module — LCD, LEDs, buzzer, relay, each sensor — individually before full integration, to isolate faults early',
      'Arduino IDE / C++, version-controlled on GitHub; Blynk app planned for remote monitoring',
    ],
    challenges: [
      {
        title: 'No prior embedded/MicroPython experience on the team',
        detail:
          'Nobody had written embedded code before, which pushed the actual coding start back by about a week while the team self-taught from documentation and tutorials.',
      },
      {
        title: "LED indicator didn't track sensor state correctly",
        detail:
          'The green "safe" LED initially stayed solid on instead of responding to live readings. Traced and fixed through iterative debugging of the control logic and wiring.',
      },
      {
        title: 'Sourcing the pH sensor and solenoid valve',
        detail:
          "Both parts were out of stock at the first electronics shops checked. The team split into sub-groups to canvas multiple stores in parallel and pooled costs to stay within budget.",
      },
      {
        title: 'Design pivot on the valve mechanism',
        detail:
          "Started with a plan for a mini pump/valve, switched to a servo-actuated valve, then reverted to a relay-driven solenoid valve after real-world testing showed the servo's power needs and behavior didn't match the original design.",
      },
      {
        title: 'Validating across water conditions',
        detail:
          'Tested against clean tap water, a baking-soda solution and acidic water. The combined pH + turbidity logic correctly classified all three samples as safe or unsafe, matching expected results in every test.',
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
    role: 'Solo — Java coursework project (CS4001NT)',
    architecture: [
      'Abstract AIModel parent class (Serializable) with PersonalPlan and ProPlan subclasses — inheritance and polymorphism via ArrayList<AIModel> + instanceof checks',
      'PersonalPlan tracks a monthly prompt quota (purchase and spend prompts); ProPlan tracks team seats (add/remove members)',
      'Java Swing GUI (SubscriptionGUI) with custom rounded text-field and button components',
      'Dual file export — a human-readable subscriptions.txt (BufferedWriter) and a serialized subscriptions.dat (ObjectOutputStream) that can be reloaded',
      'Verified against 6 structured test cases — add plan, purchase/spend prompts, add/remove team member, plan-type checks — all passed',
    ],
    challenges: [
      {
        title: 'Inverted comparison blocked valid prompt use',
        detail:
          'enterPrompt() originally checked if (promptRemaining < 0), so it refused every prompt even when the quota had plenty left. Root-caused during testing and corrected to > 0.',
      },
      {
        title: 'Same inverted-logic bug in team management',
        detail:
          'addTeamMember() had the identical mistake — if (teamSlots < 0) — so it always reported no seats available even when slots were open. Fixed by flipping the comparison.',
      },
      {
        title: 'Confusing crash on an empty plan list',
        detail:
          "Giving a prompt or checking a plan type before adding any plans threw a confusing \"Index must be between 0 and -1\" error. Added an explicit empty-list guard that shows a clear message instead.",
      },
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
    role: 'Solo — Fundamentals of Computing coursework (Milestone 1)',
    architecture: [
      'Reads raw stock records line by line from a text file',
      'Stores each row as a list-of-lists in memory — a deliberate spreadsheet-style structure standing in for a real database',
      'Strips and splits each line on commas to structure the data',
      'Prints a fixed-width, aligned stock table',
    ],
    challenges: [
      {
        title: 'Hidden newline characters broke the table output',
        detail:
          "Python's file reads left invisible \\n characters at the end of every line, throwing off column alignment — and the coursework rules didn't allow using the built-in .strip() method. Solved it by manually replacing the newline character before splitting each line into columns.",
      },
    ],
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
