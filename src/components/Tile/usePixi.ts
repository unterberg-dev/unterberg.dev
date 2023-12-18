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

  const init = useCallback(() => {
    window.cancelAnimationFrame(frameRef.current)
    appRef.current.stage.removeChildren()

    gsap.ticker.remove(() => {
      appRef.current.ticker.update()
    })

    frameRef.current = window.requestAnimationFrame(() => {
      gsap.ticker.add(() => {
        appRef.current.ticker.update()
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
    // window.cancelAnimationFrame(frameRef.current)
    appRef.current.stage.removeChildren()
    // wipe through cache
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
      const tileCenter = tilesPos[Math.floor(tilesPos.length / 2)]
      previouslyHoveredTileId.current = tileCenter.id
    }
  }, [previewMode, tilesPos])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (previewMode) {
        return
      }

      const mouseX = e.pageX
      const mouseY = e.pageY
      const currentHoveredTileId = checkHoveredRectangle(
        mouseX,
        mouseY,
        tilesPos,
        tileWidth,
        tileHeight,
      )

      if (currentHoveredTileId === null && previouslyHoveredTileId.current !== null) {
        previouslyHoveredTileId.current = null
        return
      }

      setIsCursorMoving(true)
      handleCursorMoveTimeout()

      if (
        currentHoveredTileId !== null &&
        currentHoveredTileId !== previouslyHoveredTileId.current
      ) {
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

  useEffect(() => {
    let toggleTarget = 0

    const toggleAnimation = () => {
      const hoveredTileId = previouslyHoveredTileId.current
      const noHoveredTile = !hoveredTileId

      const target = noHoveredTile ? Math.floor(tilesRef.current.length / 2) : hoveredTileId
      const targets = [
        target - colsCount,
        target - colsCount + 1,
        target + 1,
        target + colsCount + 1,
        target + colsCount,
        target + colsCount - 1,
        target - 1,
        target - colsCount - 1,
      ]

      const currentTarget = targets[toggleTarget % targets.length]
      const current = tilesRef.current[currentTarget]

      if (currentTarget < 0 || currentTarget > tilesRef.current.length - 1) {
        toggleTarget += 1
        return
      }

      const posX = current ? tilesPos[current.id].x : stageWidth / 2
      const posY = current ? tilesPos[current.id].y : stageHeight / 2

      const toggleTargetNeighbors = getAllNeighbors({
        mouseX: posX,
        mouseY: posY,
        manualHitboxX: tilesPos[target].x,
        manualHitboxY: tilesPos[target].y,
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

      toggleTarget += 1
    }

    const animationInterval = setInterval(toggleAnimation, idleLoopDuration)
    if (isCursorMoving) {
      clearInterval(animationInterval)
    }

    return () => clearInterval(animationInterval)
  }, [
    animateIn,
    colsCount,
    cursorRadius,
    idleLoopDuration,
    isCursorMoving,
    rowsCount,
    stageHeight,
    stageWidth,
    tileHeight,
    tileWidth,
    tilesPos,
  ])

  return {
    init,
    destroy,
    app: appRef.current,
  } as const
}

export default usePixi
