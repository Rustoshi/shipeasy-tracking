import type { CompanyBranding, PublicShipment, PublicShipmentHistory } from '@/types'

interface Props {
  company:    CompanyBranding
  shipment:   PublicShipment | null
  history:    PublicShipmentHistory[]
  trackingId: string
}

export default function MeridianTrackingPage({ company, trackingId }: Props) {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      background: '#faf9f7', color: '#1a202c',
      fontFamily: 'system-ui, sans-serif', textAlign: 'center',
    }}>
      <div>
        <div style={{ fontSize: 40, marginBottom: 12 }}>📦</div>
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>
          {company.name}
        </div>
        <div style={{ fontSize: 14, opacity: 0.7, marginBottom: 4 }}>
          Tracking: {trackingId}
        </div>
        <div style={{ fontSize: 12, opacity: 0.4 }}>
          Template: meridian — building...
        </div>
      </div>
    </div>
  )
}
