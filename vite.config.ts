import path from 'path'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [UnoCSS()],
  build: {
    cssMinify: 'esbuild',
    minify: true,
  },
  resolve: {
    alias: {
      '#pixi': path.resolve(__dirname, './src/pixi/'),
      '#src': path.resolve(__dirname, './src/'),
      '#root': __dirname,
      $public: path.resolve(__dirname, './public'),
    },
  },
})
