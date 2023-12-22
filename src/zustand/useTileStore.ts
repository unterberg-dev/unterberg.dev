import { HitboxType } from '@/lib/types'
import { create } from 'zustand'

interface UseTileStoreGetter {
  tileStartColor: string
  tileTailColor: string
  tileEndColor: string
  previewMode: boolean
  idleIntervalPreviewMode: boolean
  hitboxes: HitboxType[]
  scrollPosY: number
  isScrolling: boolean
  stageBlur: number
  tileWidth: number
  tileHeight: number
  cursorRadius: number
  idleLoopDuration: number
  previewLoopDuration: number
  fadeInDurationMin: number
  fadeInDurationMax: number
  tailInDurationMin: number
  tailInDurationMax: number
  fadeOutDurationMin: number
  fadeOutDurationMax: number
}

interface UseTileStoreSetter {
  setTileStartColor: (payload: string) => void
  setTileTailColor: (payload: string) => void
  setTileEndColor: (payload: string) => void
  setPreviewMode: (payload: boolean) => void
  setIdleIntervalPreviewMode: (payload: boolean) => void
  setHitboxes: (fn: (prev: HitboxType[]) => HitboxType[]) => void
  setScrollPosY: (payload: number) => void
  setIsScrolling: (payload: boolean) => void
  setStageBlur: (payload: number) => void
  setTileWidth: (payload: number) => void
  setTileHeight: (payload: number) => void
  setCursorRadius: (payload: number) => void
  setIdleLoopDuration: (payload: number) => void
  setPreviewLoopDuration: (payload: number) => void
  setFadeInDurationMin: (payload: number) => void
  setFadeInDurationMax: (payload: number) => void
  setTailInDurationMin: (payload: number) => void
  setTailInDurationMax: (payload: number) => void
  setFadeOutDurationMin: (payload: number) => void
  setFadeOutDurationMax: (payload: number) => void
}

type UseTileStoreProps = UseTileStoreGetter & UseTileStoreSetter

const tileStoreDefaults: UseTileStoreGetter = {
  tileStartColor: '#d93a3a',
  tileTailColor: '#610f4f',
  tileEndColor: '#F1B650',
  previewMode: false,
  idleIntervalPreviewMode: false,
  hitboxes: [],
  scrollPosY: 0,
  isScrolling: false,
  stageBlur: 0,
  tileWidth: 20,
  tileHeight: 20,
  cursorRadius: 3,
  idleLoopDuration: 150,
  previewLoopDuration: 25,
  fadeInDurationMin: 0.2,
  fadeInDurationMax: 0.3,
  tailInDurationMin: 0.2,
  tailInDurationMax: 0.4,
  fadeOutDurationMin: 0.4,
  fadeOutDurationMax: 0.9,
}

const useTileStore = create<UseTileStoreProps>()(set => ({
  ...tileStoreDefaults,
  setTileStartColor: payload => set(() => ({ tileStartColor: payload })),
  setTileTailColor: payload => set(() => ({ tileTailColor: payload })),
  setTileEndColor: payload => set(() => ({ tileEndColor: payload })),
  setPreviewMode: payload => set(() => ({ previewMode: payload })),
  setIdleIntervalPreviewMode: payload => set(() => ({ idleIntervalPreviewMode: payload })),
  setHitboxes: (fn: (prev: HitboxType[]) => HitboxType[]) => {
    set(state => ({ hitboxes: fn(state.hitboxes) }))
  },
  setScrollPosY: payload => set(() => ({ scrollPosY: payload })),
  setIsScrolling: payload => set(() => ({ isScrolling: payload })),
  setStageBlur: payload => set(() => ({ stageBlur: payload })),
  setTileWidth: payload => set(() => ({ tileWidth: payload })),
  setTileHeight: payload => set(() => ({ tileHeight: payload })),
  setCursorRadius: payload => set(() => ({ cursorRadius: payload })),
  setIdleLoopDuration: payload => set(() => ({ idleLoopDuration: payload })),
  setPreviewLoopDuration: payload => set(() => ({ previewLoopDuration: payload })),
  setFadeInDurationMin: payload => set(() => ({ fadeInDurationMin: payload })),
  setFadeInDurationMax: payload => set(() => ({ fadeInDurationMax: payload })),
  setTailInDurationMin: payload => set(() => ({ tailInDurationMin: payload })),
  setTailInDurationMax: payload => set(() => ({ tailInDurationMax: payload })),
  setFadeOutDurationMin: payload => set(() => ({ fadeOutDurationMin: payload })),
  setFadeOutDurationMax: payload => set(() => ({ fadeOutDurationMax: payload })),
}))

export default useTileStore
