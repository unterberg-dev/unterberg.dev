import { handlePointerMove } from '#pixi/grid/pointer'
import { handleScroll } from '#pixi/grid/scroll'
import { handleUpdateHitboxes } from '#pixi/grid/timeline/hitbox'

export const initUserEvents = () => {
  // handle mouse move
  window.addEventListener('pointermove', handlePointerMove)
  window.addEventListener('scrollend', handleUpdateHitboxes)
  window.addEventListener('scroll', handleScroll)
}
