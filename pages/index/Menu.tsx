import tw from 'tailwind-styled-components'

import BlurDot from '#atoms/BlurDot'
import Icon from '#atoms/Icon'
import { ICON_ID } from '#lib/icons/iconID'

const StyledStartPageMenuItem = tw.li`
  relative
  overflow-hidden
  border-1
  bg-opacity-90
  rounded-xl
  py-5
  px-5
  sm:px-7
  flex-1
  md:px-10
  transition-transform
  scale-100
  md:hover-scale-110
  text-light
  border-darkLightBorder
  shadow-dark
  shadow-lg
  bg-dark
  hover-text-warning
`

interface StartPageMenuItemProps {
  icon: ICON_ID
  href: string
  label: string
}

const StartPageMenuItem = ({ icon, href, label }: StartPageMenuItemProps) => (
  <StyledStartPageMenuItem>
    <a className="flex flex-col items-center gap-3" href={href}>
      <BlurDot className="w-90 h-90 mt-5 opacity-15" />
      <Icon icon={icon} className="w-8 h-8 lg:w-10 lg:h-10" />
      <span>{label}</span>
    </a>
  </StyledStartPageMenuItem>
)

const StartPageMenu = () => (
  <nav>
    <ul className="hitbox relative w-full z-10 flex mx-auto gap-3 lg:gap-6 mt-10 md:mt-10 xl:mt-14">
      <StartPageMenuItem
        icon={ICON_ID.Github}
        href="https://github.com/richard-unterberg"
        label="Github"
      />
      <StartPageMenuItem
        icon={ICON_ID.Linkedin}
        href="https://www.linkedin.com/in/richard-unterberg"
        label="LinkedIn"
      />
      <StartPageMenuItem icon={ICON_ID.Mail} href="mailto:mail@richardunterberg.de" label="Mail" />
    </ul>
  </nav>
)

export default StartPageMenu
