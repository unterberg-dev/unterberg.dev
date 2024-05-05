import { ReactNode } from 'react'

import Layout from '#atoms/Layout'
import { GsapStaggerFunctionComponent } from '#gsap/usePageHeaderAnimations'

interface BelowHeroGlassAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  GsapStaggerElement: GsapStaggerFunctionComponent
  children?: ReactNode
  marginTopTwClass?: string
}

const BelowHeroGlassArea = ({
  GsapStaggerElement,
  children,
  marginTopTwClass = 'mt-50',
}: BelowHeroGlassAreaProps) => (
  <GsapStaggerElement fromBottom className={`relative z-5 ${marginTopTwClass || ''}`}>
    <Layout
      $fullWidth
      className="pixi-hitbox relative pb-20 border-t-1 border-t-darkLightBorder bg-darkLight bg-opacity-50 z-10"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-dark opacity-100 h-40" />
      <div className="absolute inset-0 top-40 bg-gradient-to-t bg-dark" />
      {children}
    </Layout>
  </GsapStaggerElement>
)

export default BelowHeroGlassArea
