import { Stage } from '@pixi/react'
import { useEffect, useMemo } from 'react'
import { useResizeDetector } from 'react-resize-detector'

import useScrollPos from '#hooks/useScrollPos'
import usePixi from '#pixi/usePixi'
import useTileStore from '#zustand/useTileStore'

interface StageInnerProps {
  stageWidth?: number
  stageHeight?: number
}

const StageInner = ({ stageWidth, stageHeight }: StageInnerProps) => {
  const stageWidthValue = useMemo(() => stageWidth || window.innerWidth, [stageWidth])
  const stageHeightValue = useMemo(() => stageHeight || window.innerHeight, [stageHeight])
  useScrollPos()

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

const PixiStage = () => {
  const { width, height, ref } = useResizeDetector({
    refreshMode: 'debounce',
    refreshRate: 500,
  })

  const tileWidth = useTileStore(state => state.tileWidth)
  const tileHeight = useTileStore(state => state.tileHeight)

  return (
    <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-20" ref={ref}>
      {width && height && (
        <Stage
          options={{
            resolution: window.devicePixelRatio,
            backgroundAlpha: 0,
          }}
          width={width}
          height={height}
          className="fixed"
          key={`${width}x${height}x${tileWidth}x${tileHeight}}`}
        >
          {width && height && <StageInner stageWidth={width} stageHeight={height} />}
        </Stage>
      )}
    </div>
  )
}

export default PixiStage
