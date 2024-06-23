import gsap from 'gsap'

import { registerAutoPointer } from '#pixi/autoPointer'
import { registerUserEvents } from '#pixi/events'
import { createHitboxes } from '#pixi/pointer'
import createEmitterTiles from '#pixi/spawner/createEmitterTiles'
import { getStore, setStore, Store } from '#pixi/store'
import { createApp } from '#pixi/system/createApp'
import { createTileGrid, getDimensions } from '#pixi/utils'
import { PixiConfig } from '#root/lib/constants'

export const initStage = async (
  stage: HTMLDivElement | null,
  setPixiStage: React.Dispatch<React.SetStateAction<Store['stage'] | undefined>> | undefined,
) => {
  if (!stage) return

  // set store for react context
  if (setPixiStage) {
    setPixiStage(stage)
  }

  // render timeout for mobile devices - pagespeed? :O
  const timeout = stage.clientWidth < 800 ? 4 : 2.3

  await gsap.delayedCall(import.meta.env.DEV ? 0 : timeout, async () => {
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
      ...PixiConfig,
    }
    setStore(store)

    await createEmitterTiles(app, tileWidth)

    gsap.to(stage, { autoAlpha: 1, delay: 0.2, duration: 2 })

    // trigger pointer events
    registerUserEvents()
    registerAutoPointer({
      width: 100,
      height: 100,
      offsetY: -200,
    })

    // eslint-disable-next-line no-console
    console.log('grid', getStore())
  })
}
