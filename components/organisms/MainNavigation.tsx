import { HTMLAttributes } from 'react'

import Link from '#atoms/Link'
import { mainNavigation } from '#pages/navigation'

interface MainNavigationProps extends HTMLAttributes<HTMLElement> {
  liProps?: HTMLAttributes<HTMLLIElement>
  ulProps?: HTMLAttributes<HTMLUListElement>
}

const MainNavigation = ({ liProps, ulProps, ...props }: MainNavigationProps) => (
  <nav {...props}>
    <ul {...ulProps} className={`flex gap-2 ${ulProps?.className || ''}`}>
      {Object.values(mainNavigation).map(item => (
        <li {...liProps} key={item.path}>
          <Link href={item.path}>{item.name}</Link>
        </li>
      ))}
    </ul>
  </nav>
)

export default MainNavigation
