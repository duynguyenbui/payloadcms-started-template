// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
// Uncomment the following line to enable S3 storage adapter
// import { s3Storage } from '@payloadcms/storage-s3'
import { importExportPlugin } from '@payloadcms/plugin-import-export'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Products } from './collections/Products'
import { VariantOptions } from './collections/Variants/VariantOptions'
import { VariantTypes } from './collections/Variants/VariantTypes'
import { Variants } from './collections/Variants'
import { Categories } from './collections/Categories'
import { Orders } from './collections/Orders'

import { applicationConfig } from './configurations'

import { translations } from './translations'
import { vi } from 'payload/i18n/vi'
import { en } from 'payload/i18n/en'
import { Header } from './collections/Globals/Header'
import { Footer } from './collections/Globals/Footer'

const collections = [
  Users,
  Media,
  Categories,
  VariantOptions,
  VariantTypes,
  Variants,
  Products,
  Orders,
]

const globals = [Header, Footer]

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  globals,
  collections,
  editor: lexicalEditor(),
  secret: applicationConfig.payloadSecret,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: applicationConfig.databaseUri,
    },
  }),
  sharp,
  plugins: [
    // Comment out the following block to disable S3 storage adapter
    // storage-adapter-placeholder
    // s3Storage({
    //   bucket: process.env.S3_BUCKET || '',
    //   collections: {
    //     media: true,
    //   },
    //   config: {
    //     endpoint: process.env.S3_ENDPOINT!,
    //     region: process.env.S3_REGION!,
    //     forcePathStyle: true,
    //     credentials: {
    //       accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    //       secretAccessKey: process.env.S3_SECRET || process.env.S3_SECRET_ACCESS_KEY || '',
    //     },
    //   },
    // }),
    importExportPlugin({
      collections: ['users'],
      // see below for a list of available options
    }),
  ],
  i18n: {
    fallbackLanguage: 'vi',
    supportedLanguages: { en, vi },
    translations,
  },
  localization: {
    locales: [
      {
        label: 'English',
        code: 'en',
      },
      {
        label: 'Vietnamese',
        code: 'vi',
      },
    ],
    defaultLocale: 'vi',
    fallback: true,
  },
})
