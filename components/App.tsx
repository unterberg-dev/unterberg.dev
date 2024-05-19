import '#components/styles.css'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, StrictMode, useMemo } from 'react'
import { PageContextClient, PageContextServer } from 'vike/types'

import Footer from '#organisms/Footer'
import Header from '#organisms/Header'
import PixiStageContextProvider from '#pixi/context/PixiStageContextProvider'
import { ClientOnly } from '#renderer/ClientOnly'
import { PageContextProvider } from '#renderer/usePageContext'

const queryClient = new QueryClient()

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
      <PixiStageContextProvider>
        <PageContextProvider pageContext={pageContext}>
          <QueryClientProvider client={queryClient}>
            <div className="relative min-h-lvh">
              <Header />
              <div className="page-portal">{children}</div>
              <Footer />
            </div>
          </QueryClientProvider>
        </PageContextProvider>
        {pixiStageMemo}
      </PixiStageContextProvider>
    </StrictMode>
  )
}

export default App
