import { useCallback, useContext, useMemo } from 'react'

import { HitboxContext } from '@/components/Hitbox/HitboxMapProvider'
import { HitboxType } from '@/lib/types'

const useHitbox = () => {
  const context = useContext(HitboxContext)
  const hitboxes = useMemo(() => context?.hitBoxes || [], [context?.hitBoxes])
  const setHitboxes = useMemo(() => context?.setHitboxes || (() => []), [context?.setHitboxes])

  const addHitbox = useCallback(
    (hitbox: HitboxType) => {
      setHitboxes(prevHitboxes => {
        const hitboxIndex = prevHitboxes.findIndex(hb => hb.name === hitbox.name)

        if (hitboxIndex !== -1) {
          const updatedHitboxes = [...prevHitboxes]
          updatedHitboxes[hitboxIndex] = hitbox
          return updatedHitboxes
        }
        return [...prevHitboxes, hitbox]
      })
    },
    [setHitboxes],
  )

  if (!context) {
    throw new Error('useDialogContext must be used within a Dialog')
  }

  return { hitboxes, setHitboxes, addHitbox } as const
}

export default useHitbox
