import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: ({ t }) =>
    // @ts-expect-error
    t('plugin-ecommerce:footer'),
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      label: ({ t }) =>
        // @ts-expect-error
        t('plugin-ecommerce:navItems'),
      type: 'array',
      fields: [
        {
          name: 'name',
          label: ({ t }) =>
            // @ts-expect-error
            t('plugin-ecommerce:navItemName'),
          type: 'text',
          required: true,
          unique: true,
        },
        {
          name: 'path',
          label: ({ t }) =>
            // @ts-expect-error
            t('plugin-ecommerce:navItemPath'),
          type: 'text',
          required: true,
        },
        {
          name: 'newTab',
          type: 'checkbox',
          admin: {
            style: {
              alignSelf: 'flex-end',
            },
            width: '50%',
          },
          label: ({ t }) =>
            // @ts-expect-error
            t('plugin-ecommerce:navItemOpenInNewTab'),
          defaultValue: false,
        },
      ],
      maxRows: 6,
    },
  ],
}
