import { DefaultDocumentIDType, slugField, Where, type CollectionConfig, type Field } from 'payload'

import { currenciesConfig } from '@/constants'

import { inventoryField } from '@/collections/Fields/inventoryField'
import { pricesField } from '@/collections/Fields/pricesField'
import { slugifyConfigs } from '@/configurations'
import slugify from 'slugify'

const fields: Field[] = [
  {
    name: 'title',
    label: ({ t }) =>
      // @ts-expect-error - translations are not typed in plugins yet
      t('plugin-ecommerce:productTitle'),
    type: 'text',
    required: true,
    localized: true,
  },
  {
    name: 'description',
    type: 'textarea',
    label: ({ t }) =>
      // @ts-expect-error - translations are not typed in plugins yet
      t('plugin-ecommerce:productDescription'),
    localized: true,
  },
  {
    name: 'enableVariants',
    type: 'checkbox',
    label: ({ t }) =>
      // @ts-expect-error - translations are not typed in plugins yet
      t('plugin-ecommerce:enableVariants'),
    localized: true,
  },
  inventoryField({
    overrides: {
      admin: {
        condition: ({ enableVariants }) => !enableVariants,
      },
      required: true,
      defaultValue: 0,
    },
  }),
  {
    name: 'gallery',
    label: ({ t }) =>
      // @ts-expect-error - translations are not typed in plugins yet
      t('plugin-ecommerce:productGallery'),
    type: 'array',
    minRows: 1,
    fields: [
      {
        name: 'image',
        label: ({ t }) =>
          // @ts-expect-error - translations are not typed in plugins yet
          t('plugin-ecommerce:productImage'),
        type: 'upload',
        relationTo: 'media',
        required: true,
      },
      {
        name: 'variantOption',
        required: false,
        hasMany: true,
        label: ({ t }) =>
          // @ts-expect-error - translations are not typed in plugins yet
          t('plugin-ecommerce:variantOptions'),
        type: 'relationship',
        relationTo: 'variantOptions',
        admin: {
          condition: (data) => {
            return data?.enableVariants === true && data?.variantTypes?.length > 0
          },
        },
        filterOptions: ({ data }) => {
          if (data?.enableVariants && data?.variantTypes?.length) {
            const variantTypeIDs = data.variantTypes.map((item: any) => {
              if (typeof item === 'object' && item?.id) {
                return item.id
              }
              return item
            }) as DefaultDocumentIDType[]

            if (variantTypeIDs.length === 0)
              return {
                variantType: {
                  in: [],
                },
              }

            const query: Where = {
              variantType: {
                in: variantTypeIDs,
              },
            }

            return query
          }

          return {
            variantType: {
              in: [],
            },
          }
        },
      },
    ],
  },
  {
    name: 'variantTypes',
    type: 'relationship',
    admin: {
      condition: ({ enableVariants }) => Boolean(enableVariants),
    },
    hasMany: true,
    label: ({ t }) =>
      // @ts-expect-error - translations are not typed in plugins yet
      t('plugin-ecommerce:variantTypes'),
    relationTo: 'variantTypes',
  },
  {
    name: 'variants',
    type: 'join',
    admin: {
      condition: ({ enableVariants, variantTypes }) => {
        const enabledVariants = Boolean(enableVariants)
        const hasManyVariantTypes = Array.isArray(variantTypes) && variantTypes.length > 0

        return enabledVariants && hasManyVariantTypes
      },
      defaultColumns: ['title', 'options', 'inventory', 'prices', '_status'],
      disableListColumn: true,
    },
    collection: 'variants',
    label: ({ t }) =>
      // @ts-expect-error - translations are not typed in plugins yet
      t('plugin-ecommerce:variants'),
    maxDepth: 2,
    on: 'product',
  },
  ...[
    ...pricesField({
      currenciesConfig,
    }),
  ],
  {
    name: 'relatedProducts',
    label: ({ t }) =>
      // @ts-expect-error - translations are not typed in plugins yet
      t('plugin-ecommerce:relatedProducts'),
    type: 'relationship',
    filterOptions: ({ id }) => {
      if (id) {
        return {
          id: {
            not_in: [id],
          },
        }
      }

      // ID comes back as undefined during seeding so we need to handle that case
      return {
        id: {
          exists: true,
        },
      }
    },
    hasMany: true,
    relationTo: 'products',
  },
  {
    name: 'categories',
    type: 'relationship',
    admin: {
      position: 'sidebar',
      sortOptions: 'title',
    },
    label: ({ t }) =>
      // @ts-expect-error - translations are not typed in plugins yet
      t('plugin-ecommerce:categories'),
    hasMany: true,
    relationTo: 'categories',
  },
  slugField({
    slugify: ({ valueToSlugify }) => slugify(valueToSlugify, slugifyConfigs.vi),
  }),
]

export const Products: CollectionConfig = {
  slug: 'products',
  access: {},
  admin: {
    useAsTitle: 'title',
  },
  fields,
  labels: {
    plural: ({ t }) =>
      // @ts-expect-error - translations are not typed in plugins yet
      t('plugin-ecommerce:products'),
    singular: ({ t }) =>
      // @ts-expect-error - translations are not typed in plugins yet
      t('plugin-ecommerce:product'),
  },
  trash: true,
}
