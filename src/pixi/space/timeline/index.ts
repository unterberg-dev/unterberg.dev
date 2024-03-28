import gsap from 'gsap'

import { registerSpaceIdleTimeline } from '#pixi/space/timeline/idle'
import { SpaceObject, SpaceTimelines } from '#pixi/types'
import { SPACE_TIMELINE } from '#src/lib/constants'
import { R } from '#src/utils'

interface CreateSpaceTimelinesProps {
  spaceObjects: SpaceObject[]
}

export const createSpaceTimelines = ({ spaceObjects }: CreateSpaceTimelinesProps) => {
  spaceObjects.forEach(object => {
    const timelines: SpaceTimelines = {
      [SPACE_TIMELINE.IDLE]: gsap.timeline({
        paused: true,
        repeatRefresh: true,
        repeatDelay: R(3, 6),
        onComplete: () => {
          if (!object.timelines) return
          object.timelines[SPACE_TIMELINE.IDLE].restart()
        },
      }),
    }

    /* SETUP */
    gsap.set(object.container, {
      rotation: (R(-60, 60) * Math.PI) / 180,
      x: -100,
    })

    registerSpaceIdleTimeline({
      spaceObject: object,
      inDuration: R(10, 16),
      timeline: timelines[SPACE_TIMELINE.IDLE],
    })

    spaceObjects[object.id].timelines = timelines
  })

  const randomizeSpaceObjects = spaceObjects.sort(() => 0.5 - Math.random())
  let i = 0
  randomizeSpaceObjects.forEach(object => {
    if (object.timelines) {
      object.timelines[SPACE_TIMELINE.IDLE].play(-i * 7)
      i++
    }
  })

  return spaceObjects
}
