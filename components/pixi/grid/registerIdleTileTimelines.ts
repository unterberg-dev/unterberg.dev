import gsap from 'gsap'

import { Tile } from '#components/pixi/types'
import { R } from '#pixi/utils'

interface CreateTileTimelinesProps {
  tiles: Tile[]
}

export const registerIdleTileTimelines = ({ tiles }: CreateTileTimelinesProps) => {
  tiles.forEach(tile => {
    const scaleIn = R(0.0, 0.15)
    gsap.set(tile.innerContainer.scale, {
      x: scaleIn,
      y: scaleIn,
    })
    gsap.set(tile.container, {
      x: tile.x + R(-50, 50),
      y: tile.y + R(-50, 50),
      alpha: R(0.0, 0.4),
    })
  })
}
