import { Application, Sprite, Texture } from 'pixi.js'

import { Tile, TileBase } from '#lib/types'
import createSprite from '#pixi/createSprite'

interface DrawTilesParams {
  tilesPos: TileBase[]
  tileWidth: number
  tileHeight: number
  tilesRef: React.MutableRefObject<Tile[]>
  appRef: React.MutableRefObject<Application>
  setupGsapTile: (tile: Sprite, originX: number, originY: number) => void
}

const drawTiles = ({
  tilesPos,
  tileWidth,
  tileHeight,
  tilesRef,
  appRef,
  setupGsapTile,
}: DrawTilesParams) => {
  tilesPos.forEach(({ id, x, y }) => {
    const sprite = createSprite({
      texture: Texture.WHITE,
      x,
      y,
      width: tileWidth,
      height: tileHeight,
      appRef,
    })

    tilesRef.current[id] = { id, sprite }
    setupGsapTile(sprite, x, y)
  })
}

export default drawTiles
