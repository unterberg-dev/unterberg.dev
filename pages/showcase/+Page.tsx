import { Monitor, Orbit, Ship } from 'lucide-react'
import { useRef } from 'react'

import BlurDot from '#atoms/BlurDot'
import { GlassItem } from '#atoms/GlassItem'
import Layout from '#atoms/Layout'
import usePageHeaderAnimations from '#gsap/usePageHeaderAnimations'

const ShowcasePage = () => {
  const staggerContainer = useRef<HTMLDivElement>(null)
  const isAnimating = useRef(false)

  const { GsapStaggerElement } = usePageHeaderAnimations({
    isAnimating,
    staggerContainer,
  })

  return (
    <div ref={staggerContainer} className="">
      <Layout className="flex flex-col relative max-w-xl mx-auto z-2 px-6 md:px-0 pt-20 md:pt-10">
        <GsapStaggerElement>
          <BlurDot className="left-1/2 -ml-50 md:ml-inherit md:left-20 -top-20 w-100 h-100 opacity-30 fixed md:absolute" />
        </GsapStaggerElement>
        <div>
          <header className="pixi-hitbox pointer-events-none relative z-10 flex flex-col mx-auto items-center">
            <GsapStaggerElement>
              <h1 className="text-grayDark font-mono mb-8 text-center text-sm">
                Projects, Cases & Contributions
              </h1>
            </GsapStaggerElement>
            <GsapStaggerElement>
              <h2 className="mx-auto relative text-4xl md:text-7xl font-bold text-center text-light mb-4 md:mb-10">
                Showcase
              </h2>
            </GsapStaggerElement>
            <GsapStaggerElement>
              <h2 className="relative text-2xl md:text-2xl lg:text-2xl md:font-light text-center text-gray inline-block">
                Just a humble presentation of my work. Enjoy!
              </h2>
            </GsapStaggerElement>
          </header>
        </div>
      </Layout>
      <GsapStaggerElement fromBottom className="relative z-5 mt-40 lg:mt-100">
        <Layout
          $fullWidth
          className="pixi-hitbox relative pb-20 border-t-1 border-t-darkLightBorder bg-darkLightBorder bg-opacity-20 z-10"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-dark opacity-100" />
          <Layout className="-mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 items-start">
              <GsapStaggerElement className="h-full" fromBottom>
                <BlurDot className="pixi-hitbox absolute -top-32 left-1/2 h-80 w-80 mx-auto -ml-40 opacity-20" />
                <Orbit className="pixi-hitbox hidden lg:block absolute -top-36 left-1/2 -ml-14 h-28 w-28 text-light mx-auto" />
                <GlassItem className="h-full pixi-hitbox shadow-xl shadow-dark">
                  <h3 className="text-xl font-mono text-gray">Process</h3>
                  <h4 className="text font-xs text-warning font-mono">
                    Identify values, needs &amp; problems
                  </h4>
                  <p className="mt-5">
                    Years were passing by, collecting a large amount of knowledge of useful and
                    useless stuff around web-development. One thing is safe, there is always an
                    appropriate tool for the job and I will use it.
                  </p>
                </GlassItem>
              </GsapStaggerElement>
              <GsapStaggerElement className="h-full" fromBottom>
                <BlurDot className="pixi-hitbox absolute -top-32 left-1/2 h-80 w-80 mx-auto -ml-40 opacity-20" />
                <Monitor className="pixi-hitbox hidden lg:block absolute -top-36 left-1/2 -ml-14 h-28 w-28 text-light mx-auto" />
                <GlassItem className="h-full pixi-hitbox">
                  <h3 className="text-xl font-mono text-gray">Develop</h3>
                  <h4 className="text text-warning font-mono">
                    The right tools were build already
                  </h4>
                  <p className="mt-5">
                    Years were passing by, collecting a large amount of knowledge of useful and
                    useless stuff around web-development. One thing is safe, there is always an
                    appropriate tool for the job and I will use it.
                  </p>
                </GlassItem>
              </GsapStaggerElement>
              <GsapStaggerElement
                className="h-full col-span-1 md:col-span-2 lg:col-span-1"
                fromBottom
              >
                <BlurDot className="pixi-hitbox absolute -top-32 left-1/2 h-80 w-80 mx-auto -ml-40 opacity-20" />
                <Ship className="pixi-hitbox hidden lg:block absolute -top-36 left-1/2 -ml-14 h-28 w-28 text-light mx-auto" />
                <GlassItem className="pixi-hitbox h-full">
                  <h3 className="text-xl font-mono text-gray">DevOps</h3>
                  <h4 className="text text-warning font-mono">Jip, we must ship it somehow</h4>
                  <p className="mt-5">
                    Years were passing by, collecting a large amount of knowledge of useful and
                    useless stuff around web-development. One thing is safe, there is always an
                    appropriate tool for the job and I will use it.
                  </p>
                </GlassItem>
              </GsapStaggerElement>
            </div>
          </Layout>
        </Layout>
      </GsapStaggerElement>
      <Layout $fullWidth className="bg-dark relative h-50 z-4" />
      <Layout
        $fullWidth
        className="pixi-hitbox bg-gradient-to-b via-10% from-dark relative h-50 z-10"
      />
    </div>
  )
}

export default ShowcasePage
