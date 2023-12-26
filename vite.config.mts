import react from '@vitejs/plugin-react'
import path from 'path'
import { PluginOption, defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { visualizer } from 'rollup-plugin-visualizer'

// to analyze bundle, run `ANALYZE=true npm run build`
const analyze = process.env.ANALYZE === 'true'

export default defineConfig({
  // base: '', // remove for using root
  plugins: [
    react(),
    tsconfigPaths(),
    analyze &&
      (visualizer({
        template: 'treemap',
        open: true,
        gzipSize: true,
        brotliSize: true,
        filename: 'bundle-analyze.html', // will be saved in project's root
      }) as PluginOption),
  ],
  resolve: {
    alias: {
      'tailwind.config.js': path.join(__dirname, 'tailwind.config.js'),
    },
  },
  optimizeDeps: {
    include: ['tailwind.config.js'],
  },
  build: {
    commonjsOptions: {
      include: ['tailwind.config.js', 'node_modules/**'],
    },
  },
})
