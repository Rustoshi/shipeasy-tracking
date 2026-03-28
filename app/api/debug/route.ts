import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const host = request.headers.get('host') ?? 'no host header'
  const xHost = request.headers.get('x-forwarded-host') ?? 'none'
  const xSlug = request.headers.get('x-company-slug') ?? 'none'
  const allHeaders: Record<string, string> = {}

  request.headers.forEach((value, key) => {
    allHeaders[key] = value
  })

  return NextResponse.json({
    host,
    xForwardedHost: xHost,
    xCompanySlug: xSlug,
    url: request.url,
    allHeaders,
  })
}
