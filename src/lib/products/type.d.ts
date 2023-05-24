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
  gender: Gender
  brand: Brand
  colorway: string
  sizes: number[]
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

export enum Brand {
  adidas = 'adidas',
  alexander_mcqueen = 'alexander_mcqueen',
  balenciaga = 'balenciaga',
  chanel = 'chanel',
  converse = 'converse',
  crocs = 'crocs',
  dior = 'dior',
  gucci = 'gucci',
  jordan = 'jordan',
  louis_vuitton = 'louis_vuitton',
  new_balance = 'new_balance',
  nike = 'nike',
  off_white = 'off_white',
  on = 'on',
  prada = 'prada',
  puma = 'puma',
  reebok = 'reebok',
  under_armour = 'under_armour',
  vans = 'vans',
  versace = 'versace',
  yeezy = 'yeezy',
}

export enum Gender {
  youth = 'youth',
  toddler = 'toddler',
  infant = 'infant',
  men = 'men',
  women = 'women',
  preschool = 'preschool',
  child = 'child',
  unisex = 'unisex',
}
