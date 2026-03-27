'use client'

import type { CompanyBranding } from '@/types'

interface Props {
  company: CompanyBranding
}

const QUICK_LINKS = [
  { label: 'Home',         href: '#home'         },
  { label: 'Services',     href: '#services'      },
  { label: 'How It Works', href: '#how-it-works'  },
  { label: 'Why Choose Us',href: '#why-us'        },
  { label: 'Gallery',      href: '#gallery'       },
  { label: 'Track',        href: '#track'         },
  { label: 'Contact',      href: '#contact'       },
]

const SERVICES = [
  'Ocean Freight',
  'Air Freight',
  'Road Freight',
  'Rail Transport',
  'Warehousing & Fulfilment',
  'International Freight',
]

const linkStyle: React.CSSProperties = {
  fontFamily:    "'Nunito Sans', sans-serif",
  fontSize:      13,
  fontWeight:    400,
  color:         'rgba(255,255,255,0.50)',
  textDecoration:'none',
  display:       'block',
  padding:       '4px 0',
  transition:    'color 180ms ease',
  cursor:        'pointer',
  background:    'none',
  border:        'none',
  textAlign:     'left',
  width:         '100%',
}

const colTitleStyle: React.CSSProperties = {
  fontFamily:    "'Barlow Condensed', sans-serif",
  fontSize:      13,
  fontWeight:    700,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color:         '#ffffff',
  marginBottom:  18,
  paddingLeft:   10,
  borderLeft:    '2px solid #f97316',
}

