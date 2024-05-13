import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

import { APP_CONFIG } from '#lib/constants'
import { Skill, SKILL_KEY } from '#pages/work-together/skillsMap'

interface UseSkillboxAnimationsProps {
  skill: Skill
  isAnimating: boolean
  isHovered: boolean
  isExpanded: boolean
  setTileHovered: (tileHovered: SKILL_KEY | false) => void
  setTileExpanded: (tileExpanded: SKILL_KEY | false) => void
  setIsAnimating: (isAnimating: boolean) => void
}

const useSkillboxAnimations = ({
  isExpanded,
  isHovered,
  isAnimating,
  setIsAnimating,
  setTileExpanded,
  setTileHovered,
  skill,
}: UseSkillboxAnimationsProps) => {
  const skillboxGsapWrapRef = useRef<HTMLDivElement>(null)
  const skillboxGsapRef = useRef<HTMLDivElement>(null)
  const skillboxContentRef = useRef<HTMLDivElement>(null)
  const skillboxOuterContentRef = useRef<HTMLDivElement>(null)
  const skillboxExcerptGradientRef = useRef<HTMLDivElement>(null)
  const skillboxImageRef = useRef<HTMLImageElement>(null)

  const skillboxOuterContentHeightRef = useRef<number>(0)
  const skillboxContentRefHeightRef = useRef<number>(0)
  const skillboxGsapHeightRef = useRef<number>(0)

  const inDuration = APP_CONFIG.defaultDuration
  const inEase = 'power1.out'

  const { contextSafe } = useGSAP(
    () => {
      skillboxOuterContentHeightRef.current = skillboxOuterContentRef.current?.clientHeight || 0
      skillboxContentRefHeightRef.current = skillboxContentRef.current?.clientHeight || 0
      skillboxGsapHeightRef.current = skillboxGsapRef.current?.clientHeight || 0

      gsap.set(skillboxGsapWrapRef.current, {
        height: skillboxGsapHeightRef.current,
      })

      gsap.set(skillboxGsapRef.current, {
        position: 'absolute',
        height: '100%',
      })
    },
    { scope: skillboxGsapRef },
  )

  const handleHoverIn = contextSafe(() => {
    if (!isHovered) {
      gsap.to(skillboxOuterContentRef.current, {
        height: skillboxOuterContentHeightRef.current + 30,
        duration: inDuration,
        ease: inEase,
      })
      gsap.to(skillboxGsapRef.current, {
        height: skillboxGsapHeightRef.current + 30,
        duration: inDuration,
        ease: inEase,
      })
      gsap.to(skillboxImageRef.current, {
        y: 10,
        duration: inDuration,
        ease: inEase,
      })
      setTileHovered(skill.id)
    }
  })

  const handleHoverOut = contextSafe(() => {
    if (isHovered) {
      gsap.to(skillboxGsapRef.current, {
        height: skillboxGsapHeightRef.current,
        y: 0,
        duration: inDuration,
        ease: inEase,
      })
      gsap.to(skillboxOuterContentRef.current, {
        height: skillboxOuterContentHeightRef.current,
        duration: inDuration,
        ease: inEase,
      })
      gsap.to(skillboxExcerptGradientRef.current, {
        opacity: 1,
        duration: inDuration,
        ease: inEase,
        onComplete: () => {
          gsap.set(skillboxGsapWrapRef.current, {
            zIndex: 10,
          })
          setIsAnimating(false)
        },
      })
      gsap.to(skillboxImageRef.current, {
        y: 0,
        duration: inDuration,
        ease: inEase,
      })
      setTileExpanded(false)
      setTileHovered(false)
    }
  })

  const handleExpand = contextSafe(() => {
    if (isAnimating) return
    setIsAnimating(true)

    // expand action
    if (!isExpanded) {
      setTileExpanded(skill.id)

      gsap.set(skillboxGsapWrapRef.current, {
        zIndex: 100,
      })
      gsap.to(skillboxGsapRef.current, {
        height: skillboxGsapHeightRef.current + skillboxContentRefHeightRef.current,
        y: -20,
        duration: inDuration,
        ease: inEase,
      })
      gsap.to(skillboxOuterContentRef.current, {
        height: skillboxContentRefHeightRef.current,
        duration: inDuration,
        ease: inEase,
      })
      gsap.to(skillboxImageRef.current, {
        y: 40,
        duration: inDuration,
        ease: inEase,
      })
      gsap.to(skillboxExcerptGradientRef.current, {
        opacity: 0,
        duration: inDuration,
        ease: inEase,
        onComplete: () => {
          setIsAnimating(false)
        },
      })
    } else {
      if (isAnimating) return
      setIsAnimating(true)
      setTileExpanded(false)

      gsap.to(skillboxGsapRef.current, {
        y: 0,
        height: isHovered ? skillboxGsapHeightRef.current + 30 : skillboxGsapHeightRef.current,
        duration: inDuration,
        ease: inEase,
      })
      gsap.to(skillboxOuterContentRef.current, {
        duration: inDuration,
        ease: inEase,
        height: isHovered
          ? skillboxOuterContentHeightRef.current + 30
          : skillboxGsapHeightRef.current,
      })
      gsap.to(skillboxImageRef.current, {
        y: isHovered ? 10 : 0,
        duration: inDuration,
        ease: inEase,
      })
      gsap.to(skillboxExcerptGradientRef.current, {
        opacity: 1,
        duration: inDuration,
        ease: inEase,
        onComplete: () => {
          gsap.set(skillboxGsapWrapRef.current, {
            zIndex: 10,
          })
          setIsAnimating(false)
          setTileExpanded(false)
        },
      })
    }
  })

  return {
    skillboxGsapWrapRef,
    skillboxGsapRef,
    skillboxContentRef,
    skillboxOuterContentRef,
    skillboxExcerptGradientRef,
    skillboxImageRef,
    handleHoverIn,
    handleHoverOut,
    handleExpand,
  }
}

export default useSkillboxAnimations
