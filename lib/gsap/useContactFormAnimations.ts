import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

const useContactModuleAnimations = () => {
  const gsapContactModuleRef = useRef<HTMLDivElement>(null)
  const { contextSafe } = useGSAP(() => {}, { scope: gsapContactModuleRef })

  const onSuccessAnimationHandler = contextSafe(() => {
    gsap.to(gsapContactModuleRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        if (gsapContactModuleRef.current) {
          gsap.to(gsapContactModuleRef.current, {
            autoAlpha: 0,
            duration: 0.5,
          })
        }
      },
    })
  })

  return { gsapContactModuleRef, onSuccessAnimationHandler }
}

export default useContactModuleAnimations
