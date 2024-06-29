import '#components/styles.css'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

import { ReactNode, StrictMode } from 'react'
import { PageContextClient, PageContextServer } from 'vike/types'

import Footer from '#organisms/Footer'
import Header from '#organisms/Header'
import PixiStageContextProvider from '#pixi/context/PixiStageContextProvider'
import PixiStage from '#pixi/PixiStage'
import { PageContextProvider } from '#renderer/usePageContext'

const App = ({
  pageContext,
  children,
}: {
  pageContext: PageContextClient | PageContextServer
  children: ReactNode
}) => (
  <StrictMode>
    <PixiStageContextProvider>
      <PageContextProvider pageContext={pageContext}>
        <div className="relative min-h-lvh">
          <Header />
          <div className="page-portal">{children}</div>
          <Footer />
        </div>
      </PageContextProvider>
      <PixiStage />
    </PixiStageContextProvider>
  </StrictMode>
)

export default App
