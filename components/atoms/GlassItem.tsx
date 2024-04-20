import { HTMLAttributes } from 'react'
import tw from 'tailwind-styled-components'

import BlurDot from '#atoms/BlurDot'
import Icon from '#atoms/Icon'
import { ICON_ID } from '#lib/icons/iconID'

export const GlassItem = tw.span`
  relative
  overflow-hidden
  border-1
  block
  bg-opacity-90
  rounded-md
  p-5
  flex-1
  transition-transform
  text-light
  border-darkLightBorder
  shadow-dark
  shadow-lg
  bg-dark
`

interface GlassItemButtonProps extends HTMLAttributes<HTMLLIElement> {
  icon: ICON_ID
  href?: string
  label: string
  className?: string
}

export const GlassItemButton = ({
  icon,
  href,
  label,
  className,
  ...props
}: GlassItemButtonProps) => (
  <li className={`flex-1 ${className}`} {...props}>
    <GlassItem className="scale-100 md:hover-scale-110 hover:text-warning">
      <a className="flex flex-col items-center gap-3" href={href}>
        <BlurDot className="w-90 h-90 mt-5 opacity-15" />
        <Icon icon={icon} className="w-8 h-8 lg:w-10 lg:h-10" />
        <span>{label}</span>
      </a>
    </GlassItem>
  </li>
)
