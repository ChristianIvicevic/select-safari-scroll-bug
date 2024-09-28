import { FieldMetadata, getInputProps } from '@conform-to/react'
import { ComponentProps } from 'react'
import { Input as BaseInput } from '@/components/ui/input'

export function Input({
  meta,
  type,
  ...props
}: {
  meta: FieldMetadata<string | number | null>
  type: Parameters<typeof getInputProps>[1]['type']
} & ComponentProps<typeof BaseInput>) {
  return <BaseInput {...getInputProps(meta, { type, ariaAttributes: true })} key={meta.key} {...props} />
}

export function Hidden({
  meta,
  ...props
}: {
  meta: FieldMetadata<string | number | null>
} & ComponentProps<typeof BaseInput>) {
  return (
    <BaseInput
      className="sr-only"
      aria-hidden
      tabIndex={-1}
      name={meta.name}
      value={meta.value}
      readOnly
      {...props}
    />
  )
}
