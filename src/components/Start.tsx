import { APP_CONFIG } from '@/lib/constants'
import usePixi from '@/components/Tile/usePixi'
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
    className="fixed inset-0 overflow-hidden"
  >
    <StageInner />
  </Stage>
)

export default Start
