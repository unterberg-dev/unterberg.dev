import { APP_CONFIG, TILE_CONFIG } from '@/lib/constants'
import { getRandom } from '@/lib/utils'
import { Sprite } from 'pixi.js'
import gsap from 'gsap'
import { getCalculateTilePositions } from '@/components/Tile/tiles'

const tiles = getCalculateTilePositions()

const predefinedFXInitial = tiles.map(tile => ({
  skewX: getRandom(-50, 50),
  skewY: getRandom(-50, 50),
  rotation: getRandom(-50, 50),
  tint: '#fff200',
  alpha: 0,
  width: 0,
  height: 0,
  x: tile.x + getRandom(-TILE_CONFIG.width * 1.2, TILE_CONFIG.width * 1.2),
  y: tile.y + getRandom(-TILE_CONFIG.height * 1.2, TILE_CONFIG.height * 1.2),
}))

const predefinedFXIn = tiles.map(tile => ({
  tint: '#ff0000',
  skewX: getRandom(-10, 10),
  skewY: getRandom(-10, 10),
  width: TILE_CONFIG.width * getRandom(1.1, 1.3),
  height: TILE_CONFIG.height * getRandom(1.1, 1.3),
  x: tile.x,
  y: tile.y,
}))

export const setupGsapTile = (tile: Sprite, id: number) => {
  gsap.killTweensOf(tile) // for perfomance do not kill tweens
  gsap.set(tile, {
    pixi: {
      ...predefinedFXInitial[id],
    },
  })
}

export const animateOut = (tile: Sprite, id: number, originX: number, originY: number) => {
  // gsap.killTweensOf(tile) // for perfomance do not kill tweens

  gsap.to(tile, {
    duration: getRandom(0.4, 0.5),
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
          -TILE_CONFIG.width * (APP_CONFIG.hoverCircleCount * 1.5),
          TILE_CONFIG.width * (APP_CONFIG.hoverCircleCount * 1.5),
        ),
      y:
        originY +
        getRandom(
          -TILE_CONFIG.height * (APP_CONFIG.hoverCircleCount * 1.5),
          TILE_CONFIG.height * (APP_CONFIG.hoverCircleCount * 1.5),
        ),
    },
    onComplete: () => {
      setupGsapTile(tile, id)
    },
  })
}

export const animateIn = (tile: Sprite, id: number, originX: number, originY: number) => {
  gsap.killTweensOf(tile)

  const tl = gsap.timeline()
  tl.to(tile, {
    duration: getRandom(0.1, 0.2),
    pixi: {
      ...predefinedFXIn[id],
      alpha: getRandom(0.5, 1),
      rotation: getRandom(-30, 30),
    },
  })
  tl.to(tile, {
    duration: getRandom(0.3, 0.4),
    pixi: {
      x:
        originX +
        getRandom(
          -TILE_CONFIG.width * APP_CONFIG.hoverCircleCount,
          TILE_CONFIG.width * APP_CONFIG.hoverCircleCount,
        ),
      y:
        originY +
        getRandom(
          -TILE_CONFIG.height * APP_CONFIG.hoverCircleCount,
          TILE_CONFIG.height * APP_CONFIG.hoverCircleCount,
        ),
      tint: '#ff9000',
      rotation: getRandom(-30, 30),
      skewX: getRandom(-40, 40),
      skewY: getRandom(-50, 50),
      width: TILE_CONFIG.width / getRandom(1.2, 1.5),
      height: TILE_CONFIG.height / getRandom(1.2, 1.5),
    },
    onComplete: () => {
      animateOut(tile, id, originX, originY)
    },
  })
}

export const animateIdle = (tile: Sprite, id: number, originX: number, originY: number) => {
  // gsap.killTweensOf(tile)

  const tl = gsap.timeline({ repeat: -1 })
  tl.to(tile, {
    duration: getRandom(0.1, 0.2),
    pixi: {
      ...predefinedFXIn[id],
      tint: '#ffffff',
      alpha: getRandom(0.5, 1),
      rotation: getRandom(-30, 30),
      x: originX + getRandom(-TILE_CONFIG.width * 0.2, TILE_CONFIG.width * 0.2),
      y: originY + getRandom(-TILE_CONFIG.height * 0.2, TILE_CONFIG.height * 0.2),
    },
    // onInterrupt: () => {
    //   gsap.killTweensOf(tile)
    //   animateOut(tile, id, originX, originY)
    // },
  })
  tl.to(tile, {
    duration: getRandom(0.1, 0.2),
    pixi: {
      ...predefinedFXIn[id],
      alpha: getRandom(0.5, 1),
      rotation: getRandom(-90, 90),
      x: tile.x + getRandom(-TILE_CONFIG.width * 0.2, TILE_CONFIG.width * 0.2),
      y: tile.y + getRandom(-TILE_CONFIG.height * 0.2, TILE_CONFIG.height * 0.2),
    },
    // onInterrupt: () => {
    //   gsap.killTweensOf(tile)
    //   animateOut(tile, id, originX, originY)
    // },
  })
}
