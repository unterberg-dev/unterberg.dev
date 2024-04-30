import { useMemo } from 'react'

import { GlassItem } from '#atoms/GlassItem'
import H3Headline from '#atoms/H3Headline'
import TagBubble from '#atoms/TagBubble'
import { GsapStaggerFunctionComponent } from '#gsap/usePageHeaderAnimations'
import { APP_CONFIG } from '#lib/constants'
import { ShowCaseItem } from '#pages/showcase/cases'
import { PROJECT_TYPE_KEY } from '#pages/showcase/projectTypes'

export type ProjectType = {
  name: string
  className: string
}

export const projectTypes: {
  [key in PROJECT_TYPE_KEY]: ProjectType
} = {
  [PROJECT_TYPE_KEY.GITHUB_STARTER]: {
    name: 'Github Starter Template',
    className: 'bg-blue-4 text-dark',
  },
  [PROJECT_TYPE_KEY.GITHUB_MAP_STARTER]: {
    name: 'Github Mapping Starter',
    className: 'bg-emerald-8 text-dark',
  },
  [PROJECT_TYPE_KEY.SHOWCASE]: {
    name: 'Website / Showcase',
    className: 'bg-green-4 text-dark',
  },
  [PROJECT_TYPE_KEY.CLIENT_PROJECT]: {
    name: 'Client Website',
    className: 'bg-yellow-4 text-dark',
  },
  [PROJECT_TYPE_KEY.YOURS]: {
    name: 'Client Website',
    className: 'bg-orange-4 text-dark',
  },
}

interface CaseProps {
  GsapStaggerElement: GsapStaggerFunctionComponent
  caseItem: ShowCaseItem

  stagger?: boolean
  colDisplay?: boolean
  switchLayout?: boolean
}

const CaseContent = ({
  caseItem,
  GsapStaggerElement,
  stagger,
  colDisplay,
  switchLayout,
}: CaseProps) => {
  const { title, description, images, projectType } = caseItem
  const project = projectTypes[projectType]

  return (
    <div
      className={`${colDisplay ? 'flex flex-col' : 'grid grid-cols md:grid-cols-3'} gap-5 md:gap-8`}
    >
      <GsapStaggerElement
        className={`${switchLayout ? 'order-2' : 'order-1'} col-span-1`}
        fromBottom
        disable={!stagger}
      >
        <div className="w-full h-50 overflow-hidden">
          <img
            className="object-cover w-full h-full"
            src={`${APP_CONFIG.viteMediaUrl}/${images?.[0]}`}
            alt={title}
          />
        </div>
      </GsapStaggerElement>
      <div className={`${switchLayout ? 'order-1' : 'order-2'} col-span-2`}>
        <GsapStaggerElement fromBottom disable={!stagger}>
          <TagBubble $size="md" className={`${project.className}`}>
            {project.name}
          </TagBubble>
          <H3Headline className="mt-3">{title}</H3Headline>
        </GsapStaggerElement>
        <GsapStaggerElement
          fromBottom
          disable={!stagger}
          className="text-gray flex flex-col gap-5 mt-5"
        >
          {Array.isArray(description) ? (
            description.map(item => <p key={item}>{item}</p>)
          ) : (
            <p>{description}</p>
          )}
        </GsapStaggerElement>
      </div>
    </div>
  )
}

const Case = ({ caseItem, GsapStaggerElement, stagger, switchLayout, colDisplay }: CaseProps) => {
  const isSpotlight = useMemo(() => !!caseItem.spotlight, [caseItem.spotlight])

  if (isSpotlight) {
    return (
      <GsapStaggerElement fromBottom>
        <GlassItem className="p-10">
          <CaseContent
            caseItem={caseItem}
            GsapStaggerElement={GsapStaggerElement}
            switchLayout={switchLayout}
            stagger
          />
          <GsapStaggerElement className="absolute bottom-0 left-0" fromBottom>
            <img
              className="w-30"
              src={`${APP_CONFIG.viteMediaUrl}/decorators/ek/star.png`}
              alt={caseItem.title}
            />
          </GsapStaggerElement>
        </GlassItem>
      </GsapStaggerElement>
    )
  }

  return (
    <CaseContent
      caseItem={caseItem}
      GsapStaggerElement={GsapStaggerElement}
      stagger={stagger}
      switchLayout={switchLayout}
      colDisplay={colDisplay}
    />
  )
}

export default Case
