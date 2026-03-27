import api from './api'
import type { CompanyBranding, PublicShipment, PublicShipmentHistory } from '@/types'

export async function getCompanyBySlug(
  slug: string
): Promise<CompanyBranding | null> {
  try {
    const res  = await api.get(`/api/public/company/${slug}`)
    const data = res.data.data

    if (!data?.company) return null

    // Template is a sibling of company in the response
    const template = data.template ?? {}

    return {
      _id:            data.company._id,
      name:           data.company.name,
      slug:           data.company.slug,
      logo:           data.company.logo           ?? null,
      email:          data.company.email          ?? '',
      phone:          data.company.phone          ?? '',
      address:        data.company.address        ?? '',
      baseDomain:     data.company.baseDomain     ?? '',
      templateId:     template.templateId         ?? 'atlas',
      primaryColor:   template.primaryColor       ?? '#000000',
      secondaryColor: template.secondaryColor     ?? '#ffffff',
      font:           template.font               ?? 'Inter',
      support:        data.company.support        ?? null,
    }
  } catch {
    return null
  }
}

export async function getShipmentByTrackingId(trackingId: string): Promise<{
  shipment: PublicShipment
  history:  PublicShipmentHistory[]
} | null> {
  try {
    const res  = await api.get(`/api/public/shipment/${trackingId}`)
    const data = res.data.data

    if (!data?.shipment) return null

    return {
      shipment: data.shipment,
      history:  data.history ?? [],
    }
  } catch {
    return null
  }
}
