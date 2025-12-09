/* eslint-disable @typescript-eslint/no-unused-vars */
import path from 'path'
import fs from 'fs/promises'
import slugify from 'slugify'

import type { CollectionSlug, Payload, PayloadRequest, File } from 'payload'

import { Media, VariantOption } from '@/payload-types'
import { slugifyConfigs } from '@/configurations'

const collections: CollectionSlug[] = [
  'variants',
  'variantOptions',
  'variantTypes',
  'products',
  'categories',
  'media',
]

const categories = ['Giày dép', 'Quần áo', 'Phụ kiện']
const subCategories = ['Áo thun', 'Quần jeans', 'Áo khoác']

const sizeVariantOptions = [
  { label: 'S', value: 's' },
  { label: 'M', value: 'm' },
  { label: 'L', value: 'l' },
  { label: 'XL', value: 'xl' },
  { label: 'XXL', value: 'xxl' },
]

const colorVariantOptions = [
  { label: 'Đen', value: 'den' },
  { label: 'Trắng', value: 'trang' },
  { label: 'Đỏ', value: 'do' },
  { label: 'Xanh dương', value: 'xanh-duong' },
  { label: 'Xanh lá', value: 'xanh-la' },
  { label: 'Vàng', value: 'vang' },
  { label: 'Hồng', value: 'hong' },
  { label: 'Tím', value: 'tim' },
  { label: 'Cam', value: 'cam' },
  { label: 'Nâu', value: 'nau' },
  { label: 'Xám', value: 'xam' },
]

const partner = {
  email: 'partner@payloadcms.com',
  password: 'partner',
}

