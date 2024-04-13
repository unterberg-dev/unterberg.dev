import gsap from 'gsap'

import { getStore } from '#components/pixi/store'
import { Tile } from '#components/pixi/types'
import { R } from '#pixi/utils'
import { TILE_TIMELINE } from '#root/lib/constants'

let lastScrollTop = document.documentElement.scrollTop || window.scrollY
let lastScrollDirection = ''

const getAllActiveTiles = () => {
  const { tiles } = getStore()
  const activeTileIds: Tile[] = []
  tiles.forEach(tile => {
    if (tile.timelines) {
      Object.values(tile.timelines).forEach(timeline => {
        if (timeline.isActive()) {
          activeTileIds.push(tile)
        }
      })
    }
  })
  return activeTileIds
}

const animateScroll = (direction: string) => {
  const activeTiles = getAllActiveTiles()
  activeTiles.forEach(tile => {
    if (!tile.timelines) return

    tile.timelines[TILE_TIMELINE.HOVER_IN].pause()
    tile.timelines[TILE_TIMELINE.HOVER_OUT].pause()
    tile.timelines[TILE_TIMELINE.HITBOX_IN].pause()
    tile.timelines[TILE_TIMELINE.HITBOX_OUT].pause()

    gsap.to(tile.innerContainer, {
      duration: 1,
      y: direction === 'down' ? `-=${R(60, 600)}` : `+=${R(60, 600)}`,
      alpha: 0,
      ease: 'power1.out',
    })
    gsap.to(tile.innerContainer, {
      duration: 1,
      rotation: (R(-60, 60) * Math.PI) / 180,
      alpha: 0,
      ease: 'power1.out',
    })
  })
}

export const handleScroll = () => {
  const st = window.scrollY || document.documentElement.scrollTop || window.pageYOffset

  if (st > lastScrollTop && lastScrollDirection !== 'down') {
    animateScroll('down')
    lastScrollDirection = 'down'
  } else if (st < lastScrollTop && lastScrollDirection !== 'up') {
    animateScroll('up')
    lastScrollDirection = 'up'
  }

  lastScrollTop = st <= 0 ? 0 : st // For Mobile or negative scrolling
}
