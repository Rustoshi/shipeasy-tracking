import type { CompanyBranding } from '@/types'

interface Props {
  company: CompanyBranding
}

export default function MeridianLandingPage({ company }: Props) {
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
        <div style={{ fontSize: 12, opacity: 0.4 }}>
          Template: meridian — building...
        </div>
      </div>
    </div>
  )
}
