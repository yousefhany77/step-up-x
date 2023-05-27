'use client'

import { Box, Collapse, Title, useMantineTheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import React from 'react'

function WithCollapse({
  children,
  label,
}: {
  children: React.ReactNode[] | React.ReactNode
  label: React.ReactNode
}) {
  const theme = useMantineTheme()
  const [opened, { toggle }] = useDisclosure(false)
  return (
    <>
      <Box
        style={{
          cursor: 'pointer',
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          padding: '1rem',
          marginBottom: '1rem',
          alignItems: 'center',
          boxShadow: '0 0 0.5rem rgba(0,0,0,0.1)',
        }}
      >
        <Title
          order={4}
          style={{ margin: 0 }}
          onClick={toggle}
          sx={{
            color: theme.colors.dark[5],
            transition: `color 400ms ${theme.transitionTimingFunction}`,
            '&:hover': {
              color: theme.colors.gray[6],
              opacity: 0.8,
            },
          }}
        >
          {label}
        </Title>
        <Collapse in={opened}>{children}</Collapse>
      </Box>
    </>
  )
}

export default WithCollapse
