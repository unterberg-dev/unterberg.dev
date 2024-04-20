import { useCallback, useRef, useState } from 'react'

import BlurDot from '#atoms/BlurDot'
import Layout from '#atoms/Layout'
import usePageHeaderAnimations from '#gsap/usePageHeaderAnimations'
import HideContent from '#molecules/HideContent'
import StartPageMenu from '#root/pages/index/Menu'

const StartPage = () => {
  const staggerContainer = useRef<HTMLDivElement>(null)
  const [uiHidden, setUiHidden] = useState(false)
  const isAnimating = useRef(false)

  const { onClickAnimate, GsapStaggerElement } = usePageHeaderAnimations({
    isAnimating,
    staggerContainer,
  })

  const handleClick = useCallback(() => {
    if (isAnimating.current) return

    setUiHidden(prev => {
      onClickAnimate(!prev)
      return !prev
    })
  }, [onClickAnimate])

  return (
    <Layout
      className="flex flex-col relative max-w-xl mx-auto z-2 px-6 md:px-0 pt-20 md:pt-10 overflow-x-hidden md:overflow-inherit"
      ref={staggerContainer}
    >
      <HideContent active={uiHidden} onClick={handleClick} />
      <GsapStaggerElement>
        <BlurDot className="left-1/2 -ml-50 md:ml-inherit md:left-20 -top-20 w-100 h-100 opacity-30 fixed md:absolute" />
      </GsapStaggerElement>
      <div>
        <header className="pixi-hitbox pointer-events-none relative z-10 flex flex-col mx-auto items-center">
          <GsapStaggerElement>
            <h1 className="text-grayDark font-mono mb-8 text-center text-sm">
              Web & Software Development
            </h1>
          </GsapStaggerElement>
          <GsapStaggerElement>
            <h2 className="mx-auto relative text-4xl md:text-7xl font-bold text-center text-light mb-4 md:mb-10">
              Hello
            </h2>
          </GsapStaggerElement>
          <GsapStaggerElement>
            <h2 className="relative text-2xl md:text-2xl lg:text-2xl md:font-light text-center text-gray inline-block">
              I love to create modern websites and interfaces. Let&apos;s build something together
              ✌️
            </h2>
          </GsapStaggerElement>
        </header>
        <GsapStaggerElement className="mt-10 md:mt-10 xl:mt-24">
          <StartPageMenu />
        </GsapStaggerElement>
      </div>
    </Layout>
  )
}

export default StartPage
