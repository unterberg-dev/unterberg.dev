import { useMemo } from 'react'

import { usePageContext } from '#root/renderer/usePageContext'

interface LinkProps {
  href: string
  external?: boolean
  children: React.ReactNode | React.ReactNode[]
  className?: string
  button?: boolean
}

export default ({ href, external, children, className = '', button }: LinkProps) => {
  const pageContext = usePageContext()
  const { urlPathname } = pageContext

  // clean up href and pathname
  const hrefWithoutSlashes = href.replace(/^\/|\/$/g, '')
  const pathnameWithoutSlashes = urlPathname.replace(/^\/|\/$/g, '')

  const isActive = useMemo(
    () =>
      hrefWithoutSlashes === ''
        ? pathnameWithoutSlashes === hrefWithoutSlashes
        : pathnameWithoutSlashes.startsWith(hrefWithoutSlashes),
    [hrefWithoutSlashes, pathnameWithoutSlashes],
  )

  const generatedClassName = useMemo(() => {
    const staticClassName = 'transition-colors duration-200 ease-in-out inline-block text-center'

    if (button) {
      return `${
        isActive ? 'bg-primary pointer-events-none' : 'bg-warning bg-opacity-50 hover:bg-opacity-75'
      } p-3 ${className} ${staticClassName} `
    }

    return `${isActive ? 'text-warning' : ''} ${className} ${staticClassName}`
  }, [button, className, isActive])

  return (
    <a
      href={`${!external ? import.meta.env.BASE_URL : ''}${href}`}
      className={generatedClassName}
      target={external ? '_blank' : '_self'}
      rel={external ? 'noreferrer' : ''}
    >
      {children}
    </a>
  )
}
