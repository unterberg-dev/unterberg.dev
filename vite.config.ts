import path from 'path'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), UnoCSS()],
  optimizeDeps: {
    include: ['react/jsx-runtime', 'react', 'react-dom'],
  },
  build: {
    minify: true,
    cssMinify: 'esbuild',
  },
  ssr: {
    noExternal: ['tailwind-styled-components'],
  },
  resolve: {
    alias: {
      '#hooks': path.resolve(__dirname, './src/lib/hooks/'),
      '#pixi': path.resolve(__dirname, './src/lib/pixi/'),
      '#components': path.resolve(__dirname, './src/components/'),
      '#lib': path.resolve(__dirname, './src/lib/'),
      '#zustand': path.resolve(__dirname, './src/zustand/'),
      '#src': path.resolve(__dirname, './src/'),
      '#root': __dirname,
    },
  },
})
