import useHitbox from '@/components/Hitbox/useHitbox'
import { useEffect, useRef } from 'react'

interface HitboxProps {
  name: string
  children: JSX.Element | JSX.Element[]
  className?: string
}

const Hitbox = ({ children, className, name }: HitboxProps) => {
  const childRef = useRef<HTMLDivElement>(null)
  const { addHitbox } = useHitbox()

  useEffect(() => {
    if (childRef.current) {
      const rect = childRef.current.getBoundingClientRect()

      addHitbox({
        name,
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      })
    }
  }, [addHitbox, name])

  return (
    <div className={className} ref={childRef}>
      {children}
    </div>
  )
}
export default Hitbox
