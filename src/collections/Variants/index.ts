import { Field, CollectionConfig } from 'payload'

import { currenciesConfig } from '@/constants'

import { inventoryField } from '@/collections/Fields/inventoryField'
import { pricesField } from '@/collections/Fields/pricesField'

const fields: Field[] = [
  {
    name: 'title',
    label: ({ t }) =>
      // @ts-expect-error - translations are not typed in plugins yet
      t('plugin-ecommerce:variantTitle'),
    type: 'text',
    localized: true,
  },
  {
    name: 'product',
    label: ({ t }) =>
      // @ts-expect-error - translations are not typed in plugins yet
      t('plugin-ecommerce:product'),
    type: 'relationship',
    admin: {
      position: 'sidebar',
      readOnly: true,
    },
    relationTo: 'products',
    required: true,
  },
  {
    // This might need to be a custom component, to show a selector for each variant that is
    // enabled on the parent product
    // - separate select inputs, each showing only a specific variant (w/ options)
    // - it will save data to the DB as IDs in this relationship field
    // and needs a validate function as well which enforces that the options are fully specified, and accurate
    name: 'options',
    type: 'relationship',
    hasMany: true,
    label: ({ t }) =>
      // @ts-expect-error - translations are not typed in plugins yet
      t('plugin-ecommerce:variantOptions'),
    relationTo: 'variantOptions',
    required: true,
  },
  inventoryField({ overrides: { required: true, defaultValue: 0 } }),
  ...pricesField({ currenciesConfig }),
]

export const Variants: CollectionConfig = {
  slug: 'variants',
  labels: {
    plural: ({ t }) =>
      // @ts-expect-error - translations are not typed in plugins yet
      t('plugin-ecommerce:variants'),
    singular: ({ t }) =>
      // @ts-expect-error - translations are not typed in plugins yet
      t('plugin-ecommerce:variant'),
  },
  access: {},
  admin: {
    group: false,
    useAsTitle: 'title',
  },
  fields,
  trash: true,
}
