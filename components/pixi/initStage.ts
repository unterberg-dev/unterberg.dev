import gsap from 'gsap'

import { initAutoPointer } from '#components/pixi/autoPointer'
import { initUserEvents } from '#components/pixi/events'
import { createGrid } from '#components/pixi/grid/createGrid'
import { createHitboxes } from '#components/pixi/grid/pointer'
import { createTileTimelines } from '#components/pixi/grid/timeline'
import { createSpaceScene } from '#components/pixi/space/createSpaceScene'
import { createSpaceTimelines } from '#components/pixi/space/timeline'
import { setStore } from '#components/pixi/store'
import { createApp } from '#components/pixi/system/createApp'
import { getDimensions } from '#pixi/utils'
import { PixiConfig } from '#root/lib/constants'

export const initStage = async (stage: HTMLDivElement | null) => {
  if (!stage) return
  const { configCursorRadius } = PixiConfig

  // render timeout for mobile devices - pagespeed? :O
  const timeout = stage.clientWidth < 800 ? 4 : 0

  gsap.delayedCall(timeout, async () => {
    const app = await createApp(stage)
    const { tileHeight, tileWidth } = getDimensions(app)

    const tiles = createGrid(app, tileWidth)
    const spaceObjects = createSpaceScene(app)
    const hitboxes = createHitboxes()

    // set the grid config
    setStore({
      app,
      stage,
      tiles,
      hitboxes,
      rowsCount: Math.ceil(app.renderer.height / tileHeight),
      colsCount: Math.ceil(app.renderer.width / tileWidth),
      tileHeight,
      tileWidth,
      spaceObjects,
      hitboxPadding: tileWidth * configCursorRadius,
      cursorRadius: configCursorRadius,
    })

    // timelines setup
    createTileTimelines({ tiles })
    createSpaceTimelines({ spaceObjects })

    // trigger pointer events
    initUserEvents()

    initAutoPointer({
      width: 100,
      height: 100,
      offsetY: -200,
    })

    // eslint-disable-next-line no-console
    // console.log('grid', getStore())
  })
}
