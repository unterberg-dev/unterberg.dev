import tw from 'tailwind-styled-components'

interface TagBubbleProps {
  $size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

const mapSizeToFontSize = (size: TagBubbleProps['$size']) => {
  switch (size) {
    case 'xs':
      return 'text-xs'
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

const mapSizeToPadding = (size: TagBubbleProps['$size']) => {
  switch (size) {
    case 'xs':
      return 'px-1.5 py-1'
    default:
      return 'px-2 py-1'
  }
}

const TagBubble = tw.div<TagBubbleProps>`
  rounded-lg
  ${p => mapSizeToFontSize(p.$size)}
  ${p => mapSizeToPadding(p.$size)}
  inline-block
  transition-colors
  duration-350
`

export default TagBubble
