import { FieldMetadata, unstable_useControl as useControl } from '@conform-to/react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { useRef } from 'react'
import { Show } from '@/components/control-flow'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { TimePicker } from '@/components/ui/extensions/time-picker'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export function DateTimePicker({ meta }: { meta: FieldMetadata<Date | null> }) {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const control = useControl(meta)

  return (
    <>
      <input
        className="sr-only"
        aria-hidden
        tabIndex={-1}
        ref={control.register}
        name={meta.name}
        defaultValue={meta.initialValue ? new Date(meta.initialValue).toISOString() : ''}
        onFocus={() => {
          triggerRef.current?.focus()
        }}
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            ref={triggerRef}
            variant="outline"
            className={cn(
              'justify-start pl-3 text-left font-normal focus:ring-2 focus:ring-stone-950 focus:ring-offset-2',
              !control.value && 'text-muted-foreground',
            )}
          >
            <Show when={control.value} fallback={<span className="text-muted-foreground">Pick a date</span>}>
              {(date) => format(date, 'PPP HH:mm:ss')}
            </Show>
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={new Date(control.value ?? '')}
            onSelect={(value) => {
              control.change(value?.toISOString() ?? '')
            }}
            initialFocus
          />
          <div className="border-t border-border p-3">
            <TimePicker
              date={new Date(control.value ?? '')}
              setDate={(value) => {
                control.change(value?.toISOString() ?? '')
              }}
            />
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}
