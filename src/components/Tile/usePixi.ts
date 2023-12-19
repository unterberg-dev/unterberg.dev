import { useApp } from '@pixi/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Sprite, Texture } from 'pixi.js'
import gsap from 'gsap'
import PixiPlugin from 'gsap/PixiPlugin'
import * as PIXI from 'pixi.js'
import {
  Tile,
  checkHoveredRectangle,
  getAllNeighbors,
  getCalculateTilePositions,
} from '@/components/Tile/tiles'
import debounce from 'lodash/debounce'
import useTileFx from '@/components/Tile/useTileFx'
import useTileStore from '@/src/zustand/useTileStore'

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

interface UsePixiProps {
  stageWidth: number
  stageHeight: number
}

const usePixi = ({ stageWidth, stageHeight }: UsePixiProps) => {
  const app = useApp()
  const appRef = useRef(app)
  const tilesRef = useRef<Tile[]>([])
  const previouslyHoveredTileId = useRef<number | null>(null)
  const cursorRadius = useTileStore(state => state.cursorRadius)
  const idleLoopDuration = useTileStore(state => state.idleLoopDuration)
  const tileWidth = useTileStore(state => state.tileWidth)
  const tileHeight = useTileStore(state => state.tileHeight)
  const previewMode = useTileStore(state => state.previewMode)

  const [isCursorMoving, setIsCursorMoving] = useState(false)

  const handleCursorMoveTimeout = debounce(() => {
    setIsCursorMoving(false)
  }, idleLoopDuration)

  const colsCount = useMemo(() => Math.floor(stageWidth / tileWidth), [stageWidth, tileWidth])
  const rowsCount = useMemo(() => Math.floor(stageHeight / tileHeight), [stageHeight, tileHeight])

  const tilesPos = useMemo(
    () =>
      stageWidth && stageHeight
        ? getCalculateTilePositions({
            stageWidth,
            stageHeight,
            width: tileWidth,
            height: tileHeight,
          })
        : [],
    [stageHeight, stageWidth, tileHeight, tileWidth],
  )

  const { setupGsapTile, animateIn } = useTileFx({ tiles: tilesPos, tilesRef: tilesRef.current })

  interface createSpriteProps {
    texture: Texture | string
    x: number
    y: number
    width: number
    height: number
  }

  const createSprite = useCallback(({ texture, x, y, width, height }: createSpriteProps) => {
    let sprite: Sprite

    if (!texture) {
      sprite = new Sprite()
    } else if (typeof texture === 'string') {
      sprite = new Sprite(Texture.from(texture as string))
    } else {
      sprite = Sprite.from(texture as Texture)
    }

    sprite.x = x
    sprite.y = y
    sprite.width = width
    sprite.height = height
    sprite.anchor.set(0.5)
    appRef.current.stage.addChild(sprite)
    return sprite
  }, [])

  const frameRef = useRef(0)

  const getCenterTileId = useCallback(() => {
    const centerID = checkHoveredRectangle(
      stageWidth / 2,
      stageHeight / 2,
      tilesPos,
      tileWidth,
      tileHeight,
    )
    return centerID || 0
  }, [stageHeight, stageWidth, tileHeight, tileWidth, tilesPos])

  const init = useCallback(() => {
    window.cancelAnimationFrame(frameRef.current)
    appRef.current.stage.removeChildren()
    appRef.current.ticker.stop()
    appRef.current.stage.sortableChildren = true

    gsap.ticker.remove(() => {
      appRef.current.ticker.update()
    })

    frameRef.current = window.requestAnimationFrame(() => {
      gsap.ticker.add(() => {
        if (appRef.current.ticker) {
          appRef.current.ticker.update()
        }
      })
    })

    tilesPos.forEach(({ id, x, y }) => {
      const sprite = createSprite({
        // texture: 'https://pixijs.io/examples/examples/assets/bunny.png',
        texture: Texture.WHITE,
        x,
        y,
        width: tileWidth,
        height: tileHeight,
      })

      tilesRef.current[id] = { id, sprite }
      setupGsapTile(sprite, id)
    })
  }, [createSprite, setupGsapTile, tileHeight, tileWidth, tilesPos])

  const destroy = useCallback(() => {
    if (appRef.current.stage) {
      appRef.current.stage.removeChildren()
    }
    window.cancelAnimationFrame(frameRef.current)
    if (PIXI.utils.TextureCache) {
      Object.keys(PIXI.utils.TextureCache).forEach(texture => {
        if (PIXI.utils.TextureCache[texture]) {
          PIXI.utils.TextureCache[texture].destroy(true)
        }
      })
    }
  }, [])

  useEffect(() => {
    if (previewMode) {
      previouslyHoveredTileId.current = getCenterTileId()
    }
  }, [getCenterTileId, previewMode])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (previewMode) {
        return
      }

      const mouseX = e.pageX
      const mouseY = e.pageY
      const lastKnownTileId = previouslyHoveredTileId.current
      const currentHoveredTileId = checkHoveredRectangle(
        mouseX,
        mouseY,
        tilesPos,
        tileWidth,
        tileHeight,
      )

      if (currentHoveredTileId === null && lastKnownTileId !== null) {
        previouslyHoveredTileId.current = null
        return
      }

      setIsCursorMoving(true)
      handleCursorMoveTimeout()

      if (currentHoveredTileId !== null && currentHoveredTileId !== lastKnownTileId) {
        const neighbors = getAllNeighbors({
          mouseX,
          mouseY,
          rowsCount,
          colsCount,
          radius: cursorRadius,
          width: tileWidth,
          height: tileHeight,
        })
        neighbors.forEach(neighborId => {
          const tile = tilesRef.current[neighborId]

          if (tile) {
            animateIn(
              tile.sprite,
              tile.id,
              tilesPos[currentHoveredTileId].x,
              tilesPos[currentHoveredTileId].y,
            )
          }
        })

        previouslyHoveredTileId.current = currentHoveredTileId
      }
    },
    [
      animateIn,
      colsCount,
      cursorRadius,
      handleCursorMoveTimeout,
      previewMode,
      rowsCount,
      tileHeight,
      tileWidth,
      tilesPos,
    ],
  )

  useEffect(() => {
    window.addEventListener('pointermove', handleMouseMove)
    window.addEventListener('pointerdown', handleMouseMove)

    return () => {
      window.removeEventListener('pointermove', handleMouseMove)
      window.removeEventListener('pointerdown', handleMouseMove)
    }
  }, [handleMouseMove, init])

  // const getTargetsInMargin = useCallback(
  //   (center: number, colsCountDirect: number, margin: number) => {
  //     const targets = []
  //     const x0 = center % colsCountDirect
  //     const y0 = Math.floor(center / colsCountDirect)

  //     for (let dx = -margin; dx <= margin; dx += 1) {
  //       for (let dy = -margin; dy <= margin; dy += 1) {
  //         const isOnBorder = Math.abs(dx) === margin || Math.abs(dy) === margin // Check if it's on the border

  //         const isInnerTile = Math.abs(dx) < margin && Math.abs(dy) < margin // Check if it's an inner tile

  //         if (
  //           (isOnBorder && !isInnerTile) ||
  //           (isInnerTile && dx * dx + dy * dy === margin * margin)
  //         ) {
  //           const x = x0 + dx
  //           const y = y0 + dy

  //           if (
  //             x >= 0 &&
  //             x < colsCountDirect &&
  //             y >= 0 &&
  //             y < Math.ceil(center / colsCountDirect)
  //           ) {
  //             targets.push(x + y * colsCountDirect)
  //           }
  //         }
  //       }
  //     }

  //     // Reverse the generated upper half to get the lower half
  //     const upperHalfLength = targets.length
  //     for (let i = upperHalfLength - 1; i >= 0; i -= 1) {
  //       const tileId: number = targets[i] // Define the type explicitly as number
  //       const tileX = tileId % colsCountDirect
  //       const tileY = Math.floor(tileId / colsCountDirect)
  //       const mirroredY = 2 * y0 - tileY // Mirror the y-coordinate

  //       // Calculate the tile ID for the lower half
  //       const lowerHalfTileId = tileX + mirroredY * colsCountDirect
  //       targets.push(lowerHalfTileId)
  //     }

  //     return targets
  //   },
  //   [],
  // )

  const getTargetsInMargin = useCallback(
    (center: number, colsCountDirect: number, margin: number) => {
      const targets = []
      const x0 = center % colsCountDirect
      const y0 = Math.floor(center / colsCountDirect)

      for (let dx = -margin; dx <= margin; dx += 1) {
        for (let dy = -margin; dy <= margin; dy += 1) {
          const isOnBorder = Math.abs(dx) === margin || Math.abs(dy) === margin // Check if it's on the border

          const isInnerTile = Math.abs(dx) < margin && Math.abs(dy) < margin // Check if it's an inner tile

          if (
            (isOnBorder && !isInnerTile) ||
            (isInnerTile && dx * dx + dy * dy === margin * margin)
          ) {
            const x = x0 + dx
            const y = y0 + dy

            if (
              x >= 0 &&
              x < colsCountDirect &&
              y >= 0 &&
              y < Math.ceil(center / colsCountDirect)
            ) {
              targets.push(x + y * colsCountDirect)
            }
          }
        }
      }

      // Reverse the generated upper half to get the lower half
      const upperHalfLength = targets.length
      for (let i = upperHalfLength - 1; i >= 0; i -= 1) {
        const tileId: number = targets[i]
        const tileX = tileId % colsCountDirect
        const tileY = Math.floor(tileId / colsCountDirect)
        const mirroredY = 2 * y0 - tileY

        // Calculate the tile ID for the lower half
        const lowerHalfTileId = tileX + mirroredY * colsCountDirect

        if (!targets.includes(lowerHalfTileId)) {
          targets.push(lowerHalfTileId)
        }
      }

      // Sort the targets in clockwise order
      targets.sort((idA, idB) => {
        const tileA = { x: idA % colsCountDirect, y: Math.floor(idA / colsCountDirect) }
        const tileB = { x: idB % colsCountDirect, y: Math.floor(idB / colsCountDirect) }

        // Calculate angles and compare for sorting clockwise
        const angleA = Math.atan2(tileA.y - y0, tileA.x - x0)
        const angleB = Math.atan2(tileB.y - y0, tileB.x - x0)

        return angleA - angleB
      })

      return targets
    },
    [],
  )

  const toggleTargetRef = useRef(0) // Store toggleTarget as a ref
  const toggleAnimation = useCallback(() => {
    const target = !previouslyHoveredTileId.current
      ? getCenterTileId()
      : previouslyHoveredTileId.current

    const radius = !previewMode ? 1 : cursorRadius

    const newTargets = getTargetsInMargin(target, colsCount, radius)
    const currentTarget = newTargets[toggleTargetRef.current % newTargets.length]

    const toggleTargetNeighbors = getAllNeighbors({
      mouseX: tilesPos[currentTarget].x,
      mouseY: tilesPos[currentTarget].y,
      rowsCount,
      colsCount,
      radius: cursorRadius,
      width: tileWidth,
      height: tileHeight,
    })

    toggleTargetNeighbors.forEach(neighborId => {
      const tile = tilesRef.current[neighborId]
      animateIn(tile.sprite, tile.id, tilesPos[neighborId].x, tilesPos[neighborId].y)
    })

    toggleTargetRef.current += 1 % newTargets.length
  }, [
    animateIn,
    colsCount,
    cursorRadius,
    getCenterTileId,
    getTargetsInMargin,
    previewMode,
    rowsCount,
    tileHeight,
    tileWidth,
    tilesPos,
  ])

  useEffect(() => {
    const animationInterval = setInterval(toggleAnimation, idleLoopDuration)
    if (isCursorMoving) {
      clearInterval(animationInterval)
    }

    return () => clearInterval(animationInterval)
  }, [idleLoopDuration, isCursorMoving, toggleAnimation])

  return {
    init,
    destroy,
    app: appRef.current,
  } as const
}

export default usePixi
