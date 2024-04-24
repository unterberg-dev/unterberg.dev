export type ShowCaseItemImage = string[]

export type ShowCaseItemLink = {
  preview: string
  repo?: string
}

export type ShowCaseItem = {
  title: string
  description: string
  images?: ShowCaseItemImage
  link: ShowCaseItemLink
  libs: string[]
  languages?: string[]
  framework?: string
  hosting?: string
}

const cases: ShowCaseItem[] = [
  {
    title: 'Redesign: unterberg.dev',
    description:
      'After years of not having a personal website, I finally decided to create one. The goal was to create a simple, yet fast, and accessible website which features some of my core skills. The main objective is surely the interaction with the mouse pointer on the pixi stage with the hitbox system, but Im also aiming for a good performance and accessibility. That was a challenge, not gonna lie',
    link: {
      preview: 'https://unterberg.dev',
    },
    framework: 'Vike (Vite SSR/Prerender) ❤️',
    languages: ['TypeScript'],
    hosting: 'Github Pages',
    libs: ['React', 'GSAP', 'Pixi', 'Uno CSS (Tailwind Preset)'],
  },
  {
    title: 'Starter Template: Leaflet Nextjs Typescript',
    // todo: change text - it's just copy from the repo - better seo
    description:
      'Create interactive maps with this starter boilerplate for next.js and the leaflet-maps-react plugin. Written in typescript, visually enhanced by tailwind and lucide-react icons. ✨',
    link: {
      preview: 'https://next-leaflet-starter-typescript.vercel.app/map',
      repo: 'https://github.com/richard-unterberg/leaflet-nextjs-ts-starter',
    },
    languages: ['Typescript'],
    framework: 'Next.js',
    hosting: 'Vercel',
    libs: ['next.js', 'react', 'leaflet (+ react-leaflet)', 'leaflet.markercluster', 'tailwind'],
  },
  {
    title: 'Starter Template: Maplibre/Mapbox Nextjs Typescript',
    // todo: change text - it's just copy from the repo - better seo
    description:
      'a maplibre-gl controller template for next.js with advanced category markers & clustering features. written in react-typescript and featuring zustand state management, tailwind and lucide-icons',
    link: {
      preview: 'https://maplibre-nextjs-ts-starter.vercel.app/',
      repo: 'https://github.com/richard-unterberg/maplibre-nextjs-ts-starter',
    },
    languages: ['Typescript'],
    framework: 'Next.js',
    hosting: 'Vercel',
    libs: [
      'react',
      'maplibre-gl (+react-map-gl)',
      'supercluster',
      'maplibre-gl',
      'zustand',
      'tailwind',
    ],
  },
  {
    title: 'Starter Template: GSAP Pixi.js Typescript',
    // todo: change text - it's just copy from the repo - better seo
    description:
      'a maplibre-gl controller template for next.js with advanced category markers & clustering features. written in react-typescript and featuring zustand state management, tailwind and lucide-icons',
    link: {
      preview: 'https://richard-unterberg.github.io/pixi-gsap-vite-ts/',
      repo: 'https://github.com/richard-unterberg/pixi-gsap-vite-ts',
    },
    languages: ['Typescript'],
    framework: 'None',
    hosting: 'Github Pages',
    libs: [],
  },
  {
    title: 'Client Website: CWE Chemnitz',
    // todo: change text - it's just copy from the repo - better seo
    description: '',
    link: {
      preview: 'https://www.cwe-chemnitz.de/',
    },
    languages: ['PHP, HTML, SCSS, JS'],
    framework: 'Wordpress / Custom Theme',
    libs: ['ACF', 'barba.js', 'GSAP'],
  },
  {
    title: 'Client Website: Azubimanufaktur',
    // todo: change text - it's just copy from the repo - better seo
    description: '',
    link: {
      preview: 'https://www.azubimanufaktur.de/',
    },
    languages: ['PHP, HTML, SCSS, JS'],
    framework: 'Wordpress / Custom Theme',
    libs: ['ACF', 'barba.js', 'GSAP'],
  },
  {
    title: 'Yours?',
    // todo: change text - it's just copy from the repo - better seo
    description:
      'You are the ideal customer working in the bicycle industry or in geospatial or audio engineering webdevelopment.',
    link: {
      preview: 'collab',
    },
    languages: ['Typescript', 'Node', 'PHP', 'Go'],
    libs: ['all of them :D'],
  },
]

export default cases
