import { useContext } from 'react'

import { PixiStageContext } from '#pixi/context/PixiStageContextProvider'

const usePixiStageContext = () => {
  const context = useContext(PixiStageContext)
  const pixiStage = context?.pixiStage
  const setPixiStage = context?.setPixiStage

  if (!context) {
    throw new Error('pixiStore must be used within the PixiStageContextProvider')
  }

  return { pixiStage, setPixiStage }
}

export default usePixiStageContext
