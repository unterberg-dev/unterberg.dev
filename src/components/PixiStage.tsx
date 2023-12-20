import usePixi from '@/components/pixi/usePixi'
import { Stage } from '@pixi/react'
import { useEffect, useMemo } from 'react'
import { useResizeDetector } from 'react-resize-detector'

import useScrollPos from '@/lib/hooks/useScrollPos'
import useTileStore from '@/src/zustand/useTileStore'

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
  const stageBlur = useTileStore(state => state.stageBlur)

  return (
    <div
      className="fixed top-0 left-0 w-full h-screen pointer-events-none z-20"
      style={{ filter: `blur(${stageBlur}px)` }}
      ref={ref}
    >
      <Stage
        options={{
          resolution: 2,
          backgroundAlpha: 0,
        }}
        width={width}
        height={height}
        className="fixed"
        key={`${width}x${height}x${tileWidth}x${tileHeight}}`}
      >
        {width && height && <StageInner stageWidth={width} stageHeight={height} />}
      </Stage>
    </div>
  )
}

export default PixiStage
