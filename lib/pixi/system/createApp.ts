// import gsap from 'gsap'
// import { Application, Ticker } from 'pixi.js'

// import { unregisterUserEvents } from '#pixi/events'
// import { getEmitterStore, getStore, setStore } from '#pixi/store'

// const subscribeToGSAPTicker = (app: Application) => {
//   app.stage.removeChildren()
//   app.ticker.stop()

//   gsap.ticker.remove(() => {
//     app.ticker.update()
//   })

//   Ticker.shared.autoStart = false
//   Ticker.shared.stop()
//   Ticker.system.stop()

//   gsap.ticker.add(() => {
//     app.ticker.update()
//   })
// }

// export const createApp = async (stage: HTMLDivElement) => {
//   const app = new Application()
//   await app.init({
//     // fallback properties
//     width: 400,
//     height: 300,
//     // auto resize
//     resizeTo: stage,
//     autoDensity: true,
//     hello: true,
//     // antialias: true,
//     resolution: window.devicePixelRatio || 1,
//     backgroundAlpha: 0,
//   })
//   app.stage.sortableChildren = false // enable zIndex sorting
//   app.stage.interactive = false
//   app.stage.interactiveChildren = false
//   stage.appendChild(app.canvas)

//   subscribeToGSAPTicker(app)

//   return app
// }

// export const killAllTimelines = () => {
//   const store = getStore()
//   const emitterStore = getEmitterStore()

//   const storeTimelines = [
//     store.autoPointerTimeline,
//     ...emitterStore.emitterTiles.map(e => e.timeline),
//   ]
//   const storePixiContainers = [
//     ...emitterStore.emitterTiles.map(e => e.container),
//     ...emitterStore.emitterTiles.map(e => e.innerContainer),
//   ]

//   storeTimelines.forEach(timeline => {
//     if (timeline) {
//       timeline.pause()
//       timeline.kill()
//     }
//   })
//   emitterStore.emitterTiles = []
//   emitterStore.activeEmitterTiles = new Set()

//   storePixiContainers.forEach(container => {
//     if (container) {
//       container.destroy({ children: true, texture: true })
//     }
//   })

//   setStore({ ...store, autoPointerTimeline: undefined })
// }

// export const destroyApp = () => {
//   const store = getStore()
//   if (!store) return

//   unregisterUserEvents()
//   killAllTimelines()

//   store.app.stage.removeChildren()
//   store.app.ticker.stop()

//   gsap.ticker.sleep()
//   gsap.ticker
//   gsap.ticker.remove(() => {
//     store.app.ticker.update()
//   })

//   store.app.destroy(true, { children: true, texture: true })
// }

import gsap from 'gsap'
import { Application, Ticker } from 'pixi.js'

import { unregisterUserEvents } from '#pixi/events'
import { getEmitterStore, getStore, setStore } from '#pixi/store'

const gsapTickerUpdate = (app: Application) => {
  app.ticker.update()
}

const subscribeToGSAPTicker = (app: Application) => {
  app.stage.removeChildren()
  app.ticker.stop()

  gsap.ticker.remove(() => {
    app.ticker.update()
  })

  Ticker.shared.autoStart = false
  Ticker.shared.stop()
  Ticker.system.stop()

  gsap.ticker.add(() => {
    gsapTickerUpdate(app)
  })
}

export const createApp = async (stage: HTMLDivElement) => {
  const app = new Application()
  await app.init({
    // fallback properties
    width: 400,
    height: 300,
    // auto resize
    resizeTo: stage,
    autoDensity: true,
    hello: true,
    // antialias: true,
    resolution: window.devicePixelRatio || 1,
    backgroundAlpha: 0,
  })
  app.stage.sortableChildren = false // enable zIndex sorting
  app.stage.interactive = false
  app.stage.interactiveChildren = false
  stage.appendChild(app.canvas)

  return app
}

export const killAllTimelines = () => {
  const store = getStore()
  const emitterStore = getEmitterStore()

  const storeTimelines = [
    store.autoPointerTimeline,
    ...emitterStore.emitterTiles.map(e => e.timeline),
  ]
  const storePixiContainers = [
    ...emitterStore.emitterTiles.map(e => e.container),
    ...emitterStore.emitterTiles.map(e => e.innerContainer),
  ]

  storeTimelines.forEach(timeline => {
    if (timeline) {
      timeline.pause()
      timeline.kill()
    }
  })
  emitterStore.emitterTiles = []
  emitterStore.activeEmitterTiles = new Set()

  storePixiContainers.forEach(container => {
    if (container) {
      container.destroy({ children: true, texture: true })
    }
  })

  setStore({ ...store, autoPointerTimeline: undefined })
}

export const destroyApp = () => {
  const store = getStore()
  if (!store) return

  unregisterUserEvents()
  killAllTimelines()

  store.app.stage.removeChildren()
  store.app.ticker.stop()

  gsap.ticker.sleep()
  gsap.ticker.remove(() => {
    gsapTickerUpdate(store.app)
  })

  store.app.destroy(true, { children: true, texture: true, context: true })
}
