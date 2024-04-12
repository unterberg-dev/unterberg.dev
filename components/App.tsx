import '#components/styles.css'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

import { ReactNode, StrictMode } from 'react'
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
}) => (
  <StrictMode>
    <PageContextProvider pageContext={pageContext}>
      <Header />
      <div className="page-portal">{children}</div>
      <Footer />
    </PageContextProvider>
    <ClientOnly load={() => import('#pixi/PixiStage')} fallback={null}>
      {PixiStage => <PixiStage />}
    </ClientOnly>
  </StrictMode>
)

export default App
