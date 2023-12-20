import { lazy } from 'react'

const PixiStage = lazy(() => import('@/components/PixiStage'))
const HitboxContextProvider = lazy(() => import('@/components/Hitbox/HitboxMapProvider'))
const TileSettings = lazy(() => import('@/components/TileSettings'))
const PageContent = lazy(() => import('@/components/PageContent'))

const Start = () => (
  <HitboxContextProvider>
    <PixiStage />
    <TileSettings />
    <PageContent />
  </HitboxContextProvider>
)

export default Start
