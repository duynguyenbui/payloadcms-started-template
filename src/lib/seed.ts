/* eslint-disable @typescript-eslint/no-unused-vars */
import path from 'path'
import fs from 'fs/promises'
import slugify from 'slugify'

import type { CollectionSlug, Payload, PayloadRequest, File, GlobalSlug } from 'payload'

import { Category, Media, VariantOption, VariantType } from '@/payload-types'
import { slugifyConfigs } from '@/configurations'

const collections: CollectionSlug[] = [
  'variants',
  'variantOptions',
  'variantTypes',
  'products',
  'categories',
  'media',
]

const globals: GlobalSlug[] = ['header', 'footer']

// const categories = ['Giày dép', 'Quần áo', 'Phụ kiện']
const categories = [
  {
    vi: 'Giày dép',
    en: 'Shoes',
  },
  {
    vi: 'Quần áo',
    en: 'Clothing',
  },
  {
    vi: 'Phụ kiện',
    en: 'Accessories',
  },
]
const subCategories = [
  {
    vi: 'Áo thun',
    en: 'T-Shirts',
  },
  {
    vi: 'Quần jeans',
    en: 'Jeans',
  },
  {
    vi: 'Áo khoác',
    en: 'Jackets',
  },
]

const sizeVariantOptions = [
  {
    label: {
      vi: 'Nhỏ',
      en: 'Small',
    },
    value: 's',
  },
  {
    label: {
      vi: 'Vừa',
      en: 'Medium',
    },
    value: 'm',
  },
  {
    label: {
      vi: 'Lớn',
      en: 'Large',
    },
    value: 'l',
  },
  {
    label: {
      vi: 'Rất lớn',
      en: 'Extra Large',
    },
    value: 'xl',
  },
  {
    label: {
      vi: 'Rất rất lớn',
      en: 'XXL',
    },
    value: 'xxl',
  },
]

const colorVariantOptions = [
  {
    label: {
      vi: 'Đen',
      en: 'Black',
    },
    value: 'den',
  },
  {
    label: {
      vi: 'Trắng',
      en: 'White',
    },
    value: 'trang',
  },
  {
    label: {
      vi: 'Đỏ',
      en: 'Red',
    },
    value: 'do',
  },
  {
    label: {
      vi: 'Xanh dương',
      en: 'Blue',
    },
    value: 'blue',
  },
  {
    label: {
      vi: 'Xanh lá',
      en: 'Green',
    },
    value: 'green',
  },
  {
    label: {
      vi: 'Vàng',
      en: 'Yellow',
    },
    value: 'yellow',
  },
  {
    label: {
      vi: 'Hồng',
      en: 'Pink',
    },
    value: 'pink',
  },
  {
    label: {
      vi: 'Tím',
      en: 'Purple',
    },
    value: 'purple',
  },
  {
    label: {
      vi: 'Cam',
      en: 'Orange',
    },
    value: 'orange',
  },
  {
    label: {
      vi: 'Nâu',
      en: 'Brown',
    },
    value: 'brown',
  },
  {
    label: {
      vi: 'Xám',
      en: 'Gray',
    },
    value: 'gray',
  },
]

const partner = {
  email: 'partner@payloadcms.com',
  password: 'partner',
  name: 'Partner User',
}

