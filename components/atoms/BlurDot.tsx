import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import tw from 'tailwind-styled-components'

import { APP_CONFIG } from '#root/lib/constants'

const StyledBlurDot = tw.div`
  absolute
  h-full
  w-full
  -top-1/2
  pointer-events-none
`

interface BlurDotProps extends React.HTMLAttributes<HTMLDivElement> {
  pulse?: boolean
  pulseOutOpacity?: number
  pulseInOpacity?: number
}

const BlurDot = ({
  pulse,
  pulseOutOpacity = 0.2,
  pulseInOpacity = 0.5,
  ...props
}: BlurDotProps) => {
  const dotRef = useRef<HTMLDivElement>(null)
  const dotTimelineRef = useRef<gsap.core.Timeline | null>(null)

  // start pulse as soon as pulse prop changes
  useEffect(() => {
    const dot = dotRef.current
    const dotTimeline = dotTimelineRef.current
    if (!dot || !dotTimeline) return

    if (pulse) {
      dotTimeline.play()
    } else {
      dotTimeline.pause()
    }
  }, [pulse])

  // register dot timeline
  useEffect(() => {
    const dot = dotRef.current

    // not dot or already registered tl
    if (!dot || dotTimelineRef.current) return

    const tl = gsap.timeline({ repeat: -1, paused: true, yoyo: true })
    tl.to(dot, {
      duration: APP_CONFIG.defaultDurationSlow,
      opacity: pulseInOpacity,
      ease: 'power1.in',
    })
    tl.to(dot, {
      duration: APP_CONFIG.defaultDurationSlow,
      opacity: pulseOutOpacity,
      ease: 'power1.out',
    })

    dotTimelineRef.current = tl
  }, [pulseInOpacity, pulseOutOpacity])

  return (
    <StyledBlurDot
      {...props}
      ref={dotRef}
      style={{
        backgroundImage: `url("${APP_CONFIG.viteSiteUrl}/decorators/bg/4.svg")`,
        // backgroundRepeat: 'no-repeat',
        // backgroundSize: '100% 100%',
        ...(pulse === true ? { opacity: pulseOutOpacity } : {}), // set initial opacity to pulseInOpacity if pulse is true
        ...props.style,
      }}
    />
  )
}

export default BlurDot
