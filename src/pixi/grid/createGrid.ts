import { Application, Texture, TextureSource } from 'pixi.js'

import { createContainer } from '#pixi/system/createContainer'
import { createSprite } from '#pixi/system/createSprite'
import { createText } from '#pixi/system/createText'
import { createTexture } from '#pixi/system/createTexture'
import { Tile } from '#pixi/types'
import { PixiConfig } from '#src/lib/constants'
import { R } from '#src/utils'

export const createGrid = (app: Application, gridSize: number) => {
  const { configTileIcons: tileIcons } = PixiConfig

  const tilesPos: Tile[] = []

  const baseTextures: TextureSource[] = []
  for (const icon of tileIcons) {
    const text = createText({
      value: icon,
      size: gridSize,
    })
    const texture = createTexture({
      text,
      app,
    })
    baseTextures.push(texture.source)
    text.destroy() // clean
  }

  let tileId = 0

  for (let y = 0; y < app.renderer.height; y += gridSize) {
    for (let x = 0; x < app.renderer.width; x += gridSize) {
      const container = createContainer({
        x,
        y,
        zIndex: R(5, 10),
      })

      const innerContainer = createContainer({
        x: 0,
        y: 0,
      })

      const randomBaseTexture = baseTextures[Math.floor(Math.random() * baseTextures.length)]
      const clonedTexture = Texture.from(randomBaseTexture)

      const sprite = createSprite({
        texture: clonedTexture,
      })

      const tile: Tile = {
        id: tileId++,
        x,
        y,
        sprite,
        container,
        innerContainer,
      }

      app.stage.addChild(container)
      container.addChild(innerContainer)
      innerContainer.addChild(sprite)
      tilesPos.push(tile)
    }
  }

  return tilesPos
}
