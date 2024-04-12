// https://github.com/vikejs/vike-react/blob/main/packages/vike-react/src/components/ClientOnly.tsx
// https://vike.dev/ClientOnly#without-vike-extension
import React, {
  lazy,
  startTransition,
  Suspense,
  useEffect,
  useState,
  type ComponentType,
  type ReactNode,
} from 'react'

type ClientOnlyProps<T> = {
  load: () => Promise<{ default: ComponentType<T> } | ComponentType<T>>
  children: (Component: ComponentType<T>) => ReactNode
  fallback: ReactNode
  deps?: Parameters<typeof useEffect>[1]
  childProps?: Record<string, unknown>
}

const ClientOnly = <T,>({
  load,
  children,
  fallback,
  deps = undefined,
  childProps,
}: ClientOnlyProps<T>) => {
  const [ComponentEL, setComponentEL] = useState<ComponentType<unknown> | null>(null)

  useEffect(() => {
    const loadComponent = () => {
      const Component = lazy(() =>
        load()
          .then(LoadedComponent => ({
            default: () =>
              children('default' in LoadedComponent ? LoadedComponent.default : LoadedComponent),
          }))
          .catch(error => {
            // eslint-disable-next-line no-console
            console.error('Component loading failed:', error)
            return { default: () => null }
          }),
      )
      setComponentEL(Component)
    }

    startTransition(() => {
      loadComponent()
    })
  }, [load, deps, children])

  return ComponentEL ? (
    <Suspense>
      <ComponentEL {...childProps} />
    </Suspense>
  ) : (
    fallback
  )
}

export { ClientOnly }
