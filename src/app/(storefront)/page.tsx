'use client'

import { useEffect } from 'react'
import { useSocket } from '@/providers/Socket'

export default function Page() {
  const { socket, isConnected } = useSocket()

  useEffect(() => {
    if (isConnected) {
      socket?.on('message', (message: any) => {
        console.log(message)
      })
    }
    return () => {
      socket?.off('message')
    }
  }, [isConnected, socket])

  return (
    <div className="text-3xl items-center text-center flex flex-col justify-center w-full h-full min-h-screen">
      {isConnected ? 'Connected' : 'Not connected'}
    </div>
  )
}
