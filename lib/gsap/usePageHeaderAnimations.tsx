import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { Attributes, HtmlHTMLAttributes, ReactNode } from 'react'

import { handleUpdateHitboxes } from '#pixi/events'

interface UsePageHeaderAnimationsProps {
  staggerContainer: React.RefObject<HTMLDivElement>
  isAnimating: React.MutableRefObject<boolean>
}

interface GsapStaggerElementProps extends HtmlHTMLAttributes<HTMLDivElement> {
  children: ReactNode
  fromBottom?: boolean
  className?: string
  props?: Attributes
}

const GsapStaggerElement = ({
  children,
  fromBottom,
  className,
  ...props
}: GsapStaggerElementProps) => (
  <div
    className={`gsap-stagger-${fromBottom ? 'bottom' : 'top'} ${className || ''}`}
    style={{ opacity: 0 }}
    {...props}
  >
    {children}
  </div>
)

const usePageHeaderAnimations = ({
  isAnimating,
  staggerContainer,
}: UsePageHeaderAnimationsProps) => {
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
              amount: 0.4,
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
            ease: 'power1.Out',
            stagger: {
              amount: 0.4,
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
    if (active) {
      gsap.to('.gsap-stagger-top', {
        opacity: 0,
        y: -50,
        ease: 'power1.inOut',
        stagger: {
          amount: 0.1,
          from: 'start',
        },
        onStart: () => {
          isAnimating.current = true
        },
        onComplete: () => {
          // we hide this to prevent hitboxes from being triggered
          isAnimating.current = false
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
          amount: 0.4,
          from: 'end',
        },
        onStart: () => {
          isAnimating.current = true
          gsap.set('.gsap-stagger-top', {
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

  return { onClickAnimate, GsapStaggerElement }
}

export default usePageHeaderAnimations
