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
        I do have a main job I really like and not available for time consuming things or full time
        projects. No Retainer or big contracts. A few hours a week spare I can offer to work on
        projects and beeing especially open to new technologies and challenges in web development.
      </>
    ),
  },
  {
    id: RULE_KEY.NO_BUILDERS,
    title: 'No Wordpress Page Builders',
    imagePath: '/decorators/ek/sceptic-moon.png',
    content: (
      <>
        While I&apos;m pretty confident in building or supporting any kind of site built with
        Wordpress Page Builders, I do not offer this service anymore. Mainly due it&apos;s
        unreliability and the &quot;blackbox&quot; we will open. We can find a new home for your
        content in a much simpler built custom wordpress. See{' '}
        <Link className="text-primary" href="#skills">
          skills 👆
        </Link>
      </>
    ),
  },
  {
    id: RULE_KEY.NO_LEGACY,
    title: 'No E-Commerce',
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
    title: 'No Racism or any kind of intolerance',
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
