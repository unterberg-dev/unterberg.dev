import createSprite from '@/components/pixi/createSprite'
import { Tile, TileBase } from '@/lib/types'
import { Application, Sprite, Texture } from 'pixi.js'

interface DrawTilesParams {
  tilesPos: TileBase[]
  tileWidth: number
  tileHeight: number
  tilesRef: React.MutableRefObject<Tile[]>
  appRef: React.MutableRefObject<Application>
  setupGsapTile: (sprite: Sprite, id: number) => void
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
    setupGsapTile(sprite, id)
  })
}

export default drawTiles
