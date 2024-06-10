import { Field } from 'formik'

const textareaTwStyle = `
  p-2
  text-base
  border-1
  transition-border-color
  duration-250
  border-1
  border-darkLightBorder
  bg-darkLight
  color-light
  hover:border-grayDark
  focus:border-warning
  focus:bg-dark
`

interface TextareaProps extends React.HTMLAttributes<HTMLTextAreaElement> {
  name: string
  placeholder: string
}

const Textarea = ({ name, placeholder, className, ...props }: TextareaProps) => (
  <Field
    as="textarea"
    className={`${textareaTwStyle} ${className} min-h-30`}
    name={name}
    placeholder={placeholder}
    {...props}
  />
)

export default Textarea
