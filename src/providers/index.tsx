'use client'

import React from 'react'
import { AuthProvider } from './Auth'
import { SonnerProvider } from './Sonner'
import { ModalsProvider } from './Modals'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <AuthProvider>
      <SonnerProvider>
        {children}
        <ModalsProvider />
      </SonnerProvider>
    </AuthProvider>
  )
}
