import gsap from 'gsap'
import { Application, Texture, TextureSource } from 'pixi.js'

import { createContainer } from '#components/pixi/system/createContainer'
import { createSprite } from '#components/pixi/system/createSprite'
import { createText } from '#components/pixi/system/createText'
import { createTexture } from '#components/pixi/system/createTexture'
import { Tile, TileTimelines } from '#components/pixi/types'
import { R } from '#pixi/utils'
import { PixiConfig, TILE_TIMELINE } from '#root/lib/constants'

/* todo:
the current setup does create all timelines for all tiles, this is not necessary
to save this computation time we need a property which declares if the tile is a "idle-tile" or a "hover-tile"
so we could skip the hover-tile setup for idle-tiles and vice versa
then we could remove a lot of .isActive() checks in the timeline play triggers
*/
const generateTimelines = () => {
  const timelines: TileTimelines = {
    [TILE_TIMELINE.HOVER_IN]: gsap.timeline({
      paused: true,
      onComplete: () => {
        timelines[TILE_TIMELINE.HOVER_OUT].invalidate()
        timelines[TILE_TIMELINE.HOVER_OUT].restart()
      },
    }),
    [TILE_TIMELINE.POSITION]: gsap.timeline({
      paused: true,
      autoRemoveChildren: true,
    }),
    [TILE_TIMELINE.HOVER_OUT]: gsap.timeline({
      paused: true,
    }),
    [TILE_TIMELINE.HITBOX_IN]: gsap.timeline({
      paused: true,
      onComplete: () => {
        timelines[TILE_TIMELINE.HITBOX_OUT].invalidate()
        timelines[TILE_TIMELINE.HITBOX_OUT].restart()
      },
    }),
    [TILE_TIMELINE.HITBOX_OUT]: gsap.timeline({
      paused: true,
    }),
    [TILE_TIMELINE.IDLE]: gsap.timeline({
      repeat: -1,
      yoyo: true,
      delay: R(1.1, 10.1),
      repeatDelay: R(2, 8),
      paused: true,
    }),
  }
  return timelines
}

export const createGrid = (app: Application, gridSize: number) => {
  const { configTileIcons: tileIcons } = PixiConfig

  const tilesPos: Tile[] = []

  /* todo: test if this text-texture-sprite conversion affects the SEO TBT score */
  const baseTextures: TextureSource[] = tileIcons.map(icon => {
    const text = createText({
      value: icon,
      size: gridSize,
    })
    const texture = createTexture({
      text,
      app,
    })
    text.destroy() // clean
    return texture.source
  })

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
        id: (tileId += 1),
        x,
        y,
        sprite,
        container,
        innerContainer,
        timelines: generateTimelines(),
      }

      app.stage.addChild(container)
      container.addChild(innerContainer)
      innerContainer.addChild(sprite)
      tilesPos.push(tile)
    }
  }

  return tilesPos
}
