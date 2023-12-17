import { useApp } from '@pixi/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Sprite, Texture } from 'pixi.js'
import gsap from 'gsap'
import PixiPlugin from 'gsap/PixiPlugin'
import * as PIXI from 'pixi.js'
import { TILE_CONFIG } from '@/lib/constants'
import { animateIn, setupGsapTile } from '@/components/Tile/gsapTile'
import {
  Tile,
  checkHoveredRectangle,
  getAllNeighbors,
  getCalculateTilePositions,
} from '@/components/Tile/tiles'
import debounce from 'lodash/debounce'

const usePixi = () => {
  const app = useApp()
  const tilesRef = useRef<Tile[]>([])
  const previouslyHoveredTileId = useRef<number | null>(null)

  const [isCursorMoving, setIsCursorMoving] = useState(false)

  const handleCursorMoveTimeout = debounce(() => {
    setIsCursorMoving(false)
  }, 200)

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
      const mouseX = e.clientX
      const mouseY = e.clientY
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
        const neighbors = getAllNeighbors(mouseX, mouseY)
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
    [handleCursorMoveTimeout, tilesPos],
  )

  useEffect(() => {
    window.addEventListener('pointermove', handleMouseMove)

    return () => {
      window.removeEventListener('pointermove', handleMouseMove)
    }
  }, [handleMouseMove, init])

  // best working atm
  useEffect(() => {
    let toggleTarget: number = 0

    const toggleAnimation = () => {
      if (!previouslyHoveredTileId.current) {
        return
      }
      const target = previouslyHoveredTileId.current
      const targets = [
        tilesRef.current[target - 1],
        tilesRef.current[target],
        tilesRef.current[target + 1],
      ]

      if (!targets[toggleTarget]) {
        toggleTarget = 0 // Toggle between tile and tileBefore
      }

      const current = targets[toggleTarget]

      const toggleTargetNeighbors = getAllNeighbors(
        current ? tilesPos[current.id].x : window.innerWidth / 2,
        current ? tilesPos[current.id].y : window.innerHeight / 2,
      )

      toggleTargetNeighbors.forEach(neighborId => {
        const tile = tilesRef.current[neighborId]

        animateIn(tile.sprite, tile.id, tilesPos[neighborId].x, tilesPos[neighborId].y)
      })

      toggleTarget += 1 % targets.length // Toggle between tile and tileBefore
    }

    const animationInterval = setInterval(toggleAnimation, 100) // Adjust the interval duration as needed (500ms in this case)

    if (isCursorMoving) {
      clearInterval(animationInterval) // Clear the interval if the cursor is moving
    }
    return () => {
      clearInterval(animationInterval) // Cleanup: clear the interval on component unmount
    }
  }, [isCursorMoving, tilesPos])

  return {
    init,
    app,
  } as const
}

export default usePixi
