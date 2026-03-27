import { NextRequest, NextResponse } from 'next/server'
import { getSlugFromHost } from '@/lib/subdomain'

const BYPASS_PATHS = [
  '/_next',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
  '/api',
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const host = request.headers.get('host') ?? ''

  if (BYPASS_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  let slug = getSlugFromHost(host)

  // Fallback to query params for local dev: ?slug=yourslug
  if (!slug) {
    slug = request.nextUrl.searchParams.get('slug')
  }

  if (!slug) {
    return NextResponse.next()
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-company-slug', slug)
  requestHeaders.set('x-host', host)

  return NextResponse.next({
    request: { headers: requestHeaders },
  })
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
