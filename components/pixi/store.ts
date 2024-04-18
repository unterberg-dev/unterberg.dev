import { Application, Renderer } from 'pixi.js'

import { EmitterTile, Hitbox, SpaceObject, Tile } from '#components/pixi/types'

export type Store = {
  app: Application<Renderer>
  stage: HTMLDivElement
  tiles: Tile[]
  rowsCount: number
  colsCount: number
  tileWidth: number
  tileHeight: number
  cursorRadius: number
  hitboxes?: Hitbox[]
  spaceObjects: SpaceObject[]
  autoPointerTimeline?: gsap.core.Timeline
}

let store: Store
export const getStore = () => store
export const setStore = (newStore: Store) => {
  store = newStore
}

export type EmitterStore = {
  emitterTiles: EmitterTile[]
  activeEmitterTiles: EmitterTile['id'][]
}
let emitterStore: EmitterStore
export const getEmitterStore = () => emitterStore
export const setEmitterStore = (newStore: EmitterStore) => {
  emitterStore = newStore
}
