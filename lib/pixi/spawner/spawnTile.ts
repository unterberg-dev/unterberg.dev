import { getEmitterStore } from '#pixi/store'

interface SpawnTilesProps {
  mouseX: number
  mouseY: number
  xPosition: number
  yPosition: number
  accXPosition: number
  accYPosition: number
  isInHitbox: boolean
}

const spawnTile = ({
  accXPosition,
  accYPosition,
  mouseX,
  mouseY,
  xPosition,
  yPosition,
  isInHitbox,
}: SpawnTilesProps) => {
  const { emitterTiles, activeEmitterTiles } = getEmitterStore()
  const target = emitterTiles.find(tile => !activeEmitterTiles.has(tile.id))

  if (!target) return
  activeEmitterTiles.add(target.id)

  const { setPosition } = target

  if (!setPosition) return
  setPosition(
    xPosition,
    yPosition,
    accXPosition,
    accYPosition,
    mouseX,
    mouseY,
    target.id,
    isInHitbox,
  )
}

export default spawnTile
