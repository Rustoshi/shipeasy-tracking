import type { CompanyBranding, PublicShipment, PublicShipmentHistory } from '@/types'

interface Props {
  company:  CompanyBranding
  shipment: PublicShipment
  history:  PublicShipmentHistory[]
}

export default function PulseReceiptPage({ company, shipment }: Props) {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      background: '#ffffff', color: '#0f172a',
      fontFamily: 'system-ui, sans-serif', textAlign: 'center',
    }}>
      <div>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🧾</div>
        <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
          {company.name}
        </div>
        <div style={{ fontSize: 14, opacity: 0.7, marginBottom: 4 }}>
          Receipt: {shipment.trackingId}
        </div>
        <div style={{ fontSize: 12, opacity: 0.3, marginTop: 16 }}>
          Template: pulse — building...
        </div>
      </div>
    </div>
  )
}
