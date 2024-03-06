import { useEffect, useRef } from 'react'
import { useResizeDetector } from 'react-resize-detector'

import useHitbox from '#components/Hitbox/useHitbox'
import useTileStore from '#zustand/useTileStore'

interface HitboxProps {
  name: string
  children: JSX.Element | JSX.Element[]
  className?: string
  inset?: boolean
}

const Hitbox = ({ children, className, name, inset }: HitboxProps) => {
  const childRef = useRef<HTMLDivElement | null>(null)
  const scrollPosY = useTileStore(state => state.scrollPosY)
  const { addHitbox } = useHitbox()
  const { ref, width, height } = useResizeDetector()

  useEffect(() => {
    childRef.current = ref.current
  }, [width, height, ref])

  useEffect(() => {
    if (childRef.current) {
      const rect = childRef.current.getBoundingClientRect()

      if (!width || !height) return

      addHitbox({
        name,
        x: rect.x,
        y: scrollPosY + rect.y,
        width,
        height,
      })
    }
  }, [addHitbox, height, name, scrollPosY, width])

  return (
    <div className={`${className || ''} relative`}>
      <div
        className={`absolute pointer-events-none ${
          inset ? '-left-4 -right-4 -top-4 -bottom-4' : 'left-0 top-0 h-full w-full'
        }  z-10`}
        ref={ref}
      />
      {children}
    </div>
  )
}
export default Hitbox
