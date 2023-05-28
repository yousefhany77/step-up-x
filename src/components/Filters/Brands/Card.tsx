import Image from '@components/Image'
import Link from 'next/link'
import { FC } from 'react'

interface CardProps {
  name: string
  slug: string
  logo: string
}

const Card: FC<CardProps> = ({ logo, name, slug }) => {
  return (
    <Link
      href={`/brands/${slug}`}
      style={{
        display: 'block',
        cursor: 'pointer',
        aspectRatio: '1/1',
        width: '7rem',
        backgroundColor: 'white',
        borderRadius: '50%',
        overflow: 'hidden',
        padding: '1rem',
      }}
    >
      <Image
        src={logo}
        alt={name}
        width={150}
        height={150}
        priority
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%',
        }}
      />
    </Link>
  )
}

export default Card
