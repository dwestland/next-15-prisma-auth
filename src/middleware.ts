import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // export function middleware(request: NextRequest) {
  console.log('[Middleware] Request path:', request.nextUrl.pathname)

  // const isLoggedIn = !!request.nextUrl.auth
  console.log('ROUTE; ', request.nextUrl.pathname)
  // console.log('IS LOGGED IN; ', isLoggedIn)
  console.log('!!! request.nextUrl; ', request.nextUrl)

  // Debug: check all cookies
  console.log('[Middleware] cookies:', [...request.cookies])

  // Check for the session cookie
  const sessionToken =
    request.cookies.get('authjs.session-token')?.value ||
    request.cookies.get('__Secure-authjs.session-token')?.value

  console.log('[Middleware] Session token:', sessionToken)

  // If accessing /user-info routes and no session token is found, redirect to sign in.
  // if (request.nextUrl.pathname.startsWith('/user-info') && !sessionToken) {
  //   console.log('[Middleware] No session token found, redirecting to Sign-In')
  //   const signInUrl = new URL('/auth/signin', request.url)
  //   return NextResponse.redirect(signInUrl)
  // }

  // console.log(
  //   '[Middleware] Session token found or route not protected, allowing access'
  // )
  // return NextResponse.next()

  // Define the routes to protect.
  const protectedRoutes = ['/user-info', '/todos', '/test']

  // Check if the current request matches any of the protected routes.
  const isProtected = protectedRoutes.some(
    (route) => request.nextUrl.pathname === route
  )

  if (isProtected && !sessionToken) {
    console.log(
      '[Middleware] No session token found for a protected route, redirecting to Sign-In'
    )
    const signInUrl = new URL('/auth/signin', request.url)
    return NextResponse.redirect(signInUrl)
  }

  console.log(
    '[Middleware] Session token found or route not protected, allowing access'
  )
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
  // matcher: ['/user-info/:path*'],
}
