import gsap from 'gsap'

import { SPACE_TIMELINE } from '#lib/constants'
import { registerSpaceIdleTimeline } from '#pixi/space/timeline/idle'
import { SpaceObject } from '#pixi/types'
import { R } from '#pixi/utils'

interface CreateSpaceTimelinesProps {
  spaceObjects: SpaceObject[]
}

export const createSpaceTimelines = ({ spaceObjects }: CreateSpaceTimelinesProps) => {
  spaceObjects.forEach(object => {
    const { timelines } = object

    if (!timelines) {
      return
    }

    registerSpaceIdleTimeline({
      spaceObject: object,
      inDuration: R(10, 16),
      timeline: timelines[SPACE_TIMELINE.IDLE],
    })
  })

  const randomizeSpaceObjects = spaceObjects.sort(() => 0.5 - Math.random())
  let i = 0
  randomizeSpaceObjects.forEach(object => {
    gsap.delayedCall(i * 5, () => {
      if (object.timelines) {
        object.timelines[SPACE_TIMELINE.IDLE].play()
      }
    })
    i += 1
  })

  return spaceObjects
}
