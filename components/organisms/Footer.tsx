import { usePageContext } from 'vike-react/usePageContext'

import BlurDot from '#atoms/BlurDot'
import Layout from '#atoms/Layout'
import Link from '#atoms/Link'
import { APP_CONFIG } from '#lib/constants'
import MainNavigation from '#organisms/MainNavigation'

const FooterSeparator = () => (
  <span className="text-primary inline-block opacity-50 pointer-events-none" aria-label="decorator">
    +
  </span>
)

const Footer = () => {
  const pageContext = usePageContext()
  const { urlPathname } = pageContext

  const isStartPage = urlPathname === '/' || urlPathname === ''

  return (
    <footer className={`${isStartPage ? 'absolute bottom-0' : ''} w-full z-10`}>
      <Layout className="text-center flex flex-col gap-2 items-center">
        <BlurDot className="w-40 h-40 opacity-30 top-full -m-20 fixed" />
        <MainNavigation className="inline-block z-10" ulProps={{ className: 'gap-6' }} />
        <img
          src={`${APP_CONFIG.viteMediaUrl}/logo-xs.png`}
          alt="Richard Unterberg"
          className="pixi-hitbox w-5 h-5 mb-3"
        />
        <div className="pixi-hitbox pb-5 inline-block">
          <p className="mb-1">2025, Richard Unterberg</p>
          <div className="text-grayLight relative">
            <p className="">
              Emojis from:{' '}
              <Link
                className="text-warning block p-1 min-w-8 text-center"
                href="https://emojikitchen.dev/"
                label="Link to emojikitchen website"
              >
                Emoji-Kitchen
              </Link>
            </p>
          </div>
        </div>
      </Layout>
    </footer>
  )
}

export default Footer
