import { useCallback } from 'react'

import { HitboxType } from '@/lib/types'
import useTileStore from '@/src/zustand/useTileStore'

const useHitbox = () => {
  const setHitboxes = useTileStore(state => state.setHitboxes)
  const hitboxes = useTileStore(state => state.hitboxes)

  const addHitbox = useCallback(
    (hitbox: HitboxType) => {
      setHitboxes(prev => {
        const hitboxIndex = prev.findIndex(hb => hb.name === hitbox.name)

        if (hitboxIndex !== -1) {
          const updatedHitboxes = [...prev]
          updatedHitboxes[hitboxIndex] = hitbox
          return updatedHitboxes
        }
        return [...prev, hitbox]
      })
    },
    [setHitboxes],
  )

  return { hitboxes, setHitboxes, addHitbox } as const
}

export default useHitbox
