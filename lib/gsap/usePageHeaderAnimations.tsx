import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { Attributes, FunctionComponent, HtmlHTMLAttributes, ReactNode, useState } from 'react'

import { APP_CONFIG } from '#lib/constants'
import { handleUpdateHitboxes } from '#pixi/events'

interface UsePageHeaderAnimationsProps {
  staggerContainer: React.RefObject<HTMLDivElement>
}

export type GsapStaggerFunctionComponent = FunctionComponent<GsapStaggerElementProps>

export interface GsapStaggerElementProps extends HtmlHTMLAttributes<HTMLDivElement> {
  children: ReactNode
  fromBottom?: boolean
  className?: string
  disable?: boolean
  props?: Attributes
}

const GsapStaggerElement = ({
  children,
  fromBottom,
  className,
  disable,
  ...props
}: GsapStaggerElementProps) => (
  <div
    className={
      !disable ? `gsap-stagger-${fromBottom ? 'bottom' : 'top'} ${className || ''}` : className
    }
    style={{ opacity: disable ? 1 : 0 }}
    {...props}
  >
    {children}
  </div>
)

const usePageHeaderAnimations = ({ staggerContainer }: UsePageHeaderAnimationsProps) => {
  const [isAnimating, setIsAnimating] = useState(false)
  const amoutDuration = APP_CONFIG.defaultDuration

  const { contextSafe } = useGSAP(
    () => {
      const container = staggerContainer.current || undefined
      const checkStaggerTopExist = container?.querySelector('.gsap-stagger-top')
      const checkStaggerBottomExist = container?.querySelector('.gsap-stagger-bottom')

      if (checkStaggerTopExist) {
        gsap.fromTo(
          '.gsap-stagger-top',
          {
            opacity: 0,
            y: -50,
          },
          {
            opacity: 1,
            y: 0,
            ease: 'power1.Out',
            stagger: {
              amount: amoutDuration,
              from: 'end',
            },
            onComplete: () => {
              handleUpdateHitboxes()
            },
          },
        )
      }

      if (checkStaggerBottomExist) {
        gsap.fromTo(
          '.gsap-stagger-bottom',
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            ease: 'power1.out',
            stagger: {
              amount: amoutDuration,
              from: 'start',
            },
            onComplete: () => {
              handleUpdateHitboxes()
            },
          },
        )
      }
    },
    { scope: staggerContainer },
  )

  const onClickAnimate = contextSafe((active: boolean) => {
    const container = staggerContainer.current || undefined
    const checkStaggerTopExist = container?.querySelector('.gsap-stagger-top')
    const checkStaggerBottomExist = container?.querySelector('.gsap-stagger-bottom')

    if (checkStaggerTopExist) {
      if (active) {
        gsap.to('.gsap-stagger-top', {
          opacity: 0,
          y: -50,
          ease: 'power1.inOut',
          stagger: {
            amount: amoutDuration,
            from: 'start',
          },
          onStart: () => {
            setIsAnimating(true)
          },
          onComplete: () => {
            // we hide this to prevent hitboxes from being triggered
            setIsAnimating(false)
            gsap.set('.gsap-stagger-top', {
              display: 'none',
            })
            handleUpdateHitboxes()
          },
        })
      } else {
        gsap.to('.gsap-stagger-top', {
          opacity: 1,
          y: 0,
          ease: 'power1.Out',
          stagger: {
            amount: amoutDuration,
            from: 'end',
          },
          onStart: () => {
            setIsAnimating(true)
            gsap.set('.gsap-stagger-top', {
              display: 'block',
            })
          },
          onComplete: () => {
            setIsAnimating(false)
            handleUpdateHitboxes()
          },
        })
      }
    }

    if (checkStaggerBottomExist) {
      if (active) {
        gsap.to('.gsap-stagger-bottom', {
          opacity: 0,
          y: 50,
          ease: 'power1.inOut',
          stagger: {
            amount: amoutDuration,
            from: 'end',
          },
          onStart: () => {
            setIsAnimating(true)
          },
          onComplete: () => {
            // we hide this to prevent hitboxes from being triggered
            setIsAnimating(false)
            gsap.set('.gsap-stagger-bottom', {
              display: 'none',
            })
            handleUpdateHitboxes()
          },
        })
      } else {
        gsap.to('.gsap-stagger-bottom', {
          opacity: 1,
          y: 0,
          ease: 'power1.Out',
          stagger: {
            amount: amoutDuration,
            from: 'start',
          },
          onStart: () => {
            setIsAnimating(true)
            gsap.set('.gsap-stagger-bottom', {
              display: 'block',
            })
          },
          onComplete: () => {
            setIsAnimating(false)
            handleUpdateHitboxes()
          },
        })
      }
    }
  })

  return { onClickAnimate, GsapStaggerElement, isAnimating }
}

export default usePageHeaderAnimations
