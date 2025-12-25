import type { CollectionConfig, Field } from 'payload'

const fields: Field[] = [
  {
    name: 'variantType',
    label: ({ t }) =>
      // @ts-expect-error - translations are not typed in plugins yet
      t('plugin-ecommerce:variantType'),
    type: 'relationship',
    admin: {
      readOnly: true,
    },
    relationTo: 'variantTypes',
    required: true,
  },
  {
    name: 'label',
    label: ({ t }) =>
      // @ts-expect-error - translations are not typed in plugins yet
      t('plugin-ecommerce:variantOptionLabel'),
    type: 'text',
    required: true,
    localized: true,
  },
  {
    name: 'value',
    label: ({ t }) =>
      // @ts-expect-error - translations are not typed in plugins yet
      t('plugin-ecommerce:variantOptionValue'),
    type: 'text',
    required: true,
  },
]

export const VariantOptions: CollectionConfig = {
  slug: 'variantOptions',
  admin: {
    group: false,
    useAsTitle: 'label',
  },
  fields,
  labels: {
    plural: ({ t }) =>
      // @ts-expect-error - translations are not typed in plugins yet
      t('plugin-ecommerce:variantOptions'),
    singular: ({ t }) =>
      // @ts-expect-error - translations are not typed in plugins yet
      t('plugin-ecommerce:variantOption'),
  },
  trash: true,
}
