import { Atom, Orbit, Ship } from 'lucide-react'

import { GlassItemButton } from '#atoms/GlassItem'
import Layout from '#atoms/Layout'
import { GsapStaggerFunctionComponent } from '#gsap/usePageHeaderAnimations'
import BelowHeroGlassArea from '#molecules/BelowHeroGlassArea'

interface CollaborateHeroProps {
  GsapStaggerElement: GsapStaggerFunctionComponent
}

const CollaborateHero = ({ GsapStaggerElement }: CollaborateHeroProps) => (
  <BelowHeroGlassArea GsapStaggerElement={GsapStaggerElement}>
    <Layout className="-mt-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 lg:gap-7 items-start">
        <GsapStaggerElement className="h-full" fromBottom>
          <GlassItemButton
            href="#skills"
            label={
              <div className="flex gap-3">
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
            }
            className="pixi-hitbox h-full w-full"
          />
        </GsapStaggerElement>
        <GsapStaggerElement className="h-full" fromBottom>
          <GlassItemButton
            href="#rules"
            label={
              <div className="flex gap-3">
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
            }
            className="pixi-hitbox h-full w-full"
          />
        </GsapStaggerElement>
        <GsapStaggerElement className="h-full" fromBottom>
          <GlassItemButton
            href="#contact"
            label={
              <div className="flex gap-3">
                <div className="text-light">
                  <div className="rounded-full p-2 bg-gradient-to-br from-darkLightBorder">
                    <Ship className="h-16 w-16 p-3 relative z-2 rounded-full" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl text-gray">Contact</h3>
                  <h4 className="text text-sm text-warning font-mono">jip, the contact form</h4>
                </div>
              </div>
            }
            className="pixi-hitbox h-full w-full"
          />
        </GsapStaggerElement>
      </div>
    </Layout>
  </BelowHeroGlassArea>
)

export default CollaborateHero
