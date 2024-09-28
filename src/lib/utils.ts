import { SubmissionResult } from '@conform-to/dom'
import { parseWithZod } from '@conform-to/zod'
import { isCuid } from '@paralleldrive/cuid2'
import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function prefixedCuid2(prefix: string) {
  return z.string().refine((value) => value.startsWith(prefix) && isCuid(value.replace(`${prefix}_`, '')))
}

type ActionFn = (lastState: unknown, formData: FormData) => Promise<SubmissionResult>

export function defineAction<Schema extends z.ZodTypeAny>({
  schema,
  handler,
}: {
  schema: Schema
  handler: (args: {
    input: z.infer<Schema>
    resolve: () => SubmissionResult
    reject: (...formErrors: string[]) => SubmissionResult
  }) => Promise<SubmissionResult>
}): ActionFn {
  return async (_lastState, formData) => {
    const submission = parseWithZod(formData, { schema })
    if (submission.status !== 'success') {
      return submission.reply()
    }

    const input = submission.value
    const resolve = () => ({ status: 'success' as const })
    const reject = (...formErrors: string[]) => submission.reply({ formErrors })

    return handler({ input, resolve, reject })
  }
}

export function getValidator<Schema extends z.ZodTypeAny>(schema: Schema) {
  return ({ formData }: { formData: FormData }) => parseWithZod(formData, { schema })
}

export function getActionFilter() {
  return (name: string) => !name.startsWith('$ACTION')
}
