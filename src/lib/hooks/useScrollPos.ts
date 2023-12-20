import useTileStore from '@/src/zustand/useTileStore'
import { useCallback, useEffect, useState } from 'react'

const useScrollPos = () => {
  const { setScrollPosY } = useTileStore()
  const { isScrolling, setIsScrolling } = useTileStore()
  const [lastScrollTop, setLastScrollTop] = useState(0)

  const onScroll = useCallback(() => {
    if (isScrolling) {
      setIsScrolling(true)
    }
  }, [isScrolling, setIsScrolling])

  const onScrollEnd = useCallback(() => {
    setIsScrolling(false)
    const scroll = window.scrollY
    if (lastScrollTop === scroll) {
      return
    }
    setScrollPosY(scroll)
    setLastScrollTop(scroll)
  }, [lastScrollTop, setIsScrolling, setScrollPosY])

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    window.addEventListener('scrollend', onScrollEnd)

    return () => {
      window.addEventListener('scroll', onScroll)
      window.removeEventListener('scrollend', onScrollEnd)
    }
  }, [onScroll, onScrollEnd])
}

export default useScrollPos
