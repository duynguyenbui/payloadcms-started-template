import { NextApiResponseServerIO } from '@/types'
import { NextApiRequest } from 'next'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
  res?.socket?.server?.io?.emit('message', 'Hello, World!')

  return res.status(200).json({ success: true, message: 'Message sent successfully' })
}
