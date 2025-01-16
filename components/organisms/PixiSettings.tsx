import gsap from 'gsap'
import { useCallback } from 'react'
import rc from 'react-classmate'

import H6Headline from '#atoms/H6Headline'
import Icon from '#atoms/Icon'
import { APP_CONFIG, PixiConfig } from '#lib/constants'
import { ICON_ID } from '#lib/icons/iconID'
import type { PixiConfigType } from '#lib/types'
import { getPercentMultiValue, getPercentSingleValue } from '#lib/utils'
import RangeSlider from '#molecules/RangeSlider'
import { registerAutoPointer, removeAutoPointer } from '#pixi/autoPointer'
import { handleUpdateHitboxes } from '#pixi/pointer'
import { getEmitterStore, getStore, setStore, type Store } from '#pixi/store'

interface RangeLabelProps {
  label: string
  children: React.ReactNode
}

const RangeLabel = ({ children, label }: RangeLabelProps) => (
  <div className="relative gsap-range-label-container">
    <p className="text-grayLight pointer-events-none">{label}</p>
    {children}
  </div>
)

const selectStoreReturnNewValue = (selector: string, value: number) => {
  const { min, max } = getStore().emitter[selector as never] // bad :(
  const inputMinValue = 0
  const inputMaxValue = 100
  return ((value - inputMinValue) * (max - min)) / (inputMaxValue - inputMinValue) + min
}

type EmitterKeys = keyof PixiConfigType['emitter']

const updateStore = (key: EmitterKeys, value: number, type?: 'min' | 'max'): void => {
  const newValue = selectStoreReturnNewValue(key, value)
  const store: Store = getStore()

  let updatedValue: number | [number, number]

  if (type === 'min') {
    updatedValue = [newValue, (store.emitter[key].value as [number, number])[1]]
  } else if (type === 'max') {
    updatedValue = [(store.emitter[key].value as [number, number])[0], newValue]
  } else {
    updatedValue = newValue
  }

  setStore({
    ...store,
    emitter: {
      ...store.emitter,
      [key]: {
        ...store.emitter[key],
        value: updatedValue,
      },
    },
  })
}

const changeScaleModifier = (value: number) => {
  updateStore('scaleModifier', value)
  const newValue = selectStoreReturnNewValue('scaleModifier', value)

  // biome-ignore lint/complexity/noForEach: not now
  getEmitterStore().emitterTiles.forEach(tile => {
    tile.innerContainer.scale.set(
      (getStore().tileWidth /
        (tile.sprite.texture.frame.width * getStore().app.renderer.resolution)) *
        newValue,
    )
  })
}
const changeCursorRadius = (value: number) => updateStore('cursorRadius', value)
const changeGravity = (value: number) => updateStore('gravity', value)
const changeInertiaModifier = (value: number) => updateStore('pointerInertia', value)
const changeMissRate = (value: number) => updateStore('pointerMissRate', value)
const changeInDuration = (value: number, type?: 'min' | 'max') =>
  updateStore('inDuration', value, type)
const changeOutDuration = (value: number, type?: 'min' | 'max') =>
  updateStore('outDuration', value, type)
const changeAlphaIn = (value: number, type?: 'min' | 'max') => updateStore('alphaIn', value, type)
const changePixelSpread = (value: number, type?: 'min' | 'max') =>
  updateStore('pixelSpread', value, type)
const changeSkewFrom = (value: number, type?: 'min' | 'max') => updateStore('skewFrom', value, type)
const changeSkewTo = (value: number, type?: 'min' | 'max') => updateStore('skewTo', value, type)
const changeScaleIn = (value: number, type?: 'min' | 'max') => updateStore('scaleIn', value, type)
const changeRotationIn = (value: number, type?: 'min' | 'max') =>
  updateStore('rotationIn', value, type)

const StyledPixiSettings = rc.div`
  pixi-hitbox
  grid
  gap-y-2
  gap-x-3
  grid-cols-2
  mt-10
  right-0
  fixed
  hidden
  z-10
  px-8
  py-4
`

interface PixiSettingsProps {
  className?: string
  gsapRef?: React.RefObject<HTMLDivElement>
}

