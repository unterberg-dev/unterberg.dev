import gsap from 'gsap'

import { getStore } from '#pixi/store'
import { SpaceObject } from '#pixi/types'
import { R } from '#src/utils'

interface RegisterSpaceIdleTimelineProps {
  timeline: gsap.core.Timeline
  spaceObject: SpaceObject
  inDuration: number
}

export const registerSpaceIdleTimeline = ({
  timeline,
  inDuration,
  spaceObject,
}: RegisterSpaceIdleTimelineProps) => {
  const { app } = getStore()

  timeline.set(
    spaceObject.container,
    {
      x: -100,
      y: spaceObject.y + R(-app.renderer.height / 2, app.renderer.height / 2),
      rotation: (R(-60, 60) * Math.PI) / 180,
    },
    '<',
  )
  timeline.to(
    spaceObject.container,
    {
      ease: 'linear',
      x: app.renderer.width + 100,
      y: spaceObject.y + R(-app.renderer.height / 2, app.renderer.height / 2),
      rotation: (R(-260, 260) * Math.PI) / 180,
      duration: inDuration,
    },
    '>',
  )

  gsap.to(spaceObject.container.skew, {
    ease: 'power1.out',
    x: R(-1, 1),
    y: R(-1, 1),
    duration: inDuration / 2,
    repeatRefresh: true,
    repeat: -1,
    yoyo: true,
  })

  const scale = R(0.5, 1.2)
  gsap.to(spaceObject.container.scale, {
    ease: 'power1.inOut',
    x: scale,
    repeatRefresh: true,
    y: scale,
    duration: inDuration / 2.5,
    repeat: -1,
    yoyo: true,
  })
}
