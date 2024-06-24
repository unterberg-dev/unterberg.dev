import BlurDot from '#atoms/BlurDot'
import Layout from '#atoms/Layout'
import { APP_CONFIG } from '#lib/constants'
import MainNavigation from '#organisms/MainNavigation'
import { usePageContext } from '#renderer/usePageContext'

const Footer = () => {
  const pageContext = usePageContext()
  const { urlPathname } = pageContext

  const isStartPage = urlPathname === '/' || urlPathname === ''

  return (
    <footer className={`${isStartPage ? 'absolute bottom-0' : ''} w-full mt-40`}>
      <Layout className="text-center flex flex-col gap-2 items-center">
        <BlurDot className="w-40 h-40 opacity-30 top-full -m-20 fixed" />
        <MainNavigation className="inline-block z-10" ulProps={{ className: 'gap-6' }} />
        <img
          src={`${APP_CONFIG.viteMediaUrl}/logo-xs.png`}
          alt="Richard Unterberg"
          className="pixi-hitbox w-8 h-8 mb-3"
        />
        <div className="pixi-hitbox pb-5 md:pb-7 inline-block">
          <div className="text-grayLight relative z-10">
            <p className="mb-2">2024, Richard Unterberg</p>
          </div>
        </div>
      </Layout>
    </footer>
  )
}

export default Footer
