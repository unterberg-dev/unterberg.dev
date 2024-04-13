import { Text, TextOptions, TextStyle, TextStyleOptions } from 'pixi.js'

import { R } from '#pixi/utils'

export interface CreateTextProps {
  value: string
  x?: number
  y?: number
  anchor?: number
  size?: number
}

export const createText = ({ value, x = 0, y = 0, anchor = 0.5, size = 20 }: CreateTextProps) => {
  const textBaseAtts = {
    style: {
      fontFamily: 'Arial',
      fontWeight: '700',
      fontSize: R(size / 2, size * 2),
      fill: 0xffffff,
    },
  }

  const text = new Text({
    x,
    y,
    text: value,
    anchor,
    ...textBaseAtts,
  } as TextOptions<TextStyle, TextStyleOptions>)

  return text
}
