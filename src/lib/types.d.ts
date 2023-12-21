import { Graphics, Sprite } from 'pixi.js'

export type Tile = {
  id: number
  sprite: Sprite
}

export type Line = {
  id: string
  graphics: Graphics
}

export type TileBase = {
  id: number
  x: number
  y: number
}

type HitboxType = {
  name: string
  x: number
  y: number
  width: number
  height: number
}
