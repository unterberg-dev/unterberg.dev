import { lazy } from 'react'

import Icon from '#components/common/Icon'
import { ICON_ID } from '#lib/icons/iconID'
import useTileStore from '#zustand/useTileStore'

const Hitbox = lazy(() => import('#components/Hitbox'))

const PageContent = () => {
  const previewMode = useTileStore(state => state.previewMode)

  return (
    <div
      className={`relative z-30 transition-opacity
       text-light ${previewMode ? 'opacity-5' : 'opacity-100'}`}
    >
      <div className="flex">
        <div className="container px-5 mx-auto max-w-screen-lg h-screen max-h-[400] flex flex-col pb-10 justify-between">
          <div className="inline-flex flex-col relative max-w-xl mx-auto">
            <Hitbox
              name="main-teaser"
              className="inline-flex flex-col mx-auto p-5 my-5 md:my-20"
              inset
            >
              <h2 className="relative text-4xl md:text-7xl font-bold text-center text-light inline-block mb-10">
                Hello
              </h2>
              <h2 className="relative text-2xl md:text-4xl font-thin text-center text-gray inline-block">
                I love to create modern websites and interfaces. Let&apos;s build something together
                ✌️
              </h2>
            </Hitbox>
            <Hitbox name="main-links" className="inline-flex mx-auto p-5 gap-8" inset>
              <a href="https://github.com/richard-unterberg" aria-label="Github Icon">
                <Icon icon={ICON_ID.Github} className="w-10 h-10 text-gray" />
              </a>
              <a href="https://www.linkedin.com/in/richard-unterberg" aria-label="LinkedIn Icon">
                <Icon icon={ICON_ID.Linkedin} className="w-10 h-10 text-gray" />
              </a>
            </Hitbox>
          </div>
          <Hitbox name="main-copy" className="inline-flex flex-col mx-auto p-5 pb-16 md:pb-0" inset>
            <div className="grid text-gray">
              <div className="font-light text-light">
                <p className="text-center">Nightworks Richard Unterberg</p>
                <p className="text-center mb-3"> mail@richardunterberg.de</p>
                <p className="text-center">&copy; 2024</p>
              </div>
            </div>
          </Hitbox>
        </div>
      </div>
    </div>
  )
}

export default PageContent
