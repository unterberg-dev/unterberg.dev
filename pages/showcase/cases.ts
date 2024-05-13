export enum CASE_KEY {
  GITHUB_STARTER,
  GITHUB_MAP_STARTER,
  SHOWCASE,
  CLIENT_PROJECT,
  YOURS,
}

type CaseImage = string[]
type CaseLink = {
  preview: string
  repo?: string
}

export type Case = {
  id: CASE_KEY
  title: string
  description: string[] | string
  images?: CaseImage
  link: CaseLink
  libs: string[]
  languages?: string[]
  framework?: string
  hosting?: string
  spotlight?: boolean
  draft?: boolean
}

const cases: Case[] = [
  {
    id: CASE_KEY.SHOWCASE,
    title: 'unterberg.dev',
    description: [
      'After years of not having a personal website, I finally decided to create one. The goal was to create a simple, yet fast, and accessible website which features some of my core skills.',
      'The main objective is surely the interaction with the mouse pointer on the pixi stage with the hitbox system, but Im also aiming for a good performance and accessibility. That was a challenge, not gonna lie',
    ],
    link: {
      preview: 'https://unterberg.dev',
    },
    framework: 'Vike (Vite SSR/Prerender) ❤️',
    languages: ['TypeScript'],
    hosting: 'Github Pages',
    images: ['showcase/unterberg.dev/start-page.webp', 'showcase/unterberg.dev/collab-page.webp'],
    libs: ['React', 'GSAP', 'Pixi', 'Uno CSS (Tailwind Preset)'],
    spotlight: true,
  },
  {
    id: CASE_KEY.GITHUB_MAP_STARTER,
    title: 'Leaflet Nextjs Typescript',
    // todo: change text - it's just copy from the repo - better seo
    description:
      'Create interactive maps with this starter boilerplate for next.js and the leaflet-maps-react plugin. Written in typescript, visually enhanced by tailwind and lucide-react icons. ✨',
    link: {
      preview: 'https://next-leaflet-starter-typescript.vercel.app/map',
      repo: 'https://github.com/richard-unterberg/leaflet-nextjs-ts-starter',
    },
    languages: ['Typescript'],
    images: ['showcase/mapping/leaflet-w-logo.png'],
    framework: 'Next.js',
    hosting: 'Vercel',
    libs: ['next.js', 'react', 'leaflet (+ react-leaflet)', 'leaflet.markercluster', 'tailwind'],
  },
  {
    id: CASE_KEY.GITHUB_MAP_STARTER,
    title: 'Maplibre/Mapbox Nextjs Typescript',
    // todo: change text - it's just copy from the repo - better seo
    description:
      'a maplibre-gl controller template for next.js with advanced category markers & clustering features. written in react-typescript and featuring zustand state management, tailwind and lucide-icons',
    link: {
      preview: 'https://maplibre-nextjs-ts-starter.vercel.app/',
      repo: 'https://github.com/richard-unterberg/maplibre-nextjs-ts-starter',
    },
    languages: ['Typescript'],
    framework: 'Next.js',
    images: ['showcase/mapping/maplibre-w-logo.webp'],
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
    id: CASE_KEY.GITHUB_STARTER,
    title: 'GSAP Pixi.js Typescript',
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
    images: ['showcase/git/vite-pixi.webp'],
    libs: ['gsap', 'pixi.js', 'vite', 'typescript'],
  },
  {
    id: CASE_KEY.CLIENT_PROJECT,
    title: 'Chemnitzer Wirtschaftsförderungs- und Entwicklungsgesellschaft',
    // todo: change text - it's just copy from the repo - better seo
    description:
      'Wafer lemon drops donut tootsie roll sweet roll bear claw. Gingerbread sweet roll topping powder toffee. Chupa chups bonbon pudding jelly beans macaroon gummies chocolate cake candy canes caramels. Shortbread cotton candy cupcake fruitcake chocolate bar muffin dragée pudding.',
    link: {
      preview: 'https://www.cwe-chemnitz.de/',
    },
    languages: ['PHP, HTML, SCSS, JS'],
    images: ['showcase/clients/cwe.webp'],
    framework: 'Wordpress / Custom Theme',
    libs: ['ACF', 'barba.js', 'GSAP'],
    draft: true,
  },
  {
    id: CASE_KEY.CLIENT_PROJECT,
    title: 'Azubimanufaktur',
    // todo: change text - it's just copy from the repo - better seo
    description: [
      'Ice cream apple pie caramels marshmallow pie pie ice cream biscuit. Tiramisu danish tootsie roll candy cotton candy apple pie. Gummies icing chocolate cake biscuit toffee wafer.',
      'Cake croissant fruitcake pudding lemon drops fruitcake chocolate cake fruitcake. Cotton candy tart marzipan ice cream sweet roll bear claw. Brownie candy toffee lemon drops sugar plum pie caramels tootsie roll. Dragée pudding tootsie roll tart sesame snaps tart cookie.',
    ],
    link: {
      preview: 'https://www.azubimanufaktur.de/',
    },
    languages: ['PHP, HTML, SCSS, JS'],
    framework: 'Wordpress / Custom Theme',
    images: ['showcase/clients/spk.webp'],
    libs: ['ACF', 'barba.js', 'GSAP'],
    draft: true,
  },
  {
    id: CASE_KEY.CLIENT_PROJECT,
    title: 'Aufstand der Utopien',
    // todo: change text - it's just copy from the repo - better seo
    description:
      'Wafer lemon drops donut tootsie roll sweet roll bear claw. Gingerbread sweet roll topping powder toffee. Chupa chups bonbon pudding jelly beans macaroon gummies chocolate cake candy canes caramels. Shortbread cotton candy cupcake fruitcake chocolate bar muffin dragée pudding.',
    link: {
      preview: 'https://www.cwe-chemnitz.de/',
    },
    languages: ['PHP, HTML, SCSS, JS'],
    images: ['showcase/clients/aufstand.webp'],
    framework: 'Wordpress / Custom Theme',
    libs: ['ACF', 'barba.js', 'GSAP'],
    draft: true,
  },
  {
    id: CASE_KEY.YOURS,
    title: 'Yours?',
    // todo: change text - it's just copy from the repo - better seo
    description:
      'You are the ideal customer working in the bicycle industry or in geospatial or audio engineering webdevelopment.',
    link: {
      preview: 'work-together#contact',
    },
    images: ['showcase/unterberg.dev/start-page.webp', 'showcase/unterberg.dev/collab-page.webp'],
    languages: ['Typescript', 'Node', 'PHP', 'Go'],
    libs: ['all of them :D'],
  },
]

export default cases
