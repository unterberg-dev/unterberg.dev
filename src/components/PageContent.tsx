import { lazy } from 'react'

import useTileStore from '@/src/zustand/useTileStore'
import Icon from '@/components/common/Icon'
import { ICON_ID } from '@/lib/icons/iconID'
import useAppTheme from '@/lib/useTheme'

const Hitbox = lazy(() => import('@/components/Hitbox'))

const PageContent = () => {
  const previewMode = useTileStore(state => state.previewMode)
  const { color } = useAppTheme()

  return (
    <div
      className={`relative z-30 transition-opacity
       text-light ${previewMode ? 'opacity-5' : 'opacity-100'}`}
    >
      <div className="backdrop-blur-md fixed bg-primary bg-opacity-10 w-full top-0 h-20 z-20">
        <div className="container max-w-screen-lg mx-auto h-full flex items-center">
          <Hitbox name="logo" inset>
            <Icon icon={ICON_ID.Rabbit} className="w-12 h-12 p-3 text-dark bg-error rounded-full" />
          </Hitbox>
        </div>
      </div>
      <div className="flex">
        <div className="container px-5 mx-auto max-w-screen-lg h-screen max-h-[400] flex flex-col pb-10 justify-between">
          <div className="h-20" />
          <div className="inline-block mx-20 relative">
            <Hitbox name="main-teaser" inset>
              <h1 className="relative text-4xl md:text-6xl xl:text-8xl font-bold w-full text-center text-light">
                GRIX
              </h1>
              <br />
              <h2 className="relative text-5xl font-thin text-center text-gray">
                Grid based animation system for ts react made with pixi.js and gsap ✌️
              </h2>
            </Hitbox>
          </div>
          <div className="h-20" />
          <Hitbox name="main-cta" inset>
            <div className="grid grid-cols-3 gap-4 text-gray">
              <div>
                <Icon icon={ICON_ID.Rabbit} className="w-12 h-12 text-error mx-auto mb-6" />
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni rem quibusdam iste
                  vel ex quaerat blanditiis vitae unde illum.
                </p>
              </div>
              <div>
                <Icon icon={ICON_ID.MagnetIcon} className="w-12 h-12 text-error mx-auto mb-6" />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur error dolor
                  sequi facere laboriosam quasi ab, rem sint rerum ratione?
                </p>
              </div>
              <div>
                <Icon icon={ICON_ID.MonitorDown} className="w-12 h-12 text-error mx-auto mb-6" />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit debitis inventore
                  suscipit ipsam eum dolores
                </p>
              </div>
            </div>
          </Hitbox>
        </div>
      </div>
      <div className="container px-5 mt-8 mx-auto max-w-screen-lg">
        <div className="grid grid-cols-2 text-xl ">
          <div className="flex flex-col justify-center">
            <Hitbox name="grid-1" inset>
              <h3 className="text-4xl inline-block mb-10">Another headline yes</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem corporis qui
                aliquam! Voluptatum totam omnis beatae. Aut in rerum nisi optio pariatur, aperiam
                non mollitia! Ratione commodi minima sed provident.
              </p>
            </Hitbox>
          </div>
          <div className="flex justify-end relative">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="opacity-10">
              <path
                fill={color('primary')}
                d="M29,-50.2C38.9,-44.4,49.2,-39.4,49.7,-31.1C50.1,-22.9,40.8,-11.5,43.3,1.4C45.8,14.3,60.2,28.7,57.8,33.6C55.4,38.5,36.2,34,23.8,41.2C11.3,48.5,5.7,67.4,-3.3,73.1C-12.3,78.9,-24.5,71.3,-37.7,64.5C-50.9,57.7,-65,51.7,-63.4,41.1C-61.9,30.4,-44.7,15.2,-42.6,1.2C-40.6,-12.8,-53.6,-25.7,-55.3,-36.5C-57,-47.4,-47.3,-56.3,-36.2,-61.4C-25.1,-66.5,-12.5,-67.8,-1.5,-65.2C9.5,-62.6,19,-56,29,-50.2Z"
                transform="translate(100 100)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon icon={ICON_ID.Sailboat} className="w-40 h-40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageContent
