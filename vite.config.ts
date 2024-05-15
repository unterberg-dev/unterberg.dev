import path from 'path'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import vike from 'vike/plugin'
import { defineConfig } from 'vite'

import 'dotenv/config'

export default defineConfig({
  base: '/',
  plugins: [
    UnoCSS(),
    react(),
    vike({
      prerender: true,
      trailingSlash: true,
    }),
  ],
  build: {
    cssMinify: 'esbuild',
    minify: true,
  },
  optimizeDeps: {
    include: ['react/jsx-runtime', 'react', 'react-dom'],
  },
  server: {
    port: parseInt(process.env.VITE_DEV_PORT!, 10),
  },
  preview: {
    port: parseInt(process.env.VITE_PROD_PORT!, 10),
  },
  ssr: {
    noExternal: ['tailwind-styled-components'],
  },
  resolve: {
    alias: {
      '#atoms': path.resolve(__dirname, './components/atoms/'),
      '#molecules': path.resolve(__dirname, './components/molecules/'),
      '#organisms': path.resolve(__dirname, './components/organisms/'),
      '#pixi': path.resolve(__dirname, './components/pixi/'),
      '#gsap': path.resolve(__dirname, './lib/gsap/'),
      '#renderer': path.resolve(__dirname, './renderer/'),
      '#pages': path.resolve(__dirname, './pages/'),
      '#components': path.resolve(__dirname, './components/'),
      '#lib': path.resolve(__dirname, './lib/'),
      '#src': path.resolve(__dirname, './src/'),
      '#root': __dirname,
      $public: path.resolve(__dirname, './public'),
    },
  },
})
