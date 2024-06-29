import Latch from '#atoms/Latch'
import { ICON_ID } from '#lib/icons/iconID'
import Button from '#molecules/Button'

interface HideContentProps {
  onClick: () => void
}

const ShowSettingsToggle = ({ onClick }: HideContentProps) => (
  <Latch className="p-0 bg-warning border-0">
    <Button
      iconSize={32}
      icon={ICON_ID.Sparkles}
      className="text-dark "
      onClick={onClick}
      label="Show animated cursor settings"
    />
  </Latch>
)

export default ShowSettingsToggle
