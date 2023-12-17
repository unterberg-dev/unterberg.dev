import { APP_CONFIG } from '@/lib/constants'
import usePixi from '@/src/usePixi'
import { Stage } from '@pixi/react'
import { useEffect } from 'react'

const StageInner = () => {
  const { app, init } = usePixi()

  useEffect(() => {
    init()
  }, [app, init])

  return null
}

const Start = () => (
  <Stage
    options={{ backgroundAlpha: 0, resolution: APP_CONFIG.resolution }}
    width={window.innerWidth}
    height={window.innerHeight}
  >
    <StageInner />
  </Stage>
)

export default Start
