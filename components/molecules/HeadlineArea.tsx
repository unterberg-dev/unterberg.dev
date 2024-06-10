import { HTMLAttributes } from 'react'

import H2Headline from '#atoms/H2Headline'
import H3Headline from '#atoms/H3Headline'
import Layout from '#atoms/Layout'

interface HeadlineAreaProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  headline: string
  subHeadline: string
}

const HeadlineArea = ({ className, headline, subHeadline, ...props }: HeadlineAreaProps) => (
  <Layout className={`flex flex-col gap-3 pt-24 mb-24 items-center ${className || ''}`} {...props}>
    <H2Headline className="pixi-hitbox inline-block self-start mx-auto text-center">
      {headline}
    </H2Headline>
    <H3Headline className="pixi-hitbox inline-block w-3/4 md:w-auto mx-auto self-start text-center">
      {subHeadline}
    </H3Headline>
  </Layout>
)

export default HeadlineArea
