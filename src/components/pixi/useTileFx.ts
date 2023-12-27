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
  const cursorRadius = useTileStore(state => state.cursorRadius)
  const cursorRadiusRef = useRef(cursorRadius)

  const tileWidth = useTileStore(state => state.tileWidth)
  const tileWidthRef = useRef(tileWidth)
  const tileHeight = useTileStore(state => state.tileHeight)
  const tileHeightRef = useRef(tileHeight)

  const tileStartColor = useTileStore(state => state.tileStartColor)
  const tileStartColorRef = useRef(tileStartColor)

  const tileTailColor = useTileStore(state => state.tileTailColor)
  const tileTailColorRef = useRef(tileTailColor)

  const tileEndColor = useTileStore(state => state.tileEndColor)
  const tileEndColorRef = useRef(tileEndColor)

  const fadeInDurationMin = useTileStore(state => state.fadeInDurationMin)
  const fadeInDurationMinRef = useRef(fadeInDurationMin)

  const fadeInDurationMax = useTileStore(state => state.fadeInDurationMax)
  const fadeInDurationMaxRef = useRef(fadeInDurationMax)

  const tailInDurationMin = useTileStore(state => state.tailInDurationMin)
  const tailInDurationMinRef = useRef(tailInDurationMin)

  const tailInDurationMax = useTileStore(state => state.tailInDurationMax)
  const tailInDurationMaxRef = useRef(tailInDurationMax)

  const fadeOutDurationMin = useTileStore(state => state.fadeOutDurationMin)
  const fadeOutDurationMinRef = useRef(fadeOutDurationMin)

  const fadeOutDurationMax = useTileStore(state => state.fadeOutDurationMax)
  const fadeOutDurationMaxRef = useRef(fadeOutDurationMax)

  useEffect(() => {
    cursorRadiusRef.current = cursorRadius
    tileWidthRef.current = tileWidth
    tileHeightRef.current = tileHeight
    tileStartColorRef.current = tileStartColor
    tileTailColorRef.current = tileTailColor
    tileEndColorRef.current = tileEndColor
    fadeInDurationMinRef.current = fadeInDurationMin
    fadeInDurationMaxRef.current = fadeInDurationMax
    tailInDurationMinRef.current = tailInDurationMin
    tailInDurationMaxRef.current = tailInDurationMax
    fadeOutDurationMinRef.current = fadeOutDurationMin
    fadeOutDurationMaxRef.current = fadeOutDurationMax
  }, [
    cursorRadius,
    fadeInDurationMax,
    fadeInDurationMin,
    fadeOutDurationMax,
    fadeOutDurationMin,
    tailInDurationMax,
    tailInDurationMin,
    tileEndColor,
    tileHeight,
    tileStartColor,
    tileTailColor,
    tileWidth,
  ])

  const predefinedFXInitial = useMemo(
    () =>
      tiles.map(tile => ({
        rotation: getRandom(-50, 50),
        skewX: getRandom(-150, 150),
        skewY: getRandom(-150, 150),
        alpha: 0,
        width: 0,
        height: 0,
        x: tile.x + getRandom(-tileWidth * 2.2, tileWidth * 2.2),
        y: tile.y + getRandom(-tileHeight * 2.2, tileHeight * 2.2),
      })),
    [tileHeight, tileWidth, tiles],
  )

  const predefinedFXIn = useMemo(
    () =>
      tiles.map(tile => ({
        tint: tileStartColorRef.current,
        skewX: getRandom(-10, 10),
        skewY: getRandom(-10, 10),
        width: tileWidthRef.current * getRandom(1.1, 1.3),
        height: tileHeightRef.current * getRandom(1.1, 1.3),
        x: tile.x,
        y: tile.y,
      })),
    [tiles],
  )

  const setupGsapTile = useCallback((tile: Sprite, originX: number, originY: number) => {
    gsap.set(tile, {
      zIndex: 15,
      pixi: {
        rotation: getRandom(-150, 150),
        skewX: getRandom(-150, 150),
        skewY: getRandom(-150, 150),
        alpha: 0,
        width: 0,
        height: 0,
        x: originX + getRandom(-tileWidthRef.current * 2.2, tileWidthRef.current * 2.2),
        y: originY + getRandom(-tileHeightRef.current * 2.2, tileHeightRef.current * 2.2),
      },
    })
  }, [])

  const setupGsapBgTile = useCallback((tile: Sprite) => {
    tile.zIndex = 5
    gsap.to(tile, {
      zIndex: 5,
      delay: getRandom(0.5, 1),
      duration: getRandom(0.5, 1),
      pixi: {
        skewX: 0,
        skewY: 0,
        alpha: getRandom(0.1, 0.2),
      },
    })
  }, [])

  const animateBgTileIn = useCallback((tile: Sprite) => {
    const tl = gsap.timeline()

    tile.zIndex = 10
    tl.to(tile, {
      duration: getRandom(fadeInDurationMinRef.current * 2, fadeInDurationMaxRef.current * 2),
      ease: 'power2.out',
      pixi: {
        alpha: getRandom(0.4, 0.7),
        width: tileWidthRef.current * getRandom(1.1, 1.7),
        height: tileHeightRef.current * getRandom(1.1, 1.7),
      },
    })
    tl.to(tile, {
      duration: getRandom(fadeOutDurationMinRef.current * 2, fadeOutDurationMaxRef.current * 2),
      ease: 'power2.out',
      pixi: {
        alpha: getRandom(0.1, 0.2),
        skewY: 0,
        skewX: 0,
        width: tileWidthRef.current,
        height: tileHeightRef.current,
      },
    })
  }, [])

  const animateIn = useCallback(
    (tile: Sprite, id: number, originX: number, originY: number) => {
      gsap.killTweensOf(tile)
      const tl = gsap.timeline()
      // START
      tl.to(tile, {
        duration: getRandom(fadeInDurationMinRef.current, fadeInDurationMaxRef.current),
        ease: 'power2.out',
        onStart: () => {
          tile.zIndex = 100
        },
        pixi: {
          skewX: getRandom(-10, 10),
          skewY: getRandom(-10, 10),
          width: tileWidthRef.current * getRandom(1.1, 1.3),
          height: tileHeightRef.current * getRandom(1.1, 1.3),
          x: originX,
          y: originY,
          tint: tileStartColorRef.current,
          alpha: getRandom(0.5, 1),
          rotation: getRandom(-30, 30),
        },
      })
      // TAIL
      tl.to(tile, {
        duration: getRandom(tailInDurationMinRef.current, tailInDurationMaxRef.current),
        ease: 'power1.out',
        onStart: () => {
          tile.zIndex = 60
        },
        pixi: {
          x:
            originX +
            getRandom(
              -tileWidthRef.current * cursorRadiusRef.current,
              tileWidthRef.current * cursorRadiusRef.current,
            ),
          y:
            originY +
            getRandom(
              -tileHeightRef.current * cursorRadiusRef.current,
              tileHeightRef.current * cursorRadiusRef.current,
            ),
          tint: tileTailColorRef.current,
          rotation: getRandom(-30, 30),
          skewX: getRandom(-40, 40),
          alpha: getRandom(0.2, 1),
          skewY: getRandom(-50, 50),
          width: tileWidthRef.current / getRandom(1.2, 1.5),
          height: tileHeightRef.current / getRandom(1.2, 1.5),
        },
      })
      // END
      tl.to(tile, {
        duration: getRandom(fadeOutDurationMinRef.current, fadeOutDurationMaxRef.current),
        ease: 'power2.out',
        pixi: {
          ...predefinedFXInitial[id],
          tint: tileEndColorRef.current,
          x:
            originX +
            getRandom(
              -tileWidthRef.current * (cursorRadiusRef.current * 1.5),
              tileWidthRef.current * (cursorRadiusRef.current * 1.5),
            ),
          y:
            originY +
            getRandom(
              -tileHeightRef.current * (cursorRadiusRef.current * 1.5),
              tileHeightRef.current * (cursorRadiusRef.current * 1.5),
            ),
        },
      })
    },
    [predefinedFXInitial],
  )

  const animateHitboxOut = useCallback(
    (tile: Sprite, _id: number, originX: number, originY: number) => {
      tile.zIndex = 50
      gsap.to(tile, {
        duration: getRandom(fadeOutDurationMinRef.current, fadeOutDurationMaxRef.current),
        ease: 'power2.out',
        pixi: {
          alpha: 0,
          rotation: getRandom(-30, 30),
        },
        x: originX + getRandom(tileWidthRef.current, tileWidthRef.current),
        y: originY + getRandom(tileHeightRef.current, tileHeightRef.current),
      })
    },
    [],
  )

  const animateHitboxIn = useCallback(
    (tile: Sprite, id: number, originX: number, originY: number) => {
      gsap.killTweensOf(tile)
      tile.zIndex = 100
      gsap.to(tile, {
        duration: getRandom(fadeInDurationMinRef.current, fadeInDurationMaxRef.current),
        ease: 'power2.out',
        pixi: {
          ...predefinedFXIn[id],
          alpha: getRandom(0, 0.3),
          tint: tileStartColorRef.current,
          rotation: getRandom(-70, 70),
          width: tileWidthRef.current * getRandom(0.1, 0.3),
          height: tileHeightRef.current * getRandom(0.1, 0.3),
          x: originX + getRandom(-tileWidthRef.current, tileWidthRef.current),
          y: originY + getRandom(-tileHeightRef.current, tileHeightRef.current),
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
              setupGsapTile(tile, originX, originY)
            },
          })
        },
      })
    },
    [predefinedFXIn, setupGsapTile, tiles],
  )

  const animateHitboxInAlt = useCallback(
    (tile: Sprite, id: number, originX: number, originY: number) => {
      gsap.killTweensOf(tile)
      tile.zIndex = 90
      gsap.to(tile, {
        duration: getRandom(fadeInDurationMinRef.current * 2, fadeInDurationMaxRef.current * 2),
        ease: 'power2.out',
        pixi: {
          tint: tileEndColorRef.current,
          alpha: getRandom(0.2, 0.4),
          rotation: getRandom(-30, 30),
          width: tileWidthRef.current * getRandom(0.1, 0.2),
          height: tileHeightRef.current * getRandom(0.1, 0.2),
          x: originX + getRandom(tileWidthRef.current, tileWidthRef.current),
          y: originY + getRandom(tileHeightRef.current, tileHeightRef.current),
        },
        onComplete: () => {
          animateHitboxOut(tile, id, originX, originY)
        },
      })
    },
    [animateHitboxOut],
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
