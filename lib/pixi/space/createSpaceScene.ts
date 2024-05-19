import gsap from 'gsap'
import { Application, Texture, TextureSource } from 'pixi.js'

import { createContainer } from '#pixi/system/createContainer'
import { createSprite } from '#pixi/system/createSprite'
import { createText } from '#pixi/system/createText'
import { createTexture } from '#pixi/system/createTexture'
import { SpaceObject, SpaceTimelines } from '#pixi/types'
import { R } from '#pixi/utils'
import { PixiConfig, SPACE_TIMELINE } from '#root/lib/constants'

const generateTimelines = () => {
  const timelines: SpaceTimelines = {
    [SPACE_TIMELINE.IDLE]: gsap.timeline({
      paused: true,
      repeatRefresh: true,
      repeatDelay: R(3, 10),
      repeat: -1,
    }),
  }

  return timelines
}

export const createSpaceScene = (app: Application) => {
  const { configSpaceIcons } = PixiConfig

  const spaceObjectPos: SpaceObject[] = []

  const baseTextures: TextureSource[] = configSpaceIcons.map(icon => {
    const text = createText({
      value: icon,
      size: R(5, 30),
    })
    const texture = createTexture({
      text,
      app,
    })
    text.destroy() // clean
    return texture.source
  })

  // create container and sprite for each space object
  let spaceObjectId = 0
  const heightDivider = app.renderer.height / (configSpaceIcons.length + 1)

  const randomizedDuplicatedBaseTextures = baseTextures.sort(() => 0.5 - Math.random())
  randomizedDuplicatedBaseTextures.forEach(texture => {
    const y = heightDivider * (spaceObjectId + 1) + R(-50, 50)

    const container = createContainer({
      x: -100,
      y,
      zIndex: R(5, 10),
    })

    const clonedTexture = Texture.from(texture)
    const sprite = createSprite({
      texture: clonedTexture,
    })

    const spaceObject = {
      id: (spaceObjectId += 1),
      x: 0,
      y,
      sprite,
      container,
      timelines: generateTimelines(),
    }

    app.stage.addChild(container)
    container.addChild(sprite)
    spaceObjectPos.push(spaceObject)
  })

  return spaceObjectPos
}
