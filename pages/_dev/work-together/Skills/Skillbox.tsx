import { ChevronDown } from 'lucide-react'
import { HTMLAttributes } from 'react'
import tw from 'tailwind-styled-components'

import BlurDot from '#atoms/BlurDot'
import H4Headline from '#atoms/H4Headline'
import TagBubble from '#atoms/TagBubble'
import useSkillboxAnimations from '#gsap/useSkillboxAnimations'
import { APP_CONFIG } from '#lib/constants'
import { Skill, SKILL_KEY } from '#pages/_dev/work-together/skillsMap'

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

interface SkillboxProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  skill: Skill
  switchLayout?: boolean
  isHovered: boolean
  setTileHovered: (tileHovered: SKILL_KEY | false) => void
  isExpanded: boolean
  setTileExpanded: (tileExpanded: SKILL_KEY | false) => void
  isAnimating: boolean
  setIsAnimating: (isAnimating: boolean) => void
}

const SkillboxTagBubbleDefaultClasses = 'bg-darkLightBorder text-gray hover:text-black'

const Skillbox = ({
  className,
  switchLayout,
  skill,
  isHovered,
  setTileHovered,
  isExpanded,
  setTileExpanded,
  isAnimating,
  setIsAnimating,
  ...props
}: SkillboxProps) => {
  const {
    handleExpand,
    handleHoverIn,
    handleHoverOut,
    skillboxContentRef,
    skillboxExcerptGradientRef,
    skillboxGsapRef,
    skillboxGsapWrapRef,
    skillboxImageRef,
    skillboxOuterContentRef,
  } = useSkillboxAnimations({
    isExpanded,
    isHovered,
    isAnimating,
    setIsAnimating,
    setTileExpanded,
    setTileHovered,
    skill,
  })

  return (
    <div className="cursor-pointer relative" ref={skillboxGsapWrapRef}>
      <div
        ref={skillboxGsapRef}
        onMouseEnter={handleHoverIn}
        onMouseLeave={handleHoverOut}
        onClick={handleExpand}
        className="z-2 relative"
      >
        <div className="bg-dark position-absolute -inset-8" />
        <div
          className={`relative h-full z-10 grid bg-dark grid-cols-12 gap-5 md:gap-10 ${className || ''}`}
          {...props}
        >
          <div className="absolute -left-5 -right-5 h-8 z-5 -bottom-15 bg-gradient-to-b from-dark opacity-100 pointer-events-none" />
          <div
            className={`relative z-10 flex flex-col z-10 col-span-12 md:col-span-9 ${switchLayout ? 'order-2' : 'order-2 md:order-1'}`}
          >
            <div className="flex gap-2">
              {skill.experience && (
                <TagBubble
                  className={`${SkillboxTagBubbleDefaultClasses} ${skill.experience.className}`}
                >
                  Experience: {skill.experience.value} yrs
                </TagBubble>
              )}
              {skill.dedication && (
                <TagBubble
                  className={`${SkillboxTagBubbleDefaultClasses} ${skill.dedication.className}`}
                >
                  Dedication: {skill.dedication.value}/10
                </TagBubble>
              )}
            </div>
            <H4Headline className="w-3/4 sm:5/6 md:w-full mt-3">{skill.title}</H4Headline>
            <div className="relative flex-1">
              <div className="text-gray pt-5">{skill.excerpt}</div>
              <div ref={skillboxOuterContentRef} className="text-gray overflow-hidden h-2">
                <div ref={skillboxContentRef}>
                  <div className="pt-5">{skill.content}</div>
                </div>
              </div>
              <div
                ref={skillboxExcerptGradientRef}
                className="bg-gradient-to-t pointer-events-none from-dark absolute w-full h-full bottom-0 left-0 z-10"
              />
            </div>
            {skill.tags && (
              <ul className="flex flex-wrap gap-2 w-full md:w-3/4 mt-5">
                {skill.tags.map(tag => (
                  <TechBubbleListItem key={tag}>{tag}</TechBubbleListItem>
                ))}
              </ul>
            )}
          </div>
          <div
            className={`hidden z-20 relative md:block z-4 col-span-12 md:col-span-3 ${switchLayout ? 'order-1' : 'order-1 md:order-2'}`}
          >
            <img
              src={`${APP_CONFIG.viteMediaUrl}${skill.imagePath}`}
              ref={skillboxImageRef}
              width="100%"
              height="auto"
              className={`md:absolute z-2 ${!switchLayout ? 'right-0' : ''} w-auto top-0 md:h-44 xl:h-50 object-contain`}
              alt=""
            />
          </div>
          <BlurDot
            className={`${!switchLayout ? 'md:right-5 xl:-right-20' : 'md:right-auto xl:-left-25'} hidden md:block absolute -top-10 h-50 w-50 xl:h-70 xl:w-90 mx-auto opacity-40 z-1`}
          />
          <div className="absolute right-12 xl:right-auto xl:left-0 h-full top-0 md:-top-5 xl:top-0 xl:-ml-30 xl:pr-30 z-6">
            <div className="mt-2 rounded-full p-2 bg-gradient-to-tl bg-darkLight md:border-3 xl-border-0 border-white border-opacity-10 absolute">
              <ChevronDown
                className={`transition-transform transform-origin-center-center duration-350 h-10 w-10 xl:h-14 xl:w-14 p-1 xl:p2 relative z-2 rounded-full ${isHovered ? 'text-warning' : ''} ${isExpanded ? 'rotate-180' : ''}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skillbox
