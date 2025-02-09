import Link from 'next/link'
import React from 'react'

function TopNav() {
  return (
    <header className="bg-blue-300 text-white p-4">
      <nav className="container mx-auto flex items-center justify-start space-x-4">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/auth/signin" className="hover:underline">
          Sign In
        </Link>
        <Link href="/user-info" className="hover:underline">
          User Info
        </Link>
        <Link href="/todos" className="hover:underline">
          Todos
        </Link>
        <Link href="/todos2" className="hover:underline">
          Todos 2
        </Link>
      </nav>
    </header>
  )
}

export default TopNav
