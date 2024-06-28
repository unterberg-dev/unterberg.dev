import spawnTile from '#pixi/spawner/spawnTile'
import { getStore, setStore } from '#pixi/store'
import { Hitbox } from '#pixi/types'
import { R } from '#pixi/utils'

export const createHitboxes: () => Hitbox[] | undefined = () => {
  const hitboxes = document.querySelectorAll('.pixi-hitbox ')
  if (!hitboxes || hitboxes.length === 0) return undefined

  return Object.values(hitboxes).flatMap((hitbox: Element) => {
    const { x, y, width, height } = hitbox.getBoundingClientRect()
    return {
      x,
      y,
      width,
      height,
    }
  })
}

export const handleUpdateHitboxes = (disable?: boolean) => {
  const store = getStore()
  const newHitboxes = createHitboxes()
  setStore({ ...store, hitboxes: disable ? undefined : newHitboxes })
}

interface TriggerAnimateHoverProps {
  triggerIDs: number[]
  event?: PointerEvent
  mouseX: number
  mouseY: number
  accX?: number
  accY?: number
}

export const triggerAnimateHover = ({
  triggerIDs,
  mouseX,
  mouseY,
  accX,
  accY,
}: TriggerAnimateHoverProps) => {
  const {
    hitboxes,
    tileWidth,
    emitter: {
      cursorRadius: { value: cursorRadius },
      gravity: { value: gravity },
      pointerInertia: { value: pointerMoveModifier },
      pointerMissRate: { value: pointerMissRate },
    },
  } = getStore()
  // only fire n% of the time
  // todo: to constants
  const chance = Math.random() < pointerMissRate
  if (chance) return

  triggerIDs.forEach(() => {
    const movementX = accX || 0
    const movementY = accY || 0

    const clampedMovementX = Math.min(Math.max(movementX, -50), 50)
    const clampedMovementY = Math.min(Math.max(movementY, -50), 50)

    const gravityModifier = gravity * R(100, 200)

    const newX = mouseX + clampedMovementX * pointerMoveModifier
    const newY = mouseY + clampedMovementY * pointerMoveModifier

    const pointerMomentumModifier = pointerMoveModifier * R(0.6, 1.1)

    const allActiveTilesSize = tileWidth * (cursorRadius * 2)
    const xPosition = newX + R(-allActiveTilesSize, allActiveTilesSize)
    const yPosition = newY + R(-allActiveTilesSize, allActiveTilesSize)

    const accXPosition =
      xPosition + clampedMovementX * pointerMomentumModifier + R(-tileWidth, tileWidth)
    const accYPosition =
      yPosition +
      clampedMovementY * pointerMomentumModifier +
      R(-tileWidth, tileWidth) +
      gravityModifier

    const isInHitbox = hitboxes?.some(hitbox => {
      const minX = hitbox.x - tileWidth * cursorRadius
      const maxX = hitbox.x + hitbox.width + tileWidth * cursorRadius
      const minY = hitbox.y - tileWidth * cursorRadius
      const maxY = hitbox.y + hitbox.height + tileWidth * cursorRadius

      const isInXRange = accXPosition >= minX && accXPosition <= maxX
      const isInYRange = accYPosition >= minY && accYPosition <= maxY
      const isInXYHitbox = isInXRange && isInYRange

      return isInXYHitbox
    })

    spawnTile({
      mouseX,
      mouseY,
      xPosition,
      yPosition,
      accXPosition,
      accYPosition,
      isInHitbox: !!isInHitbox,
    })
  })
}

interface GetAllNeighborsProps {
  mouseX: number
  mouseY: number
  radius: number
}
/**
 * Calculates the IDs of all the neighboring tiles within a given radius around a specified tile position.
 *
 * @param mouseX - The x-coordinate of the tile position.
 * @param mouseY - The y-coordinate of the tile position.
 * @param radius - The radius within which to find neighboring tiles.
 * @returns An array of IDs representing the neighboring tiles.
 */
