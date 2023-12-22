import { useApp } from '@pixi/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Sprite, Texture, Graphics } from 'pixi.js'
import gsap from 'gsap'
import debounce from 'lodash/debounce'
import * as PIXI from 'pixi.js'
import {
  checkHoveredRectangle,
  getAllNeighbors,
  getCalculateTilePositions,
  getOutlineTargets,
} from '@/components/pixi/gridFnc'
import useTileFx from '@/components/pixi/useTileFx'
import useTileStore from '@/src/zustand/useTileStore'
import { Line, Tile } from '@/lib/types'
import { range } from 'lodash'
import useAppTheme from '@/lib/useTheme'
import { getRandom } from '@/lib/utils'

interface UsePixiProps {
  stageWidth: number
  stageHeight: number
}

const usePixi = ({ stageWidth, stageHeight }: UsePixiProps) => {
  const app = useApp()
  const appRef = useRef(app)
  const tilesRef = useRef<Tile[]>([])
  const bgTilesRef = useRef<Tile[]>([])
  const linesRef = useRef<Line[]>([])
  const previouslyHoveredTileId = useRef<number | null>(null)
  const cursorRadius = useTileStore(state => state.cursorRadius)
  const idleLoopDuration = useTileStore(state => state.idleLoopDuration)
  const previewLoopDuration = useTileStore(state => state.previewLoopDuration)
  const tileWidth = useTileStore(state => state.tileWidth)
  const tileHeight = useTileStore(state => state.tileHeight)
  const previewMode = useTileStore(state => state.previewMode)
  const idleIntervalPreviewMode = useTileStore(state => state.idleIntervalPreviewMode)
  const hitboxes = useTileStore(state => state.hitboxes)
  const scrollPosY = useTileStore(state => state.scrollPosY)
  const isScrolling = useTileStore(state => state.isScrolling)

  const [isCursorMoving, setIsCursorMoving] = useState(false)

  const colsCount = useMemo(() => Math.floor(stageWidth / tileWidth), [stageWidth, tileWidth])
  const rowsCount = useMemo(() => Math.floor(stageHeight / tileHeight), [stageHeight, tileHeight])

  const tilesPos = useMemo(
    () =>
      stageWidth && stageHeight
        ? getCalculateTilePositions({
            stageWidth: colsCount * tileWidth,
            stageHeight: rowsCount * tileHeight,
            width: tileWidth,
            height: tileHeight,
          })
        : [],
    [colsCount, rowsCount, stageHeight, stageWidth, tileHeight, tileWidth],
  )

  const {
    setupGsapTile,
    setupGsapBgTile,
    animateIn,
    animateBgTileIn,
    animateHitboxIn,
    animateHitboxInAlt,
  } = useTileFx({
    tiles: tilesPos,
  })

  const handleCursorMoveTimeout = debounce(() => {
    setIsCursorMoving(false)
  }, idleLoopDuration)

  interface createSpriteProps {
    texture: Texture | string
    x: number
    y: number
    width: number
    height: number
    origin?: number
  }

  const createSprite = useCallback(
    ({ texture, x, y, width, height, origin = 0.5 }: createSpriteProps) => {
      let sprite: Sprite

      if (!texture) {
        sprite = new Sprite()
      } else if (typeof texture === 'string') {
        sprite = new Sprite(Texture.from(texture as string))
      } else {
        sprite = Sprite.from(texture as Texture)
      }
      sprite.alpha = 0
      sprite.x = x
      sprite.y = y
      sprite.width = width
      sprite.height = height
      sprite.anchor.set(origin)
      appRef.current.stage.addChild(sprite)
      return sprite
    },
    [],
  )

  const frameRef = useRef(0)

  const getCenterTileId = useCallback(() => {
    const centerID = checkHoveredRectangle(
      // +1 because we wanna select the next tile
      stageWidth / 2 + 1,
      stageHeight / 2,
      tilesPos,
      tileWidth,
      tileHeight,
    )
    return centerID || 0
  }, [stageHeight, stageWidth, tileHeight, tileWidth, tilesPos])

  const { color } = useAppTheme()
  const colorVariationsDark = useMemo(
    () => [
      `0x${color('dark').substring(1)}`,
      `0x${color('darkLightBorder').substring(1)}`,
      `0x${color('darkLight').substring(1)}`,
    ],
    [color],
  )

  const drawLines = useCallback(() => {
    const colCoordsDef = range(colsCount).map(col => ({
      x: (col + 1) * tileWidth,
      height: rowsCount * tileHeight,
    }))
    const rowCoordsDef = range(rowsCount).map(row => ({
      y: (row + 1) * tileHeight,
      width: colsCount * tileWidth,
    }))

    colCoordsDef.forEach(({ x, height }) => {
      const randomColorIndex = Math.floor(Math.random() * colorVariationsDark.length)
      const selectedColor = colorVariationsDark[randomColorIndex]

      const line = new Graphics()
      line.lineStyle(1, selectedColor)
      line.moveTo(x - tileWidth / 2, 0)
      line.lineTo(x - tileWidth / 2, height)
      line.alpha = getRandom(0.1, 0.3)
      line.closePath()
      appRef.current.stage.addChild(line)
      linesRef.current.push({ id: `line-v-${x}`, graphics: line })
    })

    rowCoordsDef.forEach(({ y, width }) => {
      const randomColorIndex = Math.floor(Math.random() * colorVariationsDark.length)
      const selectedColor = colorVariationsDark[randomColorIndex]

      const line = new Graphics()
      line.lineStyle(1, selectedColor)
      line.moveTo(0, y - tileHeight / 2)
      line.lineTo(width, y - tileHeight / 2)
      line.alpha = getRandom(0.1, 0.3)
      line.closePath()
      appRef.current.stage.addChild(line)
      linesRef.current.push({ id: `line-h-${y}`, graphics: line })
    })
  }, [colorVariationsDark, colsCount, rowsCount, tileHeight, tileWidth])

  const drawBGTiles = useCallback(() => {
    tilesPos.forEach(({ id, x, y }) => {
      const randomColorIndex = Math.floor(Math.random() * colorVariationsDark.length)
      const selectedColor = colorVariationsDark[randomColorIndex]
      const tile = createSprite({
        texture: Texture.WHITE,
        // texture: 'https://pixijs.io/examples/examples/assets/bunny.png',
        x,
        y,
        width: tileWidth,
        height: tileHeight,
      })
      tile.tint = selectedColor
      bgTilesRef.current.push({ id, sprite: tile })
      setupGsapBgTile(tile)
    })
  }, [tilesPos, colorVariationsDark, createSprite, tileWidth, tileHeight, setupGsapBgTile])

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
        texture: Texture.WHITE,
        x,
        y,
        width: tileWidth,
        height: tileHeight,
      })

      tilesRef.current[id] = { id, sprite }
      setupGsapTile(sprite, id)
    })

    drawLines()
    drawBGTiles()
  }, [createSprite, drawBGTiles, drawLines, setupGsapTile, tileHeight, tileWidth, tilesPos])

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

  const animateNeighbors = useCallback(
    (currentTarget: number) => {
      if (!stageWidth) {
        return
      }

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

        animateBgTileIn(tile.sprite)
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

        const random85 = Math.random() < 0.85
        if (previewMode) {
          if (random85) {
            animateIn(tile.sprite, tile.id, tilesPos[neighborId].x, tilesPos[neighborId].y)
          }
        } else if (!isNeighborInOuterHitbox && !isInHitbox && random85) {
          animateIn(tile.sprite, tile.id, tilesPos[neighborId].x, tilesPos[neighborId].y)
        }
      })
    },
    [
      stageWidth,
      tilesPos,
      rowsCount,
      colsCount,
      cursorRadius,
      tileWidth,
      tileHeight,
      hitboxes,
      scrollPosY,
      isScrolling,
      previewMode,
      animateHitboxIn,
      animateIn,
      animateHitboxInAlt,
      animateBgTileIn,
    ],
  )

  const idleAnimationMotionRefId = useRef(0)
  const toggleIdleAnimation = useCallback(() => {
    const target = !previouslyHoveredTileId.current
      ? getCenterTileId()
      : previouslyHoveredTileId.current

    const radius =
      idleIntervalPreviewMode || !previewMode
        ? 1
        : Math.max(cursorRadius - tileWidth * (cursorRadius / 2), 6)

    const newTargets = getOutlineTargets(target, colsCount, radius)
    const currentTarget = newTargets[idleAnimationMotionRefId.current % newTargets.length]

    animateNeighbors(currentTarget)

    idleAnimationMotionRefId.current += 1 % newTargets.length
  }, [
    animateNeighbors,
    colsCount,
    cursorRadius,
    getCenterTileId,
    idleIntervalPreviewMode,
    previewMode,
    tileWidth,
  ])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (previewMode) {
        return
      }

      const mouseX = e.clientX
      const mouseY = e.clientY
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
        animateNeighbors(currentHoveredTileId)
        previouslyHoveredTileId.current = currentHoveredTileId
      }
    },
    [animateNeighbors, handleCursorMoveTimeout, previewMode, tileHeight, tileWidth, tilesPos],
  )

  // bind events listeners
  useEffect(() => {
    window.addEventListener('pointermove', handleMouseMove)
    window.addEventListener('pointerdown', handleMouseMove)

    return () => {
      window.removeEventListener('pointermove', handleMouseMove)
      window.removeEventListener('pointerdown', handleMouseMove)
    }
  }, [handleMouseMove, init])

  useEffect(() => {
    const animationInterval = setInterval(
      toggleIdleAnimation,
      previewMode && !idleIntervalPreviewMode ? previewLoopDuration : idleLoopDuration,
    )
    if (isCursorMoving) {
      clearInterval(animationInterval)
    }

    return () => clearInterval(animationInterval)
  }, [
    idleIntervalPreviewMode,
    idleLoopDuration,
    isCursorMoving,
    previewLoopDuration,
    previewMode,
    toggleIdleAnimation,
  ])

  // move cursor to center tile on preview mode
  useEffect(() => {
    if (previewMode) {
      previouslyHoveredTileId.current = getCenterTileId()
    }
  }, [getCenterTileId, previewMode])

  return {
    init,
    destroy,
    app: appRef.current,
  } as const
}

export default usePixi
