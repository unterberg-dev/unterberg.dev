import { ReactNode } from 'react'

import Layout from '#atoms/Layout'
import { APP_CONFIG } from '#lib/constants'

interface MapThemeAreaProps {
  children?: ReactNode
}

const MapThemeArea = ({ children }: MapThemeAreaProps) => (
  <Layout $fullWidth className="pixi-hitbox relative z-10 py-30">
    <img
      src={`${APP_CONFIG.viteMediaUrl}/_dev/showcase/mapBg2.webp`}
      alt="map theme background"
      className="absolute inset-0 object-cover w-full h-full opacity-100"
    />
    <div className="pixi-hitbox absolute w-full h-60 left-0 top-0 bg-gradient-to-b from-dark h-50" />
    <div className="pixi-hitbox absolute w-full h-60 left-0 bottom-0 bg-gradient-to-t from-dark h-50" />
    <div className="relative">{children}</div>
  </Layout>
)

export default MapThemeArea
