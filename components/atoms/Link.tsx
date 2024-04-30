import { useMemo } from 'react'

import { usePageContext } from '#root/renderer/usePageContext'

interface LinkProps {
  href: string
  external?: boolean
  children?: React.ReactNode | React.ReactNode[]
  className?: string
  button?: boolean
}

const Link = ({ href, external, children, className = '', button }: LinkProps) => {
  const pageContext = usePageContext()
  const { urlPathname } = pageContext

  // clean up href and pathname
  const hrefWithoutSlashes = href.replace(/^\/|\/$/g, '')
  const pathnameWithoutSlashes = urlPathname.replace(/^\/|\/$/g, '')

  const isAnchorLink = hrefWithoutSlashes.startsWith('#')

  const isActive = useMemo(
    () =>
      hrefWithoutSlashes === ''
        ? pathnameWithoutSlashes === hrefWithoutSlashes
        : pathnameWithoutSlashes.startsWith(hrefWithoutSlashes),
    [hrefWithoutSlashes, pathnameWithoutSlashes],
  )

  const generatedClassName = useMemo(() => {
    const staticClassName = 'transition-colors duration-200 ease-in-out inline-block'

    if (button) {
      return `${
        isActive ? 'bg-primary pointer-events-none' : 'bg-warning bg-opacity-50 hover:bg-opacity-75'
      } p-3 ${className} ${staticClassName} `
    }

    return `${isActive ? 'text-warning' : ''} ${className} ${staticClassName}`
  }, [button, className, isActive])

  const linkCheckedExternal = useMemo(
    () => `${!external ? import.meta.env.BASE_URL : ''}${href}`,
    [external, href],
  )

  return (
    <a
      href={isAnchorLink ? href : linkCheckedExternal}
      className={generatedClassName}
      target={external ? '_blank' : '_self'}
      rel={external ? 'noreferrer' : ''}
    >
      {children}
    </a>
  )
}

export default Link
