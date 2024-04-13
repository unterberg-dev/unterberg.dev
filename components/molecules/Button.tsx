import { MutableRefObject, useMemo } from 'react'

import Icon from '#atoms/Icon'
import { ICON_ID } from '#lib/icons/iconID'

interface ButtonProps {
  label?: React.ReactNode
  icon?: ICON_ID
  iconSize?: number
  link?: string
  noGutter?: boolean
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void
  ref?: MutableRefObject<HTMLAnchorElement | HTMLButtonElement>
  className?: string
}

const Button = ({
  label,
  icon,
  iconSize = 16,
  link,
  noGutter,
  onClick,
  ref,
  className,
}: ButtonProps) => {
  const buttonStyle = useMemo(
    () => `flex items-center ${noGutter ? 'p-0' : 'px-4 py-2'} rounded-sm gap-2 ${className}`,
    [className, noGutter],
  )

  if (link) {
    return (
      <a
        href={link}
        onClick={onClick}
        className={`${buttonStyle}`}
        ref={ref as MutableRefObject<HTMLAnchorElement>}
      >
        {icon && <Icon icon={icon} size={iconSize} />}
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
      {icon && <Icon icon={icon} size={iconSize} />}
      {label}
    </button>
  )
}

export default Button
