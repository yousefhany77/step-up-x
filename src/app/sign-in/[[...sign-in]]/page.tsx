import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <SignIn
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
      afterSignInUrl={'/brands'}
    />
  )
}
