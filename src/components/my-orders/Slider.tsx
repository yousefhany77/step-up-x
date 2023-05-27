'use client'

import { Carousel } from '@mantine/carousel'
import { useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import React, { FC } from 'react'

interface SliderProps {
  children: React.ReactNode[]
  orientation?: 'horizontal' | 'vertical'
  slideSize?: {
    mobile: {
      width: string
      height: string
    }
    desktop: {
      width: string
      height: string
    }
  }
  loop?: boolean
}

const Slider: FC<SliderProps> = ({
  children,
  orientation = 'horizontal',
  slideSize = {
    mobile: {
      width: '100%',
      height: '40vh',
    },
    desktop: {
      width: '30%',
      height: '100%',
    },
  },
  loop = true,
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [isDragging, setIsDragging] = React.useState(false)
  const theme = useMantineTheme()
  return (
    <Carousel
      withIndicators
      withControls={!isMobile}
      loop={loop}
      height={isMobile ? slideSize.mobile.height : slideSize.desktop.height}
      slideSize={isMobile ? slideSize.mobile.width : slideSize.desktop.width}
      slideGap='md'
      maw={isMobile ? '100%' : '1200px'}
      m={'md'}
      p={'md'}
      align='start'
      breakpoints={[
        { maxWidth: 'xl', slideSize: '30%', slideGap: 0 },
        { maxWidth: 'md', slideSize: '50%' },
        { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
      ]}
      orientation={isMobile ? 'vertical' : orientation}
      styles={{
        indicator: {
          backgroundColor: theme.colors.gray[4],
        },
      }}
      withKeyboardEvents={false}
    >
      {children.map((child, index) => (
        <Carousel.Slide
          key={index}
          sx={{
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
        >
          <div>{child}</div>
        </Carousel.Slide>
      ))}
    </Carousel>
  )
}

export default Slider
