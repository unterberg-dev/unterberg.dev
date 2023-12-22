import { getRandom } from '@/lib/utils'
import { Sprite } from 'pixi.js'
import gsap from 'gsap'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import useTileStore from '@/src/zustand/useTileStore'
import { TileBase } from '@/lib/types'
import PixiPlugin from 'gsap/PixiPlugin'
import * as PIXI from 'pixi.js'

interface useTileFxProps {
  tiles: TileBase[]
}

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

const useTileFx = ({ tiles }: useTileFxProps) => {
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
      gsap.set(tile, {
        pixi: {
          ...predefinedFXInitial[id],
        },
      })
    },
    [predefinedFXInitial],
  )

  const setupGsapBgTile = useCallback((tile: Sprite) => {
    gsap.set(tile, {
      zIndex: 5,
      pixi: {
        skewX: 0,
        skewY: 0,
        alpha: getRandom(0.1, 0.3),
      },
    })
  }, [])

  const animateBgTileOut = useCallback(
    (tile: Sprite) => {
      gsap.to(tile, {
        duration: getRandom(fadeInDurationMin * 2, fadeInDurationMax * 2),
        ease: 'power2.out',
        pixi: {
          alpha: getRandom(0.1, 0.3),
          skewY: 0,
          skewX: 0,
          width: tileWidthRef.current,
          height: tileHeightRef.current,
        },
      })
    },
    [fadeInDurationMax, fadeInDurationMin],
  )

  const animateBgTileIn = useCallback(
    (tile: Sprite) => {
      // gsap.killTweensOf(tile)
      tile.zIndex = 10
      gsap.to(tile, {
        duration: getRandom(fadeInDurationMin * 2, fadeInDurationMax * 2),
        ease: 'power2.out',
        pixi: {
          alpha: getRandom(0.4, 0.5),
          width: tileWidthRef.current * getRandom(1.1, 1.7),
          height: tileHeightRef.current * getRandom(1.1, 1.7),
        },
        onComplete: () => {
          animateBgTileOut(tile)
        },
      })
    },
    [animateBgTileOut, fadeInDurationMax, fadeInDurationMin],
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
    (tile: Sprite, id: number, originX: number, originY: number) => {
      tile.zIndex = 50
      gsap.to(tile, {
        duration: getRandom(fadeOutDurationMin, fadeOutDurationMax),
        ease: 'power2.out',
        pixi: {
          alpha: 0,
          rotation: getRandom(-30, 30),
        },
        x: originX + getRandom(tileWidthRef.current * 2, tileWidthRef.current),
        y: originY + getRandom(tileHeightRef.current * 2, tileHeightRef.current),
        onComplete: () => {
          setupGsapTile(tile, id)
        },
      })
    },
    [fadeOutDurationMax, fadeOutDurationMin, setupGsapTile],
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
          alpha: getRandom(0, 0.3),
          rotation: getRandom(-70, 70),
          width: tileWidthRef.current * getRandom(0.1, 0.3),
          height: tileHeightRef.current * getRandom(0.1, 0.3),
          x: originX + getRandom(tileWidthRef.current * 2, tileWidthRef.current),
          y: originY + getRandom(tileHeightRef.current * 2, tileHeightRef.current),
        },
        onComplete: () => {
          gsap.to(tile, {
            duration: getRandom(0.5, 1.3),
            ease: 'power2.out',
            delay: getRandom(1.1, 2.3),
            pixi: {
              alpha: 0,
              y: tiles[id].y + getRandom(100, 600),
              skewY: getRandom(-170, 170),
            },
            onComplete: () => {
              setupGsapTile(tile, id)
            },
          })
        },
      })
    },
    [fadeInDurationMax, fadeInDurationMin, predefinedFXIn, setupGsapTile, tiles],
  )

  const animateHitboxInAlt = useCallback(
    (tile: Sprite, id: number, originX: number, originY: number) => {
      gsap.killTweensOf(tile)
      tile.zIndex = 90
      gsap.to(tile, {
        duration: getRandom(fadeInDurationMin * 2, fadeInDurationMax * 2),
        ease: 'power2.out',
        pixi: {
          tint: tileEndColor,
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
    [animateHitboxOut, fadeInDurationMax, fadeInDurationMin, tileEndColor],
  )

  return {
    setupGsapTile,
    animateIn,
    animateHitboxIn,
    animateHitboxInAlt,
    setupGsapBgTile,
    animateBgTileIn,
  }
}

export default useTileFx
