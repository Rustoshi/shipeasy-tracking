'use client'

import { useRef, useState, useEffect } from 'react'

// ── Gallery images ─────────────────────────────────────────────────────────
// Replace PHOTO_URL values with your own hosted images from Cloudinary.
// Temporary Unsplash URLs provided for local development only.

const IMAGES = [
  {
    id:    1,
    src:   'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80',
    alt:   'Container ship at sea',
    // REPLACE_GALLERY_1
  },
  {
    id:    2,
    src:   'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80',
    alt:   'Cargo plane on tarmac',
    // REPLACE_GALLERY_2
  },
  {
    id:    3,
    src:   'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80',
    alt:   'Port terminal aerial view',
    // REPLACE_GALLERY_3
  },
  {
    id:    4,
    src:   'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1000&q=80',
    alt:   'Freight logistics operations',
    // REPLACE_GALLERY_4
  },
  {
    id:    5,
    src:   'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80',
    alt:   'Freight truck on highway',
    // REPLACE_GALLERY_5
  },
  {
    id:    6,
    src:   'https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&q=80',
    alt:   'Warehouse interior',
    // REPLACE_GALLERY_6
  },
]

// ── Single image tile ──────────────────────────────────────────────────────
interface TileProps {
  src:     string
  alt:     string
  delay:   number
  visible: boolean
}

function GalleryTile({ src, alt, delay, visible }: TileProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position:     'relative',
        overflow:     'hidden',
        borderRadius: 12,
        cursor:       'pointer',
        height:       '100%',
        minHeight:    200,
        // Entrance animation
        opacity:      visible ? 1 : 0,
        transform:    visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.98)',
        transition:   `opacity 600ms ease ${delay}ms, transform 600ms ease ${delay}ms`,
      }}
      onClick={() => window.open(src, '_blank')}
    >
      {/* Photo */}
      <div style={{
        position:           'absolute',
        inset:              0,
        backgroundImage:    `url(${src})`,
        backgroundSize:     'cover',
        backgroundPosition: 'center',
        transform:          hovered ? 'scale(1.07)' : 'scale(1.0)',
        transition:         'transform 600ms ease',
      }} />

      {/* Default dark gradient at bottom — always visible */}
      <div style={{
        position:   'absolute',
        inset:      0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 50%)',
      }} />

      {/* Hover overlay */}
      <div style={{
        position:   'absolute',
        inset:      0,
        background: 'rgba(249,115,22,0.15)',
        opacity:    hovered ? 1 : 0,
        transition: 'opacity 300ms ease',
      }} />

      {/* Orange border on hover */}
      <div style={{
        position:    'absolute',
        inset:       0,
        borderRadius: 12,
        border:       `2px solid ${hovered ? '#f97316' : 'transparent'}`,
        transition:  'border-color 250ms ease',
        zIndex:      2,
        pointerEvents: 'none',
      }} />

      {/* View icon — appears on hover */}
      <div style={{
        position:       'absolute',
        inset:          0,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        opacity:        hovered ? 1 : 0,
        transform:      hovered ? 'scale(1)' : 'scale(0.8)',
        transition:     'opacity 250ms ease, transform 250ms ease',
        zIndex:         3,
      }}>
        <div style={{
          background:   'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(8px)',
          borderRadius: 50,
          padding:      '10px 20px',
          display:      'flex',
          alignItems:   'center',
          gap:          8,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="white" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          <span style={{
            fontFamily:    "'Nunito Sans', sans-serif",
            fontSize:      12,
            fontWeight:    700,
            color:         '#ffffff',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>
            View
          </span>
        </div>
      </div>

      {/* Alt text label — bottom left, always subtle */}
      <div style={{
        position:      'absolute',
        bottom:        10,
        left:          12,
        fontFamily:    "'Nunito Sans', sans-serif",
        fontSize:      10,
        fontWeight:    600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color:         'rgba(255,255,255,0.55)',
        zIndex:        2,
      }}>
        {alt}
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────
export default function AtlasGallery() {
  const ref             = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

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

  return (
    <section
      id="gallery"
      ref={ref}
      style={{
        background: '#ffffff',
        padding:    'clamp(64px, 10vw, 96px) 24px',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Section heading */}
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
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
            Our Operations
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
            See Our Fleet in Action
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
            From ocean terminals to last-mile delivery — a glimpse
            into the global operations that move your cargo.
          </p>
        </div>

        {/* ── Asymmetric masonry grid ── */}
        {/* Desktop: CSS grid with named areas for asymmetric layout */}
        <div
          id="atlas-gallery-grid"
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows:    '280px 220px 220px',
            gap:                 14,
          }}
        >
          {/* Image 1 — tall left, spans 2 rows */}
          <div style={{ gridColumn: '1', gridRow: '1 / 3', height: '100%' }}>
            <GalleryTile {...IMAGES[0]} delay={0}   visible={visible} />
          </div>

          {/* Image 2 — top middle */}
          <div style={{ gridColumn: '2', gridRow: '1', height: '100%' }}>
            <GalleryTile {...IMAGES[1]} delay={80}  visible={visible} />
          </div>

          {/* Image 3 — top right */}
          <div style={{ gridColumn: '3', gridRow: '1', height: '100%' }}>
            <GalleryTile {...IMAGES[2]} delay={160} visible={visible} />
          </div>

          {/* Image 4 — wide, spans 2 columns middle */}
          <div style={{ gridColumn: '2 / 4', gridRow: '2', height: '100%' }}>
            <GalleryTile {...IMAGES[3]} delay={240} visible={visible} />
          </div>

          {/* Image 5 — bottom left */}
          <div style={{ gridColumn: '1', gridRow: '3', height: '100%' }}>
            <GalleryTile {...IMAGES[4]} delay={120} visible={visible} />
          </div>

          {/* Image 6 — bottom middle */}
          <div style={{ gridColumn: '2', gridRow: '3', height: '100%' }}>
            <GalleryTile {...IMAGES[5]} delay={200} visible={visible} />
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 640px) {
          #atlas-gallery-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: repeat(6, 220px) !important;
          }
          #atlas-gallery-grid > div {
            grid-column: auto !important;
            grid-row: auto !important;
          }
        }
        @media (min-width: 641px) and (max-width: 900px) {
          #atlas-gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            grid-template-rows: repeat(4, 220px) !important;
          }
          #atlas-gallery-grid > div {
            grid-column: auto !important;
            grid-row: auto !important;
          }
        }
      `}</style>
    </section>
  )
}
