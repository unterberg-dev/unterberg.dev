import BlurDot from '#atoms/BlurDot'
import H4Headline from '#atoms/H4Headline'
import Layout from '#atoms/Layout'
import { GsapStaggerFunctionComponent } from '#lib/types'

interface StaggerHeaderProps {
  GsapStaggerElement: GsapStaggerFunctionComponent
  postTitle?: string
  title?: string
  subtitle?: string
}

const StaggerHeader = ({ GsapStaggerElement, postTitle, subtitle, title }: StaggerHeaderProps) => (
  <Layout className="flex flex-col relative max-w-xl mx-auto z-2 px-6 md:px-0 pt-20 md:pt-20">
    <GsapStaggerElement>
      <BlurDot className="left-1/2 -ml-50 md:ml-inherit md:left-20 -top-20 w-100 h-100 opacity-30 fixed md:absolute" />
    </GsapStaggerElement>
    <div>
      <header className="pixi-hitbox pointer-events-none relative z-10 flex flex-col mx-auto items-center">
        {postTitle && (
          <GsapStaggerElement>
            <h1 className="text-grayDark font-mono mb-8 text-center text-sm">{postTitle}</h1>
          </GsapStaggerElement>
        )}
        {title && (
          <GsapStaggerElement>
            <h2 className="mx-auto text-4xl md:text-7xl font-bold relative text-center text-light mb-4 md:mb-10">
              {title}
            </h2>
          </GsapStaggerElement>
        )}
        {subtitle && (
          <GsapStaggerElement>
            <H4Headline className="relative text-center text-gray inline-block">
              {subtitle}
            </H4Headline>
          </GsapStaggerElement>
        )}
      </header>
    </div>
  </Layout>
)

export default StaggerHeader
