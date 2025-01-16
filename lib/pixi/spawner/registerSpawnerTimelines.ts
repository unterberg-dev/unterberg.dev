import { getEmitterStore, getStore } from "#pixi/store"
import type { EmitterTile } from "#pixi/types"
import { R } from "#pixi/utils"

interface RegisterPositionTimelineProps {
  timeline: gsap.core.Timeline
  tile: EmitterTile
}

// todo: convert to be a timeline -> autoRemoveChildren: true
export const registerSpawnerTimelines = ({ timeline, tile }: RegisterPositionTimelineProps) => {
  const inEase = "power.in"
  const outEase = "power.inOut"

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
    const {
      scaleIn: { value: scaleIn },
      scaleHitboxIn: { value: scaleHitboxIn },
      inDuration: { value: inDuration },
      outDelay: { value: outDelay },
      outDuration: { value: outDuration },
      skewFrom: { value: skewFrom },
      skewTo: { value: skewTo },
      alphaIn: { value: alphaIn },
      rotationIn: { value: rotationIn },
      pixelSpread: { value: spreadMultiplier },
    } = getStore().emitter

    const xDiff = accX - x
    const yDiff = accY - y
    const scaleInVal = R(scaleIn[0], scaleIn[1])
    const scaleHitboxInVal = R(scaleHitboxIn[0], scaleHitboxIn[1])
    const inDurationVal = R(inDuration[0], inDuration[1])
    const outDurationVal = R(outDuration[0], outDuration[1])
    const outDelayVal = R(outDelay[0], outDelay[1])
    const skewFromVal = R(skewFrom[0], skewFrom[1])
    const skewToVal = R(skewTo[0], skewTo[1])
    const alphaInVal = R(alphaIn[0], alphaIn[1])
    const rotationInVal = R(rotationIn[0], rotationIn[1]) * 100
    const spreadMultiplierVal = R(spreadMultiplier[0], spreadMultiplier[1])

    // Calculate the angle of movement
    const angle = Math.atan2(y - mouseY, x - mouseX)

    // Calculate the new position with the extended radius
    const extendedX = x + spreadMultiplierVal * Math.cos(angle)
    const extendedY = y + spreadMultiplierVal * Math.sin(angle)

    // should be never the case
    if (timeline.isActive()) {
      timeline.kill()
    }

    timeline.clear()
    timeline.set(
      tile.sprite,
      {
        alpha: 0,
        rotation: 0,
      },
      "setup",
    )
    timeline.set(
      tile.container,
      {
        x: mouseX,
        y: mouseY,
      },
      "setup",
    )
    timeline.set(
      tile.innerContainer,
      {
        x: 0,
        y: 0,
      },
      "setup",
    )
    timeline.set(
      tile.sprite.skew,
      {
        x: R(skewFromVal, skewFromVal),
        y: R(skewFromVal, skewFromVal),
      },
      "setup",
    )
    timeline.set(
      tile.sprite.scale,
      {
        x: 0,
        y: 0,
      },
      "setup",
    )
    timeline.to(
      tile.sprite,
      {
        duration: inDurationVal,
        ease: inEase,
        alpha: isInHitbox ? 0.3 : R(alphaInVal, alphaInVal),
        rotation: (R(rotationInVal, rotationInVal) * Math.PI) / 180,
      },
      "in",
    )
    timeline.to(
      tile.sprite.skew,
      {
        duration: inDurationVal,
        ease: inEase,
        x: skewToVal,
        y: skewToVal,
      },
      "in",
    )
    timeline.to(
      tile.sprite.scale,
      {
        duration: inDurationVal,
        ease: inEase,
        x: !isInHitbox ? scaleInVal : scaleHitboxInVal,
        y: !isInHitbox ? scaleInVal : scaleHitboxInVal,
      },
      "in",
    )
    timeline.to(
      tile.container,
      {
        duration: inDurationVal,
        ease: inEase,
        x: extendedX, // Use the extended X position
        y: extendedY, // Use the extended Y position
      },
      "in",
    )
    timeline.to(
      tile.innerContainer,
      {
        duration: outDurationVal,
        ease: outEase,
        x: !isInHitbox ? `+=${xDiff}` : 0,
        y: !isInHitbox ? `+=${yDiff}` : 0,
      },
      `in+=${outDelayVal}`,
    )
    timeline.to(
      tile.sprite.scale,
      {
        duration: outDurationVal,
        ease: outEase,
        x: 0,
        y: 0,
      },
      `in+=${outDurationVal / 2}`,
    )
    timeline.to(
      tile.sprite,
      {
        duration: outDurationVal,
        ease: outEase,
        alpha: 0,
      },
      `in+=${outDurationVal / 2}`,
    )
    timeline.call(() => {
      const { activeEmitterTiles } = getEmitterStore()
      activeEmitterTiles.delete(id)
    })

    timeline.restart()
  }
}
