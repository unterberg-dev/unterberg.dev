export const getRandom = (min: number, max: number) => {
  const random = min + Math.random() * (max - min)
  return random
}
