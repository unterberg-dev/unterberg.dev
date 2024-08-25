import type { Config } from 'vike/types'

// https://vike.dev/config
export default {
  passToClient: ['pageProps'],
  clientRouting: true,
  hydrationCanBeAborted: true,
  meta: {
    Head: {
      env: { server: true },
    },
    Layout: {
      env: { server: true, client: true },
    },
    title: {
      env: { server: true, client: true },
    },
    Page: {
      env: { server: true, client: true },
    },
  },
} satisfies Config
