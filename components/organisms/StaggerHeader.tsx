import rc from "react-classmate"

import BlurDot from "#atoms/BlurDot"
import H3Headline from "#atoms/H3Headline"
import Layout from "#atoms/Layout"
import type { GsapStaggerFunctionComponent } from "#gsap/usePageHeaderAnimations"

interface StaggerHeaderProps {
  GsapStaggerElement: GsapStaggerFunctionComponent
  postTitle?: string
  title?: string
  subtitle?: string
}

const dropShadowStyle = {
  textShadow: "rgba(2, 6, 23, 0.7) 2px 1px 3px",
}

const CustomBlurDot = rc.extend(BlurDot)`
  !left-1/2
  !-ml-50
  md:ml-inherit
  md:left-20
  !-top-20
  !w-100
  !h-100
  opacity-30
  fixed
  md:absolute
`

const StaggerHeader = ({ GsapStaggerElement, postTitle, subtitle, title }: StaggerHeaderProps) => (
  <Layout className="flex flex-col relative max-w-xl mx-auto z-2 px-6 md:px-0 pt-20 md:pt-20">
    <GsapStaggerElement>
      <CustomBlurDot />
    </GsapStaggerElement>
    <div>
      <header className="pointer-events-none relative z-10 flex flex-col mx-auto items-center">
        {postTitle && (
          <GsapStaggerElement>
            <h1 className="pixi-hitbox text-grayDark font-mono mb-8 text-center text-sm">{postTitle}</h1>
          </GsapStaggerElement>
        )}
        {title && (
          <GsapStaggerElement>
            <h2
              className="pixi-hitbox mx-auto text-4xl md:text-7xl font-bold relative text-center text-light mb-4 md:mb-10"
              style={{ ...dropShadowStyle }}
            >
              {title}
            </h2>
          </GsapStaggerElement>
        )}
        {subtitle && (
          <GsapStaggerElement>
            <H3Headline
              className="pixi-hitbox relative text-center text-gray inline-block"
              style={{ ...dropShadowStyle }}
            >
              {subtitle}
            </H3Headline>
          </GsapStaggerElement>
        )}
      </header>
    </div>
  </Layout>
)

export default StaggerHeader
