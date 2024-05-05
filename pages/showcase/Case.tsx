import { useMemo } from 'react'

import { GlassItem } from '#atoms/GlassItem'
import H4Headline from '#atoms/H4Headline'
import TagBubble from '#atoms/TagBubble'
import { APP_CONFIG } from '#lib/constants'
import { Case, CASE_KEY } from '#pages/showcase/cases'

export type ProjectType = {
  name: string
  className: string
}

export const projectTypes: {
  [key in CASE_KEY]: ProjectType
} = {
  [CASE_KEY.GITHUB_STARTER]: {
    name: 'Github Starter Template',
    className: 'bg-blue-4 text-dark',
  },
  [CASE_KEY.GITHUB_MAP_STARTER]: {
    name: 'Github Mapping Starter',
    className: 'bg-emerald-8 text-dark',
  },
  [CASE_KEY.SHOWCASE]: {
    name: 'Website / Showcase',
    className: 'bg-green-4 text-dark',
  },
  [CASE_KEY.CLIENT_PROJECT]: {
    name: 'Client Website',
    className: 'bg-yellow-4 text-dark',
  },
  [CASE_KEY.YOURS]: {
    name: 'Client Website',
    className: 'bg-orange-4 text-dark',
  },
}

interface CaseProps {
  caseItem: Case
  colDisplay?: boolean
  switchLayout?: boolean
}

const CaseContent = ({ caseItem, colDisplay, switchLayout }: CaseProps) => {
  const { title, description, images, id: projectType } = caseItem
  const project = projectTypes[projectType]

  return (
    <div
      className={`${colDisplay ? 'flex flex-col' : 'grid grid-cols md:grid-cols-3'} gap-5 md:gap-8`}
    >
      <div className={`${switchLayout ? 'order-2' : 'order-1'} col-span-1`}>
        <div className="w-full h-50 overflow-hidden">
          <img
            className="object-cover w-full h-full"
            src={`${APP_CONFIG.viteMediaUrl}/${images?.[0]}`}
            alt={title}
          />
        </div>
      </div>
      <div className={`${switchLayout ? 'order-1' : 'order-2'} col-span-2`}>
        <TagBubble $size="md" className={`${project.className}`}>
          {project.name}
        </TagBubble>
        <H4Headline className="mt-3">{title}</H4Headline>
        <div className="text-gray flex flex-col gap-5 mt-5">
          {Array.isArray(description) ? (
            description.map(item => <p key={item}>{item}</p>)
          ) : (
            <p>{description}</p>
          )}
        </div>
      </div>
    </div>
  )
}

const CaseItem = ({ caseItem, switchLayout, colDisplay }: CaseProps) => {
  const isSpotlight = useMemo(() => !!caseItem.spotlight, [caseItem.spotlight])

  if (isSpotlight) {
    return (
      <GlassItem className="p-10">
        <CaseContent caseItem={caseItem} switchLayout={switchLayout} />
        <div className="absolute bottom-0 left-0">
          <img
            className="w-30"
            src={`${APP_CONFIG.viteMediaUrl}/decorators/ek/star.webp`}
            alt={caseItem.title}
          />
        </div>
      </GlassItem>
    )
  }

  return <CaseContent caseItem={caseItem} switchLayout={switchLayout} colDisplay={colDisplay} />
}

export default CaseItem
