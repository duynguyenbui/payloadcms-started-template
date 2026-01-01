'use client'

import React from 'react'
import { AuthProvider } from './Auth'
import { SonnerProvider } from './Sonner'
import { ModalsProvider } from './Modals'
import { SocketProvider } from './Socket'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <AuthProvider>
      <SocketProvider>
        <SonnerProvider>
          {children}
          <ModalsProvider />
        </SonnerProvider>
      </SocketProvider>
    </AuthProvider>
  )
}
