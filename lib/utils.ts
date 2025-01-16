import type { PixiConfigMultiValue, PixiConfigSingleValue } from "#lib/types"

export const getPercent = (value: number, min: number, max: number) =>
  Number((((value - min) / (max - min)) * 100).toFixed(2))

export const getPercentSingleValue = (item: PixiConfigSingleValue) =>
  getPercent(item.value, item.min, item.max)

export const getPercentMultiValue = (item: PixiConfigMultiValue) => {
  const percentMin = getPercent(item.value[0], item.min, item.max)
  const percentMax = getPercent(item.value[1], item.min, item.max)

  return [percentMin, percentMax] as PixiConfigMultiValue["value"]
}

export const ruleOfThree = (value: number, min: number, max: number) => (value / 100) * (max - min) + min
