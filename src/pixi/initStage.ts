import { initUserEvents } from '#pixi/events'
import { createGrid } from '#pixi/grid/createGrid'
import { getDimensions } from '#pixi/grid/dimensions'
import { registerHitboxes } from '#pixi/grid/pointer'
import { createTileTimelines } from '#pixi/grid/timeline'
import { createSpaceScene } from '#pixi/space/createSpaceScene'
import { createSpaceTimelines } from '#pixi/space/timeline'
import { getStore, setStore } from '#pixi/store'
import { createApp } from '#pixi/system/createApp'
import { PixiConfig } from '#src/lib/constants'

export const initStage = async (stage: HTMLDivElement | null) => {
  if (!stage) return
  const { configCursorRadius } = PixiConfig

  // build stage, grid, text chunks
  const app = await createApp(stage)
  const { tileHeight, tileWidth } = getDimensions(app)

  const tiles = createGrid(app, tileWidth)
  const spaceObjects = createSpaceScene(app)
  // console.log(spaceObjects)

  // set the grid config
  setStore({
    app,
    stage,
    tiles,
    hitboxes: registerHitboxes(),
    rowsCount: Math.ceil(app.renderer.height / tileHeight),
    colsCount: Math.ceil(app.renderer.width / tileWidth),
    tileHeight,
    tileWidth,
    spaceObjects,
    hitboxPadding: tileWidth * configCursorRadius,
    cursorRadius: configCursorRadius,
  })

  // timeline setup
  createTileTimelines({ tiles })
  createSpaceTimelines({ spaceObjects })

  // trigger pointer events
  initUserEvents()

  const tileCounElement = document.querySelector<HTMLDivElement>('#tileCount')
  if (tileCounElement) {
    tileCounElement.textContent = `${tiles.length} sprites generated.`
  }

  // eslint-disable-next-line no-console
  console.log('grid', getStore())

  return getStore()
}
