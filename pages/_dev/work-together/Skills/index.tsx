import { useState } from 'react'

import Layout from '#atoms/Layout'
import { GsapStaggerFunctionComponent } from '#gsap/usePageHeaderAnimations'
import { APP_CONFIG } from '#lib/constants'
import HeadlineArea from '#molecules/HeadlineArea'
import Skillbox from '#pages/_dev/work-together/Skills/Skillbox'
import skillsMap, { SKILL_KEY } from '#pages/_dev/work-together/skillsMap'

interface SkillProps {
  GsapStaggerElement: GsapStaggerFunctionComponent
}

const Skills = ({ GsapStaggerElement }: SkillProps) => {
  const [tileHovered, setTileHovered] = useState<SKILL_KEY | false>(false)
  const [tileExpanded, setTileExpanded] = useState<SKILL_KEY | false>(false)
  const [isAnimating, setIsAnimating] = useState(false)

  return (
    <Layout $fullWidth className="pixi-hitbox bg-dark relative z-10">
      <Layout className="pb-10">
        <GsapStaggerElement fromBottom>
          <HeadlineArea
            className="pt-20 "
            id="skills"
            headline="Skills & Experience"
            subHeadline="Things I learned, things I will never forget"
          />
          <div className="relative pt-30">
            <div
              className={`overlay z-20 absolute -left-30 -right-30 top-0 bottom-0 bg-dark bg-opacity-20 pointer-events-none transition-opacity duration-250 ${tileExpanded ? 'opacity-100' : 'opacity-0'}`}
              style={{ backgroundImage: `url(${APP_CONFIG.viteMediaUrl}/pattern-big.svg)` }}
            />
            <div className="flex flex-col gap-20">
              {skillsMap.map(skill => (
                <Skillbox
                  key={skill.id}
                  skill={skill}
                  isExpanded={tileExpanded === skill.id}
                  isAnimating={isAnimating}
                  setIsAnimating={setIsAnimating}
                  setTileHovered={setTileHovered}
                  isHovered={tileHovered === skill.id}
                  setTileExpanded={setTileExpanded}
                  switchLayout={skill.id % 2 === 0}
                />
              ))}
            </div>
          </div>
        </GsapStaggerElement>
      </Layout>
    </Layout>
  )
}

export default Skills
