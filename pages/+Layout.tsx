import '#components/styles.css'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

import { StrictMode, useCallback, useMemo, useState, type ReactNode } from 'react'
import { clientOnly } from 'vike-react/clientOnly'

import Footer from '#organisms/Footer'
import PixiStageContextProvider from '#pixi/context/PixiStageContextProvider'

const PixiStage = clientOnly(() => import('#pixi/PixiStage'))

const AppLayout = ({ children }: { children: ReactNode }) => {
  const [mouseMoved, setMouseMoved] = useState(false)

  const handleMouseMove = useCallback(() => {
    if (mouseMoved) return
    setMouseMoved(true)
  }, [mouseMoved])

  const pixiStageMemo = useMemo(() => (mouseMoved ? <PixiStage /> : null), [mouseMoved])

  return (
    <StrictMode>
      <PixiStageContextProvider>
        <div className="relative min-h-lvh" onMouseMove={mouseMoved ? undefined : handleMouseMove}>
          <div className="page-portal">{children}</div>
          <Footer />
        </div>
        {pixiStageMemo}
      </PixiStageContextProvider>
    </StrictMode>
  )
}

export default AppLayout
