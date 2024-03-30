import { EllipseParams, PathInfo } from '#pixi/types'

export const R = (min: number, max: number) => {
  const random = min + Math.random() * (max - min)
  return random
}

export const scalePathToBoundaries = (
  svgPath: PathInfo,
  stageWidth: number,
  stageHeight: number,
): string => {
  const viewBoxParts = svgPath.viewBox.split(' ')
  const viewBoxWidth = parseFloat(viewBoxParts[2])
  const viewBoxHeight = parseFloat(viewBoxParts[3])

  // Calculate scaling factors
  const scaleX = stageWidth / viewBoxWidth
  const scaleY = stageHeight / viewBoxHeight

  // Parse original path commands
  const originalCommands = svgPath.d.split(/(?=[A-Za-z])/)

  // Initialize scaled path string
  let scaledPath = ''

  // Loop through original commands and scale coordinates
  originalCommands.forEach(command => {
    const type = command.substring(0, 1)
    const values = command.substring(1).split(',').map(parseFloat)

    if (type === 'C') {
      // Cubic Bezier curve
      const [x1, y1, x2, y2, x, y] = values

      // Scale coordinates
      const scaledX1 = x1 * scaleX
      const scaledY1 = y1 * scaleY
      const scaledX2 = x2 * scaleX
      const scaledY2 = y2 * scaleY
      const scaledX = x * scaleX
      const scaledY = y * scaleY

      scaledPath += `${type}${scaledX1},${scaledY1},${scaledX2},${scaledY2},${scaledX},${scaledY}`
    } else {
      scaledPath += command
    }
  })

  return scaledPath
}

/**
 * Calculates the points on a cubic Bezier curve.
 *
 * @param x0 - The x-coordinate of the starting point.
 * @param y0 - The y-coordinate of the starting point.
 * @param x1 - The x-coordinate of the first control point.
 * @param y1 - The y-coordinate of the first control point.
 * @param x2 - The x-coordinate of the second control point.
 * @param y2 - The y-coordinate of the second control point.
 * @param x3 - The x-coordinate of the ending point.
 * @param y3 - The y-coordinate of the ending point.
 * @param numPoints - The number of points to calculate on the curve.
 * @returns An array of points on the Bezier curve.
 */
export const calculateBezierPoints = (
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  numPoints: number,
) => {
  const points: {
    x: number
    y: number
  }[] = []

  // Calculate step size
  const step = 1 / numPoints

  // Loop through each segment of the curve
  for (let t = 0; t <= 1; t += step) {
    // Calculate points using Simpson's rule
    const x_t =
      Math.pow(1 - t, 3) * x0 +
      3 * Math.pow(1 - t, 2) * t * x1 +
      3 * (1 - t) * Math.pow(t, 2) * x2 +
      Math.pow(t, 3) * x3
    const y_t =
      Math.pow(1 - t, 3) * y0 +
      3 * Math.pow(1 - t, 2) * t * y1 +
      3 * (1 - t) * Math.pow(t, 2) * y2 +
      Math.pow(t, 3) * y3

    // Add point to the array
    points.push({ x: x_t, y: y_t })
  }

  return points
}

export const createEllipsePaths = ({ cx, cy, rx, ry }: EllipseParams) => {
  if (cx < 0 || cy < 0 || rx <= 0 || ry <= 0) {
    return ''
  }
  const x0 = cx - rx
  const x1 = cx + rx
  const y0 = cy - ry
  const y1 = cy + ry

  const k = 0.4 // Cubic Bezier approximation constant

  const commands = [
    `M${x0},${cy}`,
    `C${x0},${cy - k * ry},${cx - k * rx},${y0},${cx},${y0}`,
    `C${cx + k * rx},${y0},${x1},${cy - k * ry},${x1},${cy}`,
    `C${x1},${cy + k * ry},${cx + k * rx},${y1},${cx},${y1}`,
    `C${cx - k * rx},${y1},${x0},${cy + k * ry},${x0},${cy}`,
  ]

  return commands.join('')
}
