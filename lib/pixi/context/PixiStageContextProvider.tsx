import { createContext, useMemo, useState, type ReactNode } from 'react'

import type { Store } from '#pixi/store'

interface PixiStageContextValues {
  pixiStage: Store['stage'] | undefined
  setPixiStage: React.Dispatch<React.SetStateAction<Store['stage'] | undefined>>
}

export const PixiStageContext = createContext<PixiStageContextValues | undefined>(undefined)

const PixiStageContextProvider = ({ children }: { children: ReactNode }) => {
  const [pixiStage, setPixiStage] = useState<Store['stage'] | undefined>()
  const pixiContextValue = useMemo(() => ({ pixiStage, setPixiStage }), [pixiStage])

  return <PixiStageContext.Provider value={pixiContextValue}>{children}</PixiStageContext.Provider>
}

export default PixiStageContextProvider
