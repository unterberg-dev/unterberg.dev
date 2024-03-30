import { getStore } from '#pixi/store'
import { Hitbox } from '#pixi/types'
import { TILE_TIMELINE } from '#src/lib/constants'
import { R } from '#src/utils'

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
  const { tiles, hitboxes, tileWidth, cursorRadius } = getStore()
  const noAcceleration = !accX && !accY

  triggerIDs.forEach(id => {
    const { timelines, setPosition } = tiles[id]

    // only fire n% of the time
    const debounce = Math.random() > 0.45
    if (debounce) return

    const movementX = accX || 0
    const movementY = accY || 0

    if (
      !timelines ||
      timelines[TILE_TIMELINE.HOVER_IN].isActive() ||
      timelines[TILE_TIMELINE.HOVER_OUT].isActive() ||
      timelines[TILE_TIMELINE.HITBOX_IN].isActive() ||
      timelines[TILE_TIMELINE.HITBOX_OUT].isActive() ||
      timelines[TILE_TIMELINE.POSITION].isActive()
    )
      return

    const clampedMovementX = Math.min(Math.max(movementX, -50), 50)
    const clampedMovementY = Math.min(Math.max(movementY, -50), 50)

    // todo: to constants
    const mouseMovementModifier = 3
    const outAccelerationModifier = 3.5

    const newX = mouseX + clampedMovementX * mouseMovementModifier
    const newY = mouseY + clampedMovementY * mouseMovementModifier

    const allActiveTilesSize = tileWidth * (cursorRadius * 2)
    const xPosition = newX + R(-allActiveTilesSize, allActiveTilesSize)
    const yPosition = newY + R(-allActiveTilesSize, allActiveTilesSize)

    const accXPosition = noAcceleration
      ? xPosition
      : xPosition + clampedMovementX * outAccelerationModifier + R(-tileWidth, tileWidth)
    const accYPosition = noAcceleration
      ? yPosition
      : yPosition + clampedMovementY * outAccelerationModifier + R(-tileWidth, tileWidth)

    const isInHitbox = hitboxes?.some(hitbox => {
      const minX = hitbox.x - tileWidth * cursorRadius
      const maxX = hitbox.x + hitbox.width + tileWidth * cursorRadius
      const minY = hitbox.y - tileWidth * cursorRadius
      const maxY = hitbox.y + hitbox.height + tileWidth * cursorRadius

      const isInXRange = accXPosition >= minX && accXPosition <= maxX
      const isInYRange = accYPosition >= minY && accYPosition <= maxY
      const isInHitbox = isInXRange && isInYRange

      return isInHitbox
    })

    if (!setPosition) return
    setPosition(xPosition, yPosition, accXPosition, accYPosition)

    if (isInHitbox) {
      timelines[TILE_TIMELINE.HITBOX_IN].restart()
    } else {
      timelines[TILE_TIMELINE.HOVER_IN].invalidate()
      timelines[TILE_TIMELINE.HOVER_IN].restart()
    }
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
  for (let col = startCol; col <= endCol; col++) {
    for (let row = startRow; row <= endRow; row++) {
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

  for (let i = 0; i < tileCount; i++) {
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

interface handlePointerMoveProps {
  manual?: {
    x: number
    y: number
  }
  event?: PointerEvent
}

let previousHoveredTileId: number | null = null

/**
 * Handles the pointer move event.
 * @param {PointerEvent} event - The pointer event.
 * @param  {Object} manual.x - The manual x and y coordinates.
 * @param {Object} manual.y - The manual x and y coordinates.
 */
export const handlePointerMove = ({ event, manual }: handlePointerMoveProps) => {
  const isManual = manual?.x && manual?.y
  const x = isManual ? manual.x : event?.clientX
  const y = isManual ? manual.y : event?.clientY
  const { cursorRadius } = getStore()

  if (!x || !y) return

  const currentHoveredTileId = getTileOnPointer(x, y)
  if (currentHoveredTileId === null || currentHoveredTileId === previousHoveredTileId) return

  previousHoveredTileId = currentHoveredTileId

  // get neighbouring tiles
  const neighbours = getNeighbors({
    mouseX: x,
    mouseY: y,
    radius: cursorRadius,
  })

  triggerAnimateHover({
    triggerIDs: neighbours,
    accX: event?.movementX,
    accY: event?.movementY,
    mouseX: x,
    mouseY: y,
  })
}

export const createHitboxes: () => Hitbox[] | undefined = () => {
  const hitboxes = document.querySelectorAll('.hitbox')
  if (!hitboxes || hitboxes.length === 0) return

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
