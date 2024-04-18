import { getEmitterStore } from '#pixi/store'

// let tileBuffer: Tile['id'][] = []
// const tileBufferCap = 2000

interface SpawnTilesProps {
  mouseX: number
  mouseY: number
  xPosition: number
  yPosition: number
  accXPosition: number
  accYPosition: number
  isInHitbox?: boolean
}

const spawnTiles_new = ({
  accXPosition,
  accYPosition,
  mouseX,
  mouseY,
  xPosition,
  yPosition,
  isInHitbox,
}: SpawnTilesProps) => {
  if (isInHitbox) return
  const { emitterTiles, activeEmitterTiles } = getEmitterStore()

  const inactiveEmitterTiles = emitterTiles.filter(tile => !activeEmitterTiles.includes(tile.id))
  const target = inactiveEmitterTiles.shift() || emitterTiles[emitterTiles.length - 1]
  activeEmitterTiles.push(target.id)

  const { setPosition } = target

  if (!setPosition) return
  setPosition(xPosition, yPosition, accXPosition, accYPosition, mouseX, mouseY, target.id)
}

export default spawnTiles_new
