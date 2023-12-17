import { TILE_CONFIG } from '@/lib/constants'

type TileBase = {
  id: number
  x: number
  y: number
}

export const getCalculateTilePositions = (): TileBase[] => {
  const { width, height, gap, windowWidth, windowHeight } = TILE_CONFIG

  const effectiveWidth = width + gap
  const effectiveHeight = height + gap

  const columns = Math.floor((windowWidth - gap) / effectiveWidth)
  const rows = Math.floor((windowHeight - gap) / effectiveHeight)

  const xOffset = (windowWidth - (columns * effectiveWidth - gap)) / 2
  const yOffset = (windowHeight - (rows * effectiveHeight - gap)) / 2

  const tiles: TileBase[] = []
  for (let i = 0; i < rows; i += 1) {
    for (let j = 0; j < columns; j += 1) {
      const x = xOffset + j * effectiveWidth
      const y = yOffset + i * effectiveHeight
      const id = i * columns + j
      tiles.push({ id, x, y })
    }
  }

  return tiles
}

// const rowsCount = Math.floor(TILE_CONFIG.windowHeight / (TILE_CONFIG.height + TILE_CONFIG.gap))
export const colsCount = Math.floor(TILE_CONFIG.windowWidth / (TILE_CONFIG.width + TILE_CONFIG.gap))
export const rowsCount = Math.floor(
  TILE_CONFIG.windowHeight / (TILE_CONFIG.height + TILE_CONFIG.gap),
)

export const checkHoveredRectangle = (
  mouseX: number,
  mouseY: number,
  tiles: TileBase[],
): number | null => {
  const { width, height } = TILE_CONFIG

  for (let i = 0; i < tiles.length; i += 1) {
    const tile = tiles[i]
    const tileLeft = tile.x
    const tileRight = tile.x + width
    const tileTop = tile.y
    const tileBottom = tile.y + height

    if (mouseX >= tileLeft && mouseX <= tileRight && mouseY >= tileTop && mouseY <= tileBottom) {
      return tile.id
    }
  }

  return null
}
