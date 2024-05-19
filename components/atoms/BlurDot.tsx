import { useRef } from 'react'
import tw from 'tailwind-styled-components'

import { APP_CONFIG } from '#root/lib/constants'

const StyledBlurDot = tw.div`
  absolute
  h-full
  w-full
  -top-1/2
  pointer-events-none
`

const BlurDot = ({ ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const dotRef = useRef<HTMLDivElement>(null)

  return (
    <StyledBlurDot
      {...props}
      ref={dotRef}
      style={{
        backgroundImage: `url(${APP_CONFIG.viteMediaUrl}/decorators/bg/4.svg)`,
        backgroundRepeat: 'no-repeat',
        // backgroundSize: '100% 100%',
        ...props.style,
      }}
    />
  )
}

export default BlurDot
