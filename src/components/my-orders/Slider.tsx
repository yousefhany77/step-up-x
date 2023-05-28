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
  withControls?: boolean
}

const Slider: FC<SliderProps> = ({
  children,
  orientation = 'horizontal',
  slideSize = {
    mobile: {
      width: '100%',
      height: '46vh',
    },
    desktop: {
      width: '30%',
      height: '100%',
    },
  },
  loop = true,
  withControls,
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [isDragging, setIsDragging] = React.useState(false)
  const theme = useMantineTheme()
  return (
    <Carousel
      withIndicators
      withControls={!isMobile || withControls}
      loop={loop}
      height={isMobile ? slideSize.mobile.height : slideSize.desktop.height}
      slideSize={isMobile ? slideSize.mobile.width : slideSize.desktop.width}
      slideGap='md'
      maw={isMobile ? '100%' : '1200px'}
      m={'md'}
      p={'md'}
      align='start'
      orientation={orientation || (isMobile ? 'vertical' : 'horizontal')}
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
