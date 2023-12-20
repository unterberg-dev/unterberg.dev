import { useApp } from '@pixi/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Sprite, Texture } from 'pixi.js'
import gsap from 'gsap'
import debounce from 'lodash/debounce'
import PixiPlugin from 'gsap/PixiPlugin'
import * as PIXI from 'pixi.js'
import {
  checkHoveredRectangle,
  getAllNeighbors,
  getCalculateTilePositions,
  getOutlineTargets,
} from '@/components/pixi/gridFnc'
import useTileFx from '@/components/pixi/useTileFx'
import useTileStore from '@/src/zustand/useTileStore'
import { Tile } from '@/lib/types'

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
            stageWidth,
            stageHeight,
            width: tileWidth,
            height: tileHeight,
          })
        : [],
    [stageHeight, stageWidth, tileHeight, tileWidth],
  )

  const { setupGsapTile, animateIn, animateHitboxIn, animateHitboxInAlt } = useTileFx({
    tiles: tilesPos,
    tilesRef: tilesRef.current,
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
      // +1 because we wanna select the next tile
      stageWidth / 2 + 1,
      stageHeight / 2,
      tilesPos,
      tileWidth,
      tileHeight,
    )
    return centerID || 0
  }, [stageHeight, stageWidth, tileHeight, tileWidth, tilesPos])

  const init = useCallback(() => {
    window.cancelAnimationFrame(frameRef.current)
    // appRef.current.stage.removeChildren()
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

  const animateNeighbors = useCallback(
    (currentTarget: number) => {
      if (!stageWidth) {
        return
      }
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
        const neighborPos = tilesPos[neighborId]
        const tile = tilesRef.current[neighborPos.id]

        if (isScrolling) {
          return
        }

        // Check if the neighbor is within any hitbox
        const isInHitbox = hitboxes.some(
          hitbox =>
            neighborPos.x >= hitbox.x &&
            neighborPos.x <= hitbox.x + hitbox.width &&
            neighborPos.y >= hitbox.y - scrollPosY &&
            neighborPos.y <= hitbox.y - scrollPosY + hitbox.height,
        )

        if (isInHitbox && !previewMode) {
          const randomAlt = Math.random() < 0.4
          if (randomAlt) {
            animateHitboxInAlt(tile.sprite, tile.id, tilesPos[neighborId].x, tilesPos[neighborId].y)
            return
          }
          animateHitboxIn(tile.sprite, tile.id, tilesPos[neighborId].x, tilesPos[neighborId].y)
          return
        }

        const random2 = Math.random() < 0.8
        if (random2) {
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
      isScrolling,
      hitboxes,
      previewMode,
      scrollPosY,
      animateHitboxIn,
      animateHitboxInAlt,
      animateIn,
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
