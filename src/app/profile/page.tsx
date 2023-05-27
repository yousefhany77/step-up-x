import { UserProfile } from '@clerk/nextjs'
function page() {
  return (
    <UserProfile
      path='/profile'
      routing='path'
      appearance={{
        elements: {
          rootBox: {
            width: '100%',
          },
          card: {
            borderRadius: '0',
            boxShadow: 'none',
            backgroundColor: 'transparent',
            width: '100%',
            '& > div:nth-child(3)': {
              display: 'none',
            },
          },
        },
      }}
    />
  )
}

export default page
