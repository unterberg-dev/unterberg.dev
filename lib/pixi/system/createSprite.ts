import { Sprite, Texture } from "pixi.js"

export interface CreateSpriteProps {
  x?: number
  y?: number
  texture?: Texture
  width?: number
  alpha?: number
  height?: number
  anchor?: number
}

export const createSprite = ({
  x = 0,
  y = 0,
  texture,
  width = 10,
  height = 10,
  alpha = 1,
  anchor = 0.5,
}: CreateSpriteProps) => {
  const sprite = texture ? Sprite.from(texture) : Sprite.from(Texture.WHITE)
  sprite.x = x
  sprite.y = y
  sprite.width = width
  sprite.height = height
  sprite.alpha = alpha
  sprite.anchor.set(anchor)
  return sprite
}
