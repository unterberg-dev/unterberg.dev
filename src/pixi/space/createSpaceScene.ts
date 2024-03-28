import { Application, Texture, TextureSource } from 'pixi.js'

import { createContainer } from '#pixi/system/createContainer'
import { createSprite } from '#pixi/system/createSprite'
import { createText } from '#pixi/system/createText'
import { createTexture } from '#pixi/system/createTexture'
import { SpaceObject } from '#pixi/types'
import { PixiConfig } from '#src/lib/constants'
import { R } from '#src/utils'

export const createSpaceScene = (app: Application) => {
  const { configSpaceIcons } = PixiConfig

  const spaceObjectPos: SpaceObject[] = []

  // pre convert text to texture to be only created once and then be cloned for each sprite
  const baseTextures: TextureSource[] = []
  for (const icon of configSpaceIcons) {
    const text = createText({
      value: icon,
      size: R(5, 30),
    })
    const texture = createTexture({
      text,
      app,
    })
    baseTextures.push(texture.source)
    text.destroy() // clean
  }

  // create container and sprite for each space object
  let spaceObjectId = 0
  const heightDivider = app.renderer.height / (configSpaceIcons.length + 1)

  const randomizedDuplicatedBaseTextures = baseTextures.sort(() => 0.5 - Math.random())
  randomizedDuplicatedBaseTextures.forEach(texture => {
    const y = heightDivider * (spaceObjectId + 1) + R(-50, 50)

    const container = createContainer({
      x: 0,
      y,
      zIndex: R(5, 10),
    })

    const clonedTexture = Texture.from(texture)
    const sprite = createSprite({
      texture: clonedTexture,
    })

    const spaceObject = {
      id: spaceObjectId++,
      x: 0,
      y,
      sprite,
      container,
    }

    app.stage.addChild(container)
    container.addChild(sprite)
    spaceObjectPos.push(spaceObject)
  })

  return spaceObjectPos
}
