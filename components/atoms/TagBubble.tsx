import tw from 'tailwind-styled-components'

interface TagBubbleProps {
  $size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

const mapSizeToFontSize = (size: TagBubbleProps['$size']) => {
  switch (size) {
    case 'sm':
      return 'text-sm'
    case 'md':
      return 'text-md'
    case 'lg':
      return 'text-lg'
    case 'xl':
      return 'text-xl'
    case '2xl':
      return 'text-2xl'
    default:
      return 'text-sm'
  }
}

const TagBubble = tw.div<TagBubbleProps>`
  rounded-lg
  ${p => mapSizeToFontSize(p.$size)}
  inline-block
  transition-colors
  duration-350
  px-2
  py-1
`

export default TagBubble
