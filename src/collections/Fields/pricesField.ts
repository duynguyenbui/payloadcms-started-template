import { GroupField } from 'payload'
import { amountField } from './amountField'
import { CurrenciesConfig } from '@/types'

type Props = {
  conditionalPath?: string
  currenciesConfig: CurrenciesConfig
}

/**
 * Dynamic price fields for each supported currency
 */
export const pricesField = ({ currenciesConfig }: Props): GroupField[] => {
  const currencies = currenciesConfig.supportedCurrencies

  return currencies.map((currency) => {
    const name = `priceIn${currency.code}`
    const enabledKey = `${name}Enabled`

    return {
      type: 'group',
      label: ({ t }) =>
        // @ts-expect-error - translations are not typed in plugins yet
        t('plugin-ecommerce:priceIn', { currency: currency.code }),
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: enabledKey,
              type: 'checkbox',
              label: ({ t }) =>
                // @ts-expect-error - translations are not typed in plugins yet
                t('plugin-ecommerce:enablePriceIn', { currency: currency.code }),
              admin: {
                style: { alignSelf: 'baseline', flex: '0 0 auto' },
              },
            },
            amountField({
              currenciesConfig,
              currency,
              overrides: {
                name,
                label: ({ t }) =>
                  // @ts-expect-error - translations are not typed in plugins yet
                  t('plugin-ecommerce:priceIn', { currency: currency.code }),
                admin: {
                  condition: (_, siblingData) => Boolean(siblingData?.[enabledKey]),
                },
              },
            }),
          ],
        },
      ],
    }
  })
}
