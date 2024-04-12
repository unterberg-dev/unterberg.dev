import { MutableRefObject, useMemo } from 'react'

import Icon from '#atoms/Icon'
import { ICON_ID } from '#lib/icons/iconID'

interface ButtonProps {
  label: React.ReactNode
  icon?: ICON_ID
  link?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void
  ref?: MutableRefObject<HTMLAnchorElement | HTMLButtonElement>
  className?: string
}

export default ({ label, icon, link, onClick, ref, className }: ButtonProps) => {
  const buttonStyle = useMemo(
    () =>
      `flex items-center bg-strava bg-opacity-90 hover:bg-opacity-100 px-4 py-2 rounded-sm gap-2 ${className}`,
    [className],
  )

  if (link) {
    return (
      <a
        href={link}
        onClick={onClick}
        className={`${buttonStyle}`}
        ref={ref as MutableRefObject<HTMLAnchorElement>}
      >
        {icon && <Icon icon={icon} size={16} />}
        {label}
      </a>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${buttonStyle}`}
      ref={ref as MutableRefObject<HTMLButtonElement>}
    >
      {icon && <Icon icon={icon} size={16} />}
      {label}
    </button>
  )
}
