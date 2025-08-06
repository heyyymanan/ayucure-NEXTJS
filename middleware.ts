import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of protected paths (anything else is public)
const PROTECTED_PATHS = [''] //not needed as already handled in the backend via JWT

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('access_token')?.value

  const isProtected = PROTECTED_PATHS.some((protectedPath) =>
    pathname === protectedPath || pathname.startsWith(protectedPath + '/')
  )

  if (!isProtected) {
    // All other routes are public
    return NextResponse.next()
  }

  if (!token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname) // Optional: redirect back after login
    return NextResponse.redirect(loginUrl)
  }

  // User is authenticated
  return NextResponse.next()
}


// Define which paths middleware should run on
export const config = {
  matcher: ["/"], 
}

