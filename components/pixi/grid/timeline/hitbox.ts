import { createHitboxes } from '#components/pixi/grid/pointer'
import { getStore, setStore } from '#components/pixi/store'
import { Tile } from '#components/pixi/types'
import { R } from '#pixi/utils'

export const handleUpdateHitboxes = () => {
  const store = getStore()
  const newHitboxes = createHitboxes()
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
  timeline.set(tile.innerContainer.scale, {
    x: 0,
    y: 0,
  })
  timeline.set(tile.innerContainer, {
    alpha: 0,
  })
  timeline.to(
    tile.container,
    {
      ease: inEase,
      x: tile.x + R(-50, 50),
      y: tile.y + R(-50, 50),
      duration: inDuration,
    },
    '>',
  )
  timeline.to(
    tile.innerContainer,
    {
      ease: inEase,
      alpha: R(0.1, 0.5),
      duration: inDuration,
    },
    '<',
  )
  timeline.to(
    tile.innerContainer.scale,
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
    tile.innerContainer,
    {
      ease: outEase,
      alpha: 0,
      duration: outDuration,
    },
    '>',
  )
  timeline.to(
    tile.innerContainer.scale,
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
      x: tile.x + R(-50, 50),
      y: tile.y + R(-50, 50),
    },
    '>',
  )
  timeline.set(
    tile.innerContainer,
    {
      alpha: 0,
    },
    '<',
  )
}
