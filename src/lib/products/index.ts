import { env } from '@/env.mjs'
import { Entry, EntrySkeletonType, createClient } from 'contentful'
import { cache } from 'react'
import 'server-only'
import { Brand, contentfulFile, contentfulProduct } from './type'

const client = createClient({
  space: env.CMS_SPACE_ID,
  accessToken: env.CMS_Access_Token,
  environment: 'master',
})

const enhanceContentfulProduct = (
  item: Entry<EntrySkeletonType, undefined, string>
) => {
  const { fields, sys } = item
  const { images, thumbnail, view_360, variants, brand, title } =
    fields as unknown as {
      title: string
      images: { fields: contentfulFile }[]
      thumbnail: { fields: contentfulFile }
      view_360?: { fields: contentfulFile }[]
      variants?: {
        fields: Omit<contentfulProduct, 'variants'>
      }[]
      brand: {
        fields: {
          name: Brand
          slug: string
        }
      }
    }
  const product = {
    title: title.toString(),
    brand: brand.fields.name,
    colorway: fields.colorway?.toString(),
    gender: fields.gender?.toString(),
    price: Number(fields.price),
    sizes: fields.sizes ? (fields.sizes as number[]).sort((a, b) => a - b) : [],
    pid: sys.id,
    thumbnail: `https:${thumbnail?.fields?.file?.url}`,
    images: images?.map((image) => `https:${image?.fields?.file?.url}`),
    view_360: view_360?.map((image) => `https:${image?.fields?.file?.url}`),
    variants: variants?.map((variant) => {
      const { fields } = variant
      const variantImages = fields.images?.map(
        (image) => `https:${image?.fields?.file?.url}`
      )
      const variantThumbnail = `https:${fields.thumbnail?.fields?.file?.url}`
      const {
        sys: { id: variantId },
      } = variant as unknown as {
        sys: {
          id: string
        }
      }
      return {
        id: variantId,
        sneakerPid: item.sys.id,
        colorway: fields.colorway,
        sizes: fields.sizes
          ? (fields.sizes as number[]).sort((a, b) => a - b)
          : [],
        images: variantImages,
        thumbnail: variantThumbnail,
        price: Number(fields.price),
        title: fields.title,
      }
    }),
  }
  return product
}

type Filters = {
  brand?: Brand
  pages?: number
}
export const listProduct = cache(async (filters?: Filters) => {
  const page = filters?.pages || 1
  // get list product from contentful
  const { items } = await client.getEntries({
    content_type: 'product',
    ...(filters &&
      filters.brand && {
        'fields.brand.fields.slug': filters.brand,
        'fields.brand.sys.contentType.sys.id': 'brand',
      }),

    skip: page ? (page - 1) * 25 : 0,
    limit: 25,
  })

  const data = items.map(enhanceContentfulProduct)

  return data
})
export const listBrands = cache(async () => {
  const { items } = await client.getEntries({
    content_type: 'brand',
  })
  const brands = items.map((item) => {
    const { fields } = item
    const { logo } = fields as unknown as {
      logo: { fields: contentfulFile }
    }
    return {
      name: `${fields.name?.toString()}`,
      slug: `${fields.slug?.toString()}`,
      logo: `https:${logo.fields.file.url}`,
    }
  })
  return brands
})
export const getProductById = cache(
  async (id: string): Promise<Product | undefined> => {
    const { items } = await client.getEntries({
      content_type: 'product',
      'sys.id': id,
    })
    if (items.length) return enhanceContentfulProduct(items[0])
  }
)

export type Product = ReturnType<typeof enhanceContentfulProduct>
export type Variant = {
  id: string
  sneakerPid: string
  colorway: string
  sizes: number[]
  images: string[]
  thumbnail: string
  price: number
  title: string
}

/**
 * Home page
 */

export const getHomePage = cache(async () => {
  const { items } = await client.getEntries({
    content_type: 'homePage',
    include: 2,
  })
  if (!items.length) return
  const { fields } = items[0]
  const featured = fields?.featured as Entry<
    EntrySkeletonType,
    undefined,
    string
  >[]
  const heroImage = fields.heroImg as unknown as {
    fields: contentfulFile
  }
  const herSection = {
    title: fields.heroText?.toString(),
    heroImage: `https:${heroImage.fields.file.url}`,
    cta: fields.cta?.toString(),
  }

  const featuredProducts = featured.map(enhanceContentfulProduct)
  return {
    herSection,
    featuredProducts,
  }
})
