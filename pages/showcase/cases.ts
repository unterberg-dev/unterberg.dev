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
  tags: string[]
  spotlight?: boolean
  draft?: boolean
}

const cases: Case[] = [
  {
    id: CASE_KEY.SHOWCASE,
    title: 'Spotlight: unterberg.dev',
    description: [
      'After years of not having a personal website, I finally decided to create one. The goal was to create a simple, yet fast, and accessible website which features some of my core skills.',
      'The main objective was surely the interaction with the mouse pointer on the pixi stage with the hitbox system, but I were also aiming for a good performance and accessibility. With a overall page speed ranking of 99 I am quite happy with the result.',
    ],
    link: {
      preview: 'https://unterberg.dev',
    },
    tags: [
      'TypeScript',
      'Node.js',
      'SCSS',
      'Vike',
      'React',
      'GSAP',
      'Pixi',
      'Uno CSS (Tailwind Preset)',
    ],
    images: ['showcase/unterberg.dev/start-page.webp', 'showcase/unterberg.dev/collab-page.webp'],
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
    tags: [
      'Typescript',
      'Next.js',
      'Leaflet',
      'Tailwind',
      'next.js',
      'react',
      'leaflet (+ react-leaflet)',
      'leaflet.markercluster',
      'tailwind',
    ],
    images: ['showcase/mapping/leaflet.webp'],
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
    images: ['showcase/mapping/maplibre.webp'],
    tags: [
      'Typescript',
      'Next.js',
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
    tags: ['Typescript', 'GSAP', 'pixi.js', 'vite', 'typescript'],
    images: ['showcase/git/vite-pixi.webp'],
  },
  {
    id: CASE_KEY.CLIENT_PROJECT,
    title: 'Chemnitzer Wirtschaftsförderungs- und Entwicklungsgesellschaft',
    // todo: change text - it's just copy from the repo - better seo
    description:
      'I originally created this webpage for my former employer (brands and beyond GmbH). It is based on a system The website is still maintained by the company. We continue working together.',
    link: {
      preview: 'https://www.cwe-chemnitz.de/',
    },
    tags: ['Wordpress', 'PHP', 'SCSS', 'JS', 'ACF', 'barba.js', 'GSAP'],
    images: ['showcase/clients/cwe.webp'],
  },
  {
    id: CASE_KEY.CLIENT_PROJECT,
    title: 'Azubimanufaktur',
    // todo: change text - it's just copy from the repo - better seo
    description: [
      'Also created alongside for my former employer (brands and beyond GmbH), this website features modern layer animations and is running on the same custom theme which I am using in almost all my WP projects.',
    ],
    link: {
      preview: 'https://www.azubimanufaktur.de/',
    },
    tags: ['Wordpress / Custom Theme', 'PHP', 'SCSS', 'JS', 'ACF', 'barba.js', 'GSAP'],
    images: ['showcase/clients/spk.webp'],
  },
  {
    id: CASE_KEY.CLIENT_PROJECT,
    title: 'Aufstand der Utopien',
    // todo: change text - it's just copy from the repo - better seo
    description:
      'This is a project from back from 2019 - It is just here to showcase this very nice design from doppeldenk from dresden',
    link: {
      preview: 'https://aufstand-der-utopien.de/',
    },
    tags: ['Wordpress / Custom Theme', 'PHP, HTML, SCSS, JS', 'ACF', 'barba.js', 'GSAP'],
    images: ['showcase/clients/aufstand.webp'],
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
    tags: ['Typescript', 'Node', 'PHP', '?'],
  },
]

export default cases
