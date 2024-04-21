import '#components/styles.css'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

import { ReactNode, StrictMode, useMemo } from 'react'
import { PageContextClient, PageContextServer } from 'vike/types'

import Footer from '#organisms/Footer'
import Header from '#organisms/Header'
import { ClientOnly } from '#renderer/ClientOnly'
import { PageContextProvider } from '#renderer/usePageContext'

const App = ({
  pageContext,
  children,
}: {
  pageContext: PageContextClient | PageContextServer
  children: ReactNode
}) => {
  const pixiStageMemo = useMemo(
    () => (
      <ClientOnly load={() => import('#pixi/PixiStage')} fallback={null}>
        {PixiStage => <PixiStage />}
      </ClientOnly>
    ),
    [],
  )

  return (
    <StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <div className="relative min-h-lvh">
          <Header />
          <div className="page-portal">{children}</div>
          <Footer />
        </div>
      </PageContextProvider>
      {pixiStageMemo}
    </StrictMode>
  )
}

export default App
