import Latch from '#atoms/Latch'
import { ICON_ID } from '#lib/icons/iconID'
import Button from '#molecules/Button'

interface HideContentProps {
  onClick: () => void
  active: boolean
}

const HideContentToggle = ({ onClick, active }: HideContentProps) => (
  <Latch className="p-0 border-0">
    <Button
      iconSize={28}
      icon={active ? ICON_ID.Eye : ICON_ID.EyeOff}
      className="text-white"
      onClick={onClick}
      label="Hide UI"
    />
  </Latch>
)

export default HideContentToggle
