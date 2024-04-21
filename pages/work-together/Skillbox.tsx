import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ChevronDown } from 'lucide-react'
import { HTMLAttributes, useRef, useState } from 'react'
import tw from 'tailwind-styled-components'

import BlurDot from '#atoms/BlurDot'
import { APP_CONFIG } from '#lib/constants'

export const TechBubbleListItem = tw.li`
  bg-darkLight
  border-1
  border-darkLightBorder
  rounded-lg
  inline-block
  px-2
  py-1
  text-xs
  text-nowrap
`

export const TagBubble = tw.div`
  bg-darkLightBorder
  text-gray
  hover:text-black
  rounded-lg
  inline-block
  transition-colors
  duration-500
  px-2
  py-1
  text-xs
`

type SkillboxTagBubbleContent = {
  value: number
  className: string
}

interface SkillboxProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  switchLayout?: boolean
  tags: string[]
  children?: React.ReactNode
  title: string
  excerpt: string
  experience?: SkillboxTagBubbleContent
  dedication?: SkillboxTagBubbleContent
  isSomeTileHovered: boolean
  imagePath: string
  setIsSomeTileHovered: (isSomeTileHovered: boolean) => void
}

const Skillbox = ({
  className,
  switchLayout,
  tags,
  children,
  title,
  experience,
  dedication,
  excerpt,
  imagePath,
  isSomeTileHovered,
  setIsSomeTileHovered,
  ...props
}: SkillboxProps) => {
  const skillboxGsapWrapRef = useRef<HTMLDivElement>(null)
  const skillboxGsapRef = useRef<HTMLDivElement>(null)
  const skillboxContentRef = useRef<HTMLDivElement>(null)
  const skillboxOuterContentRef = useRef<HTMLDivElement>(null)
  const skillboxExcerptGradientRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

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
        height: skillboxOuterContentHeightRef.current + 50,
        duration: inDuration,
        ease: inEase,
      })
      gsap.to(skillboxGsapRef.current, {
        height: skillboxGsapHeightRef.current + 50,
        duration: inDuration,
        ease: inEase,
      })
      setIsHovered(true)
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
            zIndex: 'auto',
          })
        },
      })
      setIsHovered(false)
      setIsExpanded(false)
      setIsSomeTileHovered(false)
    }
  })

  const handleExpand = contextSafe(() => {
    if (!isExpanded) {
      setIsSomeTileHovered(true)
      gsap.set(skillboxGsapWrapRef.current, {
        zIndex: 200,
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
      gsap.to(skillboxExcerptGradientRef.current, {
        opacity: 0,
        duration: inDuration,
        ease: inEase,
      })
    } else {
      setIsSomeTileHovered(false)
      gsap.to(skillboxGsapRef.current, {
        y: 0,
        height: isHovered ? skillboxGsapHeightRef.current + 50 : skillboxGsapHeightRef.current,
        duration: inDuration,
        ease: inEase,
      })
      gsap.to(skillboxOuterContentRef.current, {
        duration: inDuration,
        ease: inEase,
        height: isHovered
          ? skillboxOuterContentHeightRef.current + 50
          : skillboxGsapHeightRef.current,
      })
      gsap.to(skillboxExcerptGradientRef.current, {
        opacity: 1,
        duration: inDuration,
        ease: inEase,
        onComplete: () => {
          gsap.set(skillboxGsapWrapRef.current, {
            zIndex: 'auto',
          })
        },
      })
    }
    setIsExpanded(!isExpanded)
  })

  return (
    <div
      className={`cursor-pointer mt-26 relative transition-opacity duration-500 ${isSomeTileHovered && !isExpanded ? 'opacity-10 blur-sm' : ''}`}
      ref={skillboxGsapWrapRef}
    >
      <div
        ref={skillboxGsapRef}
        onMouseEnter={handleHoverIn}
        onMouseLeave={handleHoverOut}
        onClick={handleExpand}
      >
        <div className="bg-dark position-absolute -inset-8" />
        <div
          className={`relative h-full z-10 grid bg-dark grid-cols-12 gap-5 md:gap-5 ${className || ''}`}
          {...props}
        >
          <div className="absolute -left-5 -right-5 h-8 z-5 -bottom-15 bg-gradient-to-b from-dark opacity-100 pointer-events-none" />
          <div
            className={`relative z-10 flex flex-col z-10 col-span-12 md:col-span-8 ${switchLayout ? 'order-2' : 'order-2 md:order-1'}`}
          >
            <div className="flex gap-2">
              {experience && (
                <TagBubble className={`${experience.className}`}>
                  Experience: {experience.value} yrs
                </TagBubble>
              )}
              {dedication && (
                <TagBubble className={`${dedication.className}`}>
                  Dedication: {dedication.value}/10
                </TagBubble>
              )}
            </div>
            <h2 className="text-3xl mt-5 w-3/4 sm:5/6 md:w-full">{title}</h2>
            <div className="relative flex-1  text-lg">
              <h2 className="text-gray pt-5">{excerpt}</h2>
              <div ref={skillboxOuterContentRef} className="text-gray overflow-hidden h-2">
                <div ref={skillboxContentRef}>
                  <div className="pt-5">{children}</div>
                </div>
              </div>
              <div
                ref={skillboxExcerptGradientRef}
                className="bg-gradient-to-t pointer-events-none from-dark absolute w-full h-full bottom-0 left-0 z-10"
              />
            </div>
            {tags && (
              <div className="flex flex-wrap gap-2 w-full md:w-3/4 mt-5">
                {tags.map(tag => (
                  <TechBubbleListItem key={tag}>{tag}</TechBubbleListItem>
                ))}
              </div>
            )}
          </div>
          <div
            className={`hidden z-20 relative md:block overflow-hidden z-4 col-span-12 md:col-span-4 ${switchLayout ? 'order-1' : 'order-1 md:order-2'}`}
          >
            <img
              src={`${APP_CONFIG.viteSiteUrl}${imagePath}`}
              width="100%"
              height="auto"
              className={`md:absolute  z-2 ${!switchLayout ? 'right-0' : ''} w-auto top-0 h-40 md:h-60 object-contain`}
              alt=""
            />
          </div>
          <BlurDot
            className={`${!switchLayout ? '-right-5' : 'md:right-auto lg:-left-5'} hidden md:block absolute -top-10 h-50 w-50 lg:h-80 lg:w-90 mx-auto opacity-40 z-1`}
          />
          <div className="absolute right-0 xl:right-auto xl:left-0 h-full top-0 md:-top-5 xl:top-0 xl:-ml-30 xl:pr-30 z-6">
            <div className="mt-2 rounded-full p-2 bg-gradient-to-tl bg-darkLight md:border-3 xl-border-0 border-white border-opacity-10">
              <ChevronDown
                className={`transition-transform duration-500 h-10 w-10 xl:h-14 xl:w-14 p-1 xl:p2 relative z-2 rounded-full ${isHovered ? 'text-warning' : ''} ${isExpanded ? 'rotate-180' : ''}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skillbox
