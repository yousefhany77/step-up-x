export interface contentfulFile {
  title: string
  file: {
    url: string
    details: {
      size: number
      image: {
        width: number
        height: number
      }
    }
  }
}

export interface contentfulProduct {
  pid: string
  title: string
  price: number
  gender: string
  brand: string
  colorway: string
  size: number[]
  variants?: {
    fields: Omit<contentfulProduct, 'variants'>
  }[]
  images: {
    fields: contentfulFile
  }[]
  view_360?: {
    fields: contentfulFile
  }[]
  thumbnail: {
    fields: contentfulFile
  }
}
