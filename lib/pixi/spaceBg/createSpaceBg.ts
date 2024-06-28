import gsap from 'gsap'
import { Application, Assets, Sprite, Texture } from 'pixi.js'

import { APP_CONFIG } from '#lib/constants'
import { setSpaceStore } from '#pixi/store'
import { createContainer } from '#pixi/system/createContainer'
import { createSprite } from '#pixi/system/createSprite'
import { SpaceTile } from '#pixi/types'

const scaleImageToCoverStage = (sprite: Sprite, app: Application) => {
  const { width, height } = sprite
  const offset = -400
  const scale = Math.max(
    app.renderer.width / (width + offset),
    app.renderer.height / (height + offset),
  )
  sprite.scale.set(scale)
}

const createSpaceBg = async (app: Application) => {
  const layer1Container = createContainer({
    x: app.renderer.width / 2,
    y: app.renderer.height / 2,
    zIndex: 20,
  })
  const layer1Url = `${APP_CONFIG.viteMediaUrl}/pixi/space-bg/bg-layer1-comp.png`
  const layer1Texture = (await Assets.load(layer1Url)) as Texture
  const layer1Sprite = createSprite({
    texture: layer1Texture,
    width: layer1Texture.frame.width,
    height: layer1Texture.frame.height,
  })
  scaleImageToCoverStage(layer1Sprite, app)
  gsap.set(layer1Sprite, { alpha: 0.25 })
  app.stage.addChild(layer1Container)
  layer1Container.addChild(layer1Sprite)

  const layer2Container = createContainer({
    x: app.renderer.width / 2,
    y: app.renderer.height / 2,
    zIndex: 1,
  })
  const layer2Url = `${APP_CONFIG.viteMediaUrl}/pixi/space-bg/bg-layer2-comp.webp`
  const layer2Texture = (await Assets.load(layer2Url)) as Texture
  const layer2Sprite = createSprite({
    texture: layer2Texture,
    width: layer2Texture.frame.width,
    height: layer2Texture.frame.height,
  })
  scaleImageToCoverStage(layer2Sprite, app)
  gsap.set(layer2Sprite, { alpha: 0.12 })

  app.stage.addChild(layer2Container)
  layer2Container.addChild(layer2Sprite)

  const tile: SpaceTile = {
    // top layer
    layer1: layer1Sprite,
    layer1ToX: gsap.quickTo(layer1Sprite, 'x', { duration: 2, ease: 'power.out' }),
    layer1ToY: gsap.quickTo(layer1Sprite, 'y', { duration: 2, ease: 'power.out' }),
    // bottom layer
    layer2: layer2Sprite,
    layer2ToX: gsap.quickTo(layer2Sprite, 'x', { duration: 3, ease: 'power.out' }),
    layer2ToY: gsap.quickTo(layer2Sprite, 'y', { duration: 3, ease: 'power.out' }),
  }
  setSpaceStore({
    spaceBg: tile,
  })
}

export default createSpaceBg
