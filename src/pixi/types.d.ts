import { Sprite } from 'pixi.js'

export type Timelines = {
  [key in TIMELINE]: gsap.core.Timeline
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
  timelines?: Timelines
  setPosition?: SetPositionFncType
}
