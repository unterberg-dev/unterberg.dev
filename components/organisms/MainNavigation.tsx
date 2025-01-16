import type { HTMLAttributes } from 'react'
import { usePageContext } from 'vike-react/usePageContext'

import Icon from '#atoms/Icon'
import Link from '#atoms/Link'
import { mainNavigation } from '#pages/navigation'

interface MainNavigationProps extends HTMLAttributes<HTMLElement> {
  liProps?: HTMLAttributes<HTMLLIElement>
  ulProps?: HTMLAttributes<HTMLUListElement>
}

const MainNavigation = ({ liProps, ulProps, ...props }: MainNavigationProps) => {
  const { urlPathname } = usePageContext()
  if (urlPathname === '/') return null

  return (
    <nav {...props}>
      <ul {...ulProps} className={`flex gap-2 ${ulProps?.className || ''}`}>
        {Object.values(mainNavigation).map(item => (
          <li {...liProps} key={item.path}>
            <Link className="flex gap-2 items-center" href={item.path}>
              <Icon icon={item.icon} className="w-5 h-5" />
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default MainNavigation
