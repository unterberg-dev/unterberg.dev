import { useMemo, useRef } from 'react'

import Layout from '#atoms/Layout'
import usePageHeaderAnimations from '#gsap/usePageHeaderAnimations'
import BelowHeroGlassArea from '#molecules/BelowHeroGlassArea'
import HeadlineArea from '#molecules/HeadlineArea'
import StaggerHeader from '#organisms/StaggerHeader'
import Case from '#pages/showcase/Case'
import cases from '#pages/showcase/cases'
import MapThemeArea from '#pages/showcase/MapThemeArea'
import { PROJECT_TYPE_KEY } from '#pages/showcase/projectTypes'

const ShowcasePage = () => {
  const staggerContainer = useRef<HTMLDivElement>(null)
  const gsapStaggerCount = 2

  const { GsapStaggerElement } = usePageHeaderAnimations({
    staggerContainer,
  })

  const spotlightCase = useMemo(() => cases.find(item => !!item.spotlight), [])
  const mappingCases = useMemo(
    () => cases.filter(item => item.projectType === PROJECT_TYPE_KEY.GITHUB_MAP_STARTER),
    [],
  )
  const clientCases = useMemo(
    () => cases.filter(item => item.projectType === PROJECT_TYPE_KEY.CLIENT_PROJECT),
    [],
  )
  const filteredCases = useMemo(
    () =>
      cases
        .filter(item => !item.spotlight)
        .filter(item => !item.draft)
        .filter(item => item.projectType !== PROJECT_TYPE_KEY.GITHUB_MAP_STARTER),
    [],
  )

  return (
    <div ref={staggerContainer}>
      <StaggerHeader
        GsapStaggerElement={GsapStaggerElement}
        postTitle="Projects, Cases & Contributions"
        title="Showcase"
        subtitle="Cherry picking projects I'd done for open source needs or private clients and between."
      />
      <BelowHeroGlassArea marginTopTwClass="mt-80" GsapStaggerElement={GsapStaggerElement}>
        {spotlightCase && (
          <Layout className="pixi-hitbox relative z-10 -mt-40">
            <Case caseItem={spotlightCase} GsapStaggerElement={GsapStaggerElement} stagger />
          </Layout>
        )}
      </BelowHeroGlassArea>
      <Layout $fullWidth className="pixi-hitbox bg-dark relative z-10">
        <GsapStaggerElement fromBottom>
          <HeadlineArea headline="Client Projects" subHeadline="Stuff I have done for money" />
        </GsapStaggerElement>
        <Layout>
          {clientCases.map((item, index) => (
            <Case
              key={item.title}
              caseItem={item}
              GsapStaggerElement={GsapStaggerElement}
              stagger={index < gsapStaggerCount}
              switchLayout={index % 2 === 0}
            />
          ))}
        </Layout>
      </Layout>
      <MapThemeArea>
        <HeadlineArea headline="JS Mapping Projects" subHeadline="Hello Open Source" />
        <Layout className="flex gap-5 md:gap-10">
          {mappingCases.map(item => (
            <Case
              key={item.title}
              caseItem={item}
              GsapStaggerElement={GsapStaggerElement}
              colDisplay
            />
          ))}
        </Layout>
      </MapThemeArea>
      <Layout $fullWidth className="pixi-hitbox bg-dark relative z-10">
        <Layout className="relative flex flex-col gap-3 md:gap-5 lg:gap-10">
          {filteredCases.map((item, index) => (
            <Case
              GsapStaggerElement={GsapStaggerElement}
              key={item.title}
              caseItem={item}
              switchLayout={index % 2 === 0}
            />
          ))}
        </Layout>
      </Layout>
      <Layout
        $fullWidth
        className="pixi-hitbox bg-gradient-to-b via-10% from-dark relative h-50 z-10"
      />
    </div>
  )
}

export default ShowcasePage
