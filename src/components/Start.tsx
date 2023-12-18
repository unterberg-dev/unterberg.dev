import { APP_CONFIG } from '@/lib/constants'
import usePixi from '@/components/Tile/usePixi'
import { Stage } from '@pixi/react'
import { useEffect, useMemo } from 'react'
import { useResizeDetector } from 'react-resize-detector'

interface StageInnerProps {
  stageWidth?: number
  stageHeight?: number
}

const StageInner = ({ stageWidth, stageHeight }: StageInnerProps) => {
  const stageWidthValue = useMemo(() => stageWidth || window.innerWidth, [stageWidth])
  const stageHeightValue = useMemo(() => stageHeight || window.innerHeight, [stageHeight])

  const { app, init } = usePixi({
    stageWidth: stageWidthValue,
    stageHeight: stageHeightValue,
  })

  useEffect(() => {
    init()
  }, [app, init])

  return null
}

const Start = () => {
  const { width, height, ref } = useResizeDetector()

  return (
    <div className="absolute inset-0" ref={ref}>
      <Stage
        options={{
          resolution: APP_CONFIG.resolution,
          backgroundAlpha: 0,
        }}
        width={width}
        height={height}
        className="absolute z-20"
      >
        <StageInner stageWidth={width} stageHeight={height} />
      </Stage>
      <div className="absolute inset-0 z-30">
        <div className="text-9xl text-white font-bold flex justify-center items-center h-full">
          grix
        </div>
      </div>
    </div>
  )
}

export default Start
