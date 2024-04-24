import { useRef } from 'react'

import Layout from '#atoms/Layout'
import usePageHeaderAnimations from '#gsap/usePageHeaderAnimations'
import BelowHeroGlassArea from '#molecules/BelowHeroGlassArea'
import StaggerHeader from '#organisms/StaggerHeader'

const ShowcasePage = () => {
  const staggerContainer = useRef<HTMLDivElement>(null)

  const { GsapStaggerElement } = usePageHeaderAnimations({
    staggerContainer,
  })

  return (
    <div ref={staggerContainer}>
      <StaggerHeader
        GsapStaggerElement={GsapStaggerElement}
        postTitle="Projects, Cases & Contributions"
        title="Showcase"
        subtitle="Omg after 12 I finally got this website up and running. Let's see what I can do with it. 🚀"
      />
      <BelowHeroGlassArea GsapStaggerElement={GsapStaggerElement}>
        <Layout>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 items-start">
            sfmdsöflökjd ljfd lgkfjdöglfd jfldj
          </div>
        </Layout>
      </BelowHeroGlassArea>
      <Layout $fullWidth className="pixi-hitbox bg-dark relative h-50 z-10" />
      <Layout
        $fullWidth
        className="pixi-hitbox bg-gradient-to-b via-10% from-dark relative h-50 z-10"
      />
    </div>
  )
}

export default ShowcasePage
