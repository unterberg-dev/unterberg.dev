import Latch from '#atoms/Latch'
import { ICON_ID } from '#lib/icons/iconID'
import Button from '#molecules/Button'

const HideContent = () => (
  <Latch className="fixed md:absolute top-0 lg:-right-50 z-20 p-0 transition-all pt-3 -translate-y-3 hover:pb-2 hover:-translate-y-1">
    <Button
      label={<div className="text-xl">Hide UI</div>}
      iconSize={24}
      icon={ICON_ID.ChevronsUp}
      className=""
      onClick={() => null}
    />
  </Latch>
)

export default HideContent
