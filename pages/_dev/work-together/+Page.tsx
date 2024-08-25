import { useRef } from 'react'

import usePageHeaderAnimations from '#gsap/usePageHeaderAnimations'
import StaggerHeader from '#organisms/StaggerHeader'
import CollaborateHero from '#pages/_dev/work-together/Hero'
import CollaborateRules from '#pages/_dev/work-together/Rules/index'
import Skills from '#pages/_dev/work-together/Skills'

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
      <Skills GsapStaggerElement={GsapStaggerElement} />
      <CollaborateRules />
    </div>
  )
}

export default ShowcasePage
