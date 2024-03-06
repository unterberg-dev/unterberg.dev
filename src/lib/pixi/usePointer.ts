import { useCallback, useEffect, useRef } from 'react'

import { HitboxType, Tile, TileBase } from '#lib/types'
import { getAllNeighbors } from '#pixi/gridFnc'
import useTileFx from '#pixi/useTileFx'
import useTileStore from '#zustand/useTileStore'

interface UsePointerProps {
  tilesPos: TileBase[]
  colsCount: number
  rowsCount: number
  bgTilesRef: React.MutableRefObject<Tile[]>
  tilesRef: React.MutableRefObject<Tile[]>
  hitboxes: HitboxType[]
}

const usePointer = ({
  tilesPos,
  colsCount,
  rowsCount,
  bgTilesRef,
  tilesRef,
  hitboxes,
}: UsePointerProps) => {
  const cursorRadius = useTileStore(state => state.cursorRadius)
  const cursorRadiusRef = useRef(cursorRadius)
  const tileWidth = useTileStore(state => state.tileWidth)
  const tileWidthRef = useRef(tileWidth)
  const tileHeight = useTileStore(state => state.tileHeight)
  const tileHeightRef = useRef(tileHeight)
  const scrollPosY = useTileStore(state => state.scrollPosY)
  const previewMode = useTileStore(state => state.previewMode)
  const isScrolling = useTileStore(state => state.isScrolling)

  useEffect(() => {
    cursorRadiusRef.current = cursorRadius
    tileWidthRef.current = tileWidth
    tileHeightRef.current = tileHeight
  }, [cursorRadius, tileHeight, tileWidth])

  const { animateIn, animateBgTileIn, animateHitboxIn, animateHitboxInAlt } = useTileFx({
    tiles: tilesPos,
  })

  const animateNeighbors = useCallback(
    (currentTarget: number) => {
      // todo: this must be improved!
      const toggleBgTargetNeighbors = getAllNeighbors({
        mouseX: tilesPos[currentTarget].x,
        mouseY: tilesPos[currentTarget].y,
        rowsCount,
        colsCount,
        radius: cursorRadius * 1.5,
        width: tileWidth,
        height: tileHeight,
      })
      const toggleTargetNeighbors = getAllNeighbors({
        mouseX: tilesPos[currentTarget].x,
        mouseY: tilesPos[currentTarget].y,
        rowsCount,
        colsCount,
        radius: cursorRadius,
        width: tileWidth,
        height: tileHeight,
      })

      // Convert toggleTargetNeighbors to a Set for faster lookup
      const targetSet = new Set(toggleTargetNeighbors)

      // Filter out numbers from toggleBgTargetNeighbors that exist in toggleTargetNeighbors
      const filteredArray = toggleBgTargetNeighbors.filter(number => !targetSet.has(number))

      filteredArray.forEach(bgTileId => {
        const currentPos = tilesPos[bgTileId]
        const tile = bgTilesRef.current[currentPos.id]

        if (cursorRadius < 2) {
          if (Math.random() < 0.3) {
            animateBgTileIn(tile.sprite)
          }
          return
        }
        if (Math.random() < 0.05) {
          animateBgTileIn(tile.sprite)
        }
      })

      const isInOuterHitbox = (posX: number, posY: number) =>
        hitboxes.some(
          hitbox =>
            posX >= hitbox.x - 80 &&
            posX <= hitbox.x + hitbox.width + 80 &&
            posY >= hitbox.y - scrollPosY - 80 &&
            posY <= hitbox.y - scrollPosY + hitbox.height + 80,
        )

      toggleTargetNeighbors.forEach(neighborId => {
        const currentPos = tilesPos[neighborId]
        const tile = tilesRef.current[currentPos.id]

        if (isScrolling) {
          return
        }

        // Check if the neighbor is within any hitbox
        const isInHitbox = hitboxes.some(
          hitbox =>
            currentPos.x >= hitbox.x &&
            currentPos.x <= hitbox.x + hitbox.width &&
            currentPos.y >= hitbox.y - scrollPosY &&
            currentPos.y <= hitbox.y - scrollPosY + hitbox.height,
        )

        const isNeighborInOuterHitbox = isInOuterHitbox(currentPos.x, currentPos.y)

        if (isNeighborInOuterHitbox && !isInHitbox && !previewMode) {
          const random40 = Math.random() < 0.4
          if (random40) {
            animateIn(tile.sprite, tile.id, tilesPos[neighborId].x, tilesPos[neighborId].y)
            return
          }
          const random85 = Math.random() < 0.5
          if (random85) {
            animateHitboxInAlt(tile.sprite, tile.id, tilesPos[neighborId].x, tilesPos[neighborId].y)
            return
          }
          animateHitboxIn(tile.sprite, tile.id, tilesPos[neighborId].x, tilesPos[neighborId].y)
          return
        }

        if (isInHitbox && !previewMode) {
          const random40 = Math.random() < 0.4
          if (random40) {
            animateHitboxInAlt(tile.sprite, tile.id, tilesPos[neighborId].x, tilesPos[neighborId].y)
            return
          }
          animateHitboxIn(tile.sprite, tile.id, tilesPos[neighborId].x, tilesPos[neighborId].y)
          return
        }

        if (previewMode) {
          if (Math.random() < 0.5) {
            animateIn(tile.sprite, tile.id, tilesPos[neighborId].x, tilesPos[neighborId].y)
            return
          }
        }
        if (!isNeighborInOuterHitbox && !isInHitbox) {
          if (cursorRadius < 1 && Math.random() < 1) {
            animateIn(tile.sprite, tile.id, tilesPos[neighborId].x, tilesPos[neighborId].y)
            return
          }
          if (cursorRadius < 2 && Math.random() < 0.75) {
            animateIn(tile.sprite, tile.id, tilesPos[neighborId].x, tilesPos[neighborId].y)
            return
          }
          if (cursorRadius >= 2 && Math.random() < 0.4) {
            animateIn(tile.sprite, tile.id, tilesPos[neighborId].x, tilesPos[neighborId].y)
          }
        }
      })
    },
    [
      tilesPos,
      rowsCount,
      colsCount,
      cursorRadius,
      tileWidth,
      tileHeight,
      bgTilesRef,
      animateBgTileIn,
      hitboxes,
      scrollPosY,
      tilesRef,
      isScrolling,
      previewMode,
      animateHitboxIn,
      animateIn,
      animateHitboxInAlt,
    ],
  )

  return {
    animateNeighbors,
  }
}

export default usePointer
