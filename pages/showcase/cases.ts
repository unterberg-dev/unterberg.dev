import { PROJECT_TYPE_KEY } from '#pages/showcase/projectTypes'

export type ShowCaseItemImage = string[]

export type ShowCaseItemLink = {
  preview: string
  repo?: string
}

export type ShowCaseItem = {
  title: string
  description: string[] | string
  images?: ShowCaseItemImage
  link: ShowCaseItemLink
  libs: string[]
  projectType: PROJECT_TYPE_KEY
  languages?: string[]
  framework?: string
  hosting?: string
  spotlight?: boolean
  draft?: boolean
}

const cases: ShowCaseItem[] = [
  {
    projectType: PROJECT_TYPE_KEY.SHOWCASE,
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
    images: ['showcase/unterberg.dev/start-page.jpg', 'showcase/unterberg.dev/collab-page.jpg'],
    libs: ['React', 'GSAP', 'Pixi', 'Uno CSS (Tailwind Preset)'],
    spotlight: true,
  },
  {
    projectType: PROJECT_TYPE_KEY.GITHUB_MAP_STARTER,
    title: 'Leaflet Nextjs Typescript',
    // todo: change text - it's just copy from the repo - better seo
    description:
      'Create interactive maps with this starter boilerplate for next.js and the leaflet-maps-react plugin. Written in typescript, visually enhanced by tailwind and lucide-react icons. ✨',
    link: {
      preview: 'https://next-leaflet-starter-typescript.vercel.app/map',
      repo: 'https://github.com/richard-unterberg/leaflet-nextjs-ts-starter',
    },
    languages: ['Typescript'],
    images: ['showcase/mapping/leaflet.jpg'],
    framework: 'Next.js',
    hosting: 'Vercel',
    libs: ['next.js', 'react', 'leaflet (+ react-leaflet)', 'leaflet.markercluster', 'tailwind'],
  },
  {
    projectType: PROJECT_TYPE_KEY.GITHUB_MAP_STARTER,
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
    images: ['showcase/mapping/maplibre.jpg'],
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
    projectType: PROJECT_TYPE_KEY.GITHUB_STARTER,
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
    images: ['showcase/git/vite-pixi.jpg'],
    libs: [],
  },
  {
    projectType: PROJECT_TYPE_KEY.CLIENT_PROJECT,
    title: 'CWE Chemnitz',
    // todo: change text - it's just copy from the repo - better seo
    description:
      'Wafer lemon drops donut tootsie roll sweet roll bear claw. Gingerbread sweet roll topping powder toffee. Chupa chups bonbon pudding jelly beans macaroon gummies chocolate cake candy canes caramels. Shortbread cotton candy cupcake fruitcake chocolate bar muffin dragée pudding.',
    link: {
      preview: 'https://www.cwe-chemnitz.de/',
    },
    languages: ['PHP, HTML, SCSS, JS'],
    images: ['showcase/clients/cwe.jpg'],
    framework: 'Wordpress / Custom Theme',
    libs: ['ACF', 'barba.js', 'GSAP'],
    draft: true,
  },
  {
    projectType: PROJECT_TYPE_KEY.CLIENT_PROJECT,
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
    images: ['showcase/clients/spk.jpg'],
    libs: ['ACF', 'barba.js', 'GSAP'],
    draft: true,
  },
  {
    projectType: PROJECT_TYPE_KEY.YOURS,
    title: 'Yours?',
    // todo: change text - it's just copy from the repo - better seo
    description:
      'You are the ideal customer working in the bicycle industry or in geospatial or audio engineering webdevelopment.',
    link: {
      preview: 'work-together#contact',
    },
    images: ['showcase/unterberg.dev/start-page.jpg', 'showcase/unterberg.dev/collab-page.jpg'],
    languages: ['Typescript', 'Node', 'PHP', 'Go'],
    libs: ['all of them :D'],
  },
]

export default cases
