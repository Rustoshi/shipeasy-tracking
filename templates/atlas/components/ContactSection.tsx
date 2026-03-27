'use client'

import { useState, useRef, useEffect } from 'react'
import type { CompanyBranding }        from '@/types'
import api                             from '@/lib/api'

interface Props {
  company: CompanyBranding
}

type FormState = 'idle' | 'submitting' | 'success' | 'error'

function ContactIcon({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      width:          36,
      height:         36,
      borderRadius:   8,
      background:     '#fff7ed',
      border:         '1px solid #fed7aa',
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      flexShrink:     0,
    }}>
      {children}
    </div>
  )
}

export default function AtlasContactSection({ company }: Props) {
  const ref               = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg]   = useState('')

  const [fields, setFields] = useState({
    name:    '',
    email:   '',
    phone:   '',
    subject: 'General Enquiry',
    message: '',
  })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fields.name || !fields.email || !fields.message) return
    setFormState('submitting')
    setErrorMsg('')

    try {
      await api.post('/api/public/contact', {
        ...fields,
        companySlug: company.slug,
      })
      setFormState('success')
      setFields({ name: '', email: '', phone: '', subject: 'General Enquiry', message: '' })
    } catch {
      setFormState('error')
      setErrorMsg('Something went wrong. Please try again or contact us directly.')
    }
  }

  const inputStyle: React.CSSProperties = {
    width:        '100%',
    padding:      '12px 14px',
    background:   '#f9fafb',
    border:       '1.5px solid #e5e7eb',
    borderRadius: 8,
    fontFamily:   "'Nunito Sans', sans-serif",
    fontSize:     14,
    color:        '#111827',
    outline:      'none',
    transition:   'border-color 200ms ease, box-shadow 200ms ease',
    boxSizing:    'border-box',
  }

  const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = '#f97316'
    e.currentTarget.style.boxShadow   = '0 0 0 3px rgba(249,115,22,0.10)'
  }
  const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = '#e5e7eb'
    e.currentTarget.style.boxShadow   = 'none'
  }

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        background: '#f9fafb',
        padding:    'clamp(64px, 10vw, 96px) 24px',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Section heading */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{
            fontFamily:    "'Nunito Sans', sans-serif",
            fontSize:      11,
            fontWeight:    800,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color:         '#f97316',
            marginBottom:  12,
            opacity:       visible ? 1 : 0,
            transform:     visible ? 'translateY(0)' : 'translateY(12px)',
            transition:    'opacity 500ms ease, transform 500ms ease',
          }}>
            Get In Touch
          </div>

          <h2 style={{
            fontFamily:    "'Barlow Condensed', sans-serif",
            fontSize:      'clamp(30px, 4vw, 46px)',
            fontWeight:    800,
            color:         '#111827',
            letterSpacing: '-0.01em',
            marginBottom:  14,
            lineHeight:    1.1,
            opacity:       visible ? 1 : 0,
            transform:     visible ? 'translateY(0)' : 'translateY(16px)',
            transition:    'opacity 500ms ease 80ms, transform 500ms ease 80ms',
          }}>
            Contact {company.name}
          </h2>

          <p style={{
            fontFamily:  "'Nunito Sans', sans-serif",
            fontSize:    15,
            color:       '#6b7280',
            maxWidth:    440,
            margin:      '0 auto',
            lineHeight:  1.65,
            opacity:     visible ? 1 : 0,
            transform:   visible ? 'translateY(0)' : 'translateY(16px)',
            transition:  'opacity 500ms ease 160ms, transform 500ms ease 160ms',
          }}>
            Have a question about your shipment or need a freight quote?
            We respond within 24 hours.
          </p>
        </div>

        {/* Two-column layout */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: '1fr 1.4fr',
          gap:                 48,
          alignItems:          'start',
        }} id="atlas-contact-grid">

          {/* ── Left: contact details ── */}
          <div style={{
            opacity:   visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-24px)',
            transition:'opacity 600ms ease 200ms, transform 600ms ease 200ms',
          }}>
            <div style={{
              display:       'flex',
              flexDirection: 'column',
              gap:           28,
            }}>

              {/* Email */}
              {company.email && (
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <ContactIcon>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="#f97316" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </ContactIcon>
                  <div>
                    <div style={{
                      fontFamily:    "'Nunito Sans', sans-serif",
                      fontSize:      10,
                      fontWeight:    700,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color:         '#9ca3af',
                      marginBottom:  4,
                    }}>
                      Email Address
                    </div>
                    <a href={`mailto:${company.email}`} style={{
                      fontFamily:    "'Nunito Sans', sans-serif",
                      fontSize:      15,
                      fontWeight:    600,
                      color:         '#111827',
                      textDecoration:'none',
                      transition:    'color 150ms',
                    }}
                    onMouseEnter={e =>
                      (e.currentTarget as HTMLAnchorElement).style.color = '#f97316'
                    }
                    onMouseLeave={e =>
                      (e.currentTarget as HTMLAnchorElement).style.color = '#111827'
                    }>
                      {company.email}
                    </a>
                  </div>
                </div>
              )}

              {/* Phone */}
              {company.phone && (
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <ContactIcon>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="#f97316" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </ContactIcon>
                  <div>
                    <div style={{
                      fontFamily:    "'Nunito Sans', sans-serif",
                      fontSize:      10,
                      fontWeight:    700,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color:         '#9ca3af',
                      marginBottom:  4,
                    }}>
                      Phone Number
                    </div>
                    <a href={`tel:${company.phone}`} style={{
                      fontFamily:    "'Nunito Sans', sans-serif",
                      fontSize:      15,
                      fontWeight:    600,
                      color:         '#111827',
                      textDecoration:'none',
                      transition:    'color 150ms',
                    }}
                    onMouseEnter={e =>
                      (e.currentTarget as HTMLAnchorElement).style.color = '#f97316'
                    }
                    onMouseLeave={e =>
                      (e.currentTarget as HTMLAnchorElement).style.color = '#111827'
                    }>
                      {company.phone}
                    </a>
                  </div>
                </div>
              )}

              {/* Address */}
              {company.address && (
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <ContactIcon>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="#f97316" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </ContactIcon>
                  <div>
                    <div style={{
                      fontFamily:    "'Nunito Sans', sans-serif",
                      fontSize:      10,
                      fontWeight:    700,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color:         '#9ca3af',
                      marginBottom:  4,
                    }}>
                      Office Address
                    </div>
                    <div style={{
                      fontFamily: "'Nunito Sans', sans-serif",
                      fontSize:   15,
                      fontWeight: 600,
                      color:      '#111827',
                      lineHeight: 1.5,
                    }}>
                      {company.address}
                    </div>
                  </div>
                </div>
              )}

              {/* Telegram support link */}
              {company.support?.type === 'telegram' && company.support.telegramLink && (
                <a
                  href={company.support.telegramLink}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display:        'inline-flex',
                    alignItems:     'center',
                    gap:            10,
                    padding:        '12px 20px',
                    background:     '#0088cc',
                    borderRadius:   10,
                    textDecoration: 'none',
                    marginTop:      8,
                    transition:     'background 200ms ease, transform 150ms ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = '#0077b5'
                    ;(e.currentTarget as HTMLAnchorElement).style.transform  = 'translateY(-1px)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = '#0088cc'
                    ;(e.currentTarget as HTMLAnchorElement).style.transform  = 'none'
                  }}
                >
                  {/* Telegram icon */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 13.67l-2.94-.92c-.64-.203-.653-.64.136-.954l11.57-4.461c.537-.194 1.006.131.958.886z"/>
                  </svg>
                  <span style={{
                    fontFamily: "'Nunito Sans', sans-serif",
                    fontSize:   14,
                    fontWeight: 700,
                    color:      '#ffffff',
                  }}>
                    Message Us on Telegram
                  </span>
                </a>
              )}

              {/* Business hours */}
              <div style={{
                marginTop:    8,
                padding:      '16px 20px',
                background:   '#ffffff',
                borderRadius: 10,
                border:       '1px solid #e5e7eb',
              }}>
                <div style={{
                  fontFamily:    "'Nunito Sans', sans-serif",
                  fontSize:      10,
                  fontWeight:    700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color:         '#9ca3af',
                  marginBottom:  10,
                }}>
                  Business Hours
                </div>
                {[
                  { day: 'Monday – Friday', hours: '8:00 AM – 6:00 PM' },
                  { day: 'Saturday',        hours: '9:00 AM – 2:00 PM' },
                  { day: 'Sunday',          hours: 'Closed' },
                ].map(({ day, hours }) => (
                  <div key={day} style={{
                    display:         'flex',
                    justifyContent:  'space-between',
                    padding:         '5px 0',
                    borderBottom:    '1px solid #f3f4f6',
                    fontFamily:      "'Nunito Sans', sans-serif",
                    fontSize:        13,
                  }}>
                    <span style={{ color: '#374151', fontWeight: 500 }}>{day}</span>
                    <span style={{
                      color:      hours === 'Closed' ? '#ef4444' : '#f97316',
                      fontWeight: 600,
                    }}>{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: contact form ── */}
          <div style={{
            opacity:   visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(24px)',
            transition:'opacity 600ms ease 300ms, transform 600ms ease 300ms',
          }}>
            <div style={{
              background:   '#ffffff',
              borderRadius: 16,
              padding:      '36px 32px',
              boxShadow:    '0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)',
            }}>

              {/* Success state */}
              {formState === 'success' ? (
                <div style={{
                  textAlign:     'center',
                  padding:       '48px 24px',
                  display:       'flex',
                  flexDirection: 'column',
                  alignItems:    'center',
                  gap:           16,
                }}>
                  <div style={{
                    width:          64,
                    height:         64,
                    borderRadius:   '50%',
                    background:     '#f0fdf4',
                    border:         '2px solid #86efac',
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                  }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                      stroke="#22c55e" strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <div style={{
                    fontFamily:   "'Barlow Condensed', sans-serif",
                    fontSize:     24,
                    fontWeight:   800,
                    color:        '#111827',
                  }}>
                    Message Sent!
                  </div>
                  <p style={{
                    fontFamily: "'Nunito Sans', sans-serif",
                    fontSize:   14,
                    color:      '#6b7280',
                    lineHeight: 1.6,
                  }}>
                    Thank you for reaching out. We will get back to
                    you within 24 hours.
                  </p>
                  <button
                    onClick={() => setFormState('idle')}
                    style={{
                      padding:      '10px 24px',
                      background:   '#f9fafb',
                      border:       '1px solid #e5e7eb',
                      borderRadius: 8,
                      fontFamily:   "'Nunito Sans', sans-serif",
                      fontSize:     14,
                      fontWeight:   600,
                      color:        '#374151',
                      cursor:       'pointer',
                    }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div style={{
                    fontFamily:   "'Barlow Condensed', sans-serif",
                    fontSize:     22,
                    fontWeight:   800,
                    color:        '#111827',
                    marginBottom: 24,
                    letterSpacing:'0.01em',
                  }}>
                    Send Us a Message
                  </div>

                  {/* Name + Email row */}
                  <div style={{
                    display:             'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap:                 14,
                    marginBottom:        14,
                  }} id="atlas-contact-name-email">
                    <div>
                      <label style={{
                        fontFamily:    "'Nunito Sans', sans-serif",
                        fontSize:      11,
                        fontWeight:    700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color:         '#6b7280',
                        display:       'block',
                        marginBottom:  6,
                      }}>
                        Full Name *
                      </label>
                      <input
                        name="name"
                        value={fields.name}
                        onChange={handleChange}
                        onFocus={focusStyle}
                        onBlur={blurStyle}
                        placeholder="John Smith"
                        required
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={{
                        fontFamily:    "'Nunito Sans', sans-serif",
                        fontSize:      11,
                        fontWeight:    700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color:         '#6b7280',
                        display:       'block',
                        marginBottom:  6,
                      }}>
                        Email Address *
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={fields.email}
                        onChange={handleChange}
                        onFocus={focusStyle}
                        onBlur={blurStyle}
                        placeholder="john@company.com"
                        required
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  {/* Phone + Subject row */}
                  <div style={{
                    display:             'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap:                 14,
                    marginBottom:        14,
                  }} id="atlas-contact-phone-subject">
                    <div>
                      <label style={{
                        fontFamily:    "'Nunito Sans', sans-serif",
                        fontSize:      11,
                        fontWeight:    700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color:         '#6b7280',
                        display:       'block',
                        marginBottom:  6,
                      }}>
                        Phone (optional)
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        value={fields.phone}
                        onChange={handleChange}
                        onFocus={focusStyle}
                        onBlur={blurStyle}
                        placeholder="+1 800 000 0000"
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={{
                        fontFamily:    "'Nunito Sans', sans-serif",
                        fontSize:      11,
                        fontWeight:    700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color:         '#6b7280',
                        display:       'block',
                        marginBottom:  6,
                      }}>
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={fields.subject}
                        onChange={handleChange}
                        onFocus={focusStyle}
                        onBlur={blurStyle}
                        required
                        style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                      >
                        <option>General Enquiry</option>
                        <option>Get a Quote</option>
                        <option>Track a Shipment</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: 20 }}>
                    <label style={{
                      fontFamily:    "'Nunito Sans', sans-serif",
                      fontSize:      11,
                      fontWeight:    700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color:         '#6b7280',
                      display:       'block',
                      marginBottom:  6,
                    }}>
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={fields.message}
                      onChange={handleChange}
                      onFocus={focusStyle}
                      onBlur={blurStyle}
                      placeholder="Tell us about your shipment or enquiry..."
                      required
                      rows={5}
                      style={{
                        ...inputStyle,
                        resize:    'vertical',
                        minHeight: 120,
                      }}
                    />
                  </div>

                  {/* Error message */}
                  {formState === 'error' && (
                    <div style={{
                      padding:      '12px 16px',
                      background:   '#fef2f2',
                      border:       '1px solid #fecaca',
                      borderRadius: 8,
                      fontFamily:   "'Nunito Sans', sans-serif",
                      fontSize:     13,
                      color:        '#dc2626',
                      marginBottom: 16,
                    }}>
                      {errorMsg}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={formState === 'submitting'}
                    style={{
                      width:         '100%',
                      padding:       '15px',
                      background:    formState === 'submitting' ? '#fdba74' : '#f97316',
                      border:        'none',
                      borderRadius:  10,
                      color:         '#ffffff',
                      fontFamily:    "'Nunito Sans', sans-serif",
                      fontSize:      16,
                      fontWeight:    800,
                      cursor:        formState === 'submitting' ? 'not-allowed' : 'pointer',
                      display:       'flex',
                      alignItems:    'center',
                      justifyContent:'center',
                      gap:           8,
                      boxShadow:     '0 4px 16px rgba(249,115,22,0.30)',
                      transition:    'background 200ms ease',
                      letterSpacing: '0.01em',
                    }}
                    onMouseEnter={e => {
                      if (formState !== 'submitting') {
                        (e.currentTarget as HTMLButtonElement).style.background = '#ea580c'
                      }
                    }}
                    onMouseLeave={e => {
                      if (formState !== 'submitting') {
                        (e.currentTarget as HTMLButtonElement).style.background = '#f97316'
                      }
                    }}
                  >
                    {formState === 'submitting' ? (
                      <>
                        <div style={{
                          width:  18, height: 18,
                          border: '2px solid rgba(255,255,255,0.3)',
                          borderTop: '2px solid white',
                          borderRadius: '50%',
                          animation: 'spin 0.8s linear infinite',
                        }} />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2.5"
                          strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Responsive + spinner animation */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          #atlas-contact-grid {
            grid-template-columns: 1fr !important;
          }
          #atlas-contact-name-email,
          #atlas-contact-phone-subject {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
