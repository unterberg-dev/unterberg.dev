import { Application, Sprite, Texture } from 'pixi.js'

export interface createSpriteProps {
  texture: Texture | string
  x: number
  y: number
  width: number
  height: number
  origin?: number
  appRef: React.MutableRefObject<Application>
}

const createSprite = ({
  texture,
  x,
  y,
  width,
  height,
  origin = 0.5,
  appRef,
}: createSpriteProps) => {
  let sprite: Sprite

  if (!texture) {
    sprite = new Sprite()
  } else if (typeof texture === 'string') {
    sprite = new Sprite(Texture.from(texture as string))
  } else {
    sprite = Sprite.from(texture as Texture)
  }
  sprite.alpha = 0
  sprite.x = x
  sprite.y = y
  sprite.width = width
  sprite.height = height
  sprite.anchor.set(origin)
  appRef.current.stage.addChild(sprite)
  return sprite
}

export default createSprite
