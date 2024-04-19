import gsap from 'gsap'

import { getStore, setStore } from '#components/pixi/store'
import { defaultCirclePath } from '#lib/constants'
import { handlePointerMove } from '#pixi/pointer'
import { generatePathPoints, scalePathToViewBox } from '#pixi/utils'

interface AutoPointerProps {
  x?: number
  y?: number
  width: number
  height: number
  duration?: number
  offsetX?: number
  offsetY?: number
}

export const registerAutoPointer = ({
  x,
  y,
  width,
  height,
  duration = 0.1,
  offsetX = 0,
  offsetY = 0,
}: AutoPointerProps) => {
  const store = getStore()

  const stageWidth = store.app.renderer.width
  const stageHeight = store.app.renderer.height

  const tl = gsap.timeline({ repeat: -1 })
  setStore({ ...store, autoPointerTimeline: tl })

  const ellipse = {
    width,
    height,
    offsetX,
    offsetY,
  }

  const scalePath = scalePathToViewBox(
    defaultCirclePath.d,
    defaultCirclePath.viewBox,
    ellipse.width,
    ellipse.height,
  )

  const points = generatePathPoints(scalePath, 20).reverse()

  const posX = (x || stageWidth / 2) - ellipse.width / 2 + (!x ? ellipse.offsetX : 0)
  const posY = (y || stageHeight / 2) - ellipse.height / 2 + (!y ? ellipse.offsetY : 0)

  points.forEach(point => {
    tl.to(
      {},
      {
        duration,
        onUpdate: () => {
          handlePointerMove({
            manual: { x: posX + point.x, y: posY + point.y },
          })
        },
      },
      '>',
    )
  })
  tl.play()
}
