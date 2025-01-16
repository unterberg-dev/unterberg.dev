import Icon from "#atoms/Icon"
import { ICON_ID } from "#lib/icons/iconID"

export default ({ children }: { children: React.ReactNode }) => (
  <span className="items-center inline-flex gap-0.5">
    {children}
    <Icon icon={ICON_ID.ExternalLink} className="inline-block align-super mr-1" size={10} />
  </span>
)
