import { getSlugFromHeaders }                        from '@/lib/subdomain'
import { getCompanyBySlug, getShipmentByTrackingId } from '@/lib/tracking'
import { notFound }                                  from 'next/navigation'
import type { Metadata }                             from 'next'

import AtlasTracking    from '@/templates/atlas/TrackingPage'
import PulseTracking    from '@/templates/pulse/TrackingPage'
import MeridianTracking from '@/templates/meridian/TrackingPage'

interface Props {
  params:       Promise<{ trackingId: string }>
  searchParams: Promise<{ slug?: string }>
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { trackingId } = await params
  const search = await searchParams
  const slug    = (await getSlugFromHeaders()) ?? search.slug ?? null
  const company = slug ? await getCompanyBySlug(slug) : null
  return {
    title:  `Track ${trackingId}${company ? ` — ${company.name}` : ''}`,
    robots: 'noindex',
  }
}

export const dynamic    = 'force-dynamic'
export const revalidate = 0

export default async function TrackPage({ params, searchParams }: Props) {
  const { trackingId } = await params
  const search = await searchParams
  const slug = (await getSlugFromHeaders()) ?? search.slug ?? null
  if (!slug) return notFound()

  const [company, data] = await Promise.all([
    getCompanyBySlug(slug),
    getShipmentByTrackingId(trackingId),
  ])

  if (!company) return notFound()

  const props = {
    company,
    shipment:   data?.shipment ?? null,
    history:    data?.history  ?? [],
    trackingId,
  }

  if (company.templateId === 'pulse')    return <PulseTracking    {...props} />
  if (company.templateId === 'meridian') return <MeridianTracking {...props} />
  return <AtlasTracking {...props} />
}
