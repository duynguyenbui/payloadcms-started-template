'use client'

import React from 'react'
import { Toaster } from 'sonner'

export const SonnerProvider = ({ children }: { children?: React.ReactNode }) => {
  return (
    <React.Fragment>
      {children}
      <Toaster position="top-left" richColors closeButton duration={2000} />
    </React.Fragment>
  )
}
