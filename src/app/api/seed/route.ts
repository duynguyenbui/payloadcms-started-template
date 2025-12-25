import { createLocalReq, getPayload } from 'payload'
import config from '@payload-config'
import { seed } from '@/lib/seed'
import { headers } from 'next/headers'

export const maxDuration = 60 // This function can run for a maximum of 60 seconds

export async function GET(): Promise<Response> {
  const payload = await getPayload({ config })
  const requestHeaders = await headers()

  // Authenticate by passing request headers
  const { user } = await payload.auth({ headers: requestHeaders })

  let loggedInUser = user

  if (!loggedInUser) {
    const adminUser = await payload.find({
      collection: 'users',
      where: { email: { equals: 'admin@payloadcms.com' } },
      limit: 1,
    })

    if (adminUser.docs.length === 0) {
      await payload.create({
        collection: 'users',
        data: { email: 'admin@payloadcms.com', password: 'admin', name: 'Admin User' },
      })
    }

    const { user: authenticatedAdmin } = await payload.login({
      collection: 'users',
      data: { email: 'admin@payloadcms.com', password: 'admin' },
    })

    loggedInUser = authenticatedAdmin
  }

  if (!loggedInUser) {
    return new Response('Could not authenticate.', { status: 401 })
  }

  try {
    // Create a Payload request object to pass to the Local API for transactions
    // At this point you should pass in a user, locale, and any other context you need for the Local API
    const payloadReq = await createLocalReq({ user: loggedInUser }, payload)

    await seed({ payload, req: payloadReq })

    return Response.json({ success: true })
  } catch (e) {
    payload.logger.error({ err: e, message: 'Error seeding data' })
    return new Response('Error seeding data.', { status: 500 })
  }
}
