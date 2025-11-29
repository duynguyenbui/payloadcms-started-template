import type { CollectionConfig } from 'payload'

export const Logs: CollectionConfig = {
  slug: 'logs',
  admin: {
    group: false,
  },
  labels: {
    singular: ({ t }) =>
      // @ts-expect-error - translation function
      t('system:logs'),
    plural: ({ t }) =>
      // @ts-expect-error - translation function
      t('system:logs'),
  },
  fields: [
    {
      name: 'data',
      type: 'json',
      required: true,
      label: ({ t }) =>
        // @ts-expect-error - translation function
        t('system:data'),
    },
  ],
  timestamps: true,
}
