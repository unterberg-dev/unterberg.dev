import { Sprite } from 'pixi.js'

export type Tile = {
  id: number
  sprite: Sprite
}

export type TileBase = {
  id: number
  x: number
  y: number
}
