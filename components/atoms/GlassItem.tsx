import { HTMLAttributes, ReactNode } from 'react'
import tw from 'tailwind-styled-components'

import BlurDot from '#atoms/BlurDot'
import Icon from '#atoms/Icon'
import Link from '#atoms/Link'
import { ICON_ID } from '#lib/icons/iconID'

export const GlassItem = tw.div`
  relative
  overflow-hidden
  border-1
  block
  bg-opacity-90
  rounded-md
  p-5
  flex-1
  duration-500
  transition-transform
  text-light
  border-darkLightBorder
  shadow-dark
  shadow-lg
  bg-dark
`

interface GlassItemButtonProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ICON_ID
  href?: string
  label: string | ReactNode
  className?: string
}

export const GlassItemButton = ({
  icon,
  href,
  label,
  className,
  ...props
}: GlassItemButtonProps) => (
  <div className={`flex-1 ${className}`} {...props}>
    <GlassItem className="scale-100 h-full md:hover-scale-110 hover:text-warning">
      <Link className="flex flex-col items-center gap-3 h-full" href={href || ''}>
        <BlurDot className="w-90 h-90 mt-5 opacity-15" />
        {icon && <Icon icon={icon} className="w-8 h-8 lg:w-10 lg:h-10" />}
        {label}
      </Link>
    </GlassItem>
  </div>
)
