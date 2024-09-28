import { FieldMetadata, getTextareaProps } from '@conform-to/react'
import { ComponentProps } from 'react'
import { Textarea as BaseTextarea } from '@/components/ui/textarea'

export function Textarea({
  meta,
  ...props
}: {
  meta: FieldMetadata<string | null>
} & ComponentProps<typeof BaseTextarea>) {
  return <BaseTextarea {...getTextareaProps(meta)} key={meta.key} {...props} />
}
