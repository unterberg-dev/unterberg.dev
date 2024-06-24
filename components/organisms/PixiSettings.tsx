import { useCallback } from 'react'

import { PixiConfig } from '#lib/constants'
import { getPercentMultiValue, getPercentSingleValue } from '#lib/utils'
import RangeSlider from '#molecules/RangeSlider'
import { getEmitterStore, getStore, setStore } from '#pixi/store'

interface RangeLabelProps {
  label: string
  children: React.ReactNode
}

const RangeLabel = ({ children, label }: RangeLabelProps) => (
  <div className="relative">
    <p className="text-base">{label}</p>
    {children}
  </div>
)

const selectStoreReturnNewValue = (selector: string, value: number) => {
  const { min, max } = getStore().emitter[selector as never] // bad :(
  const inputMinValue = 0
  const inputMaxValue = 100
  return ((value - inputMinValue) * (max - min)) / (inputMaxValue - inputMinValue) + min
}

const PixiSettings = () => {
  const changeCursorRadius = useCallback((value: number) => {
    const newValue = selectStoreReturnNewValue('cursorRadius', value)

    setStore({
      ...getStore(),
      emitter: {
        ...getStore().emitter,
        cursorRadius: { ...getStore().emitter.cursorRadius, value: newValue },
      },
    })
  }, [])

  const changeScaleModifier = useCallback((value: number) => {
    const newValue = selectStoreReturnNewValue('scaleModifier', value)

    setStore({
      ...getStore(),
      emitter: {
        ...getStore().emitter,
        scaleModifier: { ...getStore().emitter.scaleModifier, value: newValue },
      },
    })

    getEmitterStore().emitterTiles.forEach(tile => {
      tile.innerContainer.scale.set(
        (getStore().tileWidth /
          (tile.sprite.texture.frame.width * getStore().app.renderer.resolution)) *
          newValue,
      )
    })
  }, [])

  const changeGravity = useCallback((value: number) => {
    const newValue = selectStoreReturnNewValue('gravity', value)

    setStore({
      ...getStore(),
      emitter: {
        ...getStore().emitter,
        gravity: { ...getStore().emitter.gravity, value: newValue },
      },
    })
  }, [])

  const changeInertiaModifier = useCallback((value: number) => {
    const newValue = selectStoreReturnNewValue('pointerInertia', value)

    setStore({
      ...getStore(),
      emitter: {
        ...getStore().emitter,
        pointerInertia: { ...getStore().emitter.pointerInertia, value: newValue },
      },
    })
  }, [])

  const changeMomentumModifier = useCallback((value: number) => {
    const newValue = selectStoreReturnNewValue('pointerMomentumModifier', value)

    setStore({
      ...getStore(),
      emitter: {
        ...getStore().emitter,
        pointerMomentumModifier: { ...getStore().emitter.pointerMomentumModifier, value: newValue },
      },
    })
  }, [])

  const changeMissRate = useCallback((value: number) => {
    const newValue = selectStoreReturnNewValue('pointerMissRate', value)

    setStore({
      ...getStore(),
      emitter: {
        ...getStore().emitter,
        pointerMissRate: { ...getStore().emitter.pointerMissRate, value: newValue },
      },
    })
  }, [])

  const changeInDuration = useCallback((value: number, type?: 'min' | 'max') => {
    const newValue = selectStoreReturnNewValue('inDuration', value)

    setStore({
      ...getStore(),
      emitter: {
        ...getStore().emitter,
        inDuration: {
          ...getStore().emitter.inDuration,
          value:
            type === 'min'
              ? [newValue, getStore().emitter.inDuration.value[1]]
              : [getStore().emitter.inDuration.value[0], newValue],
        },
      },
    })
  }, [])

  const changeOutDuration = useCallback((value: number, type?: 'min' | 'max') => {
    const newValue = selectStoreReturnNewValue('outDuration', value)

    setStore({
      ...getStore(),
      emitter: {
        ...getStore().emitter,
        outDuration: {
          ...getStore().emitter.outDuration,
          value:
            type === 'min'
              ? [newValue, getStore().emitter.outDuration.value[1]]
              : [getStore().emitter.outDuration.value[0], newValue],
        },
      },
    })
  }, [])

  const changeAlphaIn = useCallback((value: number, type?: 'min' | 'max') => {
    const newValue = selectStoreReturnNewValue('alphaIn', value)

    setStore({
      ...getStore(),
      emitter: {
        ...getStore().emitter,
        alphaIn: {
          ...getStore().emitter.alphaIn,
          value:
            type === 'min'
              ? [newValue, getStore().emitter.alphaIn.value[1]]
              : [getStore().emitter.alphaIn.value[0], newValue],
        },
      },
    })
  }, [])

  const changePixelSpread = useCallback((value: number, type?: 'min' | 'max') => {
    const newValue = selectStoreReturnNewValue('pixelSpread', value)

    setStore({
      ...getStore(),
      emitter: {
        ...getStore().emitter,
        pixelSpread: {
          ...getStore().emitter.pixelSpread,
          value:
            type === 'min'
              ? [newValue, getStore().emitter.pixelSpread.value[1]]
              : [getStore().emitter.pixelSpread.value[0], newValue],
        },
      },
    })
  }, [])

  const changeSkewFrom = useCallback((value: number, type?: 'min' | 'max') => {
    const newValue = selectStoreReturnNewValue('skewFrom', value)

    setStore({
      ...getStore(),
      emitter: {
        ...getStore().emitter,
        skewFrom: {
          ...getStore().emitter.skewFrom,
          value:
            type === 'min'
              ? [newValue, getStore().emitter.skewFrom.value[1]]
              : [getStore().emitter.skewFrom.value[0], newValue],
        },
      },
    })
  }, [])

  const changeSkewTo = useCallback((value: number, type?: 'min' | 'max') => {
    const newValue = selectStoreReturnNewValue('skewTo', value)

    setStore({
      ...getStore(),
      emitter: {
        ...getStore().emitter,
        skewTo: {
          ...getStore().emitter.skewTo,
          value:
            type === 'min'
              ? [newValue, getStore().emitter.skewTo.value[1]]
              : [getStore().emitter.skewTo.value[0], newValue],
        },
      },
    })
  }, [])

  const changeScaleIn = useCallback((value: number, type?: 'min' | 'max') => {
    const newValue = selectStoreReturnNewValue('scaleIn', value)

    setStore({
      ...getStore(),
      emitter: {
        ...getStore().emitter,
        scaleIn: {
          ...getStore().emitter.scaleIn,
          value:
            type === 'min'
              ? [newValue, getStore().emitter.scaleIn.value[1]]
              : [getStore().emitter.scaleIn.value[0], newValue],
        },
      },
    })
  }, [])

  const changeRotationIn = useCallback((value: number, type?: 'min' | 'max') => {
    const newValue = selectStoreReturnNewValue('rotationIn', value)

    setStore({
      ...getStore(),
      emitter: {
        ...getStore().emitter,
        rotationIn: {
          ...getStore().emitter.rotationIn,
          value:
            type === 'min'
              ? [newValue, getStore().emitter.rotationIn.value[1]]
              : [getStore().emitter.rotationIn.value[0], newValue],
        },
      },
    })
  }, [])
  return (
    <div className="pixi-hitbox grid grid-cols-2 mt-10">
      <RangeLabel label="Cursor Radius">
        <RangeSlider
          initialValue={getPercentSingleValue(PixiConfig.emitter.cursorRadius)}
          onChange={changeCursorRadius}
        />
      </RangeLabel>
      <RangeLabel label="Base emitter scale (x mod)">
        <RangeSlider
          initialValue={getPercentSingleValue(PixiConfig.emitter.scaleModifier)}
          onChange={changeScaleModifier}
        />
      </RangeLabel>
      <RangeLabel label="Gravity">
        <RangeSlider
          initialValue={getPercentSingleValue(PixiConfig.emitter.gravity)}
          onChange={changeGravity}
        />
      </RangeLabel>
      <RangeLabel label="Particle Inertia (x mod)">
        <RangeSlider
          initialValue={getPercentSingleValue(PixiConfig.emitter.pointerInertia)}
          onChange={changeInertiaModifier}
        />
      </RangeLabel>
      <RangeLabel label="Particle Momentum (x mod)">
        <RangeSlider
          initialValue={getPercentSingleValue(PixiConfig.emitter.pointerMomentumModifier)}
          onChange={changeMomentumModifier}
        />
      </RangeLabel>
      <RangeLabel label="Pointer Miss Rate (%)">
        <RangeSlider
          initialValue={getPercentSingleValue(PixiConfig.emitter.pointerMissRate)}
          onChange={changeMissRate}
        />
      </RangeLabel>
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
      <RangeLabel label="In Opacity (range)">
        <RangeSlider
          initialValue={getPercentMultiValue(PixiConfig.emitter.alphaIn)}
          onChange={changeAlphaIn}
          multi
        />
      </RangeLabel>
      <RangeLabel label="Pixel Spread (range)">
        <RangeSlider
          initialValue={getPercentMultiValue(PixiConfig.emitter.pixelSpread)}
          onChange={changePixelSpread}
          multi
        />
      </RangeLabel>
      <RangeLabel label="Skew From (range)">
        <RangeSlider
          initialValue={getPercentMultiValue(PixiConfig.emitter.skewFrom)}
          onChange={changeSkewFrom}
          multi
        />
      </RangeLabel>
      <RangeLabel label="Skew to (range)">
        <RangeSlider
          initialValue={getPercentMultiValue(PixiConfig.emitter.skewTo)}
          onChange={changeSkewTo}
          multi
        />
      </RangeLabel>
      <RangeLabel label="Scale in (range)">
        <RangeSlider
          initialValue={getPercentMultiValue(PixiConfig.emitter.scaleIn)}
          onChange={changeScaleIn}
          multi
        />
      </RangeLabel>
      <RangeLabel label="Rotation in (range)">
        <RangeSlider
          initialValue={getPercentMultiValue(PixiConfig.emitter.rotationIn)}
          onChange={changeRotationIn}
          multi
        />
      </RangeLabel>
    </div>
  )
}

export default PixiSettings
