import { Sprite, Texture } from 'pixi.js'

export interface CreateSpriteProps {
  x?: number
  y?: number
  texture: Texture
  width?: number
  height?: number
  anchor?: number
}

export const createSprite = ({
  x = 0,
  y = 0,
  texture,
  width = texture.width,
  height = texture.height,
  anchor = 0.5,
}: CreateSpriteProps) => {
  const sprite = Sprite.from(texture)
  sprite.x = x
  sprite.y = y
  sprite.width = width
  sprite.height = height
  sprite.anchor.set(anchor)
  return sprite
}
