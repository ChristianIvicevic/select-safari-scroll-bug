'use client'

import { getFormProps, useForm } from '@conform-to/react'
import { AlertCircle, ChevronLeft, CircleDotDashed } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { toast } from 'sonner'
import { editThing } from '@/app/(modern)/admin/things/actions'
import { Thing } from '@/app/(modern)/admin/things/data'
import { editThingSchema } from '@/app/(modern)/admin/things/schemas'
import { DateTimePicker } from '@/components/conform/date-time-picker'
import { FormField, FormLabel, FormMessage } from '@/components/conform/form'
import { Hidden, Input } from '@/components/conform/input'
import { Select } from '@/components/conform/select'
import { Textarea } from '@/components/conform/textarea'
import { Show } from '@/components/control-flow'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Submit } from '@/components/ui/extensions/form'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { getActionFilter, getValidator } from '@/lib/utils'

export function Form({ thing }: { thing: Thing }) {
  const { isDraft: _, ...defaultValue } = thing

  const router = useRouter()
  const [lastResult, formAction] = useFormState(editThing, undefined)
  const [form, fields] = useForm({
    lastResult,
    defaultValue,
    onValidate: getValidator(editThingSchema),
    shouldDirtyConsider: getActionFilter(),
  })

  useEffect(() => {
    if (lastResult?.status === 'success') {
      toast.success('Thing updated successfully.')
      router.refresh()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Track only action state
  }, [lastResult])

  return (
    <form action={formAction} {...getFormProps(form)}>
      <Hidden meta={fields.id} />
      <div className="mx-auto grid flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="h-7 w-7">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            {thing.name}
          </h1>
          <Show when={thing.isDraft}>
            <Badge variant="outline" className="ml-auto sm:ml-0">
              Draft
            </Badge>
          </Show>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button
              variant="outline"
              size="sm"
              disabled={!form.dirty}
              onClick={() => {
                form.reset()
              }}
            >
              Discard
            </Button>
            <Show when={thing.isDraft}>
              <Submit variant="outline" size="sm">
                Save and Publish Thing
              </Submit>
            </Show>
            <Submit size="sm">Save Thing</Submit>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Show when={form.errors}>
              {(errors) => (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    {errors.map((error) => (
                      <p key={error}>{error}</p>
                    ))}
                  </AlertDescription>
                </Alert>
              )}
            </Show>
            <Card>
              <CardHeader>
                <CardTitle>Thing Details</CardTitle>
                <CardDescription>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac molestie orci, vitae
                  euismod ante. Quisque ac cursus nisi. Nam est lorem, facilisis eu turpis eget, rhoncus
                  dapibus tellus. Donec vitae dolor tempor, ullamcorper purus eget, commodo felis. Aliquam
                  tempor purus ac lorem consequat pretium id eget ante. Quisque laoreet.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-6">
                  <FormField>
                    <FormLabel meta={fields.name}>Name</FormLabel>
                    <Input meta={fields.name} type="text" />
                    <FormMessage>{fields.name.errors}</FormMessage>
                  </FormField>
                  <FormField>
                    <FormLabel meta={fields.slug}>Slug</FormLabel>
                    <Input meta={fields.slug} type="text" />
                    <FormMessage>{fields.slug.errors}</FormMessage>
                  </FormField>
                  <FormField>
                    <FormLabel meta={fields.size}>Size</FormLabel>
                    <Input meta={fields.size} type="number" />
                    <FormMessage>{fields.size.errors}</FormMessage>
                  </FormField>
                  <FormField className="col-span-3">
                    <FormLabel meta={fields.description}>Description</FormLabel>
                    <Textarea meta={fields.description} className="resize-none" />
                    <FormMessage>{fields.description.errors}</FormMessage>
                  </FormField>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Schedule</CardTitle>
                <CardDescription>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac molestie orci, vitae
                  euismod ante. Quisque ac cursus nisi. Nam est lorem, facilisis eu turpis eget, rhoncus
                  dapibus tellus. Donec vitae dolor tempor, ullamcorper purus eget, commodo felis. Aliquam
                  tempor purus ac lorem consequat pretium id eget ante. Quisque laoreet.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <FormField>
                    <FormLabel meta={fields.startsAt}>Starts</FormLabel>
                    <DateTimePicker meta={fields.startsAt} />
                    <FormMessage>{fields.startsAt.errors}</FormMessage>
                  </FormField>
                  <FormField>
                    <FormLabel meta={fields.endsAt} className="flex flex-row justify-between">
                      Ends <span className="text-muted-foreground">(optional)</span>
                    </FormLabel>
                    <DateTimePicker meta={fields.endsAt} />
                    <FormMessage>{fields.endsAt.errors}</FormMessage>
                  </FormField>
                </div>
              </CardContent>
            </Card>
            <Show when={thing.isDraft}>
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac molestie orci, vitae
                    euismod ante. Quisque ac cursus nisi. Nam est lorem, facilisis eu turpis eget, rhoncus
                    dapibus tellus. Donec vitae dolor tempor, ullamcorper purus eget, commodo felis. Aliquam
                    tempor purus ac lorem consequat pretium id eget ante. Quisque laoreet.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-6">
                    <FormField>
                      <FormLabel meta={fields.density}>Density</FormLabel>
                      <Select
                        meta={fields.density}
                        items={[
                          { name: 'Dense', value: 'dense' },
                          { name: 'Sparse', value: 'sparse' },
                        ]}
                      />
                      <FormMessage>{fields.density.errors}</FormMessage>
                    </FormField>
                    <FormField>
                      <FormLabel meta={fields.mean}>&mu;-value</FormLabel>
                      <Input meta={fields.mean} type="number" />
                      <FormMessage>{fields.mean.errors}</FormMessage>
                    </FormField>
                    <FormField>
                      <FormLabel meta={fields.variance}>
                        &sigma;<sup>2</sup>-value
                      </FormLabel>
                      <Input meta={fields.variance} type="number" />
                      <FormMessage>{fields.variance.errors}</FormMessage>
                    </FormField>
                  </div>
                </CardContent>
              </Card>
            </Show>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Show when={thing.isDraft}>
              <Alert>
                <CircleDotDashed className="h-4 w-4" />
                <AlertTitle>This thing is still a draft</AlertTitle>
                <AlertDescription className="grid gap-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac molestie orci, vitae
                  euismod ante.
                </AlertDescription>
              </Alert>
            </Show>
            <Card>
              <CardHeader>
                <CardTitle>Global Controls</CardTitle>
                <CardDescription>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac molestie orci, vitae
                  euismod ante. Quisque ac cursus nisi. Nam est lorem, facilisis eu turpis eget, rhoncus
                  dapibus tellus.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="flex flex-row items-center justify-between gap-4 rounded-lg border p-4">
                    <Label className="space-y-2 leading-normal">
                      <p>Enable Thing</p>
                      <p className="font-normal text-muted-foreground">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac molestie orci,
                        vitae euismod ante. Quisque ac cursus nisi. Nam est lorem, facilisis eu turpis eget,
                        rhoncus dapibus tellus.
                      </p>
                    </Label>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex flex-row items-center justify-between gap-4 rounded-lg border p-4">
                    <Label className="space-y-2 leading-normal">
                      <p>Enable Thing</p>
                      <p className="font-normal text-muted-foreground">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac molestie orci,
                        vitae euismod ante. Quisque ac cursus nisi. Nam est lorem, facilisis eu turpis eget,
                        rhoncus dapibus tellus.
                      </p>
                    </Label>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex flex-row items-center justify-between gap-4 rounded-lg border p-4">
                    <Label className="space-y-2 leading-normal">
                      <p>Enable Thing</p>
                      <p className="font-normal text-muted-foreground">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac molestie orci,
                        vitae euismod ante. Quisque ac cursus nisi. Nam est lorem, facilisis eu turpis eget,
                        rhoncus dapibus tellus.
                      </p>
                    </Label>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </form>
  )
}
