import { GlassItemButton } from '#atoms/GlassItem'
import { ICON_ID } from '#lib/icons/iconID'

const StartPageMenu = () => (
  <nav>
    <ul className="pixi-hitbox relative w-full z-10 flex mx-auto gap-3 lg:gap-6">
      <GlassItemButton
        icon={ICON_ID.Github}
        href="https://github.com/richard-unterberg"
        label="Github"
      />
      <GlassItemButton
        icon={ICON_ID.Linkedin}
        href="https://www.linkedin.com/in/richard-unterberg"
        label="LinkedIn"
      />
      <GlassItemButton icon={ICON_ID.Mail} href="mailto:mail@richardunterberg.de" label="Mail" />
    </ul>
  </nav>
)

export default StartPageMenu
