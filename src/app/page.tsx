'use server'

import { auth } from '@/auth'
import { SignInButton } from '@/components/sign-in-button'
import Link from 'next/link'
import { SignOutButton } from '@/components/sign-out-button'

export default async function Home() {
  const session = await auth()

  if (session?.user) {
    return (
      <div>
        <p>Hello {session.user.name}</p>
        <Link href="/user-info"> User Info </Link>
        <br />
        <SignOutButton />
      </div>
    )
  }

  return (
    <div>
      {' '}
      <p> You Are Not Signed In</p>
      <SignInButton />
    </div>
  )
}
