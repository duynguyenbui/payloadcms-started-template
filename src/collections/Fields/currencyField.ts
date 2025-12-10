import type { SelectField } from 'payload'
import type { CurrenciesConfig } from '@/types'

type Props = {
  currenciesConfig: CurrenciesConfig
  overrides?: Partial<SelectField>
}

export const currencyField = ({ currenciesConfig, overrides }: Props): SelectField => {
  const options = currenciesConfig.supportedCurrencies.map((currency) => ({
    label: currency.label ? `${currency.label} (${currency.code})` : currency.code,
    value: currency.code,
  }))

  const defaultValue =
    currenciesConfig.defaultCurrency ??
    (currenciesConfig.supportedCurrencies.length === 1
      ? currenciesConfig.supportedCurrencies[0]?.code
      : undefined)
  // @ts-expect-error - issue with payload types
  const field: SelectField = {
    name: 'currency',
    label: ({ t }) =>
      // @ts-expect-error - translations are not typed in plugins yet
      t('plugin-ecommerce:currency'),
    type: 'select',
    options,
    ...(defaultValue && { defaultValue }),
    ...overrides,
    admin: {
      readOnly: currenciesConfig.supportedCurrencies.length === 1,
      ...overrides?.admin,
    },
  }

  return field
}
