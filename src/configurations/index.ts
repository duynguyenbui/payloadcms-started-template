/**
 * Localization Configurations
 * @description Configurations for slugify
 */
export const slugifyConfigs = {
  vi: {
    lowerCase: true,
    strict: true,
    locale: 'vi',
    trim: true,
  },
  en: {
    lowerCase: true,
    strict: true,
    locale: 'en',
    trim: true,
  },
}

/**
 * Application Configurations
 * @description Configurations for application
 */
export const applicationConfig = {
  databaseUri: process.env.DATABASE_URI || '',
  payloadSecret: process.env.PAYLOAD_SECRET || '',
  serverUrl: process.env.NEXT_PUBLIC_SERVER_URL || '',
}

/**
 * S3 Configurations
 * @description Configurations for S3
 */
export const s3Config = {
  accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
  endpoint: process.env.S3_ENDPOINT || '',
  bucket: process.env.S3_BUCKET || '',
  region: process.env.S3_REGION || '',
}
