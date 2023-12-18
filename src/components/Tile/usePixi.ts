import { useApp } from '@pixi/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Sprite, Texture } from 'pixi.js'
import gsap from 'gsap'
import PixiPlugin from 'gsap/PixiPlugin'
import * as PIXI from 'pixi.js'
import { TILE_CONFIG } from '@/lib/constants'
import {
  Tile,
  checkHoveredRectangle,
  getAllNeighbors,
  getCalculateTilePositions,
} from '@/components/Tile/tiles'
import debounce from 'lodash/debounce'
import useTileFx from '@/components/Tile/useTileFx'

interface UsePixiProps {
  stageWidth: number
  stageHeight: number
}

const usePixi = ({ stageWidth, stageHeight }: UsePixiProps) => {
  const app = useApp()
  const tilesRef = useRef<Tile[]>([])
  const previouslyHoveredTileId = useRef<number | null>(null)

  const [isCursorMoving, setIsCursorMoving] = useState(false)

  const handleCursorMoveTimeout = debounce(() => {
    setIsCursorMoving(false)
  }, 200)

  const colsCount = useMemo(() => Math.floor(stageWidth / TILE_CONFIG.width), [stageWidth])
  const rowsCount = useMemo(() => Math.floor(stageHeight / TILE_CONFIG.height), [stageHeight])

  const tilesPos = useMemo(
    () =>
      stageWidth && stageHeight
        ? getCalculateTilePositions({
            stageWidth,
            stageHeight,
          })
        : [],
    [stageHeight, stageWidth],
  )

  const { setupGsapTile, animateIn } = useTileFx({ tiles: tilesPos })

  interface createSpriteProps {
    texture: Texture | string
    x: number
    y: number
    width: number
    height: number
  }

  const createSprite = useCallback(
    ({ texture, x, y, width, height }: createSpriteProps) => {
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
      app.stage.addChild(sprite)
      return sprite
    },
    [app.stage],
  )

  const init = useCallback(() => {
    app.ticker.stop()

    window.requestAnimationFrame(() => {
      gsap.ticker.add(() => {
        app.ticker.update()
      })
    })

    gsap.registerPlugin(PixiPlugin)
    PixiPlugin.registerPIXI(PIXI)

    app.stage.removeChildren()

    tilesPos.forEach(({ id, x, y }) => {
      const sprite = createSprite({
        // texture: 'https://pixijs.io/examples/examples/assets/bunny.png',
        texture: Texture.WHITE,
        x,
        y,
        width: TILE_CONFIG.width,
        height: TILE_CONFIG.height,
      })

      tilesRef.current[id] = { id, sprite }
      setupGsapTile(sprite, id)
    })
  }, [app.stage, app.ticker, createSprite, setupGsapTile, tilesPos])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const mouseX = e.pageX
      const mouseY = e.pageY
      const currentHoveredTileId = checkHoveredRectangle(mouseX, mouseY, tilesPos)

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
    [animateIn, colsCount, handleCursorMoveTimeout, rowsCount, tilesPos],
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
      })

      toggleTargetNeighbors.forEach(neighborId => {
        const tile = tilesRef.current[neighborId]
        animateIn(tile.sprite, tile.id, tilesPos[neighborId].x, tilesPos[neighborId].y)
      })

      toggleTarget += 1
    }

    const animationInterval = setInterval(toggleAnimation, 100)
    if (isCursorMoving) {
      clearInterval(animationInterval)
    }

    return () => clearInterval(animationInterval)
  }, [animateIn, colsCount, isCursorMoving, rowsCount, stageHeight, stageWidth, tilesPos])

  return {
    init,
    app,
  } as const
}

export default usePixi
