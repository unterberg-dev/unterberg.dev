import { ReactNode } from 'react'

import Link from '#atoms/Link'

export enum RULE_KEY {
  SMALL = 1,
  NO_BUILDERS = 2,
  NO_LEGACY = 3,
  NO_ISM = 4,
}

export type Rule = {
  id: RULE_KEY
  title: string
  content?: ReactNode
  imagePath: string
}

const rules: Rule[] = [
  {
    id: RULE_KEY.SMALL,
    imagePath: '/decorators/ek/play-fire.png',
    title: 'Only small projects',
    content: (
      <>
        I have a main job I really like and Im not free for time consuming things or full time
        projects. No Retainer or mid-term-contracts. I have a few hours a week spare to work on
        projects and beeing especially open to new technologies and challenges.
      </>
    ),
  },
  {
    id: RULE_KEY.NO_BUILDERS,
    title: 'Wordpress: No support for Page Builder Sites',
    imagePath: '/decorators/ek/sceptic-moon.png',
    content: (
      <>
        Sorry to say that I&apos;m not able to support or maintain sites build with Page Builders
        like Divi, Avada, Elementor, Salient or similar. We can find a new home for your content in
        a much simpler built custom wordpress. See{' '}
        <Link className="text-primary" href="#skills">
          skills 👆
        </Link>
      </>
    ),
  },
  {
    id: RULE_KEY.NO_LEGACY,
    title: 'No Legacy Software',
    imagePath: '/decorators/ek/4.png',
    content: (
      <>
        Sorry to say that I&apos;m not able to support or maintain sites build with Page Builders
        like Divi, Avada, Elementor, Salient or similar.
      </>
    ),
  },
  {
    id: RULE_KEY.NO_ISM,
    title: 'No Racism or any kind of intertolerance',
    imagePath: '/decorators/ek/1.png',
    content: (
      <>
        You have to be cool, kids. I&apos;m not working with people who are racist, sexist or any
        kind of intolerant with environment in the way the lead their business
      </>
    ),
  },
]

export default rules
