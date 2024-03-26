import { Application, Renderer } from 'pixi.js'

import { Hitbox, Tile } from '#pixi/types'

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
}

let store: Store
export const setStore = (newStore: Store) => (store = newStore)
export const getStore = () => store
