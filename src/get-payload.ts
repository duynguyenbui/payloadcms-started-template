import { getPayload as getPayloadByConfig, Payload } from 'payload'
import config from './payload.config'

let cached = (global as any).payload

if (!cached) {
  cached = (global as any).payload = {
    client: null,
  }
}

export const getPayload = async (): Promise<Payload> => {
  if (cached.client) {
    return cached.client
  }

  if (!cached.promise) {
    cached.promise = await getPayloadByConfig({ config })
  }

  try {
    cached.client = await cached.promise
  } catch (e: unknown) {
    cached.promise = null
    console.error('Failed to initialize Payload client', e)
  }

  return cached.client
}
