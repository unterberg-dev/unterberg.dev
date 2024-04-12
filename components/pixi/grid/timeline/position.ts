import { Tile } from '#components/pixi/types'

interface RegisterPositionTimelineProps {
  timeline: gsap.core.Timeline
  tile: Tile
  inDuration: number
  inEase: string
  outDuration: number
}

// todo: convert to be a timeline -> autoRemoveChildren: true
export const registerPositionTimeline = ({
  timeline,
  tile,
  inDuration,
  inEase,
  outDuration,
}: RegisterPositionTimelineProps) => {
  tile.setPosition = (x: number, y: number, accX: number, accY: number) => {
    const xDiff = accX - x
    const yDiff = accY - y

    if (timeline.isActive()) return

    timeline.clear()
    timeline.set(
      tile.container,
      {
        x: tile.x,
        y: tile.y,
      },
      '>',
    )
    timeline.to(
      tile.container,
      {
        duration: inDuration,
        ease: inEase,
        x,
        y,
      },
      '>',
    )
    timeline.to(
      tile.innerContainer,
      {
        duration: outDuration * 1.5,
        ease: inEase,
        x: `+=${xDiff}`,
        y: `+=${yDiff}`,
      },
      `<+=${inDuration / 2}`,
    )
    timeline.set(
      tile.innerContainer,
      {
        x: 0,
        y: 0,
      },
      '>',
    )

    timeline.restart()
  }
}
