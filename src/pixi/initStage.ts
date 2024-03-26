import { createGrid } from '#pixi/grid/createGrid'
import { getDimensions } from '#pixi/grid/dimensions'
import { initUserEvents } from '#pixi/grid/events'
import { registerHitboxes } from '#pixi/grid/pointer'
import { createTimelines } from '#pixi/grid/timeline'
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
  const hitboxes = registerHitboxes()

  const hitboxPadding = tileWidth * configCursorRadius

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
    hitboxPadding,
    cursorRadius: configCursorRadius,
  })

  createTimelines({ tiles })

  // trigger pointer events
  initUserEvents()

  const tileCounElement = document.querySelector<HTMLDivElement>('#tileCount')
  if (tileCounElement) {
    tileCounElement.textContent = `currently ${tiles.length} sprites generated.`
  }

  // eslint-disable-next-line no-console
  console.log('grid', getStore())

  return getStore()
}
