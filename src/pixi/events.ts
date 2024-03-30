import { handlePointerMove } from '#pixi/grid/pointer'
import { handleScroll } from '#pixi/grid/scroll'
import { handleUpdateHitboxes } from '#pixi/grid/timeline/hitbox'

// todo: little game - after 50000px crazy things happen :D
// todo: outsource to rocket launch
// let totalDistance = 0
// const lastSeenAt = { x: 0, y: 0 }
// const handleMoveToRocketLaunch = (event: MouseEvent) => {
//   if (lastSeenAt.x) {
//     totalDistance += Math.sqrt(
//       Math.pow(lastSeenAt.y - event.clientY, 2) + Math.pow(lastSeenAt.x - event.clientX, 2),
//     )

//     if (totalDistance > 50000) {
//       // trigger rocket launch hereeeeee

//       // cleanup
//       window.removeEventListener('pointermove', handleMoveToRocketLaunch)
//     }
//   }
//   lastSeenAt.x = event.clientX
//   lastSeenAt.y = event.clientY
// }

export const initUserEvents = () => {
  // handle mouse move
  window.addEventListener('pointermove', event => handlePointerMove({ event }))

  // todo:
  // window.addEventListener('pointermove', handleMoveToRocketLaunch)

  window.addEventListener('scrollend', handleUpdateHitboxes)
  window.addEventListener('scroll', handleScroll)
}
