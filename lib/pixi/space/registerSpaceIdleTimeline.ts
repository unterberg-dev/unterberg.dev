import gsap from 'gsap'

import { getStore } from '#pixi/store'
import { SpaceObject } from '#pixi/types'
import { R } from '#pixi/utils'

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

  timeline.fromTo(
    spaceObject.container,
    {
      x: -100,
      y: spaceObject.y + R(-app.renderer.height / 2, app.renderer.height / 2),
      rotation: (R(-60, 60) * Math.PI) / 180,
    },
    {
      x: app.renderer.width + R(100, 200),
      y: spaceObject.y + R(-app.renderer.height / 2, app.renderer.height / 2),
      rotation: (R(-260, 260) * Math.PI) / 180,
      duration: R(4, 15),
      ease: 'linear',
    },
  )

  gsap.to(spaceObject.sprite.skew, {
    ease: 'power1.out',
    x: R(-0.5, 0.5),
    y: R(-0.5, 0.5),
    duration: inDuration / 2,
    repeat: -1,
    yoyo: true,
  })

  const scale = R(0.5, 1.2)
  gsap.to(spaceObject.sprite.scale, {
    ease: 'power1.inOut',
    x: scale,
    y: scale,
    duration: inDuration / 2.5,
    repeat: -1,
    yoyo: true,
  })
}
