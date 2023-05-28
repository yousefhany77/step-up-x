import { SignUp } from '@clerk/nextjs'

export default function Page({
  searchParams: { redirectUrl },
}: {
  searchParams: { redirectUrl?: string }
}) {
  return (
    <SignUp
      path='/sign-up'
      routing='path'
      signInUrl='/sign-in'
      afterSignInUrl={redirectUrl || '/'}
      afterSignUpUrl={redirectUrl || '/'}
      redirectUrl={redirectUrl}
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
