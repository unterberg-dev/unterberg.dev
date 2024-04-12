import { HTMLAttributes } from 'react'
import tw from 'tailwind-styled-components'

import Icon from '#atoms/Icon'
import Link from '#atoms/Link'
import { ICON_ID } from '#lib/icons/iconID'

const StyledGithubLink = tw.div`
  fixed
  md:absolute
  top-0
  right-0
  z-20
  p-3
  gap-2
  inline-flex
  flex-nowrap
  bg-warning
  text-dark
`

export default ({ ...props }: HTMLAttributes<HTMLDivElement>) => (
  <StyledGithubLink {...props}>
    <Link aria-label="to-github" href="https://github.com/richard-unterberg/unterberg.dev" external>
      <Icon icon={ICON_ID.Github} size={32} className="text-dark" />
    </Link>
  </StyledGithubLink>
)
