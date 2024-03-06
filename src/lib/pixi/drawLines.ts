import gsap from 'gsap'
import range from 'lodash/range'
import { Application, Graphics } from 'pixi.js'

import { getRandom } from '#lib/utils'

interface DrawLinesParams {
  colorVariationsDark: string[]
  tileWidth: number
  tileHeight: number
  colsCount: number
  rowsCount: number
  appRef: React.MutableRefObject<Application>
  linesRef: React.MutableRefObject<{ id: string; graphics: Graphics }[]>
}

const drawLines = ({
  colorVariationsDark,
  tileWidth,
  tileHeight,
  colsCount,
  rowsCount,
  appRef,
  linesRef,
}: DrawLinesParams) => {
  const colCoordsDef = range(colsCount).map(col => ({
    x: (col + 1) * tileWidth,
    height: rowsCount * tileHeight,
  }))
  const rowCoordsDef = range(rowsCount).map(row => ({
    y: (row + 1) * tileHeight,
    width: colsCount * tileWidth,
  }))

  colCoordsDef.forEach(({ x, height }) => {
    const randomColorIndex = Math.floor(Math.random() * colorVariationsDark.length)
    const selectedColor = colorVariationsDark[randomColorIndex]

    const line = new Graphics()
    line.alpha = 0
    line.lineStyle(1, selectedColor)
    line.moveTo(x - tileWidth / 2, 0)
    line.lineTo(x - tileWidth / 2, height)
    line.closePath()
    appRef.current.stage.addChild(line)
    linesRef.current.push({ id: `line-v-${x}`, graphics: line })

    gsap.to(line, {
      zIndex: 5,
      delay: getRandom(0.5, 1),
      duration: getRandom(0.5, 1),
      pixi: {
        skewX: 0,
        skewY: 0,
        alpha: getRandom(0.1, 0.3),
      },
    })
  })

  rowCoordsDef.forEach(({ y, width }) => {
    const randomColorIndex = Math.floor(Math.random() * colorVariationsDark.length)
    const selectedColor = colorVariationsDark[randomColorIndex]

    const line = new Graphics()
    line.alpha = 0
    line.lineStyle(1, selectedColor)
    line.moveTo(0, y - tileHeight / 2)
    line.lineTo(width, y - tileHeight / 2)
    line.closePath()
    appRef.current.stage.addChild(line)
    linesRef.current.push({ id: `line-h-${y}`, graphics: line })

    gsap.to(line, {
      zIndex: 5,
      duration: getRandom(0.5, 1),
      delay: getRandom(0.5, 1),
      pixi: {
        skewX: 0,
        skewY: 0,
        alpha: getRandom(0.1, 0.3),
      },
    })
  })
}

export default drawLines
