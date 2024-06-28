import BlurDot from '#atoms/BlurDot'
import Layout from '#atoms/Layout'
import Link from '#atoms/Link'
import { APP_CONFIG } from '#lib/constants'
import MainNavigation from '#organisms/MainNavigation'
import { usePageContext } from '#renderer/usePageContext'

const FooterSeparator = () => <div className="text-primary opacity-50 pointer-events-none">+</div>

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
          <p className="mb-1">2024, Richard Unterberg</p>
          <div className="text-grayLight relative text-sm">
            <p className="">
              Emojis from:{' '}
              <Link className="text-warning" href="https://emojikitchen.dev/">
                Emoji-Kitchen
              </Link>
            </p>
            <div className="flex justify-between gap-x-1">
              <Link className="text-primary" href="https://vitejs.dev/">
                Vite
              </Link>
              <FooterSeparator />
              <Link className="text-primary" href="https://vike.dev/">
                Vike
              </Link>
              <FooterSeparator />
              <Link className="text-primary" href="https://pixijs.com/">
                Pixi.js
              </Link>
              <FooterSeparator />
              <Link className="text-primary" href="https://gsap.com/">
                GSAP
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </footer>
  )
}

export default Footer
