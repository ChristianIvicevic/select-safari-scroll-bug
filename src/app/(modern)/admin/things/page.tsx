import { Form } from '@/app/(modern)/admin/things/components.client'
import { thing } from '@/app/(modern)/admin/things/data'

export default function ThingsPage() {
  return <Form thing={thing} />
}
