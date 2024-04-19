import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useCallback, useRef, useState } from 'react'

import BlurDot from '#atoms/BlurDot'
import Layout from '#atoms/Layout'
import HideContent from '#molecules/HideContent'
import { handleUpdateHitboxes } from '#pixi/events'
import StartPageMenu from '#root/pages/index/Menu'

const StartPage = () => {
  const staggerContainer = useRef<HTMLDivElement>(null)
  const [uiHidden, setUiHidden] = useState(false)
  const isAnimating = useRef(false)

  const { contextSafe } = useGSAP(
    () => {
      gsap.fromTo(
        '.gsap-stagger',
        {
          opacity: 0,
          y: -50,
        },
        {
          opacity: 1,
          delay: 0.5,
          y: 0,
          ease: 'power1.Out',
          stagger: {
            amount: 0.4,
            from: 'end',
          },
          onComplete: () => {
            handleUpdateHitboxes()
          },
        },
      )
    },
    { scope: staggerContainer },
  )

  const onClick = contextSafe((active: boolean) => {
    if (active) {
      gsap.to('.gsap-stagger', {
        opacity: 0,
        y: -50,
        ease: 'power1.inOut',
        stagger: {
          // wrap advanced options in an object
          amount: 0.1,
          from: 'start',
        },
        onStart: () => {
          isAnimating.current = true
        },
        onComplete: () => {
          // we hide this to prevent hitboxes from being triggered
          isAnimating.current = false
          gsap.set('.gsap-stagger', {
            display: 'none',
          })
          handleUpdateHitboxes()
        },
      })
    } else {
      gsap.to('.gsap-stagger', {
        opacity: 1,
        y: 0,
        ease: 'power1.Out',
        stagger: {
          // wrap advanced options in an object
          amount: 0.4,
          from: 'end',
        },
        onStart: () => {
          isAnimating.current = true
          gsap.set('.gsap-stagger', {
            display: 'block',
          })
        },
        onComplete: () => {
          isAnimating.current = false
          handleUpdateHitboxes()
        },
      })
    }
  })

  const handleClick = useCallback(() => {
    if (isAnimating.current) return

    setUiHidden(prev => {
      onClick(!prev)
      return !prev
    })
  }, [onClick])

  return (
    // todo: state for hide content
    <Layout
      className="flex flex-col relative max-w-xl mx-auto z-2 px-6 md:px-0 pt-30 md:pt-20 overflow-hidden md:overflow-inherit"
      ref={staggerContainer}
    >
      <HideContent active={uiHidden} onClick={handleClick} />
      <div className="gsap-stagger">
        <BlurDot className="left-1/2 -ml-50 md:ml-inherit md:left-20 -top-20 w-100 h-100 opacity-20 fixed md:absolute" />
      </div>
      <div className="relative z-2">
        <div className="pointer-events-none relative z-10 inline-flex flex-col mx-auto">
          <h2 className="gsap-stagger hitbox relative text-4xl md:text-7xl font-bold text-center text-light inline-block mb-4 md:mb-10">
            Hello
          </h2>
          <h2 className="gsap-stagger hitbox relative text-2xl md:text-2xl lg:text-2xl md:font-light text-center text-gray inline-block">
            I love to create modern websites and interfaces. Let&apos;s build something together ✌️
          </h2>
        </div>
        <div className="gsap-stagger">
          <StartPageMenu />
        </div>
      </div>
    </Layout>
  )
}

export default StartPage
