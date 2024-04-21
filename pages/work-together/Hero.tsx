import { Atom, Orbit, Ship } from 'lucide-react'
import { FunctionComponent } from 'react'

import BlurDot from '#atoms/BlurDot'
import { GlassItem } from '#atoms/GlassItem'
import Layout from '#atoms/Layout'
import { GsapStaggerElementProps } from '#gsap/usePageHeaderAnimations'

interface CollaborateHeroProps {
  GsapStaggerElement: FunctionComponent<GsapStaggerElementProps>
}

const CollaborateHero = ({ GsapStaggerElement }: CollaborateHeroProps) => (
  <GsapStaggerElement fromBottom className="relative z-5 mt-40 md:mt-60 lg:mt-80">
    <Layout
      $fullWidth
      className="pixi-hitbox relative border-t-1 border-t-darkLightBorder bg-darkLightBorder bg-opacity-20 z-10"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-dark opacity-100" />
      <Layout className="-mt-30">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-7 items-start">
          <GsapStaggerElement className="h-full" fromBottom>
            <GlassItem className="h-full pixi-hitbox shadow-xl shadow-dark border-darkLight">
              <div className="flex gap-3">
                <BlurDot className="absolute -top-40 right-0 h-100 w-100 mx-auto opacity-10" />
                <div className=" text-light">
                  <div className="rounded-full p-2 bg-gradient-to-tl from-darkLightBorder">
                    <Orbit className="h-16 w-16 p-3 relative z-2 rounded-full" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl text-gray">Process</h3>
                  <h4 className="text text-sm text-warning font-mono">
                    Lets Identify needs &amp; problems
                  </h4>
                </div>
              </div>
              <p className="mt-6 text-lg text-gray">
                Analyze & adjust properly what you really need to develop your product and we are
                pacing rest of the way. 💫
              </p>
            </GlassItem>
          </GsapStaggerElement>
          <GsapStaggerElement className="h-full" fromBottom>
            <GlassItem className="h-full pixi-hitbox shadow-xl shadow-dark border-darkLight">
              <div className="flex gap-3">
                <BlurDot className="absolute -top-40 right-0 h-100 w-100 mx-auto opacity-10" />
                <div className="text-light">
                  <div className="rounded-full p-2 bg-gradient-to-bl from-darkLightBorder">
                    <Atom className="h-16 w-16 p-3 relative z-2 rounded-full" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl text-gray">Develop</h3>
                  <h4 className="text text-sm text-warning font-mono">
                    The right tools were build already
                  </h4>
                </div>
              </div>
              <p className="mt-6 text-lg text-gray">
                One thing is safe, there is always an appropriate tool for the job and I know how we
                find and use it.
              </p>
            </GlassItem>
          </GsapStaggerElement>
          <GsapStaggerElement className="h-full col-span-1 md:col-span-2 lg:col-span-1" fromBottom>
            <GlassItem className="h-full pixi-hitbox shadow-xl shadow-dark border-darkLight">
              <div className="flex gap-3">
                <BlurDot className="absolute -top-40 right-0 h-100 w-100 mx-auto opacity-10" />
                <div className=" text-light">
                  <div className="rounded-full p-2 bg-gradient-to-tr from-darkLightBorder">
                    <Ship className="h-16 w-16 p-3 relative z-2 rounded-full" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl text-gray">DevOps</h3>
                  <h4 className="text text-sm text-warning font-mono">
                    Jip, we must ship it somehow
                  </h4>
                </div>
              </div>
              <p className="mt-6 text-lg text-gray">
                Let us find the right environment to stage & deploy your product. I can assist with
                a broad range of services.
              </p>
            </GlassItem>
          </GsapStaggerElement>
        </div>
      </Layout>
    </Layout>
  </GsapStaggerElement>
)

export default CollaborateHero