export const getNeighbors = ({ mouseX, mouseY, radius }: GetAllNeighborsProps): number[] => {
  const { tileHeight, tileWidth, colsCount, rowsCount } = getStore()

  // todo: to constants
  const hitboxWidth = tileWidth * radius * 2 * 3
  const hitboxHeight = tileHeight * radius * 2 * 3

  const c = Math.floor(mouseX / tileWidth)
  const d = Math.floor(mouseY / tileHeight)

  const hitboxX = mouseX - tileWidth * radius
  const hitboxY = mouseY - tileHeight * radius

  const startCol = Math.max(0, Math.floor(hitboxX / tileWidth))
  const endCol = Math.min(colsCount - 1, Math.ceil((hitboxX + hitboxWidth) / tileWidth))
  const startRow = Math.max(0, Math.floor(hitboxY / tileHeight))
  const endRow = Math.min(rowsCount - 1, Math.ceil((hitboxY + hitboxHeight) / tileHeight))

  const neighbors: number[] = []
  for (let col = startCol; col <= endCol; col += 1) {
    for (let row = startRow; row <= endRow; row += 1) {
      const neighborPosition = row * colsCount + col
      const distance = Math.sqrt((c - col) ** 2 + (d - row) ** 2)

      if (distance <= radius) {
        neighbors.push(neighborPosition)
      }
    }
  }
  return neighbors
}

/**
 * Checks mouse pointer is hovering over a rectangle tile.
 *
 * @param mouseX - The x-coordinate of the mouse pointer.
 * @param mouseY - The y-coordinate of the mouse pointer.
 * @returns The id of the tile if the mouse pointer is hovering over it, otherwise null.
 */
export const getTileOnPointer = (mouseX: number, mouseY: number): number | null => {
  const { tiles, tileWidth, tileHeight } = getStore()
  const tileCount = tiles.length

  for (let i = 0; i < tileCount; i += 1) {
    const tile = tiles[i]
    const tileLeft = tile.x
    const tileRight = tile.x + tileWidth
    const tileTop = tile.y
    const tileBottom = tile.y + tileHeight

    if (mouseX >= tileLeft && mouseX <= tileRight && mouseY >= tileTop && mouseY <= tileBottom) {
      return tile.id
    }
  }
  return null
}

interface HandlePointerMoveProps {
  x: number
  y: number
}

// Global variables to keep track of the previous cursor position and the previous hovered tile ID
let previousX: number | null = null
let previousY: number | null = null
let previousHoveredTileId: number | null = null

/**
 * Handles the pointer move event.
 * @param {Object} props - The function parameters.
 * @param {number} props.clientX - The x coordinate of the pointer.
 * @param {number} props.clientY - The y coordinate of the pointer.
 * @param {Object} [manual] - The manual x and y coordinates.
 * @param {number} [manual.x] - The manual x coordinate.
 * @param {number} [manual.y] - The manual y coordinate.
 */
export const handlePointerMove = ({ x, y }: HandlePointerMoveProps) => {
  // Determine if manual coordinates are provided
  const cursorRadius = getStore().emitter.cursorRadius.value

  // Return early if x or y are not defined
  if (x == null || y == null) return

  // Calculate acceleration based on the difference between the current and previous coordinates
  let accX = 0
  let accY = 0
  if (previousX !== null && previousY !== null) {
    accX = x - previousX
    accY = y - previousY
  }

  // Update the previous coordinates for the next movement
  previousX = x
  previousY = y

  // Get the current hovered tile ID
  const currentHoveredTileId = getTileOnPointer(x, y)
  if (currentHoveredTileId === null || currentHoveredTileId === previousHoveredTileId) return

  previousHoveredTileId = currentHoveredTileId

  // Get neighbouring tiles
  const neighbours = getNeighbors({
    mouseX: x,
    mouseY: y,
    radius: cursorRadius,
  })

  // Trigger animation with the calculated acceleration and current coordinates
  triggerAnimateHover({
    triggerIDs: neighbours,
    accX,
    accY,
    mouseX: x,
    mouseY: y,
  })
}
