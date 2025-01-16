import axios from "axios"
import { Assets, Spritesheet, type Texture } from "pixi.js"

import { APP_CONFIG } from "#lib/constants"
import type { GetSpritesheetManifestResponse, GetSpritesheetResponse } from "#lib/types"

const getSpritesheetManifest = async <T>(): Promise<T> => {
  const response = await axios.get<T>(`${APP_CONFIG.viteMediaUrl}/pixi/sheets.json`)
  return response.data
}

const getSpritesheet = async <T>(key: string): Promise<T> => {
  const response = await axios.get<T>(`${APP_CONFIG.viteMediaUrl}/pixi/${key}/spritesheet.json`)
  return response.data
}

type PixiSpriteSheet = {
  spritesheet: Spritesheet
  data: {
    key: string
    sheet: GetSpritesheetResponse
  }
}

type PixiSpriteSheetParsed = {
  key: string
  sheet: Record<string, Texture>
}

export const getAllSpritesheets = async (): Promise<PixiSpriteSheetParsed[]> => {
  const { sheets } = await getSpritesheetManifest<GetSpritesheetManifestResponse>()
  if (!sheets) return []

  const promises = sheets.map(async (sheet) => {
    const sheetResponse = await getSpritesheet<GetSpritesheetResponse>(sheet.key)
    const url = `${APP_CONFIG.viteMediaUrl}/pixi/${sheet.key}/${sheetResponse.meta.image}`
    const texture = await Assets.load(url)

    const spritesheet = new Spritesheet(texture, sheetResponse)

    return {
      spritesheet,
      data: {
        key: sheet.key,
        sheet: sheetResponse,
      },
    } as PixiSpriteSheet
  })

  const sheetsPromise = await Promise.all(promises)
  const parsedSheets = sheetsPromise.map(async (sheet) => {
    const source = await sheet.spritesheet.parse()
    return { key: sheet.data.key, sheet: source }
  })
  const parsed = await Promise.all(parsedSheets)

  return parsed.map((sheet) => sheet)
}
