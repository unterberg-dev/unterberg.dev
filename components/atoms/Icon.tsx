import type { LucideProps } from "lucide-react"
import { useMemo } from "react"

import type { ICON_ID } from "#lib/icons/iconID"
import APP_ICON from "#lib/icons/iconMap"

interface AppIconProps extends LucideProps {
  icon: ICON_ID
}

export default ({ icon, ...props }: AppIconProps) => {
  const AppIconComponent = useMemo(() => APP_ICON[icon].component ?? null, [icon])

  if (AppIconComponent) {
    return (
      <span className={`block ${props.className || ""}`} style={{ width: props.size, height: props.size }}>
        <AppIconComponent {...props} />
      </span>
    )
  }
  return null
}
