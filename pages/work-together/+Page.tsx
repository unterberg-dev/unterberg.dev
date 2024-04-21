import { useRef } from 'react'

import Layout from '#atoms/Layout'
import usePageHeaderAnimations from '#gsap/usePageHeaderAnimations'
import StaggerHeader from '#organisms/StaggerHeader'
import CollaborateHero from '#pages/work-together/Hero'
import SkillArea from '#pages/work-together/SkillArea'

const ShowcasePage = () => {
  const staggerContainer = useRef<HTMLDivElement>(null)
  const isAnimating = useRef(false)

  const { GsapStaggerElement } = usePageHeaderAnimations({
    isAnimating,
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
      <SkillArea GsapStaggerElement={GsapStaggerElement} />
      <Layout
        $fullWidth
        className="pixi-hitbox bg-gradient-to-b via-10% from-dark relative h-150 z-10"
      />
    </div>
  )
}

export default ShowcasePage
