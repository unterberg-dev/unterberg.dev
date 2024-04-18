import { EmitterTile } from '#components/pixi/types'
import { getEmitterStore } from '#pixi/store'
import { R } from '#pixi/utils'

interface RegisterPositionTimelineProps {
  timeline: gsap.core.Timeline
  tile: EmitterTile
}

// todo: convert to be a timeline -> autoRemoveChildren: true
export const registerSpawnerTimelines = ({ timeline, tile }: RegisterPositionTimelineProps) => {
  const inDuration = R(0.23, 0.45)
  const inEase = 'power.in'
  const outEase = 'power.inOut'

  tile.setPosition = (
    x: number,
    y: number,
    accX: number,
    accY: number,
    mouseX: number,
    mouseY: number,
    id: number,
  ) => {
    const xDiff = accX - x
    const yDiff = accY - y

    // should be never the case
    if (timeline.isActive()) return

    timeline.clear()
    timeline.set(
      tile.container,
      {
        x: mouseX,
        y: mouseY,
      },
      '<',
    )
    timeline.set(
      tile.innerContainer,
      {
        alpha: 1,
      },
      '<',
    )
    timeline.to(
      tile.sprite,
      {
        alpha: 1,
        rotation: (R(-60, 60) * Math.PI) / 180,
      },
      `<`,
    )
    timeline.to(
      tile.container,
      {
        duration: inDuration,
        ease: inEase,
        x,
        y,
      },
      '<',
    )
    timeline.to(
      tile.innerContainer,
      {
        duration: inDuration * 5,
        ease: outEase,
        x: `+=${xDiff}`,
        y: `+=${yDiff}`,
        alpha: 0,
      },
      `<+=${inDuration / 1.7}`,
    )
    timeline.set(
      tile.sprite,
      {
        alpha: 0,
      },
      `>`,
    )
    timeline.set(
      tile.innerContainer,
      {
        x: 0,
        y: 0,
      },
      `>`,
    )
    timeline.call(() => {
      const { activeEmitterTiles } = getEmitterStore()

      const index = activeEmitterTiles.indexOf(id)
      if (index > -1) {
        activeEmitterTiles.splice(index, 1)
      }
    })

    timeline.restart()
  }
}
