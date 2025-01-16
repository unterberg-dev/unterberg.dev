import gsap from "gsap"

import { registerAutoPointer } from "#pixi/autoPointer"
import { registerUserEvents } from "#pixi/events"
import { createHitboxes } from "#pixi/pointer"
import createSpaceBg from "#pixi/spaceBg/createSpaceBg"
import createEmitterTiles from "#pixi/spawner/createEmitterTiles"
import { type Store, getStore, setStore } from "#pixi/store"
import { createApp } from "#pixi/system/createApp"
import { createTileGrid, getDimensions } from "#pixi/utils"
import { APP_CONFIG, PixiConfig } from "#root/lib/constants"

export const initStage = async (
  stage: HTMLDivElement | null,
  setPixiStage: React.Dispatch<React.SetStateAction<Store["stage"] | undefined>> | undefined,
) => {
  if (!stage) return

  // set store for react context
  if (setPixiStage) {
    setPixiStage(stage)
  }

  const app = await createApp(stage)
  const { tileHeight, tileWidth } = getDimensions(app)

  const tiles = createTileGrid(tileWidth, app.renderer.width, app.renderer.height)

  const hitboxes = createHitboxes()

  const store = {
    app,
    stage,
    tiles,
    hitboxes,
    rowsCount: Math.ceil(app.renderer.height / tileHeight),
    colsCount: Math.ceil(app.renderer.width / tileWidth),
    tileHeight,
    tileWidth,
    settingsHovered: false,
    ...PixiConfig, // todo: refactor to be a single store
  }
  setStore(store)

  await createEmitterTiles(app, tileWidth)
  await createSpaceBg(app)

  gsap.to(stage, { autoAlpha: 1, delay: 0.2, duration: APP_CONFIG.defaultDuration })

  // trigger pointer events
  registerUserEvents()
  registerAutoPointer({
    width: 300,
    height: 300,
    offsetY: -200,
  })

  // eslint-disable-next-line no-console
  console.log("grid", getStore())
}
