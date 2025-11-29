import type { NumberField } from 'payload'

type Props = {
  overrides?: Partial<NumberField>
}

export const inventoryField: (props?: Props) => NumberField = (props) => {
  const { overrides } = props || {}

  // @ts-expect-error - issue with payload types
  const field: NumberField = {
    name: 'inventory',
    type: 'number',
    defaultValue: 0,
    min: 0,
    label: ({ t }) =>
      // @ts-expect-error - translations are not typed in plugins yet
      t('plugin-ecommerce:inventory'),
    ...(overrides || {}),
  }

  return field
}
