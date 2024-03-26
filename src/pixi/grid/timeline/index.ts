import gsap from 'gsap'

import { registerHitboxInTimeline, registerHitboxOutTimeline } from '#pixi/grid/timeline/hitbox'
import { registerHoverInTimeline, registerHoverOutTimeline } from '#pixi/grid/timeline/hover'
import { registerIdleTimeline } from '#pixi/grid/timeline/idle'
import { registerSetPosition } from '#pixi/grid/timeline/position'
import { Tile, Timelines } from '#pixi/types'
import { TIMELINE } from '#src/lib/constants'
import { R } from '#src/utils'

interface CreateTimelinesProps {
  tiles: Tile[]
}

export const createTimelines = ({ tiles }: CreateTimelinesProps) => {
  tiles.forEach(tile => {
    const timelines: Timelines = {
      [TIMELINE.HOVER_IN]: gsap.timeline({
        paused: true,
        repeatRefresh: true,
        onComplete: () => {
          timelines[TIMELINE.HOVER_OUT].restart()
        },
      }),
      [TIMELINE.HOVER_OUT]: gsap.timeline({
        paused: true,
        repeatRefresh: true,
      }),
      [TIMELINE.HITBOX_IN]: gsap.timeline({
        paused: true,
        repeatRefresh: true,
        onComplete: () => {
          timelines[TIMELINE.HITBOX_OUT].restart()
        },
      }),
      [TIMELINE.HITBOX_OUT]: gsap.timeline({
        paused: true,
      }),
      [TIMELINE.IDLE]: gsap.timeline({
        repeat: -1,
        repeatRefresh: true,
        yoyo: true,
        paused: true, // init pause - start on register!
      }),
    }

    // todo: to utils -> generator function since we use it in multiple places below
    const skewXOut = R(-2, 2)
    const skewYOut = R(-2, 2)

    const scaleHoverIn = R(1, 1.5)
    const inDuration = R(0.3, 0.7)
    const inEase = 'power.in'

    const scaleHoverOut = 0
    const outDuration = R(0.5, 1.2)
    const outEase = 'sine.inOut'

    const scaleIdleIn = R(0.01, 0.4)

    const scaleHitboxIn = R(0.05, 0.2)

    /* SETUP */
    gsap.set(tile.container, {
      rotation: (R(-60, 60) * Math.PI) / 180,
      alpha: 0,
    })
    gsap.set(tile.container.scale, {
      x: 0,
      y: 0,
    })

    const chance = Math.random() > 0.8
    if (chance) {
      registerIdleTimeline({
        tile,
        timeline: timelines[TIMELINE.IDLE],
        inDuration,
        inEase,
        scaleIn: scaleIdleIn,
        outEase,
        outDuration,
      })
    } else {
      /* HOVER IN */
      registerHoverInTimeline({
        tile,
        timeline: timelines[TIMELINE.HOVER_IN],
        skewXOut,
        skewYOut,
        inDuration,
        inEase,
        scaleHoverIn,
      })

      /* HOVER OUT */
      registerHoverOutTimeline({
        tile,
        timeline: timelines[TIMELINE.HOVER_OUT],
        skewXOut,
        skewYOut,
        outDuration,
        outEase,
        scaleHoverOut,
      })

      /* QUICKSET POSITION */
      registerSetPosition({
        tile,
        inDuration,
        inEase,
        outDuration,
        outEase,
      })

      registerHitboxInTimeline({
        tile,
        timeline: timelines[TIMELINE.HITBOX_IN],
        inDuration,
        inEase,
        scaleIn: scaleHitboxIn,
      })

      registerHitboxOutTimeline({
        tile,
        timeline: timelines[TIMELINE.HITBOX_OUT],
        outDuration,
        outEase,
      })
    }

    tiles[tile.id].timelines = timelines
  })
}
