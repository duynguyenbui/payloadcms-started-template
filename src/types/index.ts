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
