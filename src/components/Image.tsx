'use client'
import NextImage, { ImageProps } from 'next/image'
import React, { FC } from 'react'
import placeholderImage from '../../public/placeholder.png'

const Image: FC<Omit<ImageProps, 'ref'>> = (props) => {
  const imageRef = React.useRef<HTMLImageElement>(null)
  return (
    <NextImage
      {...props}
      ref={imageRef}
      onError={() =>
        imageRef.current && (imageRef.current.src = placeholderImage.src)
      }
    />
  )
}

export default Image
