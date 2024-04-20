import Link from '#atoms/Link'
import { mainNavigation } from '#pages/navigation'

const MainNavigation = () => (
  <nav>
    <ul className="flex gap-2">
      {Object.values(mainNavigation).map(item => (
        <li key={item.path}>
          <Link href={item.path}>{item.name}</Link>
        </li>
      ))}
    </ul>
  </nav>
)

export default MainNavigation
