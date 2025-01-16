import type { Application } from "pixi.js"

import { createText } from "#pixi/system/createText"
import { createTexture } from "#pixi/system/createTexture"

/* todo: test if this text-texture-sprite conversion affects the SEO TBT score */
const createtextureFromText = (app: Application, size: number, input: string[]) =>
  input.map((icon) => {
    const text = createText({
      value: icon,
      size,
    })
    const texture = createTexture({
      text,
      app,
    })

    text.destroy() // clean
    return texture.source
  })

export default createtextureFromText
