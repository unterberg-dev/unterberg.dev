export const R = (min: number, max: number) => {
  const random = min + Math.random() * (max - min)
  return random
}

export const generatePathPoints = (svgPath: string, numPoints: number) => {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute('d', svgPath)

  const length = path.getTotalLength()
  const points = []

  for (let i = 0; i <= numPoints; i++) {
    const point = path.getPointAtLength((i / numPoints) * length)
    points.push({ x: point.x, y: point.y })
  }

  return points
}

export const scalePathToViewBox = (
  originalPath: string,
  viewBox: string,
  width: number,
  height: number,
) => {
  // Parse the original path into individual commands
  const originalCommands = originalPath.split(/(?=[A-Za-z])/)

  // Calculate scaling factors
  const viewBoxParts = viewBox.split(' ')
  const viewBoxWidth = parseFloat(viewBoxParts[2])
  const viewBoxHeight = parseFloat(viewBoxParts[3])
  const scaleX = width / viewBoxWidth
  const scaleY = height / viewBoxHeight

  // Initialize scaled path string
  let scaledPath = ''

  // Loop through original commands and scale coordinates
  originalCommands.forEach(command => {
    const type = command.substring(0, 1)
    const values = command.substring(1).split(' ').map(parseFloat)

    // Scale coordinates based on the command type
    if (type === 'M' || type === 'L' || type === 'C') {
      const scaledValues = values.map((value, index) =>
        // Scale x-coordinate for even indices, y-coordinate for odd indices
        index % 2 === 0 ? value * scaleX : value * scaleY,
      )
      scaledPath += `${type}${scaledValues.join(' ')}`
    } else {
      // For other commands, simply append to scaled path
      scaledPath += command
    }
  })

  return scaledPath
}
