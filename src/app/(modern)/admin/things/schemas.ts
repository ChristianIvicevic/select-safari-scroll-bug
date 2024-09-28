import { isSlug } from 'validator'
import { z } from 'zod'
import { prefixedCuid2 } from '@/lib/utils'

export const editThingSchema = z
  .object({
    id: prefixedCuid2('thing'),
    name: z.string().min(2).max(64),
    slug: z.string().min(2).max(32).refine(isSlug),
    size: z.number().min(9).max(99).int(),
    description: z.string().max(128).optional(),
    startsAt: z.coerce.date(),
    endsAt: z.coerce.date().optional(),
    density: z.enum(['dense', 'sparse']).optional(),
    mean: z.number().optional(),
    variance: z.number().optional(),
  })
