import { useEffect, useRef } from 'react'
import { browserName, browserVersion, CustomView } from 'react-device-detect'

import { initStage } from '#pixi/initStage'

const PixiStage = () => {
  const stageRef = useRef<HTMLDivElement>(null)
  const isInitialized = useRef(false)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage || isInitialized.current) return

    // todo: add more
    if (browserName === 'Chrome' && browserVersion <= '103') {
      isInitialized.current = true
      return
    }

    initStage(stage)
    isInitialized.current = true
  }, [])

  return <div id="stage" className="z-1 fixed inset-0" ref={stageRef} />
}

export default PixiStage
