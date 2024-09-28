'use server'

import { editThingSchema } from '@/app/(modern)/admin/things/schemas'
import { defineAction } from '@/lib/utils'

export const editThing = defineAction({
  schema: editThingSchema,
  handler: async ({ reject }) => {
    return Promise.resolve(reject('Something is not quite right, duh.'))
  },
})
