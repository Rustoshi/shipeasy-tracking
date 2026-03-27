'use client'

import {
  useState, useEffect, useRef, useCallback,
} from 'react'
import { useRouter } from 'next/navigation'
import type { CompanyBranding } from '@/types'

interface Props {
  company: CompanyBranding
}

// ── Slide data ────────────────────────────────────────────
// Replace PHOTO_URL values with your own hosted images.
// Temporary Unsplash URLs are provided for local testing.
const SLIDES = [
  {
    id:       1,
    label:    'Ocean Freight',
    photoUrl: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1920&q=80',
    // REPLACE_SLIDE_1: Container ship at sea
    kenBurns: {
      from: 'scale(1.0) translate(0%, 0%)',
      to:   'scale(1.08) translate(-1%, -1%)',
    },
  },
  {
    id:       2,
    label:    'Air Freight',
    photoUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80',
    // REPLACE_SLIDE_2: Cargo plane in flight or on tarmac
    kenBurns: {
      from: 'scale(1.0) translate(1%, 1%)',
      to:   'scale(1.08) translate(-1%, -1%)',
    },
  },
  {
    id:       3,
    label:    'Road Freight',
    photoUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1920&q=80',
    // REPLACE_SLIDE_3: Freight truck on highway
    kenBurns: {
      from: 'scale(1.06) translate(2%, 0%)',
      to:   'scale(1.06) translate(-2%, 0%)',
    },
  },
  {
    id:       4,
    label:    'Port Operations',
    photoUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80',
    // REPLACE_SLIDE_4: Container port or terminal aerial
    kenBurns: {
      from: 'scale(1.1) translate(0%, 0%)',
      to:   'scale(1.0) translate(0%, 0%)',
    },
  },
  {
    id:       5,
    label:    'Warehousing',
    photoUrl: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=1920&q=80',
    // REPLACE_SLIDE_5: Warehouse interior or freight operations
    kenBurns: {
      from: 'scale(1.06) translate(-2%, 0%)',
      to:   'scale(1.06) translate(2%, 0%)',
    },
  },
] as const

const SLIDE_DURATION   = 6000   // ms per slide
const TRANSITION_DURATION = 1200  // ms cross-fade

