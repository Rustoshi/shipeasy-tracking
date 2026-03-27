import { headers } from 'next/headers'

export function getSlugFromHost(host: string): string | null {
  const clean = host.split(':')[0]
  const parts = clean.split('.')
  if (parts.length < 3) return null
  const slug = parts[0]
  if (['www', 'app', 'api', 'admin', 'mail'].includes(slug)) return null
  return slug
}

export function getSlugFromHeaders(): string | null {
  try {
    const headersList = headers() as unknown as { get: (name: string) => string | null }

    // Check middleware-injected header first (production subdomain)
    const injected = headersList.get('x-company-slug')
    if (injected) return injected

    // Fall back to host header
    const host = headersList.get('host') ?? ''
    return getSlugFromHost(host)
  } catch {
    return null
  }
}
