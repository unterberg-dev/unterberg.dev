import { useApp } from '@pixi/react'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { Sprite, Texture } from 'pixi.js'
import gsap from 'gsap'
import PixiPlugin from 'gsap/PixiPlugin'
import * as PIXI from 'pixi.js'
import { APP_CONFIG, TILE_CONFIG } from '@/lib/constants'
import { animateIn, setupGsapTile } from '@/components/Tile/gsapTile'
import {
  checkHoveredRectangle,
  colsCount,
  getCalculateTilePositions,
  rowsCount,
} from '@/components/Tile/tiles'

type Tile = {
  id: number
  sprite: Sprite
}

const usePixi = () => {
  const app = useApp()
  const tilesRef = useRef<Tile[]>([])
  const previouslyHoveredTileId = useRef<number | null>(null)

  const tilesPos = useMemo(() => getCalculateTilePositions(), [])

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
        texture: Texture.WHITE,
        // texture: 'https://pixijs.io/examples/examples/assets/bunny.png',
        x,
        y,
        width: TILE_CONFIG.width,
        height: TILE_CONFIG.height,
      })

      tilesRef.current[id] = { id, sprite }
      setupGsapTile(sprite, id)
    })
  }, [app.stage, app.ticker, createSprite, tilesPos])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY
      const radius = APP_CONFIG.hoverCircleCount // Set the radius of your circle
      const currentHoveredTileId = checkHoveredRectangle(x, y, tilesPos)
      const hitboxWidth = TILE_CONFIG.width * APP_CONFIG.hoverCircleCount * 2 * 2
      const hitboxHeight = TILE_CONFIG.height * APP_CONFIG.hoverCircleCount * 2 * 2

      if (currentHoveredTileId === null && previouslyHoveredTileId.current !== null) {
        previouslyHoveredTileId.current = null
        return
      }

      if (
        currentHoveredTileId !== null &&
        currentHoveredTileId !== previouslyHoveredTileId.current
      ) {
        const c = Math.floor(x / (TILE_CONFIG.width + TILE_CONFIG.gap))
        const d = Math.floor(y / (TILE_CONFIG.height + TILE_CONFIG.gap))

        // move hitbox
        const hitboxX = x - TILE_CONFIG.width * radius
        const hitboxY = y - TILE_CONFIG.height * radius

        // Calculate the range of neighbors within the hitbox boundaries
        const startCol = Math.max(0, Math.floor(hitboxX / (TILE_CONFIG.width + TILE_CONFIG.gap)))
        const endCol = Math.min(
          colsCount - 1,
          Math.ceil((hitboxX + hitboxWidth) / (TILE_CONFIG.width + TILE_CONFIG.gap)),
        )
        const startRow = Math.max(0, Math.floor(hitboxY / (TILE_CONFIG.height + TILE_CONFIG.gap)))
        const endRow = Math.min(
          rowsCount - 1,
          Math.ceil((hitboxY + hitboxHeight) / (TILE_CONFIG.height + TILE_CONFIG.gap)),
        )

        for (let col = startCol; col <= endCol; col += 1) {
          for (let row = startRow; row <= endRow; row += 1) {
            const neighborPosition = row * colsCount + col
            const distance = Math.sqrt((c - col) ** 2 + (d - row) ** 2)

            if (distance <= radius) {
              const id = neighborPosition
              const tile = tilesRef.current[id]

              if (tile) {
                animateIn(
                  tile.sprite,
                  tile.id,
                  tilesPos[currentHoveredTileId].x,
                  tilesPos[currentHoveredTileId].y,
                )
              }
            }
          }
        }

        previouslyHoveredTileId.current = currentHoveredTileId
      }
    },
    [tilesPos],
  )

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove, init])

  return {
    init,
    app,
  } as const
}

export default usePixi
