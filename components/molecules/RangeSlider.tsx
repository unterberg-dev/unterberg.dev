import { useCallback, useEffect, useRef, useState } from 'react'
import tw from 'tailwind-styled-components'

const StyledSlider = tw.div`
  slider
  relative
  w-[200px]
`

const StyledSliderTrack = tw.div`
  slider__track
  absolute
  rounded-sm
  w-full
  h-[5px]
  bg-white
`

const StyledSliderRange = tw.div`
  slider__range
  absolute
  rounded-sm
  h-[5px]
  bg-primary
`

const StyledThumb = tw.input`
  thumb
  thumb::-webkit-slider-thumb
  -webkit-appearance: none;
  pointer-events: none;
  position: absolute;
  height: 0;
  width: 200px;
  outline: none;
`

interface RangeSliderProps {
  initialValue?: number | [number, number]
  min?: number
  max?: number
  onChange: (value: number, type?: 'min' | 'max') => void
  step?: number
  multi?: boolean
}

const getPercent = (value: number, min: number, max: number) =>
  Math.round(((value - min) / (max - min)) * 100)

export const getValueBasedOnMinMax = (value: number, min: number, max: number) =>
  ((value - min) / (max - min)) * 100

const RangeSlider = ({
  min = 0,
  max = 100,
  multi,
  step = 1,
  onChange,
  initialValue,
}: RangeSliderProps) => {
  const [minVal, setMinVal] = useState(min)
  const [maxVal, setMaxVal] = useState(max)
  const [singleValue, setSingleValue] = useState((min + max) / 2)
  const [isTouched, setIsTouched] = useState(false)
  const minValRef = useRef(min)
  const maxValRef = useRef(max)
  const rangeRef = useRef<HTMLDivElement>(null)

  const changeSingleStyle = useCallback(
    (singleVal: number) => {
      const percent = getPercent(singleVal, min, max)
      if (rangeRef.current) {
        rangeRef.current.style.left = '0%'
        rangeRef.current.style.width = `${percent}%`
      }
    },
    [max, min],
  )

  const changeMultiStyle = useCallback(
    (minValue: number, maxValue: number) => {
      const minPercent = getPercent(minValue, min, max)
      const maxPercent = getPercent(maxValue, min, max)

      if (rangeRef.current) {
        rangeRef.current.style.left = `${minPercent}%`
        rangeRef.current.style.width = `${maxPercent - minPercent}%`
      }
    },
    [max, min],
  )

  const handleChangeSingleType = useCallback(
    (value: number) => {
      if (!isTouched) {
        setIsTouched(true)
      }
      const roundedValue = Math.max(Number(value), minVal + 1)
      onChange(roundedValue)
      setSingleValue(roundedValue)
      changeSingleStyle(roundedValue)
    },
    [changeSingleStyle, isTouched, minVal, onChange],
  )

  const handleChangeMultiType = useCallback(
    (value: number, type: 'min' | 'max') => {
      if (!isTouched) {
        setIsTouched(true)
      }

      if (type === 'min') {
        if (value >= maxValRef.current) return
        setMinVal(Math.min(value, maxValRef.current - 1))
        onChange(value, 'min')
        changeMultiStyle(value, maxValRef.current)
        minValRef.current = value
      } else {
        if (value <= minValRef.current) return
        setMaxVal(Math.max(value, minValRef.current + 1))
        onChange(value, 'max')
        changeMultiStyle(minValRef.current, value)
        maxValRef.current = value
      }
    },
    [changeMultiStyle, isTouched, onChange],
  )

  useEffect(() => {
    if (multi) {
      changeMultiStyle(minVal, maxVal)

      if (initialValue && !isTouched) {
        const [minValue, maxValue] = initialValue as [number, number]
        setMinVal(minValue)
        setMaxVal(maxValue)
        minValRef.current = minValue
        maxValRef.current = maxValue
      }
    } else {
      changeSingleStyle(singleValue)

      if (initialValue && !isTouched) {
        const val = getValueBasedOnMinMax(initialValue as number, min, max)
        setSingleValue(val)
      }
    }
  }, [
    changeMultiStyle,
    changeSingleStyle,
    initialValue,
    isTouched,
    max,
    maxVal,
    min,
    minVal,
    multi,
    singleValue,
  ])

  const thumbDefaultProps = {
    type: 'range',
    min,
    max,
    step,
  }

  return (
    <div className="py-5">
      {multi ? (
        <>
          <StyledThumb
            value={minVal}
            onChange={event => handleChangeMultiType(Number(event.target.value), 'min')}
            className="thumb thumb--left z-3"
            {...thumbDefaultProps}
          />
          <StyledThumb
            value={maxVal}
            onChange={event => handleChangeMultiType(Number(event.target.value), 'max')}
            className="thumb thumb--right z-4"
            {...thumbDefaultProps}
          />
        </>
      ) : (
        <StyledThumb
          value={singleValue}
          onChange={event => handleChangeSingleType(Number(event.target.value))}
          className="thumb thumb--single z-4"
          {...thumbDefaultProps}
        />
      )}
      <StyledSlider>
        <StyledSliderTrack />
        <StyledSliderRange ref={rangeRef} />
      </StyledSlider>
    </div>
  )
}

export default RangeSlider
