import prisma from '@/db'
import { env } from '@/env.mjs'
import { Brand, Image, Variant as PrismaVariant, Sneaker } from '@prisma/client'
import { Entry, EntrySkeletonType, createClient } from 'contentful'
import { cache } from 'react'
import 'server-only'
import { contentfulFile, contentfulProduct } from './type'

const client = createClient({
  space: env.CMS_SPACE_ID,
  accessToken: env.CMS_Access_Token,
  environment: 'master',
})

const enhanceContentfulProduct = (
  item: Entry<EntrySkeletonType, undefined, string>
) => {
  const { fields, sys } = item
  const { images, thumbnail, view_360, variants } = fields as unknown as {
    images: { fields: contentfulFile }[]
    thumbnail: { fields: contentfulFile }
    view_360?: { fields: contentfulFile }[]
    variants?: {
      fields: Omit<contentfulProduct, 'variants'>
    }[]
  }
  const product = {
    title: fields.title!.toString(),
    brand: fields.brand?.toString(),
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

      return {
        id: fields.pid,
        sneakerPid: sys.id,
        colorway: fields.colorway,
        sizes: fields.size,
        images: variantImages,
        thumbnail: variantThumbnail,
        price: Number(fields.price),
        title: fields.title,
      }
    }),
  }
  return product
}
const enhanceSeedData = (
  item: Sneaker & {
    Image: Image
    Variant: (PrismaVariant & {
      Image: Image
    })[]
  }
) => ({
  title: item.name,
  brand: item.brand,
  colorway: item.colorway,
  gender: item.gender,
  price: item.price.toNumber(),
  sizes: item.sizes?.sort((a, b) => a - b),
  pid: item.pid,
  images: [item.Image.original],
  thumbnail: item.Image.thumbnail,
  view_360: item.Image.view_360,
  variants: item.Variant?.map((variant) => ({
    id: variant.id,
    sneakerPid: item.pid,
    colorway: variant.colorway,
    sizes: variant.sizes,
    images: [variant.Image.original],
    thumbnail: variant.Image.thumbnail,
    price: variant.price?.toNumber() ?? 100, // in case price is null
    title: variant.name ?? item.name,
  })),
})
/**
 * get list product from contentful & seed data from postgres if `process.env.INCLUDE_SEED_DATA` is `true`
 * the result will be merged and return
 *
 * the seeded DB will be used with contentful data because contentful data is not enough (contentful has some rate limits)
 * the seeded DB will be used for better visualization of the website
 */
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
        'fields.brand': filters.brand,
      }),

    skip: page ? (page - 1) * 25 : 0,
    limit: 25,
  })

  const seedData = env.INCLUDE_SEED_DATA
    ? await prisma.sneaker.findMany({
        where: {
          brand: filters?.brand ?? undefined,
        },
        skip: page ? (page - 1) * 25 : 0,
        take: 25,
        include: {
          Image: true,
          Variant: {
            include: {
              Image: true,
            },
          },
        },
      })
    : []

  const data = items.map(enhanceContentfulProduct)

  const seededData = seedData.map(enhanceSeedData)
  return [...data, ...seededData]
})

export const getProductById = cache(
  async (id: string): Promise<Product | undefined> => {
    const { items } = await client.getEntries({
      content_type: 'product',
      'sys.id': id,
    })
    if (items.length) return enhanceContentfulProduct(items[0])
    if (!items.length && !env.INCLUDE_SEED_DATA) {
      return
    }
    if (!items.length && env.INCLUDE_SEED_DATA) {
      const product = await prisma.sneaker.findFirst({
        where: {
          pid: id,
        },
        include: {
          Image: true,
          Variant: {
            include: {
              Image: true,
            },
          },
        },
      })
      return product ? enhanceSeedData(product) : undefined
    }
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
