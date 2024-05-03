import Hamburger from '#organisms/Hamburger'
import { usePageContext } from '#renderer/usePageContext'

const Header = () => {
  const { urlPathname } = usePageContext()
  if (urlPathname === '/') return null

  return <Hamburger />
}

export default Header
