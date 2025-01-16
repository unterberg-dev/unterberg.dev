import gsap from "gsap"
import { type Application, Texture } from "pixi.js"

import { PixiConfig } from "#lib/constants"
import { registerSpawnerTimelines } from "#pixi/spawner/registerSpawnerTimelines"
import { getAllSpritesheets } from "#pixi/spritesheet"
import { setEmitterStore } from "#pixi/store"
import { createContainer } from "#pixi/system/createContainer"
import { createSprite } from "#pixi/system/createSprite"
import type { EmitterTile } from "#pixi/types"
import { R } from "#pixi/utils"

const getEmitterTimeline = () =>
  gsap.timeline({
    paused: true,
    autoRemoveChildren: true,
    repeatRefresh: true,
  })

// todo: redundant to createTileGrid -> refactor to be a single function
// needs count and size as arguments - rely on constants mainly!
const createEmitterTiles = async (app: Application, tileSize: number) => {
  const tilesPos: EmitterTile[] = []

  // todo: constants
  const { bufferCount, scaleModifier } = PixiConfig.emitter

  const sheets = await getAllSpritesheets()
  const baseTextures = sheets.flatMap((sheet) => Object.values(sheet.sheet).map((texture) => texture))

  let tileId = 0
  for (let i = 0; i < bufferCount.value; i += 1) {
    const randomBaseTexture = baseTextures[Math.floor(Math.random() * baseTextures.length)]
    const clonedTexture = new Texture(randomBaseTexture)

    const container = createContainer({
      x: app.renderer.width / 2,
      y: app.renderer.height / 2,
      zIndex: R(5, 10),
    })

    const innerContainer = createContainer({
      x: 0,
      y: 0,
    })
    innerContainer.scale.set(
      (tileSize / (clonedTexture.frame.width * app.renderer.resolution)) * scaleModifier.value,
    )

    const sprite = createSprite({
      texture: clonedTexture,
      width: tileSize,
      height: tileSize,
      alpha: 0,
    })

    tileId += 1
    tilesPos.push({
      id: tileId,
      sprite,
      container,
      innerContainer,
      timeline: getEmitterTimeline(),
    })

    app.stage.addChild(container)
    container.addChild(innerContainer)
    innerContainer.addChild(sprite)
  }

  setEmitterStore({
    emitterTiles: tilesPos,
    activeEmitterTiles: new Set(),
  })
  for (const tile of tilesPos) {
    registerSpawnerTimelines({ timeline: tile.timeline, tile })
  }
}

export default createEmitterTiles
