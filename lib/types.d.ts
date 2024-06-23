import { ICON_ID } from '#lib/icons/iconID'

export type NavigationItem = {
  name: string
  path: string
  icon: ICON_ID
  title: string
  description: string
}

export type GetSpritesheetManifestResponse = {
  sheets: {
    name: string
    key: string
  }[]
}

export type GetSpritesheetResponse = {
  frames: {
    [key: string]: {
      frame: {
        x: number
        y: number
        w: number
        h: number
      }
      rotated: boolean
      trimmed: boolean
      spriteSourceSize: {
        x: number
        y: number
        w: number
        h: number
      }
      sourceSize: {
        w: number
        h: number
      }
    }
  }
  meta: {
    app: string
    version: string
    image: string
    format: string
    size: {
      w: number
      h: number
    }
    scale: string
  }
  animations: {
    [key: string]: string[]
  }
}
