import { ReactNode } from 'react'

export enum SKILL_KEY {
  DECLARATIVE = 1,
  TYPESCRIPT_NODE = 2,
  WORDPRESS = 3,
  HTML_CSS = 4,
  DEDICATION = 5,
}

type SkillboxTagBubble = {
  value: number
  className: string
}

export type Skill = {
  id: SKILL_KEY
  title: string
  tags: string[]
  content?: ReactNode
  excerpt: string
  experience?: SkillboxTagBubble
  dedication?: SkillboxTagBubble
  imagePath: string
}

const skills: Skill[] = [
  {
    id: SKILL_KEY.DECLARATIVE,
    title: 'React, Declarative & Functional Coding',
    tags: [
      'JSX',
      'react-hook-form',
      'mui',
      'redux & rtk',
      'zustand',
      'react-query',
      'tailwind',
      'React 18',
      'Styled Components',
    ],
    imagePath: '/skills/react.webp',
    experience: { value: 4, className: 'hover:bg-amber-3' },
    dedication: { value: 10, className: 'hover:bg-emerald-5' },
    excerpt:
      'Starting with React; Its here to stay. Its not even a programming language, but no library before made me finish so many things in such a short manner of time.',
    content: (
      <>
        <p>
          As a frontend developer you should no have missed to learn at least one of them; React,
          Angular, Vue, you name it - declarative ui frameworks / libraries to structure and
          maintain frontend code ranging from small sidekicks to full-blown enterprise situations.
        </p>
        <p className="mt-5">
          I like all the other libraries, but at the moment I mainly choose functional react for my
          frontends 👻
        </p>
      </>
    ),
  },
  {
    id: SKILL_KEY.TYPESCRIPT_NODE,
    title: 'Typescript & Node',
    tags: [
      'express',
      'next.js',
      'tone.js',
      'vite / vike',
      'tRPC',
      'maplibre-gl',
      'leaflet',
      'telefunc',
      'post-CSS',
      'eslint',
    ],
    imagePath: '/skills/node-2.webp',
    experience: { value: 3, className: 'hover:bg-amber-3' },
    dedication: { value: 9, className: 'hover:bg-emerald-5' },
    excerpt:
      'The engine of the most of my current projects bundles in my dayjob and side projects. Gracefully looking at all the libraries and tools we got through the node module system.',
    content: (
      <>
        <p>
          some further explanation about the skills and experience with node.js, especially with
          setting up a server, handling requests and responses, and working with databases.
          experimenting with different libraries and tools to make the development process more
          efficient. RPC and rest experience gained
        </p>
        <p className="mt-5">
          <b>Typescript</b> makes it possible to interact with large datasets and keep control over
          big architectures. My colleques said &quot;Like it or not, you will need it for working on
          big stuff&quot;. They should be right as always :)
        </p>
      </>
    ),
  },
  {
    id: SKILL_KEY.WORDPRESS,
    title: 'Custom Wordpress Development & PHP',
    tags: [
      'ACF',
      'Custom (Child) Themes',
      'Custom Plugins',
      'Rest-API',
      'SPA-like Wordpress',
      'Inpsyde WP VIP',
      'Page Builders (I know them all) 😅',
    ],
    imagePath: '/skills/wordpress-2.webp',
    experience: { value: 13, className: 'hover:bg-emerald-5' },
    dedication: { value: 7, className: 'hover:bg-amber-3' },
    excerpt:
      'Dunno how many hours wasted and brain damage done by trying to get the right plugins and themes for clients before I started to learn how to code themes and plugins for myself',
    content: (
      <>
        <p>
          use it in a modular fashion for customer projects can be a real advantage. Im developed a
          whole bunch of plugins and themes to control exactly what I want and we need
        </p>
        <p className="mt-5">
          Pudding candy gummies apple pie sesame snaps. Marzipan icing sweet roll cake croissant
          halvah. Pastry cake topping gummi bears jelly liquorice tart cake.
        </p>
      </>
    ),
  },
  {
    id: SKILL_KEY.HTML_CSS,
    title: 'HTML, CSS and everything between',
    tags: ['HTML', 'CSS', 'SASS', 'Bootstrap', 'Tailwind', 'Mobile First'],
    imagePath: '/skills/css.webp',
    experience: { value: 15, className: 'hover:bg-amber-3' },
    dedication: { value: 7, className: 'hover:bg-emerald-5' },
    excerpt:
      'Okay this is a bit trivial that its listed here, but I started here with the very basics and I still love to think like that, because it is the foundation of what the browser renders at the end.',
    content: (
      <>
        <p>
          Having deep knowledge about the structure of DOM giving us the power to onPage SEO like
          king. Mobile first is standard.
        </p>
        <p className="mt-5">
          Oat cake jujubes marshmallow lollipop tart topping. Biscuit dragée cupcake bonbon
          chocolate bar
        </p>
      </>
    ),
  },
  {
    id: SKILL_KEY.DEDICATION,
    title: 'Be dedicated, be state of the art',
    tags: ['Jira', 'Trello', 'Monday', 'Slack', 'Email', 'Agile', 'Scrum', 'Kanban', 'Git'],
    imagePath: '/skills/flex.webp',
    experience: { value: 15, className: 'hover:bg-amber-3' },
    dedication: { value: 7, className: 'hover:bg-emerald-5' },
    excerpt:
      'Liquorice tiramisu fruitcake brownie candy sesame snaps. Caramels apple pie bonbon chocolate chocolate cake brownie sweet croissant pastry. Biscuit dragée halvah soufflé lollipop jujubes.',
    content: (
      <>
        <p>
          Chocolate cookie lemon drops marzipan sweet roll bear claw topping jelly-o. Liquorice
          pudding cupcake shortbread donut candy chocolate cake toffee jelly-o. Pastry sugar plum
          biscuit donut muffin. Soufflé dragée powder carrot cake wafer sesame snaps.
        </p>
        <p className="mt-5">
          Pudding candy gummies apple pie sesame snaps. Marzipan icing sweet roll cake croissant
          halvah. Pastry cake topping gummi bears jelly liquorice tart cake.
        </p>
      </>
    ),
  },
]

export default skills
