import { useEffect, useRef } from 'react'

import { initStage } from '#pixi/initStage'

const PixiStage = () => {
  const stageRef = useRef<HTMLDivElement>(null)
  const isInitialized = useRef(false)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage || isInitialized.current) return

    initStage(stage)
    isInitialized.current = true
  }, [])

  return <div id="stage" className="z-1 fixed inset-0" ref={stageRef} />
}

export default PixiStage
