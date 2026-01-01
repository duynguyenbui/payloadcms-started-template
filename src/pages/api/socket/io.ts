import { Server as NetServer } from 'http'
import { NextApiRequest } from 'next'
import { Server as SocketIO } from 'socket.io'

import { NextApiResponseServerIO } from '@/types'

export const config = {
  api: {
    bodyParser: false,
  },
}

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    const path = '/api/socket/io'
    const httpServer: NetServer = res.socket.server as any
    const io = new SocketIO(httpServer, {
      path: path,
      addTrailingSlash: false,
    })
    res.socket.server.io = io as any
  }

  res.end()
}

export default ioHandler