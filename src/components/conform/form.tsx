import { FieldMetadata } from '@conform-to/react'
import { ReactNode } from 'react'
import { isPresent } from 'ts-extras'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export function FormField({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('flex flex-col gap-2', className)}>{children}</div>
}

export function FormLabel({
  children,
  meta,
  className,
}: {
  children: ReactNode
  meta: FieldMetadata
  className?: string
}) {
  return (
    <Label htmlFor={meta.id} className={cn(isPresent(meta.errors) && 'text-destructive', className)}>
      {children}
    </Label>
  )
}

export function FormMessage({ children }: { children: ReactNode }) {
  return <div className="text-sm font-medium text-destructive">{children}</div>
}
