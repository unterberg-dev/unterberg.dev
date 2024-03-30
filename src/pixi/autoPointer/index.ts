import gsap from 'gsap'

import { handlePointerMove } from '#pixi/grid/pointer'
import { getStore } from '#pixi/store'
import { PathInfo } from '#pixi/types'
import { testSVGPath } from '#src/lib/constants'
import { calculateBezierPoints, scalePathToBoundaries } from '#src/utils'

export const initAutoPointer = async () => {
  const { app } = getStore()

  const stageWidth = app.renderer.width
  const stageHeight = app.renderer.height

  const tl = gsap.timeline({ repeat: -1 })

  // get super idle
  const incomingSvgPath: PathInfo = {
    d: testSVGPath.default3,
    viewBox: '0 0 800 400',
  }

  const scaledSvgPath = scalePathToBoundaries(incomingSvgPath, stageWidth, stageHeight)

  // todo: we need this later for the already idled mouse
  // todo: outsource, refactor whole autopointer

  // Define ellipse parameters
  // const rx = 160
  // const ry = 60
  // const cx = stageWidth / 8
  // const cy = stageHeight / 4 // Subtracting a small offset from the y-coordinate
  // const ellipse = createEllipsePaths({ cx, cy, rx, ry })
  // const scaledEllipse = scaleSvgPathToBoundaries(
  //   { d: ellipse, viewBox: `0 0 ${stageWidth / 4} ${stageHeight / 4}` },
  //   stageWidth,
  //   stageHeight,
  // )

  const commands = scaledSvgPath.split(/(?=[A-Za-z])/)

  commands.forEach(command => {
    const type = command.substring(0, 1)
    const values = command.substring(1).split(',').map(parseFloat)

    if (type === 'C') {
      const [x1, y1, x2, y2, x, y] = values
      const points = calculateBezierPoints(values[0], values[1], x1, y1, x2, y2, x, y, 100)

      // Create tweens for each point
      points.forEach(({ x, y }, _index) => {
        tl.to(
          {},
          {
            duration: 0.5 / points.length,
            onUpdate: () => {
              handlePointerMove({ manual: { x, y } })
            },
          },
          '>',
        )
      })
    }
  })
  tl.play()
}
