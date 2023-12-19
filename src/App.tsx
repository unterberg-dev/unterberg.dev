import '@fontsource/inter/latin-100.css'
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-700.css'

import './globals.css'
import { lazy } from 'react'

const Start = lazy(() => import('@/components/Start'))

const App = () => <Start />

export default App
