'use client'

import { useEffect } from 'react'
import type {
  CompanyBranding,
  PublicShipment,
  PublicShipmentHistory,
} from '@/types'

interface Props {
  company:  CompanyBranding
  shipment: PublicShipment
  history:  PublicShipmentHistory[]
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('en-GB', {
    day:    '2-digit',
    month:  'long',
    year:   'numeric',
    hour:   '2-digit',
    minute: '2-digit',
  })
}

function formatDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day:   '2-digit',
    month: 'long',
    year:  'numeric',
  })
}

export default function AtlasReceiptPage({
  company,
  shipment,
  history,
}: Props) {

  // ── Load fonts ──────────────────────────────────────────────
  useEffect(() => {
    const link  = document.createElement('link')
    link.rel    = 'stylesheet'
    link.href   = 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Nunito+Sans:opsz,wght@6..12,400;6..12,500;6..12,600;6..12,700;6..12,800&family=JetBrains+Mono:wght@400;600&display=swap'
    document.head.appendChild(link)
    document.title = `Receipt — ${shipment.trackingId} — ${company.name}` 
  }, [shipment.trackingId, company.name])

  // ── Auto-print on load ──────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => {
      window.print()
    }, 1200)
    return () => clearTimeout(t)
  }, [])

  const sortedHistory = [...history].sort(
    (a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )

  return (
    <>
      {/* ── Print CSS ── */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; margin: 0; padding: 0; }
          @page {
            size: A4 portrait;
            margin: 15mm 12mm;
          }
          .receipt-page { padding: 0 !important; }
          .page-break { page-break-before: always; }
        }
        @media screen {
          body { background: #f3f4f6; }
        }
        @media (max-width: 640px) {
          .receipt-header { flex-direction: column !important; gap: 20px !important; }
          .receipt-header > div:last-child { text-align: left !important; }
          .receipt-parties { grid-template-columns: 1fr !important; }
          .receipt-footer { grid-template-columns: 1fr !important; gap: 24px !important; }
          .receipt-footer > div:last-child { text-align: left !important; }
        }
      `}</style>

      {/* ── Screen-only controls ── */}
      <div className="no-print" style={{
        position:       'fixed',
        top:            0, left: 0, right: 0,
        zIndex:         1000,
        background:     '#111827',
        padding:        '12px 24px',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        gap:            12,
      }}>
        <div style={{
          fontFamily: "'Nunito Sans', sans-serif",
          fontSize:   14,
          color:      'rgba(255,255,255,0.7)',
        }}>
          Receipt — {shipment.trackingId}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => window.close()}
            style={{
              padding:      '8px 16px',
              background:   'rgba(255,255,255,0.08)',
              border:       '1px solid rgba(255,255,255,0.12)',
              borderRadius: 6,
              color:        'rgba(255,255,255,0.7)',
              fontFamily:   "'Nunito Sans', sans-serif",
              fontSize:     13,
              cursor:       'pointer',
            }}
          >
            ← Close
          </button>
          <button
            onClick={() => window.print()}
            style={{
              padding:      '8px 20px',
              background:   '#f97316',
              border:       'none',
              borderRadius: 6,
              color:        'white',
              fontFamily:   "'Nunito Sans', sans-serif",
              fontSize:     13,
              fontWeight:   700,
              cursor:       'pointer',
              display:      'flex',
              alignItems:   'center',
              gap:          6,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 6 2 18 2 18 9"/>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
              <rect x="6" y="14" width="12" height="8"/>
            </svg>
            Print / Save PDF
          </button>
        </div>
      </div>

      {/* ── Receipt document ── */}
      <div className="receipt-page" style={{
        maxWidth:    794,
        margin:      '0 auto',
        padding:     '80px 24px 40px',
        background:  'white',
        minHeight:   '100vh',
        fontFamily:  "'Nunito Sans', sans-serif",
        color:       '#111827',
      }}>

        {/* ════════════════════════════════════════════════
            HEADER
        ════════════════════════════════════════════════ */}
        <div className="receipt-header" style={{
          display:         'flex',
          justifyContent:  'space-between',
          alignItems:      'flex-start',
          paddingBottom:   24,
          marginBottom:    28,
          borderBottom:    '3px solid #f97316',
        }}>
          {/* Company info */}
          <div>
            {company.logo && (
              <img
                src={company.logo}
                alt={company.name}
                style={{
                  height:       48,
                  objectFit:    'contain',
                  marginBottom: 10,
                  display:      'block',
                }}
              />
            )}
            <div style={{
              fontFamily:   "'Barlow Condensed', sans-serif",
              fontSize:     26,
              fontWeight:   800,
              color:        '#111827',
              letterSpacing:'-0.01em',
              marginBottom: 4,
            }}>
              {company.name}
            </div>
            <div style={{
              fontSize:   12,
              color:      '#6b7280',
              lineHeight: 1.7,
            }}>
              {company.address && <div>{company.address}</div>}
              {company.email && (
                <div>{company.email}</div>
              )}
              {company.phone && (
                <div>{company.phone}</div>
              )}
            </div>
          </div>

          {/* Document title + metadata */}
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontFamily:    "'Barlow Condensed', sans-serif",
              fontSize:      32,
              fontWeight:    800,
              color:         '#f97316',
              letterSpacing: '-0.02em',
              lineHeight:    1,
              marginBottom:  10,
            }}>
              SHIPMENT RECEIPT
            </div>

            {/* Tracking ID */}
            <div style={{
              display:       'inline-block',
              padding:       '6px 14px',
              background:    '#fff7ed',
              border:        '1px solid #fed7aa',
              borderRadius:  6,
              fontFamily:    "'JetBrains Mono', monospace",
              fontSize:      15,
              fontWeight:    600,
              color:         '#f97316',
              marginBottom:  10,
            }}>
              {shipment.trackingId}
            </div>

            <div style={{
              fontSize:   12,
              color:      '#6b7280',
              lineHeight: 1.7,
            }}>
              <div>
                <strong style={{ color: '#374151' }}>Issued:</strong>{' '}
                {formatDateShort(shipment.createdAt)}
              </div>
              <div>
                <strong style={{ color: '#374151' }}>Status:</strong>{' '}
                <span style={{
                  color:      '#f97316',
                  fontWeight: 600,
                }}>
                  {shipment.currentStatus}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════
            PARTIES
        ════════════════════════════════════════════════ */}
        <div className="receipt-parties" style={{
          display:       'grid',
          gridTemplateColumns: '1fr 1fr',
          gap:           24,
          marginBottom:  28,
        }}>
          {/* Sender */}
          <div style={{
            padding:      16,
            background:   '#f9fafb',
            borderRadius: 8,
            border:       '1px solid #e5e7eb',
          }}>
            <div style={{
              fontFamily:    "'Nunito Sans', sans-serif",
              fontSize:      9,
              fontWeight:    800,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color:         '#f97316',
              marginBottom:  10,
              paddingBottom: 6,
              borderBottom:  '1px solid #e5e7eb',
            }}>
              Shipper / Consignor
            </div>
            <div style={{
              fontFamily:   "'Barlow Condensed', sans-serif",
              fontSize:     17,
              fontWeight:   700,
              color:        '#111827',
              marginBottom: 6,
            }}>
              {shipment.senderName}
            </div>
            <div style={{
              fontSize:   12,
              color:      '#6b7280',
              lineHeight: 1.65,
            }}>
              {shipment.senderAddress && (
                <div>{shipment.senderAddress}</div>
              )}
              <div style={{ fontWeight: 600, color: '#374151' }}>
                {shipment.originCountry}
              </div>
            </div>
          </div>

          {/* Receiver */}
          <div style={{
            padding:      16,
            background:   '#f9fafb',
            borderRadius: 8,
            border:       '1px solid #e5e7eb',
          }}>
            <div style={{
              fontFamily:    "'Nunito Sans', sans-serif",
              fontSize:      9,
              fontWeight:    800,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color:         '#f97316',
              marginBottom:  10,
              paddingBottom: 6,
              borderBottom:  '1px solid #e5e7eb',
            }}>
              Consignee / Receiver
            </div>
            <div style={{
              fontFamily:   "'Barlow Condensed', sans-serif",
              fontSize:     17,
              fontWeight:   700,
              color:        '#111827',
              marginBottom: 6,
            }}>
              {shipment.receiverName}
            </div>
            <div style={{
              fontSize:   12,
              color:      '#6b7280',
              lineHeight: 1.65,
            }}>
              {shipment.receiverAddress && (
                <div>{shipment.receiverAddress}</div>
              )}
              <div style={{ fontWeight: 600, color: '#374151' }}>
                {shipment.destinationCountry}
              </div>
              {shipment.receiverEmail && (
                <div>{shipment.receiverEmail}</div>
              )}
              {shipment.receiverPhone && (
                <div>{shipment.receiverPhone}</div>
              )}
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════
            SHIPMENT DETAILS TABLE
        ════════════════════════════════════════════════ */}
        <div style={{ marginBottom: 24 }}>
          <div style={{
            fontFamily:    "'Nunito Sans', sans-serif",
            fontSize:      9,
            fontWeight:    800,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color:         '#f97316',
            marginBottom:  10,
          }}>
            Cargo Details
          </div>
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <table style={{
              width:           '100%',
              borderCollapse:  'collapse',
              fontSize:        12,
              minWidth:        600,
            }}>
              <thead>
                <tr style={{
                  background:   '#111827',
                  color:        'white',
                }}>
                  {['Description of Goods', 'Port of Loading',
                    'Port of Discharge', 'Gross Weight',
                    'Declared Value'].map(h => (
                    <th key={h} style={{
                      padding:   '9px 12px',
                      textAlign: 'left',
                      fontFamily:"'Nunito Sans', sans-serif",
                      fontSize:  10,
                      fontWeight:700,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px', color: '#111827', fontWeight: 500 }}>
                    {shipment.description}
                  </td>
                  <td style={{ padding: '12px', color: '#374151', whiteSpace: 'nowrap' }}>
                    {shipment.originCountry}
                  </td>
                  <td style={{ padding: '12px', color: '#374151', whiteSpace: 'nowrap' }}>
                    {shipment.destinationCountry}
                  </td>
                  <td style={{
                    padding:    '12px',
                    fontFamily: "'JetBrains Mono', monospace",
                    color:      '#111827',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                  }}>
                    {shipment.weight} kg
                  </td>
                  <td style={{
                    padding:    '12px',
                    fontFamily: "'JetBrains Mono', monospace",
                    color:      '#111827',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                  }}>
                    {shipment.currency}{' '}
                    {Number(shipment.declaredValue).toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ════════════════════════════════════════════════
            CHARGES
        ════════════════════════════════════════════════ */}
        {shipment.charges?.visible &&
          shipment.charges.amount > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div style={{
              fontFamily:    "'Nunito Sans', sans-serif",
              fontSize:      9,
              fontWeight:    800,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color:         '#f97316',
              marginBottom:  10,
            }}>
              Charges & Fees
            </div>
            <div style={{
              display:        'flex',
              justifyContent: 'space-between',
              alignItems:     'center',
              padding:        '14px 16px',
              background:     '#fff7ed',
              border:         '1px solid #fed7aa',
              borderRadius:   8,
            }}>
              <div>
                <div style={{
                  fontFamily:   "'Nunito Sans', sans-serif",
                  fontSize:     14,
                  fontWeight:   600,
                  color:        '#92400e',
                  marginBottom: 6,
                }}>
                  {shipment.charges.description ?? 'Shipping & Customs Clearance Fee'}
                </div>
                <span style={{
                  fontFamily:   "'Nunito Sans', sans-serif",
                  fontSize:     11,
                  fontWeight:   700,
                  padding:      '3px 8px',
                  borderRadius: 4,
                  background:   shipment.charges.status === 'Paid' ? '#dcfce7' :
                                shipment.charges.status === 'Partially paid' ? '#fef3c7' : '#fee2e2',
                  color:        shipment.charges.status === 'Paid' ? '#166534' :
                                shipment.charges.status === 'Partially paid' ? '#92400e' : '#991b1b',
                }}>
                  {shipment.charges.status ?? 'Unpaid'}
                </span>
              </div>
              <div style={{
                fontFamily:    "'JetBrains Mono', monospace",
                fontSize:      22,
                fontWeight:    700,
                color:         '#f97316',
                letterSpacing: '-0.01em',
              }}>
                {shipment.charges.currency}{' '}
                {Number(shipment.charges.amount).toLocaleString()}
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════
            CARRIER INFO
        ════════════════════════════════════════════════ */}
        {(shipment.carrier?.name || shipment.carrier?.trackingCode) && (
          <div style={{ marginBottom: 24 }}>
            <div style={{
              fontFamily:    "'Nunito Sans', sans-serif",
              fontSize:      9,
              fontWeight:    800,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color:         '#f97316',
              marginBottom:  10,
            }}>
              Carrier Information
            </div>
            <div style={{
              display:      'flex',
              gap:          32,
              padding:      '12px 16px',
              background:   '#f9fafb',
              borderRadius: 8,
              border:       '1px solid #e5e7eb',
            }}>
              {shipment.carrier.name && (
                <div>
                  <div style={{
                    fontSize:      10,
                    color:         '#9ca3af',
                    marginBottom:  3,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}>
                    Carrier
                  </div>
                  <div style={{
                    fontSize:   14,
                    fontWeight: 600,
                    color:      '#111827',
                  }}>
                    {shipment.carrier.name}
                  </div>
                </div>
              )}
              {shipment.carrier.trackingCode && (
                <div>
                  <div style={{
                    fontSize:      10,
                    color:         '#9ca3af',
                    marginBottom:  3,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}>
                    Carrier Reference
                  </div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize:   13,
                    fontWeight: 600,
                    color:      '#111827',
                  }}>
                    {shipment.carrier.trackingCode}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════
            STATUS HISTORY TABLE
        ════════════════════════════════════════════════ */}
        {sortedHistory.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <div style={{
              fontFamily:    "'Nunito Sans', sans-serif",
              fontSize:      9,
              fontWeight:    800,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color:         '#f97316',
              marginBottom:  10,
            }}>
              Movement History
            </div>
            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
              <table style={{
                width:          '100%',
                borderCollapse: 'collapse',
                fontSize:       11,
                minWidth:       500,
              }}>
                <thead>
                  <tr style={{ background: '#111827' }}>
                    {['Status', 'Location', 'Remarks', 'Date & Time'].map(h => (
                      <th key={h} style={{
                        padding:       '8px 10px',
                        textAlign:     'left',
                        color:         'white',
                        fontFamily:    "'Nunito Sans', sans-serif",
                        fontSize:      10,
                        fontWeight:    700,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        whiteSpace:    'nowrap',
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedHistory.map((entry, i) => (
                    <tr
                      key={entry._id}
                      style={{
                        background:   i % 2 === 0 ? 'white' : '#f9fafb',
                        borderBottom: '1px solid #e5e7eb',
                      }}
                    >
                      <td style={{
                        padding:    '9px 10px',
                        fontWeight: i === 0 ? 700 : 500,
                        color:      i === 0 ? '#f97316' : '#111827',
                        fontFamily: "'Nunito Sans', sans-serif",
                        whiteSpace: 'nowrap',
                      }}>
                        {entry.status}
                        {i === 0 && (
                          <span style={{
                            marginLeft:    6,
                            fontSize:      9,
                            background:    '#fff7ed',
                            color:         '#f97316',
                            padding:       '1px 5px',
                            borderRadius:  3,
                            border:        '1px solid #fed7aa',
                            fontWeight:    700,
                            letterSpacing: '0.08em',
                          }}>
                            CURRENT
                          </span>
                        )}
                      </td>
                      <td style={{
                        padding: '9px 10px',
                        color:   '#6b7280',
                      }}>
                        {entry.location ?? '—'}
                      </td>
                      <td style={{
                        padding: '9px 10px',
                        color:   '#6b7280',
                      }}>
                        {entry.remark ?? '—'}
                      </td>
                      <td style={{
                        padding:    '9px 10px',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize:   10,
                        color:      '#9ca3af',
                        whiteSpace: 'nowrap',
                      }}>
                        {formatDate(entry.timestamp)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════
            FOOTER / SIGNATURE
        ════════════════════════════════════════════════ */}
        <div className="receipt-footer" style={{
          borderTop:     '2px solid #f97316',
          paddingTop:    20,
          display:       'grid',
          gridTemplateColumns: '1fr 1fr',
          gap:           32,
          alignItems:    'end',
        }}>
          {/* Left: disclaimer */}
          <div style={{
            fontSize:   11,
            color:      '#9ca3af',
            lineHeight: 1.65,
          }}>
            <p style={{ marginBottom: 4 }}>
              This document is issued by <strong style={{ color: '#374151' }}>
                {company.name}
              </strong> and serves as official confirmation of the shipment
              details described above.
            </p>
            <p style={{ marginBottom: 4 }}>
              For queries regarding this shipment, contact us at{' '}
              <strong style={{ color: '#374151' }}>{company.email}</strong>
              {company.phone && ` or ${company.phone}`}.
            </p>
            <p>
              © {new Date().getFullYear()} {company.name}
            </p>
          </div>

          {/* Right: signature block */}
          <div style={{ textAlign: 'right' }}>
            <div style={{
              height:        48,
              borderBottom:  '1px solid #111827',
              marginBottom:  6,
            }} />
            <div style={{
              fontSize:      11,
              color:         '#374151',
              fontWeight:    600,
            }}>
              Authorised Signatory
            </div>
            <div style={{
              fontSize:   11,
              color:      '#9ca3af',
              marginTop:  2,
            }}>
              {company.name}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