const PixiSettings = ({ className = '', gsapRef }: PixiSettingsProps) => {
  const handleHover = useCallback(() => {
    const { app, stage } = getStore()
    if (!app || !stage) return
    if (!gsapRef?.current) return

    removeAutoPointer()
    handleUpdateHitboxes(true)
    setStore({ ...getStore(), settingsHovered: true })

    gsap.set(stage, { zIndex: 9 })
    gsap.to('.gsap-startpage-content', {
      autoAlpha: 0.5,
      duration: APP_CONFIG.defaultDuration,
      ease: 'power.in',
      filter: 'blur(5px)',
    })

    registerAutoPointer({
      width: app.renderer.width - 400,
      height: app.renderer.height - 400,
      reversed: true,
      progress: 0,
    })
  }, [gsapRef])

  const handleLeave = useCallback(() => {
    const { stage, app } = getStore()
    if (!stage || !app || !getStore().settingsHovered) return

    setStore({ ...getStore(), settingsHovered: false })
    removeAutoPointer()
    handleUpdateHitboxes()
    gsap.to('.gsap-startpage-content', {
      autoAlpha: 1,
      duration: APP_CONFIG.defaultDuration,
      ease: 'power.in',
      filter: 'blur(0px)',
    })

    gsap.set(stage, { zIndex: 1 })
  }, [])

  return (
    <StyledPixiSettings
      ref={gsapRef}
      onPointerEnter={handleHover}
      onPointerLeave={handleLeave}
      className={className}
    >
      <div
        className="gsap-bg-pattern absolute h-full w-full"
        style={{ backgroundImage: `url(${APP_CONFIG.viteMediaUrl}/pattern-big.svg)` }}
      />
      <H6Headline className="gsap-range-label-container grid-col-span-2 flex gap-2 items-center -ml-6">
        <Icon className="w-4 h-4" icon={ICON_ID.MousePointerClick} />
        Pointer & Base
      </H6Headline>
      <RangeLabel label="Base Scale">
        <RangeSlider
          initialValue={getPercentSingleValue(PixiConfig.emitter.scaleModifier)}
          onChange={changeScaleModifier}
        />
      </RangeLabel>
      <RangeLabel label="Pointer Radius">
        <RangeSlider
          initialValue={getPercentSingleValue(PixiConfig.emitter.cursorRadius)}
          onChange={changeCursorRadius}
        />
      </RangeLabel>
      <RangeLabel label="Pointer Miss Rate">
        <RangeSlider
          initialValue={getPercentSingleValue(PixiConfig.emitter.pointerMissRate)}
          onChange={changeMissRate}
        />
      </RangeLabel>
      <RangeLabel label="Inertia">
        <RangeSlider
          initialValue={getPercentSingleValue(PixiConfig.emitter.pointerInertia)}
          onChange={changeInertiaModifier}
        />
      </RangeLabel>
      <H6Headline className="gsap-range-label-container grid-col-span-2 flex gap-2 items-center -ml-6">
        <Icon className="w-4 h-4" icon={ICON_ID.Hourglass} />
        Timings
      </H6Headline>
      <RangeLabel label="In Duration (range)">
        <RangeSlider
          initialValue={getPercentMultiValue(PixiConfig.emitter.inDuration)}
          onChange={changeInDuration}
          multi
        />
      </RangeLabel>
      <RangeLabel label="Out Duration (range)">
        <RangeSlider
          initialValue={getPercentMultiValue(PixiConfig.emitter.outDuration)}
          onChange={changeOutDuration}
          multi
        />
      </RangeLabel>
      <H6Headline className="gsap-range-label-container grid-col-span-2 flex gap-2 items-center -ml-6">
        <Icon className="w-4 h-4" icon={ICON_ID.Shell} />
        Animation
      </H6Headline>
      <RangeLabel label="Gravity">
        <RangeSlider
          initialValue={getPercentSingleValue(PixiConfig.emitter.gravity)}
          onChange={changeGravity}
        />
      </RangeLabel>
      <RangeLabel label="Pixel Spread">
        <RangeSlider
          initialValue={getPercentMultiValue(PixiConfig.emitter.pixelSpread)}
          onChange={changePixelSpread}
          multi
        />
      </RangeLabel>
      <RangeLabel label="In Opacity (range)">
        <RangeSlider
          initialValue={getPercentMultiValue(PixiConfig.emitter.alphaIn)}
          onChange={changeAlphaIn}
          multi
        />
      </RangeLabel>
      <RangeLabel label="In Skew">
        <RangeSlider
          initialValue={getPercentMultiValue(PixiConfig.emitter.skewTo)}
          onChange={changeSkewTo}
          multi
        />
      </RangeLabel>
      <RangeLabel label="Out Skew">
        <RangeSlider
          initialValue={getPercentMultiValue(PixiConfig.emitter.skewFrom)}
          onChange={changeSkewFrom}
          multi
        />
      </RangeLabel>
      <RangeLabel label="In Scale">
        <RangeSlider
          initialValue={getPercentMultiValue(PixiConfig.emitter.scaleIn)}
          onChange={changeScaleIn}
          multi
        />
      </RangeLabel>
      <RangeLabel label="In Rotation">
        <RangeSlider
          initialValue={getPercentMultiValue(PixiConfig.emitter.rotationIn)}
          onChange={changeRotationIn}
          multi
        />
      </RangeLabel>
    </StyledPixiSettings>
  )
}

export default PixiSettings
