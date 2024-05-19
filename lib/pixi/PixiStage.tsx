import { useEffect, useRef } from 'react'
import { browserName, browserVersion } from 'react-device-detect'

import usePixiStageContext from '#pixi/context/usePixiStageContext'
import { initStage } from '#pixi/initStage'

const PixiStage = () => {
  const stageRef = useRef<HTMLDivElement>(null)
  const isInitialized = useRef(false)

  const { setPixiStage } = usePixiStageContext()

  useEffect(() => {
    const stage = stageRef.current
    if (!stage || isInitialized.current) return

    // todo: add more
    if (browserName === 'Chrome' && browserVersion <= '103') {
      isInitialized.current = true
      return
    }

    initStage(stage, setPixiStage)
    isInitialized.current = true
  }, [setPixiStage])

  return <div id="stage" className="z-1 fixed inset-0 opacity-0" ref={stageRef} />
}

export default PixiStage
