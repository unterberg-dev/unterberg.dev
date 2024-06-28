import { getSpaceStore } from '#pixi/store'

const moveBg = (x: number, y: number) => {
  const { layer1ToX, layer1ToY, layer2ToX, layer2ToY } = getSpaceStore().spaceBg
  layer1ToX(-x / 40)
  layer1ToY(-y / 40)
  layer2ToX(-x / 80)
  layer2ToY(-y / 80)
}

export default moveBg
