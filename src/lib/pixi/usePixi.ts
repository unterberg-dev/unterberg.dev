import { useApp } from '@pixi/react'
import gsap from 'gsap'
import debounce from 'lodash/debounce'
import { utils } from 'pixi.js'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { Line, Tile } from '#lib/types'
import drawBGTiles from '#pixi/drawBgTiles'
import drawLines from '#pixi/drawLines'
import drawTiles from '#pixi/drawTiles'
import { checkHoveredRectangle, getCalculateTilePositions, getOutlineTargets } from '#pixi/gridFnc'
import usePointer from '#pixi/usePointer'
import useTileFx from '#pixi/useTileFx'
import useTileStore from '#zustand/useTileStore'

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

  const { setupGsapTile, setupGsapBgTile } = useTileFx({
    tiles: tilesPos,
  })

  const { animateNeighbors } = usePointer({
    tilesPos,
    colsCount,
    rowsCount,
    bgTilesRef,
    tilesRef,
    hitboxes,
  })

  const handleCursorMoveTimeout = debounce(() => {
    setIsCursorMoving(false)
  }, idleLoopDuration)

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

  const colorVariationsDark = useMemo(() => [`0x111`, `0x202020`, `0x252525`], [])

  const destroy = useCallback(() => {
    if (appRef.current.stage) {
      appRef.current.stage.removeChildren()
    }
    window.cancelAnimationFrame(frameRef.current)
    if (utils.TextureCache) {
      Object.keys(utils.TextureCache).forEach(texture => {
        if (utils.TextureCache[texture]) {
          utils.TextureCache[texture].destroy(true)
        }
      })
    }
  }, [])

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

    drawTiles({
      tilesPos,
      tileWidth,
      tileHeight,
      tilesRef,
      appRef,
      setupGsapTile,
    })
    drawLines({
      linesRef,
      colorVariationsDark,
      tileWidth,
      tileHeight,
      colsCount,
      rowsCount,
      appRef,
    })
    drawBGTiles({
      bgTilesRef,
      colorVariationsDark,
      setupGsapBgTile,
      tileWidth,
      tileHeight,
      tilesPos,
      appRef,
    })
  }, [
    colorVariationsDark,
    colsCount,
    rowsCount,
    setupGsapBgTile,
    setupGsapTile,
    tileHeight,
    tileWidth,
    tilesPos,
  ])

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
    colsCount,
    cursorRadius,
    animateNeighbors,
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
