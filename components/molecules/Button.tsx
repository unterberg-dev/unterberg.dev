import { MutableRefObject, useMemo } from 'react'

import Icon from '#atoms/Icon'
import { ICON_ID } from '#lib/icons/iconID'

interface ButtonProps {
  children?: React.ReactNode
  label?: string
  icon?: ICON_ID
  iconSize?: number
  link?: string
  noGutter?: boolean
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void
  ref?: MutableRefObject<HTMLAnchorElement | HTMLButtonElement>
  className?: string
}

const Button = ({
  children,
  label = 'Button',
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
        aria-label={label}
      >
        {icon && <Icon icon={icon} size={iconSize} />}
        {children}
      </a>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${buttonStyle}`}
      ref={ref as MutableRefObject<HTMLButtonElement>}
      aria-label={label}
    >
      {icon && <Icon icon={icon} size={iconSize} />}
      {children}
    </button>
  )
}

export default Button
