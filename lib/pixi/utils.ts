import type { Application, Renderer } from "pixi.js"

import type { Tile } from "#pixi/types"
import { PixiConfig } from "#root/lib/constants"

// todo: mixed function - split into smaller functions - one for creating the grid, one for creating the tiles
export const createTileGrid = (gridSize: number, stageWidth: number, stageHeight: number) => {
  const tilesPos: Tile[] = []
  let tileId = 0

  for (let y = 0; y < stageHeight; y += gridSize) {
    for (let x = 0; x < stageWidth; x += gridSize) {
      const tile: Tile = {
        id: tileId + 1,
        x,
        y,
      }
      tileId += 1
      tilesPos.push({ ...tile, id: tileId })
    }
  }

  return tilesPos
}

export const getDimensions = (app: Application<Renderer>) => {
  const { maxDivider, minDivider, minDividerThreshold, maxDividerThreshold } = PixiConfig

  let divider =
    minDivider +
    ((app.renderer.width - minDividerThreshold) * (maxDivider - minDivider)) /
      (maxDividerThreshold - minDividerThreshold)
  divider = Math.max(minDivider, Math.min(divider, maxDivider))

  const tileWidth = Math.floor(app.renderer.width / divider)
  const tileHeight = tileWidth

  return {
    tileWidth,
    tileHeight,
  }
}

export const R = (min: number, max: number) => {
  const random = min + Math.random() * (max - min)
  return random
}

export const generatePathPoints = (svgPath: string, numPoints: number) => {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path.setAttribute("d", svgPath)

  const length = path.getTotalLength()
  const points = []

  for (let i = 0; i <= numPoints; i += 1) {
    const point = path.getPointAtLength((i / numPoints) * length)
    points.push({ x: point.x, y: point.y })
  }

  return points
}

export const scalePathToViewBox = (originalPath: string, viewBox: string, width: number, height: number) => {
  // Parse the original path into individual commands
  const originalCommands = originalPath.split(/(?=[A-Za-z])/)

  // Calculate scaling factors
  const viewBoxParts = viewBox.split(" ")
  const viewBoxWidth = Number.parseFloat(viewBoxParts[2])
  const viewBoxHeight = Number.parseFloat(viewBoxParts[3])
  const scaleX = width / viewBoxWidth
  const scaleY = height / viewBoxHeight

  // Initialize scaled path string
  let scaledPath = ""

  // Loop through original commands and scale coordinates
  for (const command of originalCommands) {
    const type = command.substring(0, 1)
    const values = command.substring(1).split(" ").map(Number.parseFloat)

    // Scale coordinates based on the command type
    if (type === "M" || type === "L" || type === "C") {
      const scaledValues = values.map((value, index) =>
        // Scale x-coordinate for even indices, y-coordinate for odd indices
        index % 2 === 0 ? value * scaleX : value * scaleY,
      )
      scaledPath += `${type}${scaledValues.join(" ")}`
    } else {
      // For other commands, simply append to scaled path
      scaledPath += command
    }
  }

  return scaledPath
}
