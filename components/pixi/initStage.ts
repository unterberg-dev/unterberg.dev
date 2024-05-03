import gsap from 'gsap'

import { registerAutoPointer } from '#components/pixi/autoPointer'
import { registerUserEvents } from '#components/pixi/events'
import { createSpaceScene } from '#components/pixi/space/createSpaceScene'
import { setEmitterStore, setStore, Store } from '#components/pixi/store'
import { createApp } from '#components/pixi/system/createApp'
import { createTileGrid } from '#pixi/grid/createTileGrid'
import { registerIdleTileTimelines } from '#pixi/grid/registerIdleTileTimelines'
import { createHitboxes } from '#pixi/pointer'
import { initStartSpaceTimelines } from '#pixi/space/initStartSpaceTimelines'
import createEmitterTiles from '#pixi/spawner/createEmitterTiles'
import { registerSpawnerTimelines } from '#pixi/spawner/registerSpawnerTimelines'
import { getDimensions } from '#pixi/utils'
import { EMITTER_TIMELINE, PixiConfig } from '#root/lib/constants'

export const initStage = async (
  stage: HTMLDivElement | null,
  setPixiStage: React.Dispatch<React.SetStateAction<Store['stage'] | undefined>> | undefined,
) => {
  if (!stage) return
  const { configCursorRadius } = PixiConfig

  // set store for react context
  setPixiStage?.(stage)

  // render timeout for mobile devices - pagespeed? :O
  const timeout = stage.clientWidth < 800 ? 4 : 2.3

  await gsap.delayedCall(timeout, async () => {
    const app = await createApp(stage)
    const { tileHeight, tileWidth } = getDimensions(app)

    const tiles = createTileGrid(app, tileWidth)
    const spaceObjects = createSpaceScene(app)
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
      spaceObjects,
      cursorRadius: configCursorRadius,
    }

    // set the grid config
    setStore(store)

    // tile timelines setup
    registerIdleTileTimelines({ tiles })
    initStartSpaceTimelines({ spaceObjects })

    const emitterTiles = createEmitterTiles(app, tileWidth)
    setEmitterStore({
      emitterTiles,
      activeEmitterTiles: new Set(),
    })
    emitterTiles.forEach(tile => {
      registerSpawnerTimelines({ timeline: tile.timelines[EMITTER_TIMELINE.DEFAULT], tile })
    })

    // trigger pointer events
    registerUserEvents()

    registerAutoPointer({
      width: 100,
      height: 100,
      offsetY: -200,
    })

    // eslint-disable-next-line no-console
    // console.log('grid', getStore())
  })
}
