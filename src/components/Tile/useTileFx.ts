import { getRandom } from '@/lib/utils'
import { Sprite } from 'pixi.js'
import gsap from 'gsap'
import { Tile, TileBase } from '@/components/Tile/tiles'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import useTileStore from '@/src/zustand/useTileStore'

interface useTileFxProps {
  tiles: TileBase[]
  tilesRef: Tile[]
}

const useTileFx = ({ tiles, tilesRef }: useTileFxProps) => {
  const fadeInDurationMin = useTileStore(state => state.fadeInDurationMin)
  const fadeInDurationMax = useTileStore(state => state.fadeInDurationMax)
  const tailInDurationMin = useTileStore(state => state.tailInDurationMin)
  const tailInDurationMax = useTileStore(state => state.tailInDurationMax)
  const fadeOutDurationMin = useTileStore(state => state.fadeOutDurationMin)
  const fadeOutDurationMax = useTileStore(state => state.fadeOutDurationMax)
  const tileWidth = useTileStore(state => state.tileWidth)
  const tileHeight = useTileStore(state => state.tileHeight)
  const cursorRadius = useTileStore(state => state.cursorRadius)

  const tileWidthRef = useRef(tileWidth)
  const tileHeightRef = useRef(tileHeight)

  useEffect(() => {
    tileWidthRef.current = tileWidth
    tileHeightRef.current = tileHeight
  }, [tileHeight, tileWidth])

  useEffect(() => {
    if (tiles.length && tilesRef && tilesRef.length) {
      tilesRef.forEach(tile => {
        gsap.killTweensOf(tile.sprite)
      })
    }
  }, [tiles, tiles.length, tilesRef])

  const predefinedFXInitial = useMemo(
    () =>
      tiles.map(tile => ({
        skewX: getRandom(-50, 50),
        skewY: getRandom(-50, 50),
        rotation: getRandom(-50, 50),
        tint: '#fff200',
        alpha: 0,
        width: 0,
        height: 0,
        x: tile.x + getRandom(-tileWidthRef.current * 1.2, tileWidthRef.current * 1.2),
        y: tile.y + getRandom(-tileHeightRef.current * 1.2, tileHeightRef.current * 1.2),
      })),
    [tiles],
  )

  const predefinedFXIn = useMemo(
    () =>
      tiles.map(tile => ({
        tint: '#ff0000',
        skewX: getRandom(-10, 10),
        skewY: getRandom(-10, 10),
        width: tileWidth * getRandom(1.1, 1.3),
        height: tileHeight * getRandom(1.1, 1.3),
        x: tile.x,
        y: tile.y,
      })),
    [tileHeight, tileWidth, tiles],
  )

  const setupGsapTile = useCallback(
    (tile: Sprite, id: number) => {
      gsap.killTweensOf(tile) // for perfomance do not kill tweens
      gsap.set(tile, {
        pixi: {
          ...predefinedFXInitial[id],
        },
      })
    },
    [predefinedFXInitial],
  )

  const animateOut = useCallback(
    (tile: Sprite, id: number, originX: number, originY: number) => {
      // gsap.killTweensOf(tile) // for perfomance do not kill tweens

      gsap.to(tile, {
        duration: getRandom(fadeOutDurationMin, fadeOutDurationMax),
        pixi: {
          width: 0,
          height: 0,
          tint: '#3f2222',
          rotation: getRandom(-150, 150),
          skewX: getRandom(-150, 150),
          skewY: getRandom(-150, 150),
          x:
            originX +
            getRandom(
              -tileWidthRef.current * (cursorRadius * 1.5),
              tileWidthRef.current * (cursorRadius * 1.5),
            ),
          y:
            originY +
            getRandom(
              -tileHeightRef.current * (cursorRadius * 1.5),
              tileHeightRef.current * (cursorRadius * 1.5),
            ),
        },
        onComplete: () => {
          setupGsapTile(tile, id)
        },
      })
    },
    [cursorRadius, fadeOutDurationMax, fadeOutDurationMin, setupGsapTile],
  )

  const tailIn = useCallback(
    (tile: Sprite, id: number, originX: number, originY: number) => {
      // gsap.killTweensOf(tile) // for perfomance do not kill tweens
      gsap.to(tile, {
        duration: getRandom(tailInDurationMin, tailInDurationMax),
        pixi: {
          x:
            originX +
            getRandom(-tileWidthRef.current * cursorRadius, tileWidthRef.current * cursorRadius),
          y:
            originY +
            getRandom(-tileHeightRef.current * cursorRadius, tileHeightRef.current * cursorRadius),
          tint: '#ff9000',
          rotation: getRandom(-30, 30),
          skewX: getRandom(-40, 40),
          skewY: getRandom(-50, 50),
          width: tileWidthRef.current / getRandom(1.2, 1.5),
          height: tileHeightRef.current / getRandom(1.2, 1.5),
        },
        onComplete: () => {
          animateOut(tile, id, originX, originY)
        },
      })
    },
    [animateOut, cursorRadius, tailInDurationMax, tailInDurationMin],
  )

  const animateIn = useCallback(
    (tile: Sprite, id: number, originX: number, originY: number) => {
      gsap.killTweensOf(tile)

      gsap.to(tile, {
        duration: getRandom(fadeInDurationMin, fadeInDurationMax),
        pixi: {
          ...predefinedFXIn[id],
          alpha: getRandom(0.5, 1),
          rotation: getRandom(-30, 30),
        },
        onComplete: () => {
          tailIn(tile, id, originX, originY)
        },
      })
    },
    [fadeInDurationMax, fadeInDurationMin, predefinedFXIn, tailIn],
  )

  return {
    setupGsapTile,
    predefinedFXIn,
    animateIn,
  }
}

export default useTileFx
