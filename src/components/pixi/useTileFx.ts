import { getRandom } from '@/lib/utils'
import { Sprite } from 'pixi.js'
import gsap from 'gsap'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import useTileStore from '@/src/zustand/useTileStore'
import { Tile, TileBase } from '@/lib/types'

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
  const tileStartColor = useTileStore(state => state.tileStartColor)
  const tileTailColor = useTileStore(state => state.tileTailColor)
  const tileEndColor = useTileStore(state => state.tileEndColor)

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
        rotation: getRandom(-150, 150),
        skewX: getRandom(-150, 150),
        skewY: getRandom(-150, 150),
        tint: tileEndColor,
        alpha: 0,
        width: 0,
        height: 0,
        x: tile.x + getRandom(-tileWidthRef.current * 4.2, tileWidthRef.current * 4.2),
        y: tile.y + getRandom(-tileHeightRef.current * 4.2, tileHeightRef.current * 4.2),
      })),
    [tileEndColor, tiles],
  )

  const predefinedFXIn = useMemo(
    () =>
      tiles.map(tile => ({
        tint: tileStartColor,
        skewX: getRandom(-10, 10),
        skewY: getRandom(-10, 10),
        width: tileWidth * getRandom(1.1, 1.3),
        height: tileHeight * getRandom(1.1, 1.3),
        x: tile.x,
        y: tile.y,
      })),
    [tileHeight, tileStartColor, tileWidth, tiles],
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
      tile.zIndex = 40
      gsap.to(tile, {
        duration: getRandom(fadeOutDurationMin, fadeOutDurationMax),
        ease: 'power2.out',
        pixi: {
          ...predefinedFXInitial[id],
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
      })
    },
    [cursorRadius, fadeOutDurationMax, fadeOutDurationMin, predefinedFXInitial],
  )

  const tailIn = useCallback(
    (tile: Sprite, id: number, originX: number, originY: number) => {
      tile.zIndex = 60
      gsap.to(tile, {
        duration: getRandom(tailInDurationMin, tailInDurationMax),
        ease: 'power1.out',
        pixi: {
          x:
            originX +
            getRandom(-tileWidthRef.current * cursorRadius, tileWidthRef.current * cursorRadius),
          y:
            originY +
            getRandom(-tileHeightRef.current * cursorRadius, tileHeightRef.current * cursorRadius),
          tint: tileTailColor,
          rotation: getRandom(-30, 30),
          skewX: getRandom(-40, 40),
          alpha: getRandom(0.2, 1),
          skewY: getRandom(-50, 50),
          width: tileWidthRef.current / getRandom(1.2, 1.5),
          height: tileHeightRef.current / getRandom(1.2, 1.5),
        },
        onComplete: () => {
          animateOut(tile, id, originX, originY)
        },
      })
    },
    [animateOut, cursorRadius, tailInDurationMax, tailInDurationMin, tileTailColor],
  )

  const animateIn = useCallback(
    (tile: Sprite, id: number, originX: number, originY: number) => {
      gsap.killTweensOf(tile)
      tile.zIndex = 100
      gsap.to(tile, {
        duration: getRandom(fadeInDurationMin, fadeInDurationMax),
        ease: 'power2.out',
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

  const animateHitboxOut = useCallback(
    (tile: Sprite, _id: number, originX: number, originY: number) => {
      tile.zIndex = 50
      gsap.to(tile, {
        duration: getRandom(fadeInDurationMin, fadeInDurationMax),
        ease: 'power2.out',
        pixi: {
          alpha: 0,
          rotation: getRandom(-30, 30),
        },
        x: originX + getRandom(tileWidthRef.current * 2, tileWidthRef.current),
        y: originY + getRandom(tileHeightRef.current * 2, tileHeightRef.current),
      })
    },
    [fadeInDurationMax, fadeInDurationMin],
  )

  const animateHitboxIn = useCallback(
    (tile: Sprite, id: number, originX: number, originY: number) => {
      gsap.killTweensOf(tile)
      tile.zIndex = 100
      gsap.to(tile, {
        duration: getRandom(fadeInDurationMin, fadeInDurationMax),
        ease: 'power2.out',
        pixi: {
          ...predefinedFXIn[id],
          alpha: getRandom(0.2, 0.4),
          rotation: getRandom(-30, 30),
          width: tileWidthRef.current * getRandom(0.1, 0.2),
          height: tileHeightRef.current * getRandom(0.1, 0.2),
          x: originX + getRandom(tileWidthRef.current * 2, tileWidthRef.current),
          y: originY + getRandom(tileHeightRef.current * 2, tileHeightRef.current),
        },
        onComplete: () => {
          animateHitboxOut(tile, id, originX, originY)
        },
      })
    },
    [animateHitboxOut, fadeInDurationMax, fadeInDurationMin, predefinedFXIn],
  )

  const animateHitboxInAlt = useCallback(
    (tile: Sprite, id: number, originX: number, originY: number) => {
      gsap.killTweensOf(tile)
      tile.zIndex = 90
      gsap.to(tile, {
        duration: getRandom(fadeInDurationMin, fadeInDurationMax),
        ease: 'power2.out',
        pixi: {
          alpha: getRandom(0.2, 4),
          tint: '#ffffff',
          rotation: getRandom(-30, 30),
          width: 0,
          height: 0,
          x: originX + getRandom(tileWidthRef.current * 2, tileWidthRef.current),
          y: originY + getRandom(tileHeightRef.current * 2, tileHeightRef.current),
        },
        onComplete: () => {
          tailIn(tile, id, originX, originY)
        },
      })
    },
    [fadeInDurationMax, fadeInDurationMin, tailIn],
  )

  return {
    setupGsapTile,
    animateIn,
    animateHitboxIn,
    animateHitboxInAlt,
  }
}

export default useTileFx
