import { Stage } from '@pixi/react'
import { lazy, useEffect, useMemo } from 'react'
import { useResizeDetector } from 'react-resize-detector'

import useTileStore from '@/src/zustand/useTileStore'
import usePixi from '@/components/Tile/usePixi'

const TileSettings = lazy(() => import('@/components/TileSettings'))

interface StageInnerProps {
  stageWidth?: number
  stageHeight?: number
}

const StageInner = ({ stageWidth, stageHeight }: StageInnerProps) => {
  const stageWidthValue = useMemo(() => stageWidth || window.innerWidth, [stageWidth])
  const stageHeightValue = useMemo(() => stageHeight || window.innerHeight, [stageHeight])

  const { app, init, destroy } = usePixi({
    stageWidth: stageWidthValue,
    stageHeight: stageHeightValue,
  })

  useEffect(() => {
    init()

    return () => {
      destroy()
    }
  }, [app, destroy, init])

  return null
}

const Start = () => {
  const { width, height, ref } = useResizeDetector({
    refreshMode: 'debounce',
    refreshRate: 500,
  })
  const tileWidth = useTileStore(state => state.tileWidth)
  const tileHeight = useTileStore(state => state.tileHeight)

  const stageMemo = useMemo(
    () => (
      <div className="absolute inset-0" ref={ref}>
        <Stage
          options={{
            resolution: 2,
            backgroundAlpha: 0,
          }}
          width={width}
          height={height}
          className="absolute z-20"
          key={`${width}x${height}x${tileWidth}x${tileHeight}}`}
        >
          {width && height && <StageInner stageWidth={width} stageHeight={height} />}
        </Stage>
        <div className="absolute inset-0 z-30">
          <div className=" text-white flex justify-center items-center h-full">
            <TileSettings />
          </div>
        </div>
      </div>
    ),
    [height, ref, tileHeight, tileWidth, width],
  )

  return stageMemo
}

export default Start
