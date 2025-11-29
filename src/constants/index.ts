import { CurrenciesConfig, Currency } from '@/types'

/** Currencies */
export const VND: Currency = {
  code: 'VND',
  decimals: 0,
  label: 'Viet Nam Dong',
  symbol: '₫',
}

export const USD: Currency = {
  code: 'USD',
  decimals: 2,
  label: 'US Dollar',
  symbol: '$',
}

export const currenciesConfig: CurrenciesConfig = {
  supportedCurrencies: [VND, USD],
  defaultCurrency: 'VND',
}
