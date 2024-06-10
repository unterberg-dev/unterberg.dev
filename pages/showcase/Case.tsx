import { GitBranchPlus, Globe } from 'lucide-react'
import { useMemo } from 'react'

import { GlassItem } from '#atoms/GlassItem'
import H4Headline from '#atoms/H4Headline'
import Link from '#atoms/Link'
import TagBubble from '#atoms/TagBubble'
import { APP_CONFIG } from '#lib/constants'
import { Case, CASE_KEY } from '#pages/showcase/casesMap'

export type ProjectType = {
  name: string
  className: string
}

export const projectTypes: {
  [key in CASE_KEY]: ProjectType
} = {
  [CASE_KEY.GITHUB_STARTER]: {
    name: 'Github Starter Template',
    className: 'text-blue-4 ',
  },
  [CASE_KEY.GITHUB_MAP_STARTER]: {
    name: 'Github Mapping Starter',
    className: 'text-emerald-8 ',
  },
  [CASE_KEY.SHOWCASE]: {
    name: 'Website / Showcase',
    className: 'text-green-4 ',
  },
  [CASE_KEY.CLIENT_PROJECT]: {
    name: 'Client Website',
    className: 'text-yellow-4',
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
        <div className="w-full h-50 relative border-2 border-darkLight">
          <TagBubble
            $size="sm"
            className={`absolute shadow-md shadow-dark shadow-opacity-70 bg-darkLight border-1 border-darkLightBorder text-gray -top-4 ${switchLayout ? 'right-2' : 'left-2'}`}
          >
            {project.name}
          </TagBubble>
          <Link
            label={caseItem.title}
            href={caseItem.link?.preview || ''}
            className="position-initial h-full w-full"
          >
            <img
              width={400}
              height={200}
              className="object-cover w-full h-full rounded-md"
              src={`${APP_CONFIG.viteMediaUrl}/${images?.[0]}`}
              alt={title}
            />
          </Link>
        </div>
      </div>
      <div className={`${switchLayout ? 'order-1' : 'order-2'} col-span-2`}>
        <H4Headline>{title}</H4Headline>
        <div className="text-gray flex flex-col gap-5 mt-5">
          {Array.isArray(description) ? (
            description.map(item => <p key={item}>{item}</p>)
          ) : (
            <p>{description}</p>
          )}
          {(caseItem.link?.preview || caseItem.link?.repo) && (
            <div className="flex gap-3">
              {caseItem.link?.preview && (
                <Link
                  href={`${caseItem.link.preview}`}
                  className="items-center gap-2 text-warning inline-flex shrink"
                >
                  <Globe className="h-4 w-4" /> Preview
                </Link>
              )}
              {caseItem.link?.repo && (
                <Link
                  href={`${caseItem.link.repo}`}
                  className="items-center gap-2 text-primary inline-flex"
                >
                  <GitBranchPlus className="h-4 w-4" /> Github Repo
                </Link>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-1 mt-5">
          {caseItem.tags?.map(tag => (
            <TagBubble
              key={tag}
              $size="xs"
              className="bg-darkLight border-1 border-darkLightBorder text-gray"
            >
              {tag}
            </TagBubble>
          ))}
        </div>
      </div>
    </div>
  )
}

const CaseItem = ({ caseItem, switchLayout, colDisplay }: CaseProps) => {
  const isSpotlight = useMemo(() => !!caseItem.spotlight, [caseItem.spotlight])

  if (isSpotlight) {
    return (
      <GlassItem className="p-10 relative">
        <CaseContent caseItem={caseItem} switchLayout={switchLayout} />
        <div className="absolute bottom-4 left-4 opacity-80">
          <img
            className="w-20 h-20"
            width={80}
            height={80}
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
