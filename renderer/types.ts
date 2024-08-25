/* eslint-disable @typescript-eslint/no-namespace */

declare global {
  namespace Vike {
    interface PageContext {
      pageProps?: PageProps
      urlPathname: string
      exports: {
        documentProps?: {
          title?: string
          description?: string
        }
      }
    }
  }
}

export type PageProps = Record<string, unknown>