export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  // clear the database
  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        data: {
          navItems: [],
        },
        depth: 0,
        context: {
          disableRevalidate: true,
        },
      }),
    ),
  )

  for (const collection of collections) {
    await payload.db.deleteMany({ collection, req, where: {} })
    if (payload.collections[collection].config.versions) {
      await payload.db.deleteVersions({ collection, req, where: {} })
    }
  }

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: [
          {
            name: 'All',
            path: '/search',
          },
          {
            name: 'Shirts',
            path: '/search/shirts',
          },
          {
            name: 'Stickers',
            path: '/search/stickers',
          },
        ],
      },
    }),
    payload.updateGlobal({
      slug: 'footer',
      data: {
        navItems: [
          {
            name: 'All',
            path: '/search',
          },
          {
            name: 'Shirts',
            path: '/search/shirts',
            newTab: true,
          },
          {
            name: 'Stickers',
            path: '/search/stickers',
            newTab: true,
          },
        ],
      },
    }),
  ])
  payload.logger.info(`— Seeded globals.`)

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

  const [shoesCategory, clothingCategory, accessoriesCategory]: Category[] = await Promise.all(
    categories.map(async (category) => {
      return await payload.db.create({
        collection: 'categories',
        data: {
          title: {
            vi: category.vi,
            en: category.en,
          },
          slug: category.en,
        },
      })
    }),
  )

  const [tshirtSubCategory, jeansSubCategory, jacketSubCategory]: Category[] = await Promise.all([
    ...subCategories.map(async (category) => {
      return await payload.db.create({
        collection: 'categories',
        data: {
          title: {
            vi: category.vi,
            en: category.en,
          },
          slug: category.en,
          parent: clothingCategory.id,
        },
      })
    }),
  ])

  payload.logger.info(`— Seeded categories.`)

  const sizeVariantType: VariantType = await payload.db.create({
    collection: 'variantTypes',
    data: {
      value: 'kich-co',
      label: {
        vi: 'Kích cỡ',
        en: 'Size',
      },
    },
  })

  const sizeVariantOptionsResults: VariantOption[] = []

  for (const option of sizeVariantOptions) {
    const result = await payload.db.create({
      collection: 'variantOptions',
      data: {
        label: {
          vi: option.label.vi,
          en: option.label.en,
        },
        value: option.value,
        variantType: sizeVariantType.id,
      },
    })
    sizeVariantOptionsResults.push(result)
  }

  const [sizeSOption, sizeMOption, sizeLOption, sizeXLOption, sizeXXLOption] =
    sizeVariantOptionsResults

  const colorVariantType = await payload.db.create({
    collection: 'variantTypes',
    data: {
      value: 'mau-sac',
      label: {
        vi: 'Màu sắc',
        en: 'Color',
      },
    },
  })

  const colorVariantOptionsResults: VariantOption[] = []

  for (const option of colorVariantOptions) {
    const result = await payload.db.create({
      collection: 'variantOptions',
      data: {
        label: {
          vi: option.label.vi,
          en: option.label.en,
        },
        value: option.value,
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
        alt: `Image ${index + 1}`,
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

  const sneakersMenProduct = await payload.db.create({
    collection: 'products',
    req,
    data: {
      title: {
        vi: 'Giày sneaker nam basic',
        en: "Basic Men's Sneakers",
      },
      slug: 'basic-mens-sneakers',
      description: {
        vi: 'Giày sneaker nam basic với thiết kế tối giản, đế êm, dễ phối đồ, phù hợp đi làm và đi chơi hằng ngày.',
        en: "Basic men's sneakers with a minimalist design, comfortable sole, easy to match, suitable for work and daily outings.",
      },
      inventory: 120,
      gallery: [
        { id: 1, image: productImage1.id },
        { id: 2, image: productImage2.id },
      ],
      priceInVNDEnabled: true,
      priceInVND: 799000,
      enableVariants: false,
      categories: [shoesCategory.id],
      relatedProducts: [],
    },
  })

  const sneakersWomenProduct = await payload.db.create({
    collection: 'products',
    req,
    data: {
      title: {
        vi: 'Giày sneaker nữ lifestyle',
        en: "Lifestyle Women's Sneakers",
      },
      slug: 'lifestyle-womens-sneakers',
      description: {
        vi: 'Giày sneaker nữ phong cách lifestyle, thiết kế hiện đại, thoải mái, phù hợp cho các hoạt động hằng ngày và dạo phố.',
        en: "Lifestyle women's sneakers with a modern design, comfortable, suitable for daily activities and strolling.",
      },
      inventory: Math.floor(Math.random() * 80) + 80,
      gallery: [
        { id: 3, image: productImage3.id },
        { id: 4, image: productImage4.id },
      ],
      priceInVNDEnabled: true,
      priceInVND: 849000,
      enableVariants: false,
      categories: [shoesCategory.id],
      relatedProducts: [sneakersMenProduct.id],
    },
  })

  const tshirtUnisexProduct = await payload.db.create({
    collection: 'products',
    req,
    data: {
      enableVariants: true,
      inventory: 0,
      variantTypes: [sizeVariantType.id],
      categories: [clothingCategory.id, tshirtSubCategory.id],
      title: {
        vi: 'Áo thun unisex cotton 100%',
        en: 'Unisex 100% Cotton T-Shirt',
      },
      slug: 'unisex-100-cotton-t-shirt',
      description: {
        vi: 'Áo thun unisex chất liệu cotton 100% thoáng mát, phom oversize, phù hợp mặc hằng ngày hoặc đi chơi.',
        en: 'Unisex 100% cotton T-shirt, breathable fabric, oversize fit, suitable for daily wear or outings.',
      },
      priceInVNDEnabled: false,
      priceInVND: 0,
      gallery: [
        { id: 5, image: productImage5.id, variantOption: [sizeSOption.id] },
        { id: 6, image: productImage6.id, variantOption: [sizeMOption.id] },
        { id: 7, image: productImage7.id, variantOption: [sizeLOption.id] },
      ],
    },
  })

  const denimJacketProduct = await payload.db.create({
    collection: 'products',
    req,
    data: {
      title: {
        vi: 'Áo khoác denim unisex',
        en: 'Unisex Denim Jacket',
      },
      slug: 'unisex-denim-jacket',
      description: {
        vi: 'Áo khoác denim unisex form rộng, chất vải dày dặn, dễ phối với áo thun và quần jeans.',
        en: 'Unisex denim jacket with a loose fit, sturdy fabric, easy to match with T-shirts and jeans.',
      },
      inventory: 0,
      gallery: [
        { id: 8, image: productImage8.id },
        { id: 9, image: productImage9.id },
      ],
      priceInVNDEnabled: false,
      priceInVND: 0,
      enableVariants: true,
      categories: [clothingCategory.id, jacketSubCategory.id],
      variantTypes: [sizeVariantType.id, colorVariantType.id],
      relatedProducts: [],
    },
  })

  const jeansMenProduct = await payload.db.create({
    collection: 'products',
    req,
    data: {
      title: {
        vi: 'Quần jeans nam slim-fit',
        en: "Slim-fit Men's Jeans",
      },
      slug: 'slim-fit-men-jeans',
      description: {
        vi: 'Quần jeans nam dáng slim-fit, co giãn nhẹ, phù hợp đi làm và đi chơi, dễ phối với nhiều kiểu áo.',
        en: "Slim-fit men's jeans, slightly stretchy, suitable for work and outings, easy to match with various tops.",
      },
      inventory: 160,
      gallery: [{ id: 10, image: productImage10.id }],
      priceInVNDEnabled: true,
      priceInVND: 599000,
      enableVariants: false,
      categories: [clothingCategory.id, jeansSubCategory.id],
      relatedProducts: [],
    },
  })

  const leatherBeltProduct = await payload.db.create({
    collection: 'products',
    req,
    data: {
      title: {
        vi: 'Thắt lưng da thật bản vừa',
        en: 'Genuine Leather Belt - Medium Width',
      },
      slug: 'genuine-leather-belt-medium-width',
      description: {
        vi: 'Thắt lưng da thật bản vừa, mặt khóa kim, phù hợp mix với quần tây hoặc quần jeans.',
        en: 'Genuine leather belt with medium width, metal buckle, suitable for pairing with dress pants or jeans.',
      },
      inventory: 90,
      gallery: [{ id: 11, image: productImage11.id }],
      priceInVNDEnabled: true,
      priceInVND: 349000,
      enableVariants: false,
      categories: [accessoriesCategory.id],
      relatedProducts: [],
    },
  })

  const canvasBagProduct = await payload.db.create({
    collection: 'products',
    req,
    data: {
      title: {
        vi: 'Túi canvas tote bag basic',
        en: 'Basic Canvas Tote Bag',
      },
      slug: 'basic-canvas-tote-bag',
      description: {
        vi: 'Túi canvas tote bag basic, chất liệu dày dặn, thích hợp đi học, đi làm hoặc dạo phố.',
        en: 'Basic canvas tote bag, sturdy material, suitable for school, work, or casual outings.',
      },
      inventory: 130,
      gallery: [{ id: 12, image: productImage12.id }],
      priceInVNDEnabled: true,
      priceInVND: 429000,
      enableVariants: false,
      categories: [accessoriesCategory.id],
      relatedProducts: [],
    },
  })

  const collabStreetwearProduct = await payload.db.create({
    collection: 'products',
    req,
    data: {
      title: {
        vi: 'Bộ sưu tập Streetwear Collaboration',
        en: 'Streetwear Collaboration Collection',
      },
      slug: 'streetwear-collaboration-collection',
      description: {
        vi: 'Bộ sưu tập streetwear hợp tác cùng local brand, số lượng giới hạn, phong cách cá tính và nổi bật.',
        en: 'Streetwear collaboration collection with local brands, limited quantity, bold and distinctive style.',
      },
      inventory: 60,
      gallery: [
        { id: 13, image: productImage13.id },
        { id: 14, image: productImage1.id },
      ],
      priceInVNDEnabled: true,
      priceInVND: 1299000,
      enableVariants: false,
      categories: [clothingCategory.id],
      relatedProducts: [],
    },
  })

  payload.logger.info('Seeded products.')

  const tshirtVariants = await Promise.all(
    [sizeSOption, sizeMOption, sizeLOption, sizeXLOption, sizeXXLOption].map((sizeOption) => {
      let vietnameseVariantTitle: string = 'Áo thun unisex cotton 100% - Unknown Size'
      let englishVariantTitle: string = 'Unisex 100% Cotton T-Shirt - Unknown Size'

      if (sizeSOption.value === 's') {
        vietnameseVariantTitle = 'Áo thun unisex cotton 100% - Nhỏ'
        englishVariantTitle = 'Unisex 100% Cotton T-Shirt - Small'
      }

      if (sizeMOption.value === 'm') {
        vietnameseVariantTitle = 'Áo thun unisex cotton 100% - Vừa'
        englishVariantTitle = 'Unisex 100% Cotton T-Shirt - Medium'
      }

      if (sizeLOption.value === 'l') {
        vietnameseVariantTitle = 'Áo thun unisex cotton 100% - Lớn'
        englishVariantTitle = 'Unisex 100% Cotton T-Shirt - Large'
      }

      if (sizeXLOption.value === 'xl') {
        vietnameseVariantTitle = 'Áo thun unisex cotton 100% - Rất lớn'
        englishVariantTitle = 'Unisex 100% Cotton T-Shirt - Extra Large'
      }

      if (sizeXXLOption.value === 'xxl') {
        vietnameseVariantTitle = 'Áo thun unisex cotton 100% - Rất rất lớn'
        englishVariantTitle = 'Unisex 100% Cotton T-Shirt - XXL'
      }

      return payload.db.create({
        collection: 'variants',
        req,
        data: {
          title: {
            vi: `${vietnameseVariantTitle}`,
            en: `${englishVariantTitle}`,
          },
          product: tshirtUnisexProduct.id,
          options: [sizeOption.id],
          inventory: Math.floor(Math.random() * 40) + 20,
          priceInVNDEnabled: true,
          priceInVND: 249000,
        },
      })
    }),
  )

  const denimJacketVariants = await Promise.all(
    [sizeMOption, sizeLOption, sizeXLOption].map((sizeOption) => {
      let vietnameseVariantTitle: string = 'Áo khoác denim unisex - Unknown Size - Xanh dương'
      let englishVariantTitle: string = 'Unisex Denim Jacket - Unknown Size - Blue'

      if (sizeMOption.value === 'm') {
        vietnameseVariantTitle = 'Áo khoác denim unisex - Vừa - Xanh dương'
        englishVariantTitle = 'Unisex Denim Jacket - Medium - Blue'
      }

      if (sizeLOption.value === 'l') {
        vietnameseVariantTitle = 'Áo khoác denim unisex - Lớn - Xanh dương'
        englishVariantTitle = 'Unisex Denim Jacket - Large - Blue'
      }

      if (sizeXLOption.value === 'xl') {
        vietnameseVariantTitle = 'Áo khoác denim unisex - Rất lớn - Xanh dương'
        englishVariantTitle = 'Unisex Denim Jacket - Extra Large - Blue'
      }

      return payload.db.create({
        collection: 'variants',
        req,
        data: {
          title: {
            vi: `${vietnameseVariantTitle}`,
            en: `${englishVariantTitle}`,
          },
          product: denimJacketProduct.id,
          options: [sizeOption.id, xanhDuongVariantOption.id],
          inventory: Math.floor(Math.random() * 30) + 10,
          priceInVNDEnabled: true,
          priceInVND: 799000,
        },
      })
    }),
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
