import gsap from 'gsap'

import { Tile } from '#components/pixi/types'
import { R } from '#pixi/utils'
import { IDLE_TILE_TIMELINE } from '#root/lib/constants'

interface CreateTileTimelinesProps {
  tiles: Tile[]
}

export const registerIdleTileTimelines = ({ tiles }: CreateTileTimelinesProps) => {
  const idleTiles: Tile[] = []
  tiles.forEach(tile => {
    const scaleIn = R(0.0, 0.15)

    /* SETUP */
    gsap.set(tile.innerContainer.scale, {
      x: scaleIn,
      y: scaleIn,
    })
    gsap.fromTo(
      tile.container,
      {
        alpha: 0,
        x: tile.x,
        y: tile.y + R(-50, -250),
      },
      {
        delay: R(0.0, 1),
        ease: 'bounce.out',
        x: tile.x + R(-50, 50),
        y: tile.y + R(-50, 50),
        alpha: R(0.0, 0.4),
        duration: R(2.15, 3),
      },
    )

    const { timelines } = tile
    if (!timelines) {
      return
    }

    // todo: constants
    // only fire n% of the time
    // todo: to constants
    const chance = Math.random() < 0.9
    if (!chance) return

    const idleDuration = R(1.4, 2.1)

    timelines[IDLE_TILE_TIMELINE.DEFAULT].to(
      tile.innerContainer,
      {
        alpha: R(0.1, 0.6),
        y: R(-30, 30),
        x: R(-30, 30),
        duration: idleDuration,
      },
      '>',
    )
    timelines[IDLE_TILE_TIMELINE.DEFAULT].to(
      tile.innerContainer,
      {
        duration: idleDuration,
        alpha: 0,
      },
      '>',
    )

    idleTiles.push(tile)
  })

  idleTiles.forEach(tile => {
    if (!tile.timelines) return
    tile.timelines[IDLE_TILE_TIMELINE.DEFAULT].play()
  })
}
