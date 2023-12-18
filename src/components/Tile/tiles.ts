import { APP_CONFIG, TILE_CONFIG } from '@/lib/constants'
import { Sprite } from 'pixi.js'

export type Tile = {
  id: number
  sprite: Sprite
}

export type TileBase = {
  id: number
  x: number
  y: number
}

interface GetCalculateTilePositionsProps {
  stageWidth: number
  stageHeight: number
}

export const getCalculateTilePositions = ({
  stageWidth,
  stageHeight,
}: GetCalculateTilePositionsProps): TileBase[] => {
  const { width, height } = TILE_CONFIG

  const effectiveWidth = width
  const effectiveHeight = height

  const columns = Math.floor(stageWidth / effectiveWidth)
  const rows = Math.floor(stageHeight / effectiveHeight)

  const xOffset = (stageWidth - columns * effectiveWidth) / 2
  const yOffset = (stageHeight - rows * effectiveHeight) / 2

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

interface getAllNeighborsProps {
  mouseX: number
  mouseY: number
  rowsCount: number
  colsCount: number
  manualHitboxX?: number
  manualHitboxY?: number
}

export const getAllNeighbors = ({
  mouseX,
  mouseY,
  rowsCount,
  colsCount,
  manualHitboxX,
  manualHitboxY,
}: getAllNeighborsProps): number[] => {
  const hitboxWidth = TILE_CONFIG.width * APP_CONFIG.hoverCircleCount * 2 * 2
  const hitboxHeight = TILE_CONFIG.height * APP_CONFIG.hoverCircleCount * 2 * 2
  const radius = APP_CONFIG.hoverCircleCount // Set the radius of your circle

  const c = Math.floor(mouseX / TILE_CONFIG.width)
  const d = Math.floor(mouseY / TILE_CONFIG.height)

  const hitboxRefX = manualHitboxX || mouseX
  const hitboxRefY = manualHitboxY || mouseY

  // move hitbox
  const hitboxX = hitboxRefX - TILE_CONFIG.width * radius
  const hitboxY = hitboxRefY - TILE_CONFIG.height * radius

  // Calculate the range of neighbors within the hitbox boundaries
  const startCol = Math.max(0, Math.floor(hitboxX / TILE_CONFIG.width))
  const endCol = Math.min(colsCount - 1, Math.ceil((hitboxX + hitboxWidth) / TILE_CONFIG.width))
  const startRow = Math.max(0, Math.floor(hitboxY / TILE_CONFIG.height))
  const endRow = Math.min(rowsCount - 1, Math.ceil((hitboxY + hitboxHeight) / TILE_CONFIG.height))

  const neighbors: number[] = []
  for (let col = startCol; col <= endCol; col += 1) {
    for (let row = startRow; row <= endRow; row += 1) {
      const neighborPosition = row * colsCount + col
      const distance = Math.sqrt((c - col) ** 2 + (d - row) ** 2)

      if (distance <= radius) {
        const id = neighborPosition
        neighbors.push(id)
      }
    }
  }

  return neighbors
}
