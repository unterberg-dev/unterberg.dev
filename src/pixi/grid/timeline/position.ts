import gsap from 'gsap'

import { getStore } from '#pixi/store'
import { Tile } from '#pixi/types'

interface RegisterSetPositionProps {
  tile: Tile
  inDuration: number
  inEase: string
  outDuration: number
  outEase: string
}

// todo: convert to be a timeline -> autoRemoveChildren: true
export const registerSetPosition = ({
  tile,
  inDuration,
  inEase,
  outDuration,
}: RegisterSetPositionProps) => {
  const { tiles } = getStore()

  tiles[tile.id].setPosition = (x: number, y: number, accX: number, accY: number) => {
    gsap.to(tile.container, {
      duration: inDuration,
      ease: inEase,
      x,
      y,
      // immediateRender: false,
      onStart: () => {
        gsap.to(tile.container, {
          delay: inDuration / 2,
          duration: outDuration * 1.5,
          ease: inEase,
          x: accX,
          y: accY,
        })
      },
    })
  }
}
