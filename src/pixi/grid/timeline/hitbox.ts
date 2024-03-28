import { registerHitboxes } from '#pixi/grid/pointer'
import { getStore, setStore } from '#pixi/store'
import { Tile } from '#pixi/types'
import { R } from '#src/utils'

export const handleUpdateHitboxes = () => {
  const store = getStore()
  const newHitboxes = registerHitboxes()
  setStore({ ...store, hitboxes: newHitboxes })
}

interface RegisterTileHitboxInTimelineProps {
  tile: Tile
  timeline: gsap.core.Timeline
  inDuration: number
  inEase: string
  scaleIn: number
}

export const registerTileHitboxInTimeline = ({
  tile,
  timeline,
  inDuration,
  inEase,
  scaleIn,
}: RegisterTileHitboxInTimelineProps) => {
  timeline.set(tile.container, {
    x: tile.x,
    y: tile.y,
  })
  timeline.set(tile.container.scale, {
    x: 0,
    y: 0,
  })
  timeline.to(
    tile.container,
    {
      ease: inEase,
      alpha: R(0.1, 0.5),
      x: tile.x + R(-50, 50),
      y: tile.y + R(-50, 50),
      duration: inDuration,
    },
    '>',
  )
  timeline.to(
    tile.container.scale,
    {
      ease: inEase,
      duration: inDuration,
      x: scaleIn,
      y: scaleIn,
    },
    '<',
  )
}

interface RegisterHitboxOutTimelineProps {
  tile: Tile
  timeline: gsap.core.Timeline
  outDuration: number
  outEase: string
}

export const registerHitboxOutTimeline = ({
  tile,
  timeline,
  outDuration,
  outEase,
}: RegisterHitboxOutTimelineProps) => {
  timeline.to(
    tile.container,
    {
      ease: outEase,
      alpha: 0,
      duration: outDuration,
    },
    '>',
  )
  timeline.to(
    tile.container.scale,
    {
      ease: outEase,
      duration: outDuration,
      x: 0,
      y: 0,
    },
    '<',
  )
  timeline.set(
    tile.container,
    {
      alpha: 0,
      x: tile.x + R(-50, 50),
      y: tile.y + R(-50, 50),
    },
    '>',
  )
}
