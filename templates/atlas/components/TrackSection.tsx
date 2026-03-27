'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter }                    from 'next/navigation'
import type { CompanyBranding }         from '@/types'

interface Props {
  company: CompanyBranding
}

export default function AtlasTrackSection({ company }: Props) {
  const router             = useRouter()
  const [input, setInput]  = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef           = useRef<HTMLInputElement>(null)
  const ref                = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    const id = input.trim().toUpperCase()
    if (!id) { inputRef.current?.focus(); return }
    router.push(`/track/${id}${window.location.search}`)
  }

  return (
    <section
      id="track"
      ref={ref}
      style={{
        background: '#f97316',
        padding:    'clamp(64px, 10vw, 96px) 24px',
        position:   'relative',
        overflow:   'hidden',
      }}
    >
      {/* Diagonal texture overlay */}
      <div style={{
        position:   'absolute',
        inset:      0,
        backgroundImage: `repeating-linear-gradient(
          -45deg,
          transparent,
          transparent 20px,
          rgba(255,255,255,0.03) 20px,
          rgba(255,255,255,0.03) 21px
        )`,
        pointerEvents: 'none',
      }} />

      {/* Large faded background text */}
      <div style={{
        position:      'absolute',
        bottom:        -20,
        right:         -20,
        fontFamily:    "'Barlow Condensed', sans-serif",
        fontSize:      'clamp(100px, 18vw, 200px)',
        fontWeight:    900,
        color:         'rgba(255,255,255,0.06)',
        lineHeight:    1,
        userSelect:    'none',
        pointerEvents: 'none',
        letterSpacing: '-0.04em',
      }}>
        TRACK
      </div>

      <div style={{
        maxWidth:    1100,
        margin:      '0 auto',
        position:    'relative',
        zIndex:      1,
        display:     'grid',
        gridTemplateColumns: '1fr 1fr',
        gap:         64,
        alignItems:  'center',
      }} id="atlas-track-grid">

        {/* ── Left: headline ── */}
        <div style={{
          opacity:   visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(-32px)',
          transition:'opacity 700ms ease, transform 700ms ease',
        }}>
          <div style={{
            fontFamily:    "'Nunito Sans', sans-serif",
            fontSize:      11,
            fontWeight:    800,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color:         'rgba(255,255,255,0.65)',
            marginBottom:  16,
          }}>
            Live Tracking
          </div>

          <h2 style={{
            fontFamily:    "'Barlow Condensed', sans-serif",
            fontSize:      'clamp(34px, 5vw, 58px)',
            fontWeight:    800,
            color:         '#ffffff',
            letterSpacing: '-0.01em',
            lineHeight:    1.05,
            marginBottom:  20,
          }}>
            Where Is Your
            Shipment Right Now?
          </h2>

          <p style={{
            fontFamily:  "'Nunito Sans', sans-serif",
            fontSize:    16,
            fontWeight:  400,
            color:       'rgba(255,255,255,0.80)',
            lineHeight:  1.7,
            marginBottom: 32,
            maxWidth:    400,
          }}>
            Enter your tracking ID and get instant real-time status —
            from pickup right through to delivery at your door.
          </p>

          {/* Feature list */}
          <div style={{
            display:       'flex',
            flexDirection: 'column',
            gap:           12,
          }}>
            {[
              'Updates at every customs checkpoint',
              'Email notifications sent automatically',
              'Full timeline from pickup to delivery',
            ].map(item => (
              <div key={item} style={{
                display:    'flex',
                alignItems: 'center',
                gap:        10,
              }}>
                <div style={{
                  width:          22,
                  height:         22,
                  borderRadius:   '50%',
                  background:     'rgba(255,255,255,0.20)',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  flexShrink:     0,
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="white" strokeWidth="3"
                    strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <span style={{
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize:   14,
                  fontWeight: 600,
                  color:      'rgba(255,255,255,0.85)',
                }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: form card ── */}
        <div style={{
          opacity:   visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(32px)',
          transition:'opacity 700ms ease 150ms, transform 700ms ease 150ms',
        }}>
          <div style={{
            background:   '#ffffff',
            borderRadius: 20,
            padding:      '36px 32px',
            boxShadow:    '0 20px 60px rgba(0,0,0,0.20), 0 4px 16px rgba(0,0,0,0.10)',
          }}>
            {/* Card heading */}
            <div style={{
              fontFamily:   "'Barlow Condensed', sans-serif",
              fontSize:     22,
              fontWeight:   800,
              color:        '#111827',
              marginBottom: 6,
              letterSpacing:'0.01em',
            }}>
              Track a Shipment
            </div>
            <div style={{
              fontFamily:   "'Nunito Sans', sans-serif",
              fontSize:     13,
              color:        '#9ca3af',
              marginBottom: 24,
            }}>
              Enter the tracking ID from your shipment confirmation
            </div>

            <form onSubmit={handleTrack}>
              {/* Input wrapper */}
              <div style={{
                display:      'flex',
                alignItems:   'center',
                gap:          10,
                padding:      '4px 14px',
                background:   '#f9fafb',
                borderRadius: 10,
                border:       `2px solid ${focused ? '#f97316' : '#e5e7eb'}`,
                marginBottom: 12,
                transition:   'border-color 200ms ease, box-shadow 200ms ease',
                boxShadow:    focused
                  ? '0 0 0 4px rgba(249,115,22,0.12)'
                  : 'none',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke={focused ? '#f97316' : '#9ca3af'}
                  strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ flexShrink: 0, transition: 'stroke 200ms' }}>
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>

                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="e.g. SE-A1B2C3D4"
                  autoComplete="off"
                  spellCheck={false}
                  style={{
                    flex:       1,
                    background: 'transparent',
                    border:     'none',
                    outline:    'none',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize:   15,
                    fontWeight: 600,
                    color:      '#111827',
                    padding:    '13px 0',
                    letterSpacing: '0.03em',
                  }}
                />

                {input && (
                  <button
                    type="button"
                    onClick={() => { setInput(''); inputRef.current?.focus() }}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: '#9ca3af', padding: 4, fontSize: 20,
                      lineHeight: 1, flexShrink: 0,
                    }}
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                style={{
                  width:         '100%',
                  padding:       '15px',
                  background:    '#f97316',
                  border:        'none',
                  borderRadius:  10,
                  color:         '#ffffff',
                  fontFamily:    "'Nunito Sans', sans-serif",
                  fontSize:      16,
                  fontWeight:    800,
                  cursor:        'pointer',
                  display:       'flex',
                  alignItems:    'center',
                  justifyContent:'center',
                  gap:           8,
                  boxShadow:     '0 4px 16px rgba(249,115,22,0.4)',
                  transition:    'background 200ms ease, transform 150ms ease',
                  letterSpacing: '0.01em',
                  marginBottom:  20,
                }}
                onMouseEnter={e => {
                  const b = e.currentTarget as HTMLButtonElement
                  b.style.background = '#ea580c'
                  b.style.transform  = 'translateY(-1px)'
                }}
                onMouseLeave={e => {
                  const b = e.currentTarget as HTMLButtonElement
                  b.style.background = '#f97316'
                  b.style.transform  = 'none'
                }}
              >
                Track Shipment Now
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </form>

            {/* Trust signals */}
            <div style={{
              display:       'flex',
              justifyContent:'space-between',
              flexWrap:      'wrap',
              gap:           8,
              paddingTop:    16,
              borderTop:     '1px solid #f3f4f6',
            }}>
              {[
                'Real-time updates',
                'No login required',
                'Instant results',
              ].map(item => (
                <div key={item} style={{
                  display:    'flex',
                  alignItems: 'center',
                  gap:        5,
                }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                    stroke="#f97316" strokeWidth="3"
                    strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span style={{
                    fontFamily: "'Nunito Sans', sans-serif",
                    fontSize:   11,
                    fontWeight: 600,
                    color:      '#9ca3af',
                    whiteSpace: 'nowrap',
                  }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          #atlas-track-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  )
}
