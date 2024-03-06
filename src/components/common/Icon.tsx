import { LucideProps } from 'lucide-react'
import { lazy, Ref, Suspense } from 'react'

import { ICON_ID } from '#lib/icons/iconID'

const IconLazyRenderer = lazy(() => import('#lib/icons/IconLazyRenderer'))

interface AppIconProps extends LucideProps {
  icon: ICON_ID
  ref?: Ref<SVGSVGElement>
}

const Icon = ({ icon, ...props }: AppIconProps) => {
  if (icon) {
    return (
      <Suspense>
        <IconLazyRenderer icon={icon} {...props} />
      </Suspense>
    )
  }
  return null
}

export default Icon