export default function AtlasHero({ company }: Props) {
  const router               = useRouter()
  const [input, setInput]    = useState('')
  const [loaded, setLoaded]  = useState(false)
  const [current, setCurrent] = useState(0)
  const [previous, setPrevious] = useState<number | null>(null)
  const [transitioning, setTransitioning] = useState(false)
  const [paused, setPaused]  = useState(false)
  const inputRef             = useRef<HTMLInputElement>(null)
  const timerRef             = useRef<ReturnType<typeof setTimeout> | null>(null)
  const touchStartX          = useRef<number>(0)

  // Entrance animation
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  // ── Slide transition ──
  const goToSlide = useCallback((index: number) => {
    if (transitioning || index === current) return
    setTransitioning(true)
    setPrevious(current)
    setCurrent(index)
    setTimeout(() => {
      setPrevious(null)
      setTransitioning(false)
    }, TRANSITION_DURATION)
  }, [current, transitioning])

  const nextSlide = useCallback(() => {
    goToSlide((current + 1) % SLIDES.length)
  }, [current, goToSlide])

  // ── Auto-advance ──
  useEffect(() => {
    if (paused) return
    timerRef.current = setTimeout(nextSlide, SLIDE_DURATION)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [current, paused, nextSlide])

  // ── Touch swipe ──
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToSlide((current + 1) % SLIDES.length)
      } else {
        goToSlide((current - 1 + SLIDES.length) % SLIDES.length)
      }
    }
  }

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    const id = input.trim().toUpperCase()
    if (!id) { inputRef.current?.focus(); return }
    router.push(`/track/${id}${window.location.search}`)
  }

  return (
    <section
      id="home"
      style={{
        position:   'relative',
        minHeight:  '100vh',
        display:    'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow:   'hidden',
        padding:    '100px 24px 100px',
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >

      {/* ════════════════════════════════════════
          BACKGROUND CAROUSEL
          ════════════════════════════════════════ */}

      {/* Previous slide — fading out */}
      {previous !== null && (
        <div
          key={`prev-${previous}`}
          style={{
            position:   'absolute',
            inset:      0,
            zIndex:     1,
            overflow:   'hidden',
            opacity:    0,
            animation:  `fade-out ${TRANSITION_DURATION}ms ease forwards`,
          }}
        >
          <div style={{
            position:           'absolute',
            inset:              '-5%',
            backgroundImage:    `url(${SLIDES[previous].photoUrl})`,
            backgroundSize:     'cover',
            backgroundPosition: 'center',
            transform:          SLIDES[previous].kenBurns.to,
          }} />
        </div>
      )}

      {/* Current slide — fading in with Ken Burns */}
      <div
        key={`curr-${current}`}
        style={{
          position:   'absolute',
          inset:      0,
          zIndex:     2,
          overflow:   'hidden',
          opacity:    1,
          animation:  previous !== null
            ? `fade-in ${TRANSITION_DURATION}ms ease forwards` 
            : 'none',
        }}
      >
        <div style={{
          position:           'absolute',
          inset:              '-5%',
          backgroundImage:    `url(${SLIDES[current].photoUrl})`,
          backgroundSize:     'cover',
          backgroundPosition: 'center',
          animation:          `ken-burns-${current} ${SLIDE_DURATION + TRANSITION_DURATION}ms ease forwards`,
        }} />
      </div>

      {/* ── Dark overlay — always on top of photos ── */}
      <div style={{
        position: 'absolute',
        inset:    0,
        zIndex:   3,
        background: `
          linear-gradient(
            to bottom,
            rgba(0,0,0,0.45) 0%,
            rgba(0,0,0,0.55) 35%,
            rgba(0,0,0,0.72) 75%,
            rgba(0,0,0,0.85) 100%
          )
        `,
      }} />

      {/* ── Subtle vignette edges ── */}
      <div style={{
        position: 'absolute',
        inset:    0,
        zIndex:   3,
        background: `
          radial-gradient(
            ellipse at center,
            transparent 50%,
            rgba(0,0,0,0.35) 100%
          )
        `,
        pointerEvents: 'none',
      }} />

      {/* ════════════════════════════════════════
          HERO CONTENT
          ════════════════════════════════════════ */}
      <div style={{
        position:  'relative',
        zIndex:    10,
        width:     '100%',
        maxWidth:  620,
        textAlign: 'center',
      }}>

        {/* ── Credibility badge ── */}
        <div style={{
          display:       'inline-flex',
          alignItems:    'center',
          gap:           8,
          background:    'rgba(255,255,255,0.10)',
          backdropFilter:'blur(10px)',
          border:        '1px solid rgba(255,255,255,0.18)',
          borderRadius:  100,
          padding:       '7px 18px',
          marginBottom:  22,
          opacity:       loaded ? 1 : 0,
          transform:     loaded ? 'translateY(0)' : 'translateY(18px)',
          transition:    'opacity 700ms ease, transform 700ms ease',
        }}>
          <div style={{ position: 'relative', width: 8, height: 8, flexShrink: 0 }}>
            <div style={{
              position:   'absolute',
              inset:      0,
              borderRadius: '50%',
              background: '#22c55e',
              animation:  'pulse-core 2s ease-in-out infinite',
            }} />
            <div style={{
              position:   'absolute',
              inset:      -4,
              borderRadius: '50%',
              background: 'rgba(34,197,94,0.25)',
              animation:  'pulse-ring 2s ease-out infinite',
            }} />
          </div>
          <span style={{
            fontFamily:    "'Nunito Sans', sans-serif",
            fontSize:      12,
            fontWeight:    600,
            color:         '#ffffff',
            letterSpacing: '0.02em',
          }}>
            Trusted by 10,000+ businesses worldwide
          </span>
        </div>

        {/* ── Headline ── */}
        <h1 style={{
          fontFamily:    "'Barlow Condensed', sans-serif",
          fontSize:      'clamp(36px, 7vw, 66px)',
          fontWeight:    800,
          lineHeight:    1.06,
          letterSpacing: '-0.01em',
          color:         '#ffffff',
          marginBottom:  18,
          opacity:       loaded ? 1 : 0,
          transform:     loaded ? 'translateY(0)' : 'translateY(20px)',
          transition:    'opacity 700ms ease 140ms, transform 700ms ease 140ms',
        }}>
          Global Logistics,{' '}
          <span style={{ color: '#f97316' }}>Delivered</span>
          {' '}with Precision
        </h1>

        {/* ── Subheadline ── */}
        <p style={{
          fontFamily:  "'Nunito Sans', sans-serif",
          fontSize:    'clamp(14px, 2vw, 17px)',
          fontWeight:  400,
          lineHeight:  1.75,
          color:       'rgba(255,255,255,0.78)',
          maxWidth:    500,
          margin:      '0 auto 32px',
          opacity:     loaded ? 1 : 0,
          transform:   loaded ? 'translateY(0)' : 'translateY(20px)',
          transition:  'opacity 700ms ease 260ms, transform 700ms ease 260ms',
        }}>
          From air freight to ocean cargo, {company.name} provides
          end-to-end logistics solutions connecting your business to
          180+ countries. Fast, reliable, always on time.
        </p>

        {/* ── Tracking form ── */}
        <div style={{
          opacity:   loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(20px)',
          transition:'opacity 700ms ease 380ms, transform 700ms ease 380ms',
        }}>
          <form
            onSubmit={handleTrack}
            style={{
              background:   '#ffffff',
              borderRadius: 14,
              padding:      10,
              boxShadow:    '0 12px 48px rgba(0,0,0,0.40), 0 2px 8px rgba(0,0,0,0.18)',
              display:      'flex',
              flexDirection:'column',
              gap:          8,
            }}
          >
            {/* Input */}
            <div
              style={{
                display:    'flex',
                alignItems: 'center',
                gap:        10,
                padding:    '4px 14px',
                background: '#f9fafb',
                borderRadius: 8,
                border:     '1.5px solid #e5e7eb',
                transition: 'border-color 200ms, box-shadow 200ms',
              }}
              onFocusCapture={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = '#f97316'
                ;(e.currentTarget as HTMLDivElement).style.boxShadow  =
                  '0 0 0 3px rgba(249,115,22,0.12)'
              }}
              onBlurCapture={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = '#e5e7eb'
                ;(e.currentTarget as HTMLDivElement).style.boxShadow  = 'none'
              }}
            >
              {/* Search icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="#9ca3af" strokeWidth="2.2"
                strokeLinecap="round" strokeLinejoin="round"
                style={{ flexShrink: 0 }}>
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>

              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Enter your tracking number"
                autoComplete="off"
                spellCheck={false}
                style={{
                  flex:       1,
                  background: 'transparent',
                  border:     'none',
                  outline:    'none',
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize:   15,
                  fontWeight: 500,
                  color:      '#111827',
                  padding:    '11px 0',
                  minWidth:   0,
                }}
              />

              {input && (
                <button
                  type="button"
                  onClick={() => { setInput(''); inputRef.current?.focus() }}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#9ca3af', padding: 4, lineHeight: 1, fontSize: 20,
                    flexShrink: 0,
                  }}
                >
                  ×
                </button>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              style={{
                width:         '100%',
                padding:       '15px 24px',
                background:    '#f97316',
                border:        'none',
                borderRadius:  8,
                color:         '#ffffff',
                fontFamily:    "'Nunito Sans', sans-serif",
                fontSize:      16,
                fontWeight:    800,
                cursor:        'pointer',
                display:       'flex',
                alignItems:    'center',
                justifyContent:'center',
                gap:           8,
                transition:    'background 200ms ease, transform 150ms ease',
                boxShadow:     '0 4px 20px rgba(249,115,22,0.45)',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={e => {
                const b = e.currentTarget as HTMLButtonElement
                b.style.background = '#ea580c'
                b.style.transform  = 'translateY(-1px)'
                b.style.boxShadow  = '0 6px 24px rgba(249,115,22,0.55)'
              }}
              onMouseLeave={e => {
                const b = e.currentTarget as HTMLButtonElement
                b.style.background = '#f97316'
                b.style.transform  = 'none'
                b.style.boxShadow  = '0 4px 20px rgba(249,115,22,0.45)'
              }}
            >
              Track Shipment
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </form>

          <p style={{
            marginTop:  12,
            fontFamily: "'Nunito Sans', sans-serif",
            fontSize:   12,
            color:      'rgba(255,255,255,0.50)',
            textAlign:  'center',
          }}>
            Enter your tracking number to get real-time updates on your shipment
          </p>
        </div>
      </div>

      {/* ════════════════════════════════════════
          SLIDE INDICATORS + CURRENT SLIDE LABEL
          ════════════════════════════════════════ */}
      <div style={{
        position:      'absolute',
        bottom:        32,
        left:          '50%',
        transform:     'translateX(-50%)',
        zIndex:        10,
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
        gap:           12,
        opacity:       loaded ? 1 : 0,
        transition:    'opacity 700ms ease 900ms',
      }}>
        {/* Current slide label */}
        <div style={{
          fontFamily:    "'Nunito Sans', sans-serif",
          fontSize:      10,
          fontWeight:    700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color:         'rgba(255,255,255,0.45)',
        }}>
          {SLIDES[current].label}
        </div>

        {/* Dot indicators */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                padding:    0,
                background: 'none',
                border:     'none',
                cursor:     'pointer',
                display:    'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{
                display:      'block',
                width:        i === current ? 24 : 7,
                height:       7,
                borderRadius: 4,
                background:   i === current
                  ? '#f97316'
                  : 'rgba(255,255,255,0.40)',
                transition:   'width 400ms cubic-bezier(0.4,0,0.2,1), background 400ms ease',
              }} />
            </button>
          ))}
        </div>

        {/* Progress bar under current dot */}
        <div style={{
          width:        80,
          height:       2,
          background:   'rgba(255,255,255,0.12)',
          borderRadius: 2,
          overflow:     'hidden',
        }}>
          <div
            key={`progress-${current}`}
            style={{
              height:     '100%',
              background: '#f97316',
              borderRadius: 2,
              animation:  paused
                ? 'none'
                : `progress-fill ${SLIDE_DURATION}ms linear forwards`,
              width:      paused ? '0%' : undefined,
            }}
          />
        </div>
      </div>

      {/* ════════════════════════════════════════
          SCROLL INDICATOR
          ════════════════════════════════════════ */}
      <div
        style={{
          position:   'absolute',
          bottom:     32,
          right:      32,
          zIndex:     10,
          display:    'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap:        6,
          opacity:    loaded ? 0.5 : 0,
          transition: 'opacity 700ms ease 1000ms',
          cursor:     'pointer',
        }}
        onClick={() => {
          document.querySelector('#services')
            ?.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        <span style={{
          fontFamily:    "'Nunito Sans', sans-serif",
          fontSize:      9,
          fontWeight:    700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color:         'white',
          writingMode:   'vertical-rl',
        }}>
          Scroll
        </span>
        <div style={{
          width:        1,
          height:       32,
          background:   'rgba(255,255,255,0.4)',
          position:     'relative',
          overflow:     'hidden',
        }}>
          <div style={{
            position:   'absolute',
            top:        0, left: 0, right: 0,
            height:     '50%',
            background: 'white',
            animation:  'scroll-line 1.8s ease-in-out infinite',
          }} />
        </div>
      </div>

      {/* ════════════════════════════════════════
          ALL KEYFRAME ANIMATIONS
          ════════════════════════════════════════ */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes fade-out {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        @keyframes ken-burns-0 {
          from { transform: ${SLIDES[0].kenBurns.from}; }
          to   { transform: ${SLIDES[0].kenBurns.to};   }
        }
        @keyframes ken-burns-1 {
          from { transform: ${SLIDES[1].kenBurns.from}; }
          to   { transform: ${SLIDES[1].kenBurns.to};   }
        }
        @keyframes ken-burns-2 {
          from { transform: ${SLIDES[2].kenBurns.from}; }
          to   { transform: ${SLIDES[2].kenBurns.to};   }
        }
        @keyframes ken-burns-3 {
          from { transform: ${SLIDES[3].kenBurns.from}; }
          to   { transform: ${SLIDES[3].kenBurns.to};   }
        }
        @keyframes ken-burns-4 {
          from { transform: ${SLIDES[4].kenBurns.from}; }
          to   { transform: ${SLIDES[4].kenBurns.to};   }
        }
        @keyframes progress-fill {
          from { width: 0%;    }
          to   { width: 100%;  }
        }
        @keyframes scroll-line {
          0%   { top: -50%;   opacity: 0; }
          30%  { opacity: 1;              }
          100% { top: 100%;   opacity: 0; }
        }
        @keyframes pulse-core {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.7; }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.4; }
          100% { transform: scale(1.8); opacity: 0;   }
        }
      `}</style>
    </section>
  )
}
