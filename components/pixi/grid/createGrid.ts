import gsap from 'gsap'
import { Application, Texture, TextureSource } from 'pixi.js'

import { createContainer } from '#components/pixi/system/createContainer'
import { createSprite } from '#components/pixi/system/createSprite'
import { createText } from '#components/pixi/system/createText'
import { createTexture } from '#components/pixi/system/createTexture'
import { Tile, TileIdleTimeline, TileTimelines } from '#pixi/types'
import { R } from '#pixi/utils'
import { IDLE_TILE_TIMELINE, PixiConfig, TILE_TIMELINE } from '#root/lib/constants'

const generateTimelines = (idle?: boolean) => {
  let tileIdleTimeline: TileIdleTimeline | undefined
  let tileTimelines: TileTimelines | undefined

  if (idle) {
    tileIdleTimeline = {
      [IDLE_TILE_TIMELINE.DEFAULT]: gsap.timeline({
        repeat: -1,
        yoyo: true,
        delay: R(1.1, 10.1),
        repeatDelay: R(4, 8),
        paused: true,
      }),
    }
  } else {
    tileTimelines = {
      [TILE_TIMELINE.HOVER_IN]: gsap.timeline({
        paused: true,
        onComplete: () => {
          if (!tileTimelines) return
          tileTimelines[TILE_TIMELINE.HOVER_OUT].invalidate()
          tileTimelines[TILE_TIMELINE.HOVER_OUT].restart()
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
          if (!tileTimelines) return
          tileTimelines[TILE_TIMELINE.HITBOX_OUT].invalidate()
          tileTimelines[TILE_TIMELINE.HITBOX_OUT].restart()
        },
      }),
      [TILE_TIMELINE.HITBOX_OUT]: gsap.timeline({
        paused: true,
      }),
    }
  }
  return tileTimelines || tileIdleTimeline
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
      const idle = Math.random() > 0.91

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
        timelines: generateTimelines(idle),
        idle,
      }

      app.stage.addChild(container)
      container.addChild(innerContainer)
      innerContainer.addChild(sprite)
      tilesPos.push(tile)
    }
  }

  return tilesPos
}
