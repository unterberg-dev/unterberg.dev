import { Container, Sprite } from 'pixi.js'

import { EMITTER_TIMELINE } from '#root/lib/constants'

export type EmitterTimelines = {
  [key in EMITTER_TIMELINE]: gsap.core.Timeline
}

export type SetPositionFncType = (x: number, y: number, accX: number, accY: number) => void
export type SetPositionFncTypeExt = (
  x: number,
  y: number,
  accX: number,
  accY: number,
  mouseX: number,
  mouseY: number,
  id: number,
  isInHitbox: boolean,
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
}

export type EmitterTile = {
  id: number
  sprite: Sprite
  container: Container
  innerContainer: Container
  timelines: EmitterTimelines
  setPosition?: SetPositionFncTypeExt
}
