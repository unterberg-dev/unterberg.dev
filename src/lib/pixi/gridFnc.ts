import { TileBase } from '#lib/types'

interface GetCalculateTilePositionsProps {
  stageWidth: number
  stageHeight: number
  width: number
  height: number
}

/**
 * Calculates the positions of tiles within a grid based on the provided dimensions and stage size.
 *
 * @param {GetCalculateTilePositionsProps} props - The properties needed to calculate the tile positions.
 * @returns array of TileBase objects representing the calculated tile positions.
 */
export const getCalculateTilePositions = ({
  stageWidth,
  stageHeight,
  width,
  height,
}: GetCalculateTilePositionsProps): TileBase[] => {
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

/**
 * Checks if the mouse pointer is hovering over a rectangle tile.
 *
 * @param mouseX - The x-coordinate of the mouse pointer.
 * @param mouseY - The y-coordinate of the mouse pointer.
 * @param tiles - An array of TileBase objects representing the tiles.
 * @param width - The width of each tile.
 * @param height - The height of each tile.
 * @returns The id of the tile if the mouse pointer is hovering over it, otherwise null.
 */
export const checkHoveredRectangle = (
  mouseX: number,
  mouseY: number,
  tiles: TileBase[],
  width: number,
  height: number,
): number | null => {
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
  radius: number
  width: number
  height: number
}

/**
 * Calculates the IDs of all the neighboring tiles within a given radius around a specified tile position.
 *
 * @param mouseX - The x-coordinate of the tile position.
 * @param mouseY - The y-coordinate of the tile position.
 * @param rowsCount - The total number of rows in the grid.
 * @param colsCount - The total number of columns in the grid.
 * @param manualHitboxX - The x-coordinate of the manual hitbox reference point (optional).
 * @param manualHitboxY - The y-coordinate of the manual hitbox reference point (optional).
 * @param radius - The radius within which to find neighboring tiles.
 * @param width - The width of each tile.
 * @param height - The height of each tile.
 * @returns An array of IDs representing the neighboring tiles.
 */
export const getAllNeighbors = ({
  mouseX,
  mouseY,
  rowsCount,
  colsCount,
  manualHitboxX,
  manualHitboxY,
  radius,
  width,
  height,
}: getAllNeighborsProps): number[] => {
  const hitboxWidth = width * radius * 2 * 3
  const hitboxHeight = height * radius * 2 * 3

  const c = Math.floor(mouseX / width)
  const d = Math.floor(mouseY / height)

  const hitboxRefX = manualHitboxX || mouseX
  const hitboxRefY = manualHitboxY || mouseY

  // move hitbox
  const hitboxX = hitboxRefX - width * radius
  const hitboxY = hitboxRefY - height * radius

  // Calculate the range of neighbors within the hitbox boundaries
  const startCol = Math.max(0, Math.floor(hitboxX / width))
  const endCol = Math.min(colsCount - 1, Math.ceil((hitboxX + hitboxWidth) / width))
  const startRow = Math.max(0, Math.floor(hitboxY / height))
  const endRow = Math.min(rowsCount - 1, Math.ceil((hitboxY + hitboxHeight) / height))

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

/**
 * Calculates the outline targets for a given center tile in a grid.
 *
 * @param center - The index of the center tile.
 * @param colsCount - The number of columns in the grid.
 * @param margin - The margin around the center tile.
 * @returns An array of tile indices representing the outline targets.
 */
export const getOutlineTargets = (center: number, colsCount: number, margin: number) => {
  const targets = []
  const x0 = center % colsCount
  const y0 = Math.floor(center / colsCount)

  // circluar
  for (let x = x0 - margin; x <= x0 + margin; x += 1) {
    for (let y = y0 - margin; y <= y0 + margin; y += 1) {
      const distance = Math.sqrt((x - x0) ** 2 + (y - y0) ** 2)

      if (distance > margin - 1 && distance < margin + 1) {
        if (x >= 0 && x < colsCount && y >= 0 && y < Math.ceil(center / colsCount)) {
          const tileId = x + y * colsCount
          targets.push(tileId)
        }
      }
    }
  }

  // rectangular
  // for (let dx = -margin; dx <= margin; dx += 1) {
  //   for (let dy = -margin; dy <= margin; dy += 1) {
  //     const isOnBorder = Math.abs(dx) === margin || Math.abs(dy) === margin
  //     const isInnerTile = Math.abs(dx) < margin && Math.abs(dy) < margin

  //     if (
  //       (isOnBorder && !isInnerTile) ||
  //       (isInnerTile && dx * dx + dy * dy === margin * margin)
  //     ) {
  //       const x = x0 + dx
  //       const y = y0 + dy

  //       if (
  //         x >= 0 &&
  //         x < colsCountDirect &&
  //         y >= 0 &&
  //         y < Math.ceil(center / colsCountDirect)
  //       ) {
  //         targets.push(x + y * colsCountDirect)
  //       }
  //     }
  //   }
  // }

  const upperHalfLength = targets.length
  for (let i = upperHalfLength - 1; i >= 0; i -= 1) {
    const tileId: number = targets[i]
    const tileX = tileId % colsCount
    const tileY = Math.floor(tileId / colsCount)
    const mirroredY = 2 * y0 - tileY

    // Calculate the tile ID for the lower half
    const lowerHalfTileId = tileX + mirroredY * colsCount

    if (!targets.includes(lowerHalfTileId)) {
      targets.push(lowerHalfTileId)
    }
  }

  // Sort the targets in clockwise order
  targets.sort((idA, idB) => {
    const tileA = { x: idA % colsCount, y: Math.floor(idA / colsCount) }
    const tileB = { x: idB % colsCount, y: Math.floor(idB / colsCount) }

    // Calculate angles and compare for sorting clockwise
    const angleA = Math.atan2(tileA.y - y0, tileA.x - x0)
    const angleB = Math.atan2(tileB.y - y0, tileB.x - x0)

    return angleA - angleB
  })

  return targets
}
