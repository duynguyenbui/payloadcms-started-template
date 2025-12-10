import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  label: ({ t }) =>
    // @ts-expect-error
    t('plugin-ecommerce:header'),
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
      ],
      maxRows: 6,
    },
  ],
}
