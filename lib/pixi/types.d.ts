import type { Container, Sprite } from "pixi.js"

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

export type EmitterSetPositionFncType = (x: number, y: number, accX: number, accY: number) => void
export type EmitterSetPositionFncTypeExt = (
  x: number,
  y: number,
  accX: number,
  accY: number,
  mouseX: number,
  mouseY: number,
  id: number,
  isInHitbox: boolean,
) => void

export type EmitterTile = {
  id: number
  sprite: Sprite
  container: Container
  innerContainer: Container
  timeline: gsap.core.Timeline
  setPosition?: EmitterSetPositionFncTypeExt
}

export type SpaceSetPositionFncType = (x: number, y: number) => void
export type SpaceTile = {
  layer1: Sprite
  layer1ToX: gsap.QuickToFunc
  layer1ToY: gsap.QuickToFunc
  layer2: Sprite
  layer2ToX: gsap.QuickToFunc
  layer2ToY: gsap.QuickToFunc
}
