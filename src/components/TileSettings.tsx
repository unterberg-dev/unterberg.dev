import Icon from '@/components/common/Icon'
import { ICON_ID } from '@/lib/icons/iconID'
import useTileStore from '@/src/zustand/useTileStore'
import debounce from 'lodash/debounce'
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
  const previewMode = useTileStore(state => state.previewMode)
  const setPreviewMode = useTileStore(state => state.setPreviewMode)
  const setIdleIntervalPreviewMode = useTileStore(state => state.setIdleIntervalPreviewMode)
  const tileStartColor = useTileStore(state => state.tileStartColor)
  const setTileStartColor = useTileStore(state => state.setTileStartColor)
  const tileTailColor = useTileStore(state => state.tileTailColor)
  const setTileTailColor = useTileStore(state => state.setTileTailColor)
  const tileEndColor = useTileStore(state => state.tileEndColor)
  const setTileEndColor = useTileStore(state => state.setTileEndColor)
  const setStageBlur = useTileStore(state => state.setStageBlur)
  const stageBlur = useTileStore(state => state.stageBlur)

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
      className="fixed left-0 top-0 hidden h-full z-50 max-w-xs w-1/2 text-white xl:flex items-center"
      onPointerLeave={handleSettingsMouseOut}
    >
      <div
        onPointerEnter={handleSettingsMouseIn}
        className={`absolute pl-10 transition-transform pr-6 py-6 flex items-center bg-warning z-20 ${
          !previewMode ? '-translate-x-0' : '-translate-x-full'
        }`}
      >
        <Icon icon={ICON_ID.SlidersHorizontal} className="w-12 h-12 text-dark" />
      </div>
      <div
        className={`relative transition-all pl-10 pr-6 py-6 bg-darkLight  ${
          previewMode ? 'opacity-100 -translate-x-0' : 'opacity-10 -translate-x-full'
        }`}
      >
        <div className="relative mb-5">
          <div className="absolute top-0 left-full bottom-0 flex items-center ml-10">
            <h2 className=" font-thin text-grayLight">Cursor</h2>
          </div>
          <label className="text-white">
            <p>cursor radius: {cursorRadius} tiles</p>
            <input
              type="range"
              min={0}
              max={3}
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
            <p>idle move interval: {(idleLoopDuration / 1000).toFixed(2)}s</p>
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
          <div className="absolute top-0 left-full bottom-0 flex items-center ml-10">
            <h2 className=" font-thin text-grayLight">Entry Tween</h2>
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
          <div className="absolute top-0 left-full bottom-0 flex items-center ml-10">
            <h2 className=" font-thin text-grayLight">Tail Tween</h2>
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
          <div className="absolute top-0 left-full bottom-0 flex items-center ml-10">
            <h2 className=" font-thin text-grayLight">Tail Tween</h2>
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
        <div className="relative">
          <div className="absolute top-0 left-full bottom-0 flex items-center ml-10">
            <h2 className=" font-thin text-grayLight">Stage</h2>
          </div>
          <label>
            <p>blur fx: {stageBlur} px</p>
            <input
              type="range"
              min={0}
              max={48}
              step={4}
              value={stageBlur}
              className="w-full"
              onChange={e => setStageBlur(parseFloat(e.target.value))}
            />
          </label>
          <label>
            <p>grid tile size: {uiTileSize} px</p>
            <input
              type="range"
              min={20}
              max={35}
              step={1}
              value={uiTileSize}
              className="w-full"
              onChange={e => handleTileSizeChange(parseFloat(e.target.value))}
            />
          </label>
        </div>
      </div>
    </div>
  )
}

export default TileSettings