export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  for (const collection of collections) {
    await payload.db.deleteMany({ collection, req, where: {} })
    if (payload.collections[collection].config.versions) {
      await payload.db.deleteVersions({ collection, req, where: {} })
    }
  }

  const picsFolder = path.join(process.cwd(), 'public', 'media')
  try {
    await fs.mkdir(picsFolder, { recursive: true })
    const files = await fs.readdir(picsFolder)
    for (const file of files) {
      await fs.unlink(path.join(picsFolder, file))
    }
  } catch (error) {}

  payload.logger.info(`— Cleared collections and globals...`)

  await payload.delete({
    collection: 'users',
    where: {
      email: { equals: partner.email },
    },
  })

  const partnerUser = await payload.create({
    collection: 'users',
    data: partner,
    req,
  })

  payload.logger.info(`— Seeded users.`)

  const [shoesCategory, clothingCategory, accessoriesCategory] = await Promise.all(
    categories.map(async (category) => {
      return await payload.create({
        collection: 'categories',
        data: {
          title: category,
          slug: category,
        },
      })
    }),
  )

  const [tshirtSubCategory, jeansSubCategory, jacketSubCategory] = await Promise.all([
    ...subCategories.map(async (category) => {
      return await payload.create({
        collection: 'categories',
        data: {
          title: category,
          slug: slugify(category, slugifyConfigs.vi),
          parent: clothingCategory,
        },
      })
    }),
  ])

  payload.logger.info(`— Seeded categories.`)

  const sizeVariantType = await payload.create({
    collection: 'variantTypes',
    data: {
      name: 'kich-co',
      label: 'Kích cỡ',
    },
  })

  const sizeVariantOptionsResults: VariantOption[] = []

  for (const option of sizeVariantOptions) {
    const result = await payload.create({
      collection: 'variantOptions',
      data: {
        ...option,
        variantType: sizeVariantType.id,
      },
    })
    sizeVariantOptionsResults.push(result)
  }

  const [sizeSOption, sizeMOption, sizeLOption, sizeXLOption, sizeXXLOption] =
    sizeVariantOptionsResults

  const colorVariantType = await payload.create({
    collection: 'variantTypes',
    data: {
      name: 'mau-sac',
      label: 'Màu sắc',
    },
  })

  const colorVariantOptionsResults: VariantOption[] = []

  for (const option of colorVariantOptions) {
    const result = await payload.create({
      collection: 'variantOptions',
      data: {
        ...option,
        variantType: colorVariantType.id,
      },
    })

    colorVariantOptionsResults.push(result)
  }

  const [
    denVariantOption,
    trangVariantOption,
    doVariantOption,
    xanhDuongVariantOption,
    xanhLaVariantOption,
    vangVariantOption,
    hongVariantOption,
    timVariantOption,
    camVariantOption,
    nauVariantOption,
    xamVariantOption,
  ] = colorVariantOptionsResults

  payload.logger.info(`— Seeded variant types and options.`)

  const mediaResults: Media[] = []
  const NO_OF_MEDIA = 13

  const MEDIA_FOLDER = path.join(process.cwd(), 'pics')

  for (let index = 0; index < NO_OF_MEDIA; index++) {
    const filePayload = await getFilePayload(MEDIA_FOLDER, `${index + 1}.webp`)
    const media = await payload.create({
      collection: 'media',
      data: {
        alt: `Hình ảnh sản phẩm ${index + 1}`,
      },
      file: filePayload,
    })

    mediaResults.push(media)
  }

  const [
    productImage1,
    productImage2,
    productImage3,
    productImage4,
    productImage5,
    productImage6,
    productImage7,
    productImage8,
    productImage9,
    productImage10,
    productImage11,
    productImage12,
    productImage13,
  ] = mediaResults

  payload.logger.info('— Seeded media.')

  const sneakersMenProduct = await payload.create({
    collection: 'products',
    depth: 0,
    data: {
      title: 'Giày sneaker nam basic',
      slug: 'Giày sneaker nam basic',
      description:
        'Giày sneaker nam basic với thiết kế tối giản, đế êm, dễ phối đồ, phù hợp đi làm và đi chơi hằng ngày.',
      inventory: 120,
      gallery: [{ image: productImage1 }, { image: productImage2 }],
      priceInVNDEnabled: true,
      priceInVND: 799000,
      enableVariants: false,
      categories: [shoesCategory],
      relatedProducts: [],
    },
  })

  const sneakersWomenProduct = await payload.create({
    collection: 'products',
    depth: 0,
    data: {
      title: 'Giày sneaker nữ lifestyle',
      slug: 'Giày sneaker nữ lifestyle',
      description:
        'Giày sneaker nữ phong cách lifestyle với phối màu trẻ trung, phù hợp đi học, đi chơi, dạo phố.',
      inventory: Math.floor(Math.random() * 80) + 80,
      gallery: [{ image: productImage3 }, { image: productImage4 }],
      priceInVNDEnabled: true,
      priceInVND: 849000,
      enableVariants: false,
      categories: [shoesCategory],
      relatedProducts: [sneakersMenProduct],
    },
  })

  const tshirtUnisexProduct = await payload.create({
    collection: 'products',
    depth: 0,
    data: {
      enableVariants: true,
      inventory: 0,
      variantTypes: [sizeVariantType],
      categories: [clothingCategory, tshirtSubCategory],
      title: 'Áo thun unisex cotton 100%',
      slug: 'Áo thun unisex cotton 100%',
      description:
        'Áo thun unisex chất liệu cotton 100% thoáng mát, phom oversize, phù hợp mặc hằng ngày hoặc đi chơi.',
      priceInVNDEnabled: false,
      priceInVND: 0,
      gallery: [
        { image: productImage5, variantOption: [sizeSOption] },
        { image: productImage6, variantOption: [sizeMOption] },
        { image: productImage7, variantOption: [sizeLOption] },
      ],
    },
  })

  const denimJacketProduct = await payload.create({
    collection: 'products',
    depth: 0,
    data: {
      title: 'Áo khoác denim unisex',
      slug: 'Áo khoác denim unisex',
      description:
        'Áo khoác denim unisex form rộng, chất vải dày dặn, dễ phối với áo thun và quần jeans.',
      inventory: 0,
      gallery: [{ image: productImage8 }, { image: productImage9 }],
      priceInVNDEnabled: false,
      priceInVND: 0,
      enableVariants: true,
      categories: [clothingCategory, jacketSubCategory],
      variantTypes: [sizeVariantType, colorVariantType],
      relatedProducts: [],
    },
  })

  // 5. Quần jeans nam slim-fit
  const jeansMenProduct = await payload.create({
    collection: 'products',
    depth: 0,
    data: {
      title: 'Quần jeans nam slim-fit',
      slug: 'Quần jeans nam slim-fit',
      description:
        'Quần jeans nam dáng slim-fit, co giãn nhẹ, phù hợp đi làm và đi chơi, dễ phối với nhiều kiểu áo.',
      inventory: 160,
      gallery: [{ image: productImage10 }],
      priceInVNDEnabled: true,
      priceInVND: 599000,
      enableVariants: false,
      categories: [clothingCategory, jeansSubCategory],
      relatedProducts: [],
    },
  })

  const leatherBeltProduct = await payload.create({
    collection: 'products',
    depth: 0,
    data: {
      title: 'Thắt lưng da thật bản vừa',
      slug: 'Thắt lưng da thật bản vừa',
      description:
        'Thắt lưng da thật bản vừa, mặt khóa kim, phù hợp mix với quần tây hoặc quần jeans.',
      inventory: 90,
      gallery: [{ image: productImage11 }],
      priceInVNDEnabled: true,
      priceInVND: 349000,
      enableVariants: false,
      categories: [accessoriesCategory],
      relatedProducts: [],
    },
  })

  const canvasBagProduct = await payload.create({
    collection: 'products',
    depth: 0,
    data: {
      title: 'Túi canvas tote bag basic',
      slug: 'Túi canvas tote bag basic',
      description:
        'Túi canvas tote bag basic, chất liệu dày dặn, thích hợp đi học, đi làm hoặc dạo phố.',
      inventory: 130,
      gallery: [{ image: productImage12 }],
      priceInVNDEnabled: true,
      priceInVND: 429000,
      enableVariants: false,
      categories: [accessoriesCategory],
      relatedProducts: [],
    },
  })

  const collabStreetwearProduct = await payload.create({
    collection: 'products',
    depth: 0,
    data: {
      title: 'Bộ sưu tập Streetwear Collaboration',
      slug: 'Bộ sưu tập Streetwear Collaboration',
      description:
        'Bộ sưu tập streetwear hợp tác cùng local brand, số lượng giới hạn, phong cách cá tính và nổi bật.',
      inventory: 60,
      gallery: [{ image: productImage12 }, { image: productImage13 }],
      priceInVNDEnabled: true,
      priceInVND: 1299000,
      enableVariants: false,
      categories: [clothingCategory],
      relatedProducts: [],
    },
  })

  payload.logger.info('Seeded products.')

  const tshirtVariants = await Promise.all(
    [sizeSOption, sizeMOption, sizeLOption, sizeXLOption, sizeXXLOption].map((sizeOption) =>
      payload.create({
        collection: 'variants',
        depth: 0,
        data: {
          title: `Áo thun unisex cotton 100% - ${sizeOption.label}`,
          product: tshirtUnisexProduct,
          options: [sizeOption],
          inventory: Math.floor(Math.random() * 40) + 20,
          priceInVNDEnabled: true,
          priceInVND: 249000,
        },
      }),
    ),
  )

  const denimJacketVariants = await Promise.all(
    [sizeMOption, sizeLOption, sizeXLOption].map((sizeOption) =>
      payload.create({
        collection: 'variants',
        depth: 0,
        data: {
          title: `Áo khoác denim unisex - ${sizeOption.label} - ${xanhDuongVariantOption.label}`,
          product: denimJacketProduct,
          options: [sizeOption, xanhDuongVariantOption],
          inventory: Math.floor(Math.random() * 30) + 10,
          priceInVNDEnabled: true,
          priceInVND: 799000,
        },
      }),
    ),
  )

  payload.logger.info('Seeded variants.')
}

const getFilePayload = async (folder: string, url: string): Promise<File> => {
  const filePath = path.join(folder, url)
  const data = await fs.readFile(filePath)

  return {
    name: path.basename(filePath),
    data: Buffer.from(data),
    mimetype: `image/webp`,
    size: data.byteLength,
  }
}
