import Latch from '#atoms/Latch'
import { ICON_ID } from '#lib/icons/iconID'
import Button from '#molecules/Button'

interface HideContentProps {
  onClick: () => void
  active: boolean
}

const HideContent = ({ onClick, active }: HideContentProps) => (
  <Latch className="fixed hitbox top-0 lg:right-10 z-20 p-0 transition-all pt-2 -translate-y-2 hover:pb-1 hover:-translate-y-1">
    <Button
      label={<div>{`${active ? 'Show' : 'Hide'}`} UI</div>}
      iconSize={16}
      icon={active ? ICON_ID.ChevronsDown : ICON_ID.ChevronsUp}
      className=""
      onClick={onClick}
    />
  </Latch>
)

export default HideContent
