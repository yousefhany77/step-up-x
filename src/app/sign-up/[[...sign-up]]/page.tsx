import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <SignUp
      afterSignInUrl={'/'}
      afterSignUpUrl={'/'}
      redirectUrl={'/'}
      path='/sign-up'
      routing='path'
      signInUrl='/sign-in'
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
