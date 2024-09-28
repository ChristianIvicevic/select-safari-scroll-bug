'use client'

import { ComponentProps, ReactNode } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'

export function Submit({ children, ...props }: { children: ReactNode } & ComponentProps<typeof Button>) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} {...props}>
      {children}
    </Button>
  )
}
