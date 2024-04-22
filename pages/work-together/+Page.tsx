import { useRef } from 'react'

import Layout from '#atoms/Layout'
import usePageHeaderAnimations from '#gsap/usePageHeaderAnimations'
import StaggerHeader from '#organisms/StaggerHeader'
import CollaborateHero from '#pages/work-together/Hero'
import CollaborateRules from '#pages/work-together/Rules'
import Skills from '#pages/work-together/Skills'

const ShowcasePage = () => {
  const staggerContainer = useRef<HTMLDivElement>(null)

  const { GsapStaggerElement } = usePageHeaderAnimations({
    staggerContainer,
  })

  return (
    <div ref={staggerContainer}>
      <StaggerHeader
        GsapStaggerElement={GsapStaggerElement}
        title="Collaborate"
        postTitle="Wanna work together?"
        subtitle="Over 14 years experience in web design, programming and digital product development. Quite a journey"
      />
      <CollaborateHero GsapStaggerElement={GsapStaggerElement} />
      <div className="relative z-4 pixi-hitbox">
        <Skills GsapStaggerElement={GsapStaggerElement} />
      </div>
      <Layout
        $fullWidth
        className="pixi-hitbox bg-gradient-to-b via-10% from-dark relative h-20 z-3"
      />
      <CollaborateRules />
    </div>
  )
}

export default ShowcasePage
