import { FieldMetadata, unstable_useControl as useControl } from '@conform-to/react'
import { ComponentProps, ElementRef, useRef } from 'react'
import {
  Select as BaseSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function Select({
  meta,
  items,
  placeholder,
  ...props
}: {
  meta: FieldMetadata<string | null>
  items: { name: string; value: string }[]
  placeholder?: string
} & ComponentProps<typeof BaseSelect>) {
  const selectRef = useRef<ElementRef<typeof SelectTrigger>>(null)
  const control = useControl(meta)

  return (
    <>
      <select
        id={meta.id}
        name={meta.name}
        defaultValue={meta.initialValue ?? ''}
        className="sr-only"
        ref={control.register}
        aria-hidden
        tabIndex={-1}
        onFocus={() => {
          selectRef.current?.focus()
        }}
      >
        <option value="" />
        {items.map((option) => (
          <option key={option.value} value={option.value} />
        ))}
      </select>

      <BaseSelect
        {...props}
        value={control.value ?? ''}
        onValueChange={control.change}
        onOpenChange={(open) => {
          if (!open) {
            control.blur()
          }
        }}
      >
        <SelectTrigger ref={selectRef}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </BaseSelect>
    </>
  )
}
