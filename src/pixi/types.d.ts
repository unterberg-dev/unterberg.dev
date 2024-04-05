import { Sprite } from 'pixi.js'

import { SPACE_TIMELINE, TILE_TIMELINE } from '#src/lib/constants'

export type TileTimelines = {
  [key in TILE_TIMELINE]: gsap.core.Timeline
}

export type SpaceTimelines = {
  [key in SPACE_TIMELINE]: gsap.core.Timeline
}

export type SetPositionFncType = (
  mouseX: number,
  mouseY: number,
  movementX: number,
  movementY: number,
) => void

export type Hitbox = {
  x: number
  y: number
  width: number
  height: number
}

export type Tile = {
  id: number
  x: number
  y: number
  sprite: Sprite
  container: Container
  innerContainer: Container
  // atm optional, since we register the timelines after the tile is created
  // since it's locked with a enum, we can't a empty array
  // fix to remove these undefined checks later in the code
  timelines?: TileTimelines
  setPosition?: SetPositionFncType
}

export type SpaceObject = {
  id: number
  x: number
  y: number
  timelines?: SpaceTimelines
  sprite: Sprite
  container: Container
}
