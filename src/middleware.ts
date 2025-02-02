import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/auth'

// Define routes that require authentication
const protectedRoutes = ['/user-info']

/**
 * Middleware to handle route protection and authentication
 * Runs before accessing protected routes to verify user session
 */
export default async function middleware(request: NextRequest) {
  // Get current authentication session
  const session = await auth()

  // Extract the current path from the request URL
  const { pathname } = request.nextUrl

  // Check if the current path matches any protected routes
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )

  // Redirect to sign-in page if trying to access protected route without authentication
  if (isProtected && !session) {
    return NextResponse.redirect(new URL('/api/auth/signin', request.url))
  }

  // Allow the request to proceed if authenticated or accessing public route
  return NextResponse.next()
}
