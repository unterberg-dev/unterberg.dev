import { Application, Renderer } from 'pixi.js'

import { Hitbox, SpaceObject, Tile } from '#components/pixi/types'

export type Store = {
  app: Application<Renderer>
  stage: HTMLDivElement
  tiles: Tile[]
  rowsCount: number
  colsCount: number
  tileWidth: number
  hitboxPadding: number
  tileHeight: number
  cursorRadius: number
  hitboxes?: Hitbox[]
  spaceObjects: SpaceObject[]
  autoPointerTimeline?: gsap.core.Timeline
}

let store: Store
export const setStore = (newStore: Store) => {
  store = newStore
}
export const getStore = () => store
