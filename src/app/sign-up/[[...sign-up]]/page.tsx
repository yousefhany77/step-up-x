import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <SignUp
      appearance={{
        elements: {
          card: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          },
        },
      }}
    />
  )
}
