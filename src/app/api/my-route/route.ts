import { getPayload } from 'payload'
import config from '@payload-config'

export const maxDuration = 60 // This function can run for a maximum of 60 seconds

export async function GET(): Promise<Response> {
  const payload = await getPayload({ config })

  return Response.json({ received: !!payload })
}
