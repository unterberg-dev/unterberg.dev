import { useRef } from 'react'

import Layout from '#atoms/Layout'
import usePageHeaderAnimations from '#gsap/usePageHeaderAnimations'
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
      <GsapStaggerElement fromBottom className="relative z-5 mt-80">
        <Layout
          $fullWidth
          className="pixi-hitbox relative pb-20 border-t-1 border-t-darkLightBorder bg-darkLightBorder bg-opacity-20 z-10"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-dark opacity-100" />
          <Layout>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 items-start">
              sfmdsöflökjd ljfd lgkfjdöglfd jfldj
            </div>
          </Layout>
        </Layout>
      </GsapStaggerElement>
      <Layout $fullWidth className="pixi-hitbox bg-dark relative h-50 z-10" />
      <Layout
        $fullWidth
        className="pixi-hitbox bg-gradient-to-b via-10% from-dark relative h-50 z-10"
      />
    </div>
  )
}

export default ShowcasePage
