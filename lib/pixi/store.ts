import type { Application, Renderer } from "pixi.js"

import type { PixiConfigType } from "#lib/types"
import type { EmitterTile, Hitbox, SpaceTile, Tile } from "#pixi/types"

export type Store = {
  app: Application<Renderer>
  stage: HTMLDivElement
  tiles: Tile[]
  rowsCount: number
  colsCount: number
  tileWidth: number
  tileHeight: number
  hitboxes?: Hitbox[]
  settingsHovered: boolean
  autoPointerTimeline?: gsap.core.Timeline
} & PixiConfigType

let store: Store
export const getStore = () => store
export const setStore = (newStore: Store) => {
  store = newStore
}

export type EmitterStore = {
  emitterTiles: EmitterTile[]
  activeEmitterTiles: Set<EmitterTile["id"]>
}

let emitterStore: EmitterStore

export const getEmitterStore = () => emitterStore
export const setEmitterStore = (newStore: EmitterStore) => {
  emitterStore = newStore
}

export type SpaceStore = {
  spaceBg: SpaceTile
}

let spaceStore: SpaceStore

export const getSpaceStore = () => spaceStore
export const setSpaceStore = (newStore: SpaceStore) => {
  spaceStore = newStore
}
