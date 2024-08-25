import { useMemo, useRef } from 'react'

import Layout from '#atoms/Layout'
import usePageHeaderAnimations from '#gsap/usePageHeaderAnimations'
import BelowHeroGlassArea from '#molecules/BelowHeroGlassArea'
import HeadlineArea from '#molecules/HeadlineArea'
import ContactModule from '#organisms/ContactModule'
import StaggerHeader from '#organisms/StaggerHeader'
import Case from '#pages/_dev/showcase/Case'
import cases, { CASE_KEY } from '#pages/_dev/showcase/cases'
import MapThemeArea from '#pages/_dev/showcase/layouts/MapThemeArea'

const ShowcasePage = () => {
  const staggerContainer = useRef<HTMLDivElement>(null)

  const { GsapStaggerElement } = usePageHeaderAnimations({
    staggerContainer,
  })

  const spotlightCase = useMemo(() => cases.find(item => !!item.spotlight), [])
  const mappingCases = useMemo(
    () => cases.filter(item => item.id === CASE_KEY.GITHUB_MAP_STARTER),
    [],
  )
  const clientCases = useMemo(() => cases.filter(item => item.id === CASE_KEY.CLIENT_PROJECT), [])
  const filteredCases = useMemo(
    () =>
      cases
        .filter(item => !item.spotlight)
        .filter(item => item.id !== CASE_KEY.GITHUB_MAP_STARTER)
        .filter(item => item.id !== CASE_KEY.CLIENT_PROJECT),
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
            <Case caseItem={spotlightCase} />
          </Layout>
        )}
      </BelowHeroGlassArea>
      <GsapStaggerElement fromBottom className="relative z-10">
        <Layout $fullWidth className="pixi-hitbox bg-dark relative">
          <HeadlineArea headline="Client Projects" subHeadline="Stuff I have done for money *" />
          <Layout className="mt-20 flex flex-col gap-20">
            {clientCases.map((item, index) => (
              <Case key={item.title} caseItem={item} switchLayout={index % 2 === 0} />
            ))}
            <p className="border-t-2 border-t-darkLightBorder pt-4 text-right text-gray">
              <sup>*</sup> I am not responsible for content on the linked pages above
            </p>
          </Layout>
        </Layout>
      </GsapStaggerElement>
      <MapThemeArea>
        <HeadlineArea headline="JS Mapping Projects" subHeadline="Hello Open Source" />
        <Layout className="mt-20 flex gap-5 md:gap-10">
          {mappingCases.map(item => (
            <Case key={item.title} caseItem={item} colDisplay />
          ))}
        </Layout>
      </MapThemeArea>
      <Layout $fullWidth className="pixi-hitbox bg-dark relative z-10">
        <Layout className="relative flex flex-col gap-3 md:gap-5 lg:gap-10">
          {filteredCases.map((item, index) => (
            <Case key={item.title} caseItem={item} switchLayout={index % 2 === 0} />
          ))}
        </Layout>
      </Layout>
      <Layout
        $fullWidth
        className="pixi-hitbox bg-gradient-to-b via-10% from-dark relative h-50 z-10"
      />
      <ContactModule />
    </div>
  )
}

export default ShowcasePage
