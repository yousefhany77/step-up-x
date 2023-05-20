import { Box, LoadingOverlay } from '@mantine/core'
import { FC, useEffect, useState } from 'react'

interface View360Props {
  images: string[]
}
const fakeAsyncFunction = async (
  delay: number,
  setState: React.Dispatch<React.SetStateAction<boolean>>
) => {
  await new Promise((resolve) => setTimeout(resolve, delay))
  setState(false)
}
let loaded = false
const View360: FC<View360Props> = ({ images }) => {
  const [index, setIndex] = useState(0)
  const [mouseDown, setMouseDown] = useState(false)
  const [mouseX, setMouseX] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(!loaded)

  const handleMouseDown = (e: React.MouseEvent) => {
    setMouseDown(true)
    setMouseX(e.pageX)
  }

  const handleMouseUp = () => {
    setMouseDown(false)
    setMouseX(0)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (mouseDown) {
      const delta = mouseX - e.pageX
      if (delta > 10) {
        setIndex((index + 1) % images.length)
        setMouseX(e.pageX)
      } else if (delta < -10) {
        setIndex(index === 0 ? images.length - 1 : index - 1)
        setMouseX(e.pageX)
      }
    }
  }

  useEffect(() => {
    const handleClick = async () => {
      await fakeAsyncFunction(1000, setIsLoading)
    }
    handleClick()
  }, [])
  return (
    <>
      <Box
        pos={'relative'}
        sx={{
          cursor: mouseDown ? 'grabbing' : 'grab',
        }}
      >
        <LoadingOverlay visible={isLoading} overlayBlur={5} />
        <div
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{
            backgroundImage: `url(${images[index]})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            minHeight: '66vh',
            maxHeight: '720px',
            margin: '0 auto ',
          }}
        />
      </Box>

      {/* prefetching all the images so that so 360 view is smooth */}
      {images.map((url, i) => {
        if (i === images.length - 1) {
          loaded = true
        }
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt='images'
            key={i}
            src={url}
            width={500}
            height={500}
            style={{
              display: 'none',
            }}
          />
        )
      })}
    </>
  )
}

export default View360
