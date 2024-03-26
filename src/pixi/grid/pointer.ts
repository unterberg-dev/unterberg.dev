import { getStore } from '#pixi/store'
import { Hitbox } from '#pixi/types'
import { TIMELINE } from '#src/lib/constants'
import { R } from '#src/utils'

interface TriggerAnimateHoverProps {
  triggerIDs: number[]
  event: PointerEvent
  mouseX: number
  mouseY: number
}

export const triggerAnimateHover = ({
  triggerIDs,
  mouseX,
  mouseY,
  event,
}: TriggerAnimateHoverProps) => {
  const { tiles, hitboxes, tileWidth, cursorRadius } = getStore()

  triggerIDs.forEach(id => {
    const { timelines, setPosition } = tiles[id]

    // only fire n% of the time
    const debounce = Math.random() > 0.4
    if (debounce) return

    const movementX = event.movementX || 0
    const movementY = event.movementY || 0

    if (
      !timelines ||
      timelines[TIMELINE.HOVER_IN].isActive() ||
      timelines[TIMELINE.HOVER_OUT].isActive() ||
      timelines[TIMELINE.HITBOX_IN].isActive() ||
      timelines[TIMELINE.HITBOX_OUT].isActive()
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

    const accXPosition =
      xPosition + clampedMovementX * outAccelerationModifier + R(-tileWidth, tileWidth)
    const accYPosition =
      yPosition + clampedMovementY * outAccelerationModifier + R(-tileWidth, tileWidth)

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
      timelines[TIMELINE.HITBOX_IN].restart()
    } else {
      timelines[TIMELINE.HOVER_IN].restart()
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

let previousHoveredTileId: number | null = null
/**
 * Handles the pointer move event.
 *
 * @param boundingRect - The bounding rectangle of the element.
 * @param event - The pointer event.
 */
export const handlePointerMove = (event: PointerEvent) => {
  const mouseX = event.clientX
  const mouseY = event.clientY
  const { cursorRadius } = getStore()

  const currentHoveredTileId = getTileOnPointer(mouseX, mouseY)
  if (currentHoveredTileId === null || currentHoveredTileId === previousHoveredTileId) return

  previousHoveredTileId = currentHoveredTileId

  // get neighbouring tiles
  const neighbours = getNeighbors({
    mouseX,
    mouseY,
    radius: cursorRadius,
  })

  triggerAnimateHover({
    triggerIDs: neighbours,
    event,
    mouseX,
    mouseY,
  })
}

export const registerHitboxes: () => Hitbox[] | undefined = () => {
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
