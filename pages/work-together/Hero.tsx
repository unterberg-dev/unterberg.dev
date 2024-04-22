import { Atom, Orbit, Ship } from 'lucide-react'

import BlurDot from '#atoms/BlurDot'
import { GlassItem } from '#atoms/GlassItem'
import Layout from '#atoms/Layout'
import Link from '#atoms/Link'
import { GsapStaggerFunctionComponent } from '#lib/types'

interface CollaborateHeroProps {
  GsapStaggerElement: GsapStaggerFunctionComponent
}

const CollaborateHero = ({ GsapStaggerElement }: CollaborateHeroProps) => (
  <GsapStaggerElement fromBottom className="relative z-5 mt-40 md:mt-60 lg:mt-52">
    <Layout
      $fullWidth
      className="pixi-hitbox relative border-t-1 border-t-darkLightBorder bg-darkLightBorder bg-opacity-40 z-10"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-dark opacity-100" />
      <Layout className="-mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-7 items-start">
          <GsapStaggerElement className="h-full" fromBottom>
            <Link
              href="#skills"
              className="transition-transform scale-100 w-full hover:scale-110 duration-500 w-full"
            >
              <GlassItem className="h-full w-full pixi-hitbox shadow-xl shadow-dark border-darkLight">
                <div className="flex gap-3">
                  <BlurDot className="absolute -top-40 right-0 h-100 w-100 mx-auto opacity-10" />
                  <div className=" text-light">
                    <div className="rounded-full p-2 bg-gradient-to-tl from-darkLightBorder">
                      <Atom className="h-16 w-16 p-3 relative z-2 rounded-full" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl text-gray">Skills</h3>
                    <h4 className="text text-sm text-warning font-mono">
                      Things I learned over the years
                    </h4>
                  </div>
                </div>
              </GlassItem>
            </Link>
          </GsapStaggerElement>
          <GsapStaggerElement className="h-full" fromBottom>
            <Link
              href="#rules"
              className="transition-transform scale-100 hover:scale-110 duration-500 w-full"
            >
              <GlassItem className="h-full w-full  pixi-hitbox shadow-xl shadow-dark border-darkLight">
                <div className="flex gap-3">
                  <BlurDot className="absolute -top-40 right-0 h-100 w-100 mx-auto opacity-10" />
                  <div className="text-light">
                    <div className="rounded-full p-2 bg-gradient-to-bl from-darkLightBorder">
                      <Orbit className="h-16 w-16 p-3 relative z-2 rounded-full" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl text-gray">Rules</h3>
                    <h4 className="text text-sm text-warning font-mono">
                      Some things to keep in mind
                    </h4>
                  </div>
                </div>
              </GlassItem>
            </Link>
          </GsapStaggerElement>
          <GsapStaggerElement className="h-full" fromBottom>
            <Link
              href="#contact"
              className="transition-transform scale-100 hover:scale-110 duration-500 w-full"
            >
              <GlassItem className="h-full w-full  pixi-hitbox shadow-xl shadow-dark border-darkLight">
                <div className="flex gap-3">
                  <BlurDot className="absolute -top-40 right-0 h-100 w-100 mx-auto opacity-10" />
                  <div className=" text-light">
                    <div className="rounded-full p-2 bg-gradient-to-tr from-darkLightBorder">
                      <Ship className="h-16 w-16 p-3 relative z-2 rounded-full" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl text-gray">Contact</h3>
                    <h4 className="text text-sm text-warning font-mono">jip, the contact form</h4>
                  </div>
                </div>
              </GlassItem>
            </Link>
          </GsapStaggerElement>
        </div>
      </Layout>
    </Layout>
  </GsapStaggerElement>
)

export default CollaborateHero
