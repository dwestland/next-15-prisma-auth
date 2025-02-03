'use server'
import { auth } from '@/auth'
import Link from 'next/link'
import { SignOutButton } from '@/components/sign-out-button'
import { SignInButton } from '@/components/sign-in-button'

export default async function Home() {
  const session = await auth()

  if (session?.user) {
    return (
      <div>
        <p>Hello {session.user.name}</p>
        <Link href="/user-info">User Info</Link>
        <br />
        <SignOutButton />
        <br />
        <br />
        <Link href="/todos">Go to Todos</Link>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to nex-15-prisma-auth</h1>
      <div className="space-y-4">
        <SignInButton />
        <br />
        <Link
          href="/api/auth/signin"
          className="text-blue-500 hover:text-blue-700"
        >
          View all sign in options
        </Link>
        <br />
        <Link href="/todos">Go to Todos</Link>
      </div>
    </div>
  )
}
