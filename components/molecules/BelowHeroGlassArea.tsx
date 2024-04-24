import { ReactNode } from 'react'

import Layout from '#atoms/Layout'
import { GsapStaggerFunctionComponent } from '#lib/types'

interface BelowHeroGlassAreaProps {
  GsapStaggerElement: GsapStaggerFunctionComponent
  children?: ReactNode
}

const BelowHeroGlassArea = ({ GsapStaggerElement, children }: BelowHeroGlassAreaProps) => (
  <GsapStaggerElement fromBottom className="relative z-5 mt-60">
    <Layout
      $fullWidth
      className="pixi-hitbox relative pb-20 border-t-1 border-t-darkLightBorder bg-darkLightBorder bg-opacity-30 z-10"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-dark opacity-100" />
      {children}
    </Layout>
  </GsapStaggerElement>
)

export default BelowHeroGlassArea
