'use server'
import { auth } from '@/auth'
import Link from 'next/link'
import { SignOutButton } from '@/components/sign-out-button'

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
      <h1 className="text-2xl font-bold mb-4">Welcome to Todo App</h1>
      <Link href="/todos">Go to Todos</Link>
    </div>
  )
}
