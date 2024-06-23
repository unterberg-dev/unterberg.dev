import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock'
import { useCallback, useRef, useState } from 'react'

import { GlassItemButton } from '#atoms/GlassItem'
import Layout from '#atoms/Layout'
import usePageHeaderAnimations from '#gsap/usePageHeaderAnimations'
import { PixiConfig } from '#lib/constants'
import { externalNavigation } from '#lib/navigation'
import HideContent from '#molecules/HideContent'
import RangeSlider from '#molecules/RangeSlider'
import StaggerHeader from '#organisms/StaggerHeader'
import { getEmitterStore, getStore, setStore } from '#pixi/store'

const enableScroll = () => {
  clearAllBodyScrollLocks()
}

const disableScroll = () => {
  disableBodyScroll(document.querySelector('#stage') as HTMLElement)
}

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

const StartPage = () => {
  const staggerContainer = useRef<HTMLDivElement>(null)
  const [uiHidden, setUiHidden] = useState(false)

  const { onClickAnimate, GsapStaggerElement, isAnimating } = usePageHeaderAnimations({
    staggerContainer,
  })

  const handleClick = useCallback(() => {
    if (isAnimating) return

    setUiHidden(prev => {
      if (prev) {
        enableScroll()
      } else {
        disableScroll()
      }

      onClickAnimate(!prev)
      return !prev
    })
  }, [isAnimating, onClickAnimate])

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
    <Layout
      className="flex flex-col relative max-w-xl mx-auto z-2 px-6 md:px-0 overflow-x-hidden md:overflow-inherit"
      ref={staggerContainer}
    >
      <HideContent active={uiHidden} onClick={handleClick} />
      <StaggerHeader
        GsapStaggerElement={GsapStaggerElement}
        postTitle="Web & Software Development"
        title="Hello"
        subtitle="I love to create modern websites and interfaces. Let's build something together ✌️"
      />
      <div className="pixi-hitbox grid grid-cols-2 mt-10">
        <RangeLabel label="Cursor Radius">
          <RangeSlider
            initialValue={PixiConfig.emitter.cursorRadius.value}
            onChange={changeCursorRadius}
          />
        </RangeLabel>
        <RangeLabel label="Base emitter scale (x mod)">
          <RangeSlider
            initialValue={PixiConfig.emitter.scaleModifier.value}
            onChange={changeScaleModifier}
          />
        </RangeLabel>
        <RangeLabel label="Gravity">
          <RangeSlider initialValue={PixiConfig.emitter.gravity.value} onChange={changeGravity} />
        </RangeLabel>
        <RangeLabel label="Particle Inertia (x mod)">
          <RangeSlider
            initialValue={PixiConfig.emitter.pointerInertia.value}
            onChange={changeInertiaModifier}
          />
        </RangeLabel>
        <RangeLabel label="Particle Momentum (x mod)">
          <RangeSlider
            initialValue={PixiConfig.emitter.pointerMomentumModifier.value}
            onChange={changeMomentumModifier}
          />
        </RangeLabel>
        <RangeLabel label="Pointer Miss Rate (%)">
          <RangeSlider
            initialValue={PixiConfig.emitter.pointerMissRate.value}
            onChange={changeMissRate}
          />
        </RangeLabel>
        <RangeLabel label="In Duration (range)">
          <RangeSlider
            initialValue={PixiConfig.emitter.inDuration.value}
            onChange={changeInDuration}
            multi
          />
        </RangeLabel>
        <RangeLabel label="Out Duration (range)">
          <RangeSlider
            initialValue={PixiConfig.emitter.outDuration.value}
            onChange={changeOutDuration}
            multi
          />
        </RangeLabel>
        <RangeLabel label="In Opacity (range)">
          <RangeSlider
            initialValue={PixiConfig.emitter.alphaIn.value}
            onChange={changeAlphaIn}
            multi
          />
        </RangeLabel>
        <RangeLabel label="Pixel Spread (range)">
          <RangeSlider
            initialValue={PixiConfig.emitter.pixelSpread.value}
            onChange={changePixelSpread}
            multi
          />
        </RangeLabel>
        <RangeLabel label="Skew From (range)">
          <RangeSlider
            initialValue={PixiConfig.emitter.skewFrom.value}
            onChange={changeSkewFrom}
            multi
          />
        </RangeLabel>
        <RangeLabel label="Skew to (range)">
          <RangeSlider
            initialValue={PixiConfig.emitter.skewTo.value}
            onChange={changeSkewTo}
            multi
          />
        </RangeLabel>
        <RangeLabel label="Scale in (range)">
          <RangeSlider
            initialValue={PixiConfig.emitter.scaleIn.value}
            onChange={changeScaleIn}
            multi
          />
        </RangeLabel>
        <RangeLabel label="Rotation in (range)">
          <RangeSlider
            initialValue={PixiConfig.emitter.rotationIn.value}
            onChange={changeRotationIn}
            multi
          />
        </RangeLabel>
      </div>

      <nav className="mt-10 md:mt-10 xl:mt-24">
        <div className="pixi-hitbox relative w-full z-10 flex mx-auto gap-3 lg:gap-6">
          {Object.values(externalNavigation)
            .filter(item => item.path !== '')
            .map(item => (
              <GsapStaggerElement key={item.name} fromBottom className="flex-1">
                <GlassItemButton icon={item.icon} href={item.path} label={item.name} />
              </GsapStaggerElement>
            ))}
        </div>
      </nav>
    </Layout>
  )
}

export default StartPage
