import { useCallback, useRef, useState } from 'react'

import { GlassItemButton } from '#atoms/GlassItem'
import Layout from '#atoms/Layout'
import usePageHeaderAnimations from '#gsap/usePageHeaderAnimations'
import { externalNavigation } from '#lib/navigation'
import HideContent from '#molecules/HideContent'
import StaggerHeader from '#organisms/StaggerHeader'

const StartPage = () => {
  const staggerContainer = useRef<HTMLDivElement>(null)
  const [uiHidden, setUiHidden] = useState(false)

  const { onClickAnimate, GsapStaggerElement, isAnimating } = usePageHeaderAnimations({
    staggerContainer,
  })

  const handleClick = useCallback(() => {
    if (isAnimating) return

    setUiHidden(prev => {
      onClickAnimate(!prev)
      return !prev
    })
  }, [isAnimating, onClickAnimate])

  return (
    <Layout
      className="flex flex-col relative max-w-xl mx-auto z-2 px-6 md:px-0 overflow-x-hidden md:overflow-inherit"
      ref={staggerContainer}
    >
      <HideContent active={uiHidden} onClick={handleClick} />
      <StaggerHeader
        GsapStaggerElement={GsapStaggerElement}
        postTitle="Web & Software Development"
        title="Hello"
        subtitle="I love to create modern websites and interfaces. Let's build something together ✌️"
      />
      <nav className="mt-10 md:mt-10 xl:mt-24">
        <div className="pixi-hitbox relative w-full z-10 flex mx-auto gap-3 lg:gap-6">
          {Object.values(externalNavigation)
            .filter(item => item.path !== '')
            .map(item => (
              <GsapStaggerElement key={item.name} fromBottom className="flex-1">
                <GlassItemButton icon={item.icon} href={item.path} label={item.name} />
              </GsapStaggerElement>
            ))}
        </div>
      </nav>
    </Layout>
  )
}

export default StartPage
