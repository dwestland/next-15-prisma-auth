import { auth, signIn } from '@/auth'
import { redirect } from 'next/navigation'

export default async function SignInPage() {
  const session = await auth()

  // Redirect to home if already logged in
  if (session?.user) {
    redirect('/')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">Sign In</h1>
        <div className="flex flex-col space-y-2">
          <form
            action={async () => {
              'use server'
              await signIn('github', { redirectTo: '/' })
            }}
          >
            <button className="rounded bg-gray-800 px-4 py-2 text-white hover:bg-gray-700">
              Sign in with GitHub
            </button>
          </form>

          <form
            action={async () => {
              'use server'
              await signIn('google', { redirectTo: '/' })
            }}
          >
            <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-400">
              Sign in with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
