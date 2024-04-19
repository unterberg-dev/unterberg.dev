import { EmitterTile } from '#components/pixi/types'
import { getEmitterStore } from '#pixi/store'
import { R } from '#pixi/utils'

interface RegisterPositionTimelineProps {
  timeline: gsap.core.Timeline
  tile: EmitterTile
}

// todo: convert to be a timeline -> autoRemoveChildren: true
export const registerSpawnerTimelines = ({ timeline, tile }: RegisterPositionTimelineProps) => {
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
    isInHitbox: boolean,
  ) => {
    const xDiff = accX - x
    const yDiff = accY - y
    const scaleIn = R(0.4, 2.1)
    const inDuration = R(0.23, 0.55)

    const outDuration = inDuration * 5
    const outDelay = inDuration / 2.5

    // should be never the case
    if (timeline.isActive()) {
      timeline.kill()
    }

    timeline.clear()
    timeline.set(
      tile.container,
      {
        x: mouseX,
        y: mouseY,
      },
      'setup',
    )
    timeline.set(
      tile.sprite.skew,
      {
        x: R(-1, 1),
        y: R(-1, 1),
      },
      `setup`,
    )
    timeline.set(
      tile.innerContainer,
      {
        alpha: 1,
      },
      'setup',
    )
    timeline.to(
      tile.sprite,
      {
        duration: inDuration,
        ease: inEase,
        alpha: !isInHitbox ? R(0.5, 1) : R(0.1, 0.5),
        rotation: (R(-160, 160) * Math.PI) / 180,
      },
      'in',
    )
    timeline.to(
      tile.sprite.skew,
      {
        duration: inDuration,
        ease: inEase,
        x: 0,
        y: 0,
      },
      'in',
    )
    timeline.to(
      tile.sprite.scale,
      {
        duration: inDuration,
        ease: inEase,
        x: !isInHitbox ? scaleIn : scaleIn / 4,
        y: !isInHitbox ? scaleIn : scaleIn / 4,
      },
      'in',
    )
    timeline.to(
      tile.container,
      {
        duration: inDuration,
        ease: inEase,
        x,
        y,
      },
      'in',
    )
    timeline.to(
      tile.innerContainer,
      {
        duration: outDuration,
        ease: outEase,
        x: !isInHitbox ? `+=${xDiff}` : 0,
        y: !isInHitbox ? `+=${yDiff}` : 0,
        alpha: 0,
      },
      `in+=${outDelay}`,
    )
    timeline.to(
      tile.innerContainer.scale,
      {
        duration: outDuration,
        ease: outEase,
        x: 0,
        y: 0,
      },
      `in+=${outDelay}`,
    )
    timeline.to(
      tile.sprite,
      {
        duration: outDuration,
        ease: outEase,
        x: `+=${R(-50, 50)}`,
        y: `+=${R(-50, 50)}`,
      },
      `in+=${outDelay}`,
    )
    timeline.set(
      tile.sprite,
      {
        alpha: 0,
        x: 0,
        y: 0,
      },
      `out`,
    )
    timeline.set(
      tile.innerContainer.scale,
      {
        x: 1,
        y: 1,
      },
      `out`,
    )
    timeline.set(
      tile.innerContainer,
      {
        x: 0,
        y: 0,
      },
      `out`,
    )
    timeline.call(() => {
      const { activeEmitterTiles } = getEmitterStore()
      activeEmitterTiles.delete(id)
    })

    timeline.restart()
  }
}
