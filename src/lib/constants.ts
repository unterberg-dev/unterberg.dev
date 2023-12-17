interface TileConfigValues {
  width: number
  height: number
  gap: number
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
  width: 25,
  height: 25,
  gap: 0,
  windowWidth: window.innerWidth,
  windowHeight: window.innerHeight,
}
