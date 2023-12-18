import useTileStore from '@/src/zustand/useTileStore'
import { useCallback } from 'react'

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
  const tileHeight = useTileStore(state => state.tileHeight)
  const setTileHeight = useTileStore(state => state.setTileHeight)
  const setPreviewMode = useTileStore(state => state.setPreviewMode)

  const handleSettingsMouseIn = useCallback(() => {
    setPreviewMode(true)
  }, [setPreviewMode])

  const handleSettingsMouseOut = useCallback(() => {
    setPreviewMode(false)
  }, [setPreviewMode])

  return (
    <div
      className="absolute left-5 top-5 max-w-screen-md"
      onPointerEnter={handleSettingsMouseIn}
      onPointerLeave={handleSettingsMouseOut}
    >
      <div className="border-grayDark border p-3 bg-dark">
        <h3 className="text-xl font-bold">
          <span>Tile </span>
          <span className="text-sm font-normal">(disabled because performance issues atm 💀)</span>
        </h3>
        <div className="grid grid-cols-2 gap-4 text-grayDark">
          <label>
            <p>width: {tileWidth} px</p>
            <input
              disabled
              type="range"
              min={15}
              max={80}
              step={1}
              value={tileWidth}
              onChange={e => setTileWidth(parseFloat(e.target.value))}
            />
          </label>
          <label>
            <p>height: {tileHeight}px</p>
            <input
              disabled
              type="range"
              min={15}
              max={80}
              step={1}
              value={tileHeight}
              onChange={e => setTileHeight(parseFloat(e.target.value))}
            />
          </label>
        </div>
      </div>
      <div className="border-grayDark border p-3 bg-dark">
        <h3 className="text-xl font-bold">Cursor</h3>
        <div className="grid grid-cols-2 gap-4">
          <label className="text-white">
            <p>cursor radius: {cursorRadius} tiles</p>
            <input
              type="range"
              min={1}
              max={7}
              step={1}
              value={cursorRadius}
              onChange={e => setCursorRadius(parseFloat(e.target.value))}
            />
          </label>
          <label className="text-white">
            <p>idle loop move interval: {(idleLoopDuration / 1000).toFixed(2)}s</p>
            <input
              type="range"
              min={50}
              max={600}
              step={10}
              value={idleLoopDuration}
              onChange={e => setIdleLoopDuration(parseFloat(e.target.value))}
            />
          </label>
        </div>
      </div>
      <div className="border-grayDark border p-3 bg-dark">
        <h3 className="text-xl font-bold">Fade in</h3>
        <div className="grid grid-cols-2 gap-4">
          <label className="text-white">
            <p>min duration: {fadeInDurationMin}s</p>
            <input
              type="range"
              min={0.1}
              max={0.9}
              step={0.1}
              value={fadeInDurationMin}
              onChange={e => setFadeInDurationMin(parseFloat(e.target.value))}
            />
          </label>
          <label className="text-white">
            <p>Fade in max duration: {fadeInDurationMax}s</p>
            <input
              type="range"
              min={0.1}
              max={0.9}
              step={0.1}
              value={fadeInDurationMax}
              onChange={e => setFadeInDurationMax(parseFloat(e.target.value))}
            />
          </label>
        </div>
      </div>
      <div className="border-grayDark border p-3 bg-dark">
        <h3 className="text-xl font-bold">Tail in</h3>
        <div className="grid grid-cols-2 gap-4">
          <label className="text-white">
            <p>min duration: {tailInDurationMin}s</p>
            <input
              type="range"
              min={0.1}
              max={0.9}
              step={0.1}
              value={tailInDurationMin}
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
              onChange={e => setTailInDurationMax(parseFloat(e.target.value))}
            />
          </label>
        </div>
      </div>
      <div className="border-grayDark border p-3 bg-dark">
        <h3 className="text-xl font-bold">Fade out</h3>
        <div className="grid grid-cols-2 gap-4">
          <label className="text-white">
            <p>min duration: {fadeOutDurationMin}s</p>
            <input
              type="range"
              min={0.1}
              max={0.9}
              step={0.1}
              value={fadeOutDurationMin}
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
              onChange={e => setFadeOutDurationMax(parseFloat(e.target.value))}
            />
          </label>
        </div>
      </div>
    </div>
  )
}

export default TileSettings
