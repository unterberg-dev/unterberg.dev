import { useGSAP } from '@gsap/react'
import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock'
import gsap from 'gsap'
import { useRef, useState } from 'react'

import { APP_CONFIG } from '#lib/constants'
import usePixiStageContext from '#pixi/context/usePixiStageContext'
import { handleUpdateHitboxes } from '#pixi/events'

const enableScroll = () => {
  clearAllBodyScrollLocks()
}

const disableScroll = () => {
  disableBodyScroll(document.querySelector('#hamburger') as HTMLElement)
}

const useHamburgerAnimations = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const hamburgerRef = useRef<HTMLDivElement>(null)
  const burgerButtonRef = useRef<HTMLButtonElement>(null)
  const layoutRef = useRef<HTMLDivElement>(null)

  const expandTimeline = useRef<gsap.core.Timeline>()
  const collapseOnMenuChangeTimeline = useRef<gsap.core.Timeline>()
  const hoverTimeline = useRef<gsap.core.Timeline>()

  const modifiedDuration = APP_CONFIG.defaultDuration * 1.5

  const { pixiStage } = usePixiStageContext()

  const { contextSafe } = useGSAP(
    () => {
      expandTimeline.current = gsap.timeline({
        paused: true,
        repeatRefresh: true,
        onRepeat: () => {
          disableScroll()
        },
        onStart: () => {
          disableScroll()
        },
        onComplete: () => {
          setIsExpanded(true)
          handleUpdateHitboxes(true)
        },
        onReverseComplete: () => {
          setIsExpanded(false)
          enableScroll()
          handleUpdateHitboxes()
        },
      })
      expandTimeline.current.set('.overlay-wrap', { display: 'block' }, '<')
      expandTimeline.current.to(
        '.overlay',
        { opacity: 1, duration: modifiedDuration, ease: 'sine.inOut' },
        '<',
      )
      expandTimeline.current.to(
        '.burger-button',
        {
          width: layoutRef.current?.scrollWidth,
          duration: modifiedDuration,
          ease: 'sine.inOut',
        },
        '<',
      )
      expandTimeline.current.to(
        '.mid',
        { width: '0%', left: '50%', duration: modifiedDuration, ease: 'sine.inOut' },
        '<',
      )
      expandTimeline.current.to(
        '.top',
        {
          rotate: '-45%',
          top: 0,
          duration: modifiedDuration,
          ease: 'sine.inOut',
        },
        '<',
      )
      expandTimeline.current.to(
        '.bot',
        {
          rotate: '45%',
          top: 0,
          duration: modifiedDuration,
          ease: 'sine.inOut',
        },
        '<',
      )
      expandTimeline.current.to(
        '.burger-nav-item',
        {
          left: 0,
          ease: 'sine.inOut',
          opacity: 1,
          display: 'block',
          stagger: {
            each: 0.1,
            from: 'start',
          },
          duration: modifiedDuration - 0.3,
        },
        '<+.3',
      )
      expandTimeline.current.set(pixiStage || document.body, { zIndex: 10 }, '>')

      collapseOnMenuChangeTimeline.current = gsap.timeline({
        paused: true,
        onComplete: () => {
          setIsExpanded(false)
          setIsHovered(false)
        },
        onStart: () => {
          enableScroll()
        },
      })
      collapseOnMenuChangeTimeline.current.to(
        '.overlay',
        {
          opacity: 0,
          duration: modifiedDuration / 2,
          ease: 'sine.inOut',
        },
        '>',
      )
      collapseOnMenuChangeTimeline.current.set(pixiStage || document.body, { zIndex: 1 }, '<')
      collapseOnMenuChangeTimeline.current.to(
        '.burger-button',
        {
          y: -40,
          opacity: 0,
          duration: modifiedDuration / 2,
          ease: 'sine.inOut',
        },
        '<',
      )
      collapseOnMenuChangeTimeline.current.set(
        '.burger-button',
        {
          width: burgerButtonRef.current?.scrollWidth,
        },
        '>',
      )
      collapseOnMenuChangeTimeline.current.set(
        '.burger-nav-item',
        {
          left: 100,
          opacity: 0,
          display: 'none',
        },
        '<',
      )
      collapseOnMenuChangeTimeline.current.set(
        '.mid',
        {
          width: '100%',
          left: '0%',
        },
        '<',
      )
      collapseOnMenuChangeTimeline.current.set(
        '.top',
        {
          rotate: '0%',
          top: -10,
          left: 0,
        },
        '<',
      )
      collapseOnMenuChangeTimeline.current.set(
        '.bot',
        {
          rotate: '0%',
          top: 10,
          left: 0,
        },
        '<',
      )
      collapseOnMenuChangeTimeline.current.set('.overlay-wrap', { display: 'none' }, '<')
      collapseOnMenuChangeTimeline.current.to(
        '.burger-button',
        {
          y: 0,
          opacity: 1,
          duration: modifiedDuration * 1.3,
          ease: 'sine.inOut',
        },
        '>',
      )

      gsap.set(['.top', '.mid', '.bot'], { scale: 0.95 })
      hoverTimeline.current = gsap.timeline({
        paused: true,
      })
      hoverTimeline.current.to(
        ['.top', '.mid', '.bot'],
        {
          backgroundColor: '#F1B650',
          scale: 1.08,
          ease: 'power1.inOut',
          duration: modifiedDuration / 3,
          stagger: {
            each: 0.1,
            from: 'end',
          },
        },
        '<',
      )
    },
    { scope: hamburgerRef, dependencies: [pixiStage] },
  )

  const handleHoverIn = contextSafe(() => {
    if (isExpanded) return
    hoverTimeline.current?.play()
    setIsHovered(true)
  })

  const handleHoverLeave = contextSafe(() => {
    if (isExpanded) return

    hoverTimeline.current?.progress(1)
    hoverTimeline.current?.reverse()
    setIsHovered(false)
  })

  const handleExpand = contextSafe(() => {
    setIsExpanded(true)
    expandTimeline.current?.progress(0)
    expandTimeline.current?.restart()
  })

  const handleCollapse = contextSafe(() => {
    setIsExpanded(true)
    handleHoverLeave()
    expandTimeline.current?.progress(1)
    expandTimeline.current?.reverse()
  })

  return {
    isExpanded,
    isHovered,
    handleExpand,
    handleCollapse,
    handleHoverIn,
    handleHoverLeave,
    hamburgerRef,
    burgerButtonRef,
    layoutRef,
    expandTimeline,
    hoverTimeline,
    collapseOnMenuChangeTimeline,
  }
}

export default useHamburgerAnimations
