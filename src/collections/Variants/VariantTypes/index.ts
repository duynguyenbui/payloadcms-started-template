import { Field, CollectionConfig } from 'payload'

const fields: Field[] = [
  {
    name: 'label',
    label: ({ t }) =>
      // @ts-expect-error - translations are not typed in plugins yet
      t('plugin-ecommerce:variantTypeLabel'),
    type: 'text',
    required: true,
    localized: true,
  },
  {
    name: 'value',
    label: ({ t }) =>
      // @ts-expect-error - translations are not typed in plugins yet
      t('plugin-ecommerce:variantTypeValue'),
    type: 'text',
    required: true,
  },
  {
    name: 'options',
    label: ({ t }) =>
      // @ts-expect-error - translations are not typed in plugins yet
      t('plugin-ecommerce:variantOptions'),
    type: 'join',
    collection: 'variantOptions',
    maxDepth: 2,
    on: 'variantType',
    orderable: true,
  },
]

export const VariantTypes: CollectionConfig = {
  slug: 'variantTypes',
  access: {},
  admin: {
    group: false,
    useAsTitle: 'label',
  },
  fields,
  labels: {
    plural: ({ t }) =>
      // @ts-expect-error - translations are not typed in plugins yet
      t('plugin-ecommerce:variantTypes'),
    singular: ({ t }) =>
      // @ts-expect-error - translations are not typed in plugins yet
      t('plugin-ecommerce:variantType'),
  },
  trash: true,
}
