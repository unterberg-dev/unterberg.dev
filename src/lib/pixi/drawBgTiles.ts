import { Application, Sprite, Texture } from 'pixi.js'

import { Tile, TileBase } from '#lib/types'
import createSprite from '#pixi/createSprite'

interface DrawBGTilesParams {
  tilesPos: TileBase[]
  colorVariationsDark: string[]
  tileWidth: number
  tileHeight: number
  bgTilesRef: React.MutableRefObject<Tile[]>
  appRef: React.MutableRefObject<Application>
  setupGsapBgTile: (sprite: Sprite) => void
}

const drawBGTiles = ({
  tilesPos,
  colorVariationsDark,
  tileWidth,
  tileHeight,
  bgTilesRef,
  appRef,
  setupGsapBgTile,
}: DrawBGTilesParams) => {
  tilesPos.forEach(({ id, x, y }) => {
    const randomColorIndex = Math.floor(Math.random() * colorVariationsDark.length)
    const selectedColor = colorVariationsDark[randomColorIndex]
    const tile = createSprite({
      texture: Texture.WHITE,
      x,
      y,
      width: tileWidth,
      height: tileHeight,
      appRef,
    })
    tile.tint = selectedColor
    tile.alpha = 0
    bgTilesRef.current.push({ id, sprite: tile })
    setupGsapBgTile(tile)
  })
}

export default drawBGTiles
