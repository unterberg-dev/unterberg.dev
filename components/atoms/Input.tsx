import { Field } from 'formik'
import React from 'react'

const inputTwStyle = `
  p-3
  text-base
  border-1
  transition-border-color
  duration-250
  border-darkLightBorder
  bg-darkLight
  color-light
  hover:border-grayDark
  focus:border-warning
  focus:bg-dark
`

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string
  name: string
  placeholder: string
}

const Input = ({ type, name, placeholder, className, ...props }: InputProps) => (
  <Field
    className={`${inputTwStyle} ${className}`}
    name={name}
    placeholder={placeholder}
    type={type}
    {...props}
  />
)

export default Input
