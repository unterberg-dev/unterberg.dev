import { Application, Renderer } from 'pixi.js'

import { PixiConfig } from '#root/lib/constants'

export const getDimensions = (app: Application<Renderer>) => {
  const {
    configMaxDivider,
    configMinDivider,
    configMinDividerThreshold,
    configMaxDividerThreshold,
  } = PixiConfig

  let divider =
    configMinDivider +
    ((app.renderer.width - configMinDividerThreshold) * (configMaxDivider - configMinDivider)) /
      (configMaxDividerThreshold - configMinDividerThreshold)
  divider = Math.max(configMinDivider, Math.min(divider, configMaxDivider))

  const tileWidth = Math.floor(app.renderer.width / divider)
  const tileHeight = tileWidth

  return {
    tileWidth,
    tileHeight,
  }
}
