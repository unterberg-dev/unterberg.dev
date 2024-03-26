import { Sprite, Texture } from 'pixi.js'

export interface CreateSpriteProps {
  x?: number
  y?: number
  texture: Texture
  width: number
  height: number
  anchor?: number
}

export const createSprite = ({ x = 0, y = 0, texture, anchor = 0.5 }: CreateSpriteProps) => {
  const sprite = Sprite.from(texture)
  // const sprite = new Sprite(Texture.WHITE)
  sprite.x = x
  sprite.y = y
  sprite.width = texture.width
  sprite.height = texture.height
  sprite.anchor.set(anchor)
  return sprite
}
