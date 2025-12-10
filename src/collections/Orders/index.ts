import type { CollectionConfig } from 'payload'

import { currenciesConfig } from '@/constants'
import { amountField } from '../Fields/amountField'
import { currencyField } from '../Fields/currencyField'

export const Orders: CollectionConfig = {
  slug: 'orders',
  labels: {
    singular: ({ t }) =>
      // @ts-expect-error - translations are not typed in plugins yet
      t('plugin-ecommerce:order'),
    plural: ({ t }) =>
      // @ts-expect-error - translations are not typed in plugins yet
      t('plugin-ecommerce:orders'),
  },
  timestamps: true,
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: ({ t }) =>
            // @ts-expect-error - translations are not typed in plugins yet
            t('plugin-ecommerce:orderDetails'),
          name: 'orderDetails',
          fields: [
            {
              name: 'items',
              label: ({ t }) =>
                // @ts-expect-error - translations not typed for plugin e-commerce yet
                t('plugin-ecommerce:orderItems'),
              admin: { initCollapsed: true },
              type: 'array',
              fields: [
                {
                  name: 'product',
                  type: 'relationship',
                  hasMany: false,
                  label: ({ t }) =>
                    // @ts-expect-error - translations not typed for plugin e-commerce yet
                    t('plugin-ecommerce:product'),
                  relationTo: 'products',
                  required: true,
                },
                {
                  name: 'variant',
                  type: 'relationship',
                  hasMany: false,
                  label: ({ t }) =>
                    // @ts-expect-error - translations not typed for plugin e-commerce yet
                    t('plugin-ecommerce:variant'),
                  relationTo: 'variants',
                  required: false,
                },
                {
                  name: 'quantity',
                  type: 'number',
                  defaultValue: 1,
                  min: 1,
                  required: true,
                  label: ({ t }) =>
                    // @ts-expect-error - translations not typed for plugin e-commerce yet
                    t('plugin-ecommerce:orderQuantity'),
                },
                ...[currencyField({ currenciesConfig })],
                ...[amountField({ currenciesConfig, overrides: { required: true } })],
              ],
            },
          ],
        },
        {
          name: 'customer',
          label: ({ t }) =>
            // @ts-expect-error - translations are not typed in plugins yet
            t('plugin-ecommerce:customer'),
          fields: [
            {
              name: 'customerName',
              type: 'text',
              required: true,
              label: ({ t }) =>
                // @ts-expect-error - translations are not typed in plugins yet
                t('plugin-ecommerce:customerName'),
            },
            {
              name: 'customerPhone',
              type: 'text',
              required: true,
              label: ({ t }) =>
                // @ts-expect-error - translations are not typed in plugins yet
                t('plugin-ecommerce:customerPhone'),
            },
            {
              name: 'customerEmail',
              type: 'text',
              label: ({ t }) =>
                // @ts-expect-error - translations are not typed in plugins yet
                t('plugin-ecommerce:customerEmail'),
            },
          ],
        },
        {
          label: ({ t }) =>
            // @ts-expect-error - translations are not typed in plugins yet
            t('plugin-ecommerce:shipping'),
          name: 'shipping',
          fields: [
            {
              name: 'addressDetail',
              type: 'text',
              required: true,
              label: ({ t }) =>
                // @ts-expect-error - translations are not typed in plugins yet
                t('plugin-ecommerce:addressDetail'),
            },
            {
              name: 'addressWard',
              type: 'text',
              required: true,
              label: ({ t }) =>
                // @ts-expect-error - translations are not typed in plugins yet
                t('plugin-ecommerce:addressWard'),
            },
            {
              name: 'addressDistrict',
              type: 'text',
              required: true,
              label: ({ t }) =>
                // @ts-expect-error - translations are not typed in plugins yet
                t('plugin-ecommerce:addressDistrict'),
            },
            {
              name: 'addressCity',
              type: 'text',
              required: true,
              label: ({ t }) =>
                // @ts-expect-error - translations are not typed in plugins yet
                t('plugin-ecommerce:addressCity'),
            },
          ],
        },
        {
          label: ({ t }) =>
            // @ts-expect-error - translations are not typed in plugins yet
            t('plugin-ecommerce:payment'),
          name: 'payment',
          fields: [
            {
              name: 'paymentMethod',
              type: 'select',
              required: true,
              label: ({ t }) =>
                // @ts-expect-error - translations are not typed in plugins yet
                t('plugin-ecommerce:paymentMethod'),
              options: [
                {
                  label: ({ t }) =>
                    // @ts-expect-error - translations are not typed in plugins yet
                    t('plugin-ecommerce:paymentMethodCashOnDelivery'),
                  value: 'cash_on_delivery',
                },
                {
                  label: ({ t }) =>
                    // @ts-expect-error - translations are not typed in plugins yet
                    t('plugin-ecommerce:paymentMethodBankTransfer'),
                  value: 'bank_transfer',
                },
              ],
            },
            {
              name: 'paymentStatus',
              type: 'select',
              required: true,
              defaultValue: 'pending',
              label: ({ t }) =>
                // @ts-expect-error - translations are not typed in plugins yet
                t('plugin-ecommerce:paymentStatus'),
              options: [
                {
                  label: ({ t }) =>
                    // @ts-expect-error - translations are not typed in plugins yet
                    t('plugin-ecommerce:paymentStatusPending'),
                  value: 'pending',
                },
                {
                  label: ({ t }) =>
                    // @ts-expect-error - translations are not typed in plugins yet
                    t('plugin-ecommerce:paymentStatusPaid'),
                  value: 'paid',
                },
                {
                  label: ({ t }) =>
                    // @ts-expect-error - translations are not typed in plugins yet
                    t('plugin-ecommerce:paymentStatusFailed'),
                  value: 'failed',
                },
                {
                  label: ({ t }) =>
                    // @ts-expect-error - translations are not typed in plugins yet
                    t('plugin-ecommerce:paymentStatusPartial'),
                  value: 'partial',
                },
              ],
            },
            {
              name: 'deposit',
              type: 'number',
              defaultValue: 0,
              min: 0,
              label: ({ t }) =>
                // @ts-expect-error - translations are not typed in plugins yet
                t('plugin-ecommerce:deposit'),
            },
          ],
        },
      ],
    },
    {
      name: 'orderStatus',
      type: 'select',
      admin: {
        position: 'sidebar',
      },
      defaultValue: 'processing',
      interfaceName: 'OrderStatus',
      label: ({ t }) =>
        // @ts-expect-error - translations are not typed in plugins yet
        t('plugin-ecommerce:orderStatus'),
      options: [
        {
          // @ts-expect-error - translations are not typed in plugins yet
          label: ({ t }) => t('plugin-ecommerce:orderStatusProcessing'),
          value: 'processing',
        },
        {
          // @ts-expect-error - translations are not typed in plugins yet
          label: ({ t }) => t('plugin-ecommerce:orderStatusCompleted'),
          value: 'completed',
        },
        {
          // @ts-expect-error - translations are not typed in plugins yet
          label: ({ t }) => t('plugin-ecommerce:orderStatusCancelled'),
          value: 'cancelled',
        },
        {
          // @ts-expect-error - translations are not typed in plugins yet
          label: ({ t }) => t('plugin-ecommerce:orderStatusRefunded'),
          value: 'refunded',
        },
      ],
    },
    {
      type: 'row',
      admin: { position: 'sidebar' },
      fields: [
        {
          name: 'paidAmount',
          type: 'number',
          admin: {
            position: 'sidebar',
          },
          defaultValue: 0,
          min: 0,
          label: ({ t }) =>
            // @ts-expect-error - translations are not typed in plugins yet
            t('plugin-ecommerce:paidAmount'),
        },
        {
          name: 'deliveryFee',
          type: 'number',
          admin: {
            position: 'sidebar',
          },
          defaultValue: 0,
          min: 0,
          label: ({ t }) =>
            // @ts-expect-error - translations are not typed in plugins yet
            t('plugin-ecommerce:deliveryFee'),
        },
      ],
    },
    {
      type: 'row',
      admin: { position: 'sidebar' },
      fields: [
        amountField({
          currenciesConfig,
          overrides: {
            required: true,
          },
        }),
        currencyField({ currenciesConfig }),
      ],
    },
  ],
}
