import useTileStore from '@/src/zustand/useTileStore'
import { debounce } from 'lodash'
import { useCallback, useState } from 'react'

const TileSettings = () => {
  const fadeInDurationMin = useTileStore(state => state.fadeInDurationMin)
  const setFadeInDurationMin = useTileStore(state => state.setFadeInDurationMin)
  const fadeInDurationMax = useTileStore(state => state.fadeInDurationMax)
  const setFadeInDurationMax = useTileStore(state => state.setFadeInDurationMax)
  const tailInDurationMin = useTileStore(state => state.tailInDurationMin)
  const setTailInDurationMin = useTileStore(state => state.setTailInDurationMin)
  const tailInDurationMax = useTileStore(state => state.tailInDurationMax)
  const setTailInDurationMax = useTileStore(state => state.setTailInDurationMax)
  const fadeOutDurationMin = useTileStore(state => state.fadeOutDurationMin)
  const setFadeOutDurationMin = useTileStore(state => state.setFadeOutDurationMin)
  const fadeOutDurationMax = useTileStore(state => state.fadeOutDurationMax)
  const setFadeOutDurationMax = useTileStore(state => state.setFadeOutDurationMax)
  const cursorRadius = useTileStore(state => state.cursorRadius)
  const setCursorRadius = useTileStore(state => state.setCursorRadius)
  const idleLoopDuration = useTileStore(state => state.idleLoopDuration)
  const setIdleLoopDuration = useTileStore(state => state.setIdleLoopDuration)
  const tileWidth = useTileStore(state => state.tileWidth)
  const setTileWidth = useTileStore(state => state.setTileWidth)
  const setTileHeight = useTileStore(state => state.setTileHeight)
  const setPreviewMode = useTileStore(state => state.setPreviewMode)
  const setIdleIntervalPreviewMode = useTileStore(state => state.setIdleIntervalPreviewMode)
  const tileStartColor = useTileStore(state => state.tileStartColor)
  const setTileStartColor = useTileStore(state => state.setTileStartColor)
  const tileTailColor = useTileStore(state => state.tileTailColor)
  const setTileTailColor = useTileStore(state => state.setTileTailColor)
  const tileEndColor = useTileStore(state => state.tileEndColor)
  const setTileEndColor = useTileStore(state => state.setTileEndColor)

  const handleSettingsMouseIn = useCallback(() => {
    setPreviewMode(true)
  }, [setPreviewMode])

  const handleSettingsMouseOut = useCallback(() => {
    setPreviewMode(false)
  }, [setPreviewMode])

  const [uiTileSize, setUiTileSize] = useState(tileWidth)

  const debounceSizeChange = debounce((value: number) => {
    setTileHeight(value)
    setTileWidth(value)
  }, 200)

  const handleTileSizeChange = (value: number) => {
    setUiTileSize(value)
    debounceSizeChange(value)
  }

  return (
    <div
      className="absolute left-0 top-0 w-auto max-w-xs text-white p-6"
      onPointerEnter={handleSettingsMouseIn}
      onPointerLeave={handleSettingsMouseOut}
    >
      <div className="relative mb-5">
        <div className="absolute top-0 left-full bottom-0 flex items-center ml-5">
          <h2 className="text-3xl font-thin text-grayLight">Tile</h2>
        </div>
        <label>
          <p>size: {uiTileSize} px</p>
          <input
            type="range"
            min={15}
            max={50}
            step={1}
            value={uiTileSize}
            className="w-full"
            onChange={e => handleTileSizeChange(parseFloat(e.target.value))}
          />
        </label>
      </div>
      <div className="relative mb-5">
        <div className="absolute top-0 left-full bottom-0 flex items-center ml-5">
          <h2 className="text-3xl font-thin text-grayLight">Cursor</h2>
        </div>
        <label className="text-white">
          <p>cursor radius: {cursorRadius} tiles</p>
          <input
            type="range"
            min={1}
            max={7}
            step={1}
            value={cursorRadius}
            className="w-full"
            onChange={e => setCursorRadius(parseFloat(e.target.value))}
          />
        </label>
        <label
          className="text-white"
          onPointerEnter={() => setIdleIntervalPreviewMode(true)}
          onPointerLeave={() => setIdleIntervalPreviewMode(false)}
        >
          <p>idle movement interval: {(idleLoopDuration / 1000).toFixed(2)}s</p>
          <input
            type="range"
            min={50}
            max={600}
            step={10}
            value={idleLoopDuration}
            className="w-full"
            onChange={e => setIdleLoopDuration(parseFloat(e.target.value))}
          />
        </label>
      </div>
      <div className="relative mb-5">
        <div className="absolute top-0 left-full bottom-0 flex items-center ml-5">
          <h2 className="text-3xl font-thin text-grayLight">Entry Tween</h2>
        </div>
        <label className="text-white">
          <p>min duration: {fadeInDurationMin}s</p>
          <input
            type="range"
            min={0.1}
            max={0.9}
            step={0.1}
            value={fadeInDurationMin}
            className="w-full"
            onChange={e => setFadeInDurationMin(parseFloat(e.target.value))}
          />
        </label>
        <label className="text-white">
          <p>max duration: {fadeInDurationMax}s</p>
          <input
            type="range"
            min={0.1}
            max={0.9}
            step={0.1}
            value={fadeInDurationMax}
            className="w-full"
            onChange={e => setFadeInDurationMax(parseFloat(e.target.value))}
          />
        </label>
        <label className="text-white">
          <p>color: {tileStartColor}</p>
          <input
            type="color"
            min={1}
            max={7}
            step={1}
            value={tileStartColor}
            className="w-full"
            onChange={e => setTileStartColor(e.target.value)}
          />
        </label>
      </div>
      <div className="relative mb-5">
        <div className="absolute top-0 left-full bottom-0 flex items-center ml-5">
          <h2 className="text-3xl font-thin text-grayLight">Tail Tween</h2>
        </div>
        <label className="text-white">
          <p>min duration: {tailInDurationMin}s</p>
          <input
            type="range"
            min={0.1}
            max={0.9}
            step={0.1}
            value={tailInDurationMin}
            className="w-full"
            onChange={e => setTailInDurationMin(parseFloat(e.target.value))}
          />
        </label>
        <label className="text-white">
          <p>max duration: {tailInDurationMax}s</p>
          <input
            type="range"
            min={0.1}
            max={0.9}
            step={0.1}
            value={tailInDurationMax}
            className="w-full"
            onChange={e => setTailInDurationMax(parseFloat(e.target.value))}
          />
        </label>
        <label className="text-white">
          <p>color: {tileTailColor}</p>
          <input
            type="color"
            min={1}
            max={7}
            step={1}
            value={tileTailColor}
            className="w-full"
            onChange={e => setTileTailColor(e.target.value)}
          />
        </label>
      </div>
      <div className="relative mb-5">
        <div className="absolute top-0 left-full bottom-0 flex items-center ml-5">
          <h2 className="text-3xl font-thin text-grayLight">Tail Tween</h2>
        </div>
        <label className="text-white">
          <p>min duration: {fadeOutDurationMin}s</p>
          <input
            type="range"
            min={0.1}
            max={0.9}
            step={0.1}
            value={fadeOutDurationMin}
            className="w-full"
            onChange={e => setFadeOutDurationMin(parseFloat(e.target.value))}
          />
        </label>
        <label className="text-white">
          <p>max duration: {fadeOutDurationMax}s</p>
          <input
            type="range"
            min={0.1}
            max={0.9}
            step={0.1}
            value={fadeOutDurationMax}
            className="w-full"
            onChange={e => setFadeOutDurationMax(parseFloat(e.target.value))}
          />
        </label>
        <label className="text-white">
          <p>color: {tileEndColor}</p>
          <input
            type="color"
            min={1}
            max={7}
            step={1}
            className="w-full"
            value={tileEndColor}
            onChange={e => setTileEndColor(e.target.value)}
          />
        </label>
      </div>
    </div>
  )
}

export default TileSettings
