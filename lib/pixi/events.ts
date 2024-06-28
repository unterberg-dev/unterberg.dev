import { registerAutoPointer } from '#pixi/autoPointer'
import { handlePointerMove, handleUpdateHitboxes } from '#pixi/pointer'
import moveBg from '#pixi/spaceBg/moveBg'
import { getStore } from '#pixi/store'
import { R } from '#pixi/utils'

export const triggerPointerStopped = (event: PointerEvent) => {
  const randomDim = R(40, 100)

  registerAutoPointer({
    x: event.clientX,
    y: event.clientY,
    width: randomDim,
    height: randomDim,
    duration: R(0.03, 0.1),
    // randomly true
    reversed: Math.random() > 0.5,
    progress: R(0.1, 1),
  })
}

const triggerPointerStarted = () => {
  const { autoPointerTimeline } = getStore()
  autoPointerTimeline?.pause()
}

let pointerStarted = false
let windowPointerMoveTimer: NodeJS.Timeout
const pointerIdleDetectionTiming = 200

const handlePointerMoveEvent = (event: PointerEvent) => {
  clearTimeout(windowPointerMoveTimer)

  if (getStore().settingsHovered) {
    pointerStarted = true
    return
  }

  if (!pointerStarted) {
    triggerPointerStarted()
    pointerStarted = true
  }

  windowPointerMoveTimer = setTimeout(() => {
    triggerPointerStopped(event)
    pointerStarted = false
  }, pointerIdleDetectionTiming)

  handlePointerMove({ x: event.clientX, y: event.clientY })
  moveBg(event.clientX, event.clientY)
}

const handleScrollEndEvent = () => handleUpdateHitboxes()

export const registerUserEvents = () => {
  window.addEventListener('pointermove', handlePointerMoveEvent)
  window.addEventListener('scrollend', handleScrollEndEvent)

  // todo:
  // window.addEventListener('pointermove', handleMoveToRocketLaunch)

  // WIP
  // window.addEventListener('scroll', handleScroll)
}

export const unregisterUserEvents = () => {
  window.removeEventListener('pointermove', handlePointerMoveEvent)
  window.removeEventListener('scrollend', handleScrollEndEvent)
}
