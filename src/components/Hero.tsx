'use client'
import { Anchor, Title } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import Link from 'next/link'
import { FC } from 'react'
import Image from './Image'

interface HeroProps {
  title: string | undefined
  heroImage: string
  cta: string | undefined
}

const Hero: FC<HeroProps> = ({ cta, heroImage, title }) => {
  const matches = useMediaQuery('(max-width: 56.25em)')
  return (
    <section
      style={{
        height: 'calc(100vh - 100px)',
        position: 'relative',
        width: '100%',
        borderRadius: '20px',
        overflow: 'hidden',
        textAlign: matches ? 'center' : 'left',
      }}
    >
      <Image
        width={1200}
        height={768}
        src={heroImage}
        alt={'step-up-x'}
        sizes='(max-width: 768px) 100vw, 768px'
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%',
          opacity: 0.94,
        }}
      />
      <Title
        order={1}
        color='white'
        style={{
          position: 'absolute',
          top: '30%',
          left: matches ? '50%' : '30%',
          fontSize: matches ? '2.25rem' : '4rem',
          textTransform: 'uppercase',
          transform: matches
            ? 'translate(-50%, -30%)'
            : 'translate(-30%, -30%)',
          textShadow: '0 0 10px rgba(0,0,0,0.05)',
        }}
      >
        {title}
      </Title>
      <Anchor
        component={Link}
        href='/brands'
        variant='white'
        size='lg'
        sx={{
          backgroundColor: 'white',
          borderRadius: '15px',
          fontWeight: 600,
          fontSize: '1rem',
          padding: '0.75rem 1.7rem',
          position: 'absolute',
          top: matches ? '65%' : '60%',
          left: matches ? '50%' : '10%',
          transform: matches ? 'translate(-50%, -65%)' : 'translate(10%, -60%)',
          textTransform: 'uppercase',
          textShadow: '0 0 10px rgba(0,0,0,0.05)',
          transition: 'background-color 0.2s ease',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.9)',
          },
        }}
      >
        {cta}
      </Anchor>
    </section>
  )
}

export default Hero
