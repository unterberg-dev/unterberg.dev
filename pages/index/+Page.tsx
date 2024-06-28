import { useGSAP } from '@gsap/react'
import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock'
import gsap from 'gsap'
import { useCallback, useRef, useState } from 'react'
import { Tooltip } from 'react-tooltip'

import { GlassItemButton } from '#atoms/GlassItem'
import Layout from '#atoms/Layout'
import usePageHeaderAnimations from '#gsap/usePageHeaderAnimations'
import { APP_CONFIG } from '#lib/constants'
import { externalNavigation } from '#lib/navigation'
import HideContentToggle from '#molecules/HideContentToggle'
import ShowSettingsToggle from '#molecules/ShowSettingsToggle'
import PixiSettings from '#organisms/PixiSettings'
import StaggerHeader from '#organisms/StaggerHeader'
import usePixiStageContext from '#pixi/context/usePixiStageContext'
import { handleUpdateHitboxes } from '#pixi/pointer'

const enableScroll = () => {
  clearAllBodyScrollLocks()
}

const disableScroll = () => {
  disableBodyScroll(document.querySelector('#stage') as HTMLElement)
}

const configOut: Partial<gsap.TweenVars> = {
  x: 110,
  autoAlpha: 0,
}

const configIn: Partial<gsap.TweenVars> = {
  duration: APP_CONFIG.defaultDuration,
  ease: 'sine.inOut',
  stagger: {
    from: 'start',
    amount: APP_CONFIG.defaultDuration,
    ease: 'sine.inOut',
  },
  x: 0,
  autoAlpha: 1,
}

const StartPage = () => {
  const staggerContainer = useRef<HTMLDivElement>(null)
  const [isUIHidden, setIsUIHidden] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isAnimatingSettingOpen, setIsAnimatingSettingOpen] = useState(false)
  const { pixiStage } = usePixiStageContext()

  const { onClickAnimate, GsapStaggerElement, isAnimating } = usePageHeaderAnimations({
    staggerContainer,
  })

  const gsapSettingsContainer = useRef<HTMLDivElement>(null)
  const gsapSettingsElement = useRef<HTMLDivElement>(null)
  const gsapShowSettingsTimeline = useRef<gsap.core.Timeline | null>(null)

  const { contextSafe } = useGSAP(
    () => {
      if (!pixiStage || pixiStage?.scrollWidth <= 768) return

      const tl = gsap.timeline({
        paused: true,
        onComplete: () => {
          setIsAnimatingSettingOpen(false)
          handleUpdateHitboxes()
        },
        onReverseComplete: () => {
          setIsAnimatingSettingOpen(false)
          gsap.set(gsapSettingsElement.current, {
            display: 'none',
          })
          handleUpdateHitboxes()
        },
      })
      tl.set('.gsap-range-label-container', { ...configOut })
      tl.set('.gsap-bg-pattern ', { autoAlpha: 0 })
      tl.set(gsapSettingsElement.current, {
        display: 'grid',
        autoAlpha: 1,
      })
      tl.to(
        '.gsap-range-label-container',
        {
          ...configIn,
        },
        '<',
      )
      tl.to(
        '.gsap-bg-pattern',
        {
          autoAlpha: 0.8,
          duration: APP_CONFIG.defaultDuration,
        },
        `>-${APP_CONFIG.defaultDuration / 2}`,
      )
      gsapShowSettingsTimeline.current = tl
    },
    { scope: gsapSettingsContainer, dependencies: [pixiStage] },
  )

  const handleShowSettingToggleClick = contextSafe(() => {
    const tl = gsapShowSettingsTimeline.current
    if (!tl) return

    if (isAnimatingSettingOpen) return
    setIsAnimatingSettingOpen(true)

    if (isSettingsOpen) {
      tl.progress(1)
      tl.reverse()
    } else {
      tl.progress(0)
      tl.play()
    }

    setIsSettingsOpen(prev => !prev)
  })

  const handleHideContentToggleClick = useCallback(() => {
    if (isAnimating) return

    setIsUIHidden(prev => {
      if (prev) {
        enableScroll()
      } else {
        disableScroll()
      }

      onClickAnimate(!prev)
      return !prev
    })
  }, [isAnimating, onClickAnimate])

  return (
    <>
      {pixiStage && pixiStage?.scrollWidth > 768 && (
        <div ref={gsapSettingsContainer}>
          <PixiSettings gsapRef={gsapSettingsElement} />
        </div>
      )}
      <Layout className="relative z-10">
        <div className="absolute top-0 left-0 w-full h-auto flex justify-end">
          <Tooltip
            id="hide-content-tooltip"
            style={{ backgroundColor: 'var(--color-dark)', color: 'var(--color-light)' }}
          />
          <div
            data-tooltip-id="hide-content-tooltip"
            data-tooltip-content={`${isUIHidden ? 'Show' : 'Hide'} Webpage Content`}
          >
            <HideContentToggle active={isUIHidden} onClick={handleHideContentToggleClick} />
          </div>
          {pixiStage && pixiStage?.scrollWidth > 768 && (
            <>
              <Tooltip
                id="show-settings-tooltip"
                style={{ backgroundColor: 'var(--color-dark)', color: 'var(--color-light)' }}
              />
              <div
                data-tooltip-id="show-settings-tooltip"
                data-tooltip-content={`${isSettingsOpen ? 'Hide' : 'Show'} Cursor / Particle Settings`}
              >
                <ShowSettingsToggle onClick={handleShowSettingToggleClick} />
              </div>
            </>
          )}
        </div>
      </Layout>
      <Layout
        className="flex flex-col relative max-w-xl mx-auto z-2 px-6 md:px-0 overflow-x-hidden md:overflow-inherit gsap-startpage-content"
        ref={staggerContainer}
      >
        <StaggerHeader
          GsapStaggerElement={GsapStaggerElement}
          postTitle="Web & Software Development"
          title="Hello"
          subtitle="I love to create modern websites and interfaces. Let's build something together ✌️"
        />
        <nav className="mt-10 xl:mt-16">
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
    </>
  )
}

export default StartPage
