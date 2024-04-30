import { ReactNode } from 'react'

import BlurDot from '#atoms/BlurDot'
import { GlassItem } from '#atoms/GlassItem'
import H5Headline from '#atoms/H5Headline'
import Layout from '#atoms/Layout'
import Link from '#atoms/Link'
import HeadlineArea from '#molecules/HeadlineArea'

interface RuleContainerProps {
  children: ReactNode
  title: string
}

const RuleContainer = ({ children, title }: RuleContainerProps) => (
  <GlassItem className="pixi-hitbox relative p-7">
    <BlurDot className="top-full -mt-50 -left-40 w-100 h-100 opacity-20 absolute" />
    <div className="flex flex-col gap-3 z-4">
      <H5Headline>{title}</H5Headline>
      {children}
    </div>
  </GlassItem>
)

const CollaborateRules = () => (
  <Layout id="rules" $fullWidth className="relative z-4">
    <HeadlineArea
      className="mt-10 mb-20"
      headline="COC & Rules"
      subHeadline="Important things to share of beeing partners"
    />

    <Layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <RuleContainer title="Business is not full open atm">
        <p>
          I have a main job I really like and Im not free for time consuming things or full time
          projects. No Retainer or mid-term-contracts.
        </p>
        <p>
          Good news: I have a few hours a week spare to work on projects and beeing especially open
          to new technologies and challenges.
        </p>
      </RuleContainer>
      <RuleContainer title="Wordpress: No support for Page Builder Sites">
        <p>
          Sorry to say that I&apos;m not able to support or maintain sites build with Page Builders
          like Divi, Avada, Elementor, Salient or similar.
        </p>
        <p>
          Good news: We can find a new home for your content in a much simpler built custom
          wordpress. See{' '}
          <Link className="text-primary" href="#skills">
            skills 👆
          </Link>
        </p>
      </RuleContainer>
      <RuleContainer title="No Racism or any kind of intertolerance">
        <p>
          You have to be cool, kids. I&apos;m not working with people who are racist, sexist or any
          kind of intolerant with environment in the way the lead their business
        </p>
        <p> Good news: You can always change yourself.</p>
      </RuleContainer>
    </Layout>
  </Layout>
)

export default CollaborateRules
