import { createContext, useMemo, useState } from 'react'

import { HitboxType } from '@/lib/types'

interface HitboxContextValues {
  hitBoxes: HitboxType[]
  setHitboxes: React.Dispatch<React.SetStateAction<HitboxType[]>>
}

export const HitboxContext = createContext<HitboxContextValues | undefined>(undefined)

const HitboxContextProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [hitBoxes, setHitboxes] = useState<HitboxType[]>([])

  const hitboxContextValue = useMemo(() => ({ hitBoxes, setHitboxes }), [hitBoxes])

  return <HitboxContext.Provider value={hitboxContextValue}>{children}</HitboxContext.Provider>
}

export default HitboxContextProvider
