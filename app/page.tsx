import { getSlugFromHeaders } from '@/lib/subdomain'
import { getCompanyBySlug }   from '@/lib/tracking'

import AtlasLanding    from '@/templates/atlas/LandingPage'
import PulseLanding    from '@/templates/pulse/LandingPage'
import MeridianLanding from '@/templates/meridian/LandingPage'

export const dynamic = 'force-dynamic'

interface Props {
  searchParams: Promise<{ slug?: string; domain?: string }>
}

export default async function RootPage({ searchParams }: Props) {
  const params = await searchParams
  // Subdomain in production, ?slug= query param in local dev
  const slug = getSlugFromHeaders() ?? params.slug ?? null

  if (!slug) {
    return (
      <div style={{
        minHeight:   '100vh',
        display:     'flex',
        flexDirection: 'column',
        alignItems:  'center',
        justifyContent: 'center',
        background:  '#040d1f',
        color:       'white',
        fontFamily:  'system-ui, sans-serif',
        textAlign:   'center',
        padding:     '24px',
        gap:         12,
      }}>
        <div style={{ fontSize: 40 }}>📦</div>
        <div style={{ fontSize: 18, fontWeight: 700 }}>
          No company found
        </div>
        <div style={{ fontSize: 13, opacity: 0.4, maxWidth: 360 }}>
          Visit this page with a company slug.<br />
          Local dev: <code>http://localhost:3001?slug=yourslug</code>
        </div>
      </div>
    )
  }

  const company = await getCompanyBySlug(slug)

  if (!company) {
    return (
      <div style={{
        minHeight:   '100vh',
        display:     'flex',
        flexDirection: 'column',
        alignItems:  'center',
        justifyContent: 'center',
        background:  '#040d1f',
        color:       'white',
        fontFamily:  'system-ui, sans-serif',
        textAlign:   'center',
        padding:     '24px',
        gap:         12,
      }}>
        <div style={{ fontSize: 40 }}>🔍</div>
        <div style={{ fontSize: 18, fontWeight: 700 }}>
          Company not found
        </div>
        <div style={{ fontSize: 13, opacity: 0.4 }}>
          No company with slug <code style={{ color: '#c9a84c' }}>{slug}</code>
        </div>
      </div>
    )
  }

  if (company.templateId === 'pulse')    return <PulseLanding    company={company} />
  if (company.templateId === 'meridian') return <MeridianLanding company={company} />
  return <AtlasLanding company={company} />
}
