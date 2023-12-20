import { lazy } from 'react'

const PixiStage = lazy(() => import('@/components/PixiStage'))
const TileSettings = lazy(() => import('@/components/TileSettings'))
const PageContent = lazy(() => import('@/components/PageContent'))

const Start = () => (
  <>
    <PixiStage />
    <TileSettings />
    <PageContent />
  </>
)

export default Start
