interface TileConfigValues {
  width: number
  height: number
  windowWidth: number
  windowHeight: number
}

export const APP_CONFIG = {
  resolution: window.devicePixelRatio,
  hoverCircleCount: 4,
  windowWidth: window.innerWidth,
  windowHeight: window.innerHeight,
}

export const TILE_CONFIG: TileConfigValues = {
  width: 20,
  height: 20,
  windowWidth: window.innerWidth,
  windowHeight: window.innerHeight,
}
