import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'

import { APP_CONFIG } from '#lib/constants'

const useHamburgerAnimations = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const hamburgerRef = useRef<HTMLDivElement>(null)
  const burgerButtonRef = useRef<HTMLButtonElement>(null)
  const layoutRef = useRef<HTMLDivElement>(null)

  const expandTimeline = useRef<gsap.core.Timeline>()
  const collapseOnMenuChangeTimeline = useRef<gsap.core.Timeline>()
  const hoverTimeline = useRef<gsap.core.Timeline>()

  const { contextSafe } = useGSAP(
    () => {
      expandTimeline.current = gsap.timeline({
        paused: true,
        onComplete: () => {
          setIsExpanded(true)
        },
        onReverseComplete: () => {
          setIsExpanded(false)
        },
      })
      expandTimeline.current.set('.overlay-wrap', { display: 'block' }, '<')
      expandTimeline.current.to(
        '.overlay',
        { opacity: 1, duration: APP_CONFIG.defaultDuration, ease: 'sine.inOut' },
        '<',
      )
      expandTimeline.current.to(
        '.burger-button',
        {
          width: layoutRef.current?.scrollWidth,
          duration: APP_CONFIG.defaultDuration,
          ease: 'sine.inOut',
        },
        '<',
      )
      expandTimeline.current.to(
        '.mid',
        { width: '0%', left: '50%', duration: APP_CONFIG.defaultDuration, ease: 'sine.inOut' },
        '<',
      )
      expandTimeline.current.to(
        '.top',
        {
          rotate: '-45%',
          top: 0,
          duration: APP_CONFIG.defaultDuration,
          ease: 'sine.inOut',
        },
        '<',
      )
      expandTimeline.current.to(
        '.bot',
        {
          rotate: '45%',
          top: 0,
          duration: APP_CONFIG.defaultDuration,
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
          duration: APP_CONFIG.defaultDuration - 0.3,
        },
        '<+.3',
      )
      expandTimeline.current.to(
        '.overlay-article-stagger',
        {
          ease: 'sine.inOut',
          opacity: 1,
          y: 0,
          stagger: {
            each: 0.1,
            from: 'end',
          },
          duration: APP_CONFIG.defaultDuration - 0.3,
        },
        '<',
      )

      collapseOnMenuChangeTimeline.current = gsap.timeline({
        paused: true,
        onComplete: () => {
          setIsExpanded(false)
        },
      })
      collapseOnMenuChangeTimeline.current.to(
        '.overlay',
        {
          opacity: 0,
          duration: APP_CONFIG.defaultDuration / 2,
          ease: 'sine.inOut',
        },
        '<',
      )
      collapseOnMenuChangeTimeline.current.to(
        '.burger-button',
        {
          y: -40,
          opacity: 0,
          duration: APP_CONFIG.defaultDuration / 2,
          ease: 'sine.inOut',
        },
        '<',
      )
      collapseOnMenuChangeTimeline.current.to(
        '.overlay-article-stagger',
        {
          ease: 'sine.inOut',
          opacity: 0,
          y: 0,
          stagger: {
            each: 0.1,
            from: 'end',
          },
          duration: APP_CONFIG.defaultDuration / 2,
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
          duration: APP_CONFIG.defaultDuration / 2,
          ease: 'sine.inOut',
        },
        '<',
      )
      collapseOnMenuChangeTimeline.current.set(
        '.top',
        {
          rotate: '0%',
          top: -10,
          left: 0,
          duration: APP_CONFIG.defaultDuration / 2,
          ease: 'sine.inOut',
        },
        '<',
      )
      collapseOnMenuChangeTimeline.current.set(
        '.bot',
        {
          rotate: '0%',
          top: 10,
          left: 0,
          duration: APP_CONFIG.defaultDuration / 2,
          ease: 'sine.inOut',
        },
        '<',
      )
      collapseOnMenuChangeTimeline.current.set('.overlay-wrap', { display: 'none' }, '<')
      collapseOnMenuChangeTimeline.current.to(
        '.burger-button',
        {
          y: 0,
          opacity: 1,
          duration: APP_CONFIG.defaultDuration * 1.3,
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
          duration: APP_CONFIG.defaultDuration / 3,
          stagger: {
            each: 0.1,
            from: 'end',
          },
        },
        '<',
      )
    },
    { scope: hamburgerRef },
  )

  const handleHoverIn = contextSafe(() => {
    if (isExpanded) return
    hoverTimeline.current?.restart()
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
