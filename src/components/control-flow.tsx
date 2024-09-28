import { ReactNode } from 'react'

export function Show<T>({
  children,
  fallback = null,
  when,
}: {
  when: T | boolean | null | undefined
  children: ReactNode | ((item: T) => ReactNode)
  fallback?: ReactNode
}) {
  if (!when) {
    return fallback
  }

  if (typeof children === 'function') {
    return children(when as T)
  }

  return children
}
