import { Server as NetServer, Socket } from 'net'
import { NextApiResponse } from 'next'
import { Socket as SocketIOServer } from 'socket.io'

/** Paginations */
export interface PaginationRequest {
  pageIndex?: number
  pageSize?: number
}

/** Standard Result */
export interface TResult<T> {
  success: boolean
  data?: T
  message?: string
}

/** Currency */
export type Currency = {
  code: string
  decimals: number
  label: string
  symbol: string
}

export type CurrenciesConfig = {
  defaultCurrency: string
  supportedCurrencies: Currency[]
}

/** Socket IO */
export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer
    }
  }
}
