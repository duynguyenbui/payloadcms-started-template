import { slugifyConfigs } from '@/configurations'
import { slugField } from 'payload'
import type { CollectionConfig } from 'payload'
import slugify from 'slugify'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
  },
  labels: {
    plural: ({ t }) =>
      // @ts-expect-error - translations are not typed in plugins yet
      t('plugin-ecommerce:categories'),
    singular: ({ t }) =>
      // @ts-expect-error - translations are not typed in plugins yet
      t('plugin-ecommerce:category'),
  },
  fields: [
    {
      name: 'title',
      label: ({ t }) =>
        // @ts-expect-error - translations are not typed in plugins yet
        t('plugin-ecommerce:categoryTitle'),
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'categories',
      label: ({ t }) =>
        // @ts-expect-error - translations are not typed in plugins yet
        t('plugin-ecommerce:categoryParent'),
      hasMany: false,
      required: false,
    },
    slugField({
      position: 'sidebar',
      slugify: ({ valueToSlugify }) => slugify(valueToSlugify, slugifyConfigs.vi),
    }),
  ],
}