export default function AtlasFooter({ company }: Props) {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 72
    window.scrollTo({ top, behavior: 'smooth' })
  }

  const year = new Date().getFullYear()

  return (
    <footer style={{
      background:  '#111827',
      borderTop:   '3px solid #f97316',
    }}>

      {/* ── Main footer columns ── */}
      <div style={{
        maxWidth: 1100,
        margin:   '0 auto',
        padding:  '56px 24px 40px',
        display:  'grid',
        gridTemplateColumns: '1.6fr 1fr 1fr 1.2fr',
        gap:      40,
      }} id="atlas-footer-grid">

        {/* Column 1 — Brand */}
        <div>
          {/* Logo */}
          <div style={{
            display:      'flex',
            alignItems:   'center',
            gap:          10,
            marginBottom: 14,
          }}>
            {company.logo ? (
              <img
                src={company.logo}
                alt={company.name}
                style={{
                  height:    36,
                  width:     'auto',
                  objectFit: 'contain',
                }}
              />
            ) : (
              <div style={{
                width:          36,
                height:         36,
                borderRadius:   8,
                background:     '#f97316',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                flexShrink:     0,
              }}>
                <span style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize:   18,
                  fontWeight: 700,
                  color:      '#ffffff',
                }}>
                  {company.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <span style={{
              fontFamily:    "'Barlow Condensed', sans-serif",
              fontSize:      20,
              fontWeight:    700,
              color:         '#ffffff',
              letterSpacing: '0.01em',
            }}>
              {company.name}
            </span>
          </div>

          {/* Tagline */}
          <p style={{
            fontFamily:   "'Nunito Sans', sans-serif",
            fontSize:     13,
            fontWeight:   400,
            color:        'rgba(255,255,255,0.42)',
            lineHeight:   1.7,
            marginBottom: 24,
            maxWidth:     240,
          }}>
            End-to-end freight forwarding and logistics solutions
            connecting businesses to 180+ countries worldwide.
          </p>

          {/* Contact quick links */}
          <div style={{
            display:       'flex',
            flexDirection: 'column',
            gap:           10,
          }}>
            {company.email && (
              <a
                href={`mailto:${company.email}`}
                style={{
                  display:    'flex',
                  alignItems: 'center',
                  gap:        8,
                  ...linkStyle,
                }}
                onMouseEnter={e =>
                  (e.currentTarget as HTMLAnchorElement).style.color = '#f97316'
                }
                onMouseLeave={e =>
                  (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.50)'
                }
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                {company.email}
              </a>
            )}
            {company.phone && (
              <a
                href={`tel:${company.phone}`}
                style={{
                  display:    'flex',
                  alignItems: 'center',
                  gap:        8,
                  ...linkStyle,
                }}
                onMouseEnter={e =>
                  (e.currentTarget as HTMLAnchorElement).style.color = '#f97316'
                }
                onMouseLeave={e =>
                  (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.50)'
                }
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                {company.phone}
              </a>
            )}
          </div>
        </div>

        {/* Column 2 — Quick Links */}
        <div>
          <div style={colTitleStyle}>Quick Links</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {QUICK_LINKS.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                style={linkStyle}
                onMouseEnter={e =>
                  (e.currentTarget as HTMLButtonElement).style.color = '#f97316'
                }
                onMouseLeave={e =>
                  (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.50)'
                }
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Column 3 — Services */}
        <div>
          <div style={colTitleStyle}>Services</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {SERVICES.map(service => (
              <button
                key={service}
                onClick={() => scrollTo('#services')}
                style={linkStyle}
                onMouseEnter={e =>
                  (e.currentTarget as HTMLButtonElement).style.color = '#f97316'
                }
                onMouseLeave={e =>
                  (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.50)'
                }
              >
                {service}
              </button>
            ))}
          </div>
        </div>

        {/* Column 4 — Contact Info */}
        <div>
          <div style={colTitleStyle}>Contact Info</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {company.address && (
              <div>
                <div style={{
                  fontFamily:    "'Nunito Sans', sans-serif",
                  fontSize:      10,
                  fontWeight:    700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color:         '#f97316',
                  marginBottom:  4,
                }}>
                  Address
                </div>
                <div style={{
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize:   13,
                  color:      'rgba(255,255,255,0.50)',
                  lineHeight: 1.65,
                }}>
                  {company.address}
                </div>
              </div>
            )}
            <div>
              <div style={{
                fontFamily:    "'Nunito Sans', sans-serif",
                fontSize:      10,
                fontWeight:    700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color:         '#f97316',
                marginBottom:  4,
              }}>
                Business Hours
              </div>
              <div style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize:   13,
                color:      'rgba(255,255,255,0.50)',
                lineHeight: 1.8,
              }}>
                Mon – Fri: 8:00 AM – 6:00 PM<br />
                Saturday: 9:00 AM – 2:00 PM<br />
                Sunday: Closed
              </div>
            </div>
            {/* Track CTA */}
            <button
              onClick={() => scrollTo('#track')}
              style={{
                padding:       '11px 0',
                background:    '#f97316',
                border:        'none',
                borderRadius:  8,
                color:         '#ffffff',
                fontFamily:    "'Nunito Sans', sans-serif",
                fontSize:      13,
                fontWeight:    800,
                cursor:        'pointer',
                width:         '100%',
                letterSpacing: '0.02em',
                transition:    'background 200ms ease',
              }}
              onMouseEnter={e =>
                (e.currentTarget as HTMLButtonElement).style.background = '#ea580c'
              }
              onMouseLeave={e =>
                (e.currentTarget as HTMLButtonElement).style.background = '#f97316'
              }
            >
              Track a Shipment →
            </button>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{
          maxWidth:        1100,
          margin:          '0 auto',
          padding:         '18px 24px',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'space-between',
          flexWrap:        'wrap',
          gap:             10,
        }}>
          <div style={{
            fontFamily: "'Nunito Sans', sans-serif",
            fontSize:   12,
            color:      'rgba(255,255,255,0.28)',
          }}>
            © {year} {company.name}. All rights reserved.
          </div>

          <div style={{
            fontFamily: "'Nunito Sans', sans-serif",
            fontSize:   11,
            color:      'rgba(255,255,255,0.18)',
            letterSpacing: '0.04em',
          }}>
            Powered by {process.env.NEXT_PUBLIC_APP_NAME ?? 'ShipEasy'}
          </div>
        </div>
      </div>

      {/* ── Responsive ── */}
      <style>{`
        @media (max-width: 640px) {
          #atlas-footer-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
        @media (min-width: 641px) and (max-width: 900px) {
          #atlas-footer-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </footer>
  )
}
