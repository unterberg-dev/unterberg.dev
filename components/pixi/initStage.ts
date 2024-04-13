import { initAutoPointer } from '#components/pixi/autoPointer'
import { initUserEvents } from '#components/pixi/events'
import { createGrid } from '#components/pixi/grid/createGrid'
import { createHitboxes } from '#components/pixi/grid/pointer'
import { createTileTimelines } from '#components/pixi/grid/timeline'
import { createSpaceScene } from '#components/pixi/space/createSpaceScene'
import { createSpaceTimelines } from '#components/pixi/space/timeline'
import { getStore, setStore } from '#components/pixi/store'
import { createApp } from '#components/pixi/system/createApp'
import { getDimensions } from '#pixi/utils'
import { PixiConfig } from '#root/lib/constants'

export const initStage = async (stage: HTMLDivElement | null) => {
  if (!stage) return
  const { configCursorRadius } = PixiConfig

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

  // timeline setup
  createTileTimelines({ tiles })

  // trigger pointer events
  initUserEvents()

  createSpaceTimelines({ spaceObjects })
  initAutoPointer({
    width: app.renderer.width < 800 ? 300 : 500,
    height: app.renderer.width < 800 ? 200 : 300,
    offsetY: -300,
  })

  const countTilesTimelines = tiles.flatMap(
    tile => tile?.timelines && Object.entries(tile.timelines).map(([_, timeline]) => timeline),
  ).length

  const countSpaceTimelines = spaceObjects.flatMap(
    spaceObject =>
      spaceObject?.timelines &&
      Object.entries(spaceObject.timelines).map(([_, timeline]) => timeline),
  ).length

  const allTimelineCount = countTilesTimelines + countSpaceTimelines

  const tileCounElement = document.querySelector<HTMLDivElement>('#tileCount')
  if (tileCounElement) {
    tileCounElement.innerHTML += `${tiles.length} sprites generated. ${hitboxes?.length} hitboxes created. ${allTimelineCount} timelines created.`
  }

  // eslint-disable-next-line no-console
  console.log('grid', getStore())
}
