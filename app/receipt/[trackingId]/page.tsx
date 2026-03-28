import { getSlugFromHeaders }                        from '@/lib/subdomain'
import { getCompanyBySlug, getShipmentByTrackingId } from '@/lib/tracking'
import { notFound }                                  from 'next/navigation'

import AtlasReceipt    from '@/templates/atlas/ReceiptPage'
import PulseReceipt    from '@/templates/pulse/ReceiptPage'
import MeridianReceipt from '@/templates/meridian/ReceiptPage'

interface Props {
  params:       Promise<{ trackingId: string }>
  searchParams: Promise<{ slug?: string }>
}

export const dynamic = 'force-dynamic'

export default async function ReceiptPage({ params, searchParams }: Props) {
  const { trackingId } = await params
  const search = await searchParams
  const slug = (await getSlugFromHeaders()) ?? search.slug ?? null
  if (!slug) return notFound()

  const [company, data] = await Promise.all([
    getCompanyBySlug(slug),
    getShipmentByTrackingId(trackingId),
  ])

  if (!company || !data?.shipment) return notFound()

  const props = {
    company,
    shipment: data.shipment,
    history:  data.history,
  }

  if (company.templateId === 'pulse')    return <PulseReceipt    {...props} />
  if (company.templateId === 'meridian') return <MeridianReceipt {...props} />
  return <AtlasReceipt {...props} />
}
