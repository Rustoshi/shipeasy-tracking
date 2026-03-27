'use client'

import { useEffect, useRef, useState } from 'react'
import type { PublicShipment, ShipmentStatus } from '@/types'
import { STATUS_PROGRESS } from '@/types'

// ── Country centroids ─────────────────────────────────────────────────────
const COUNTRY_COORDS: Record<string, [number, number]> = {
  'Afghanistan': [67.71, 33.94],
  'Algeria': [1.66, 28.03],
  'Angola': [17.87, -11.20],
  'Argentina': [-63.62, -38.42],
  'Australia': [133.78, -25.27],
  'Austria': [14.55, 47.52],
  'Bangladesh': [90.36, 23.68],
  'Belgium': [4.47, 50.50],
  'Brazil': [-51.93, -14.24],
  'Cameroon': [12.35, 3.85],
  'Canada': [-96.80, 60.00],
  'Chile': [-71.54, -35.68],
  'China': [104.20, 35.86],
  'Colombia': [-74.30, 4.57],
  'Congo': [15.83, -0.23],
  'Ivory Coast': [-5.55, 7.54],
  "Côte d'Ivoire": [-5.55, 7.54],
  'Cyprus': [33.43, 35.13],
  'Czech Republic': [15.47, 49.82],
  'Denmark': [9.50, 56.26],
  'Ecuador': [-77.80, -1.83],
  'Egypt': [30.80, 26.82],
  'Ethiopia': [40.49, 9.15],
  'Finland': [25.75, 61.92],
  'France': [2.21, 46.23],
  'Germany': [10.45, 51.17],
  'Ghana': [-1.02, 7.95],
  'Greece': [21.82, 39.07],
  'Hong Kong': [114.18, 22.32],
  'Hungary': [19.50, 47.16],
  'India': [78.96, 20.59],
  'Indonesia': [113.92, -0.79],
  'Iran': [53.69, 32.43],
  'Iraq': [43.68, 33.22],
  'Ireland': [-8.24, 53.41],
  'Israel': [34.85, 31.05],
  'Italy': [12.57, 41.87],
  'Japan': [138.25, 36.20],
  'Jordan': [36.24, 30.59],
  'Kazakhstan': [66.92, 48.02],
  'Kenya': [37.91, -0.02],
  'Kuwait': [47.48, 29.31],
  'Lebanon': [35.86, 33.85],
  'Libya': [17.23, 26.34],
  'Malaysia': [109.70, 4.21],
  'Mexico': [-102.55, 23.63],
  'Morocco': [-7.09, 31.79],
  'Mozambique': [35.53, -18.67],
  'Netherlands': [5.29, 52.13],
  'New Zealand': [174.88, -40.90],
  'Nigeria': [8.68, 9.08],
  'Norway': [8.47, 60.47],
  'Oman': [57.55, 21.51],
  'Pakistan': [69.35, 30.38],
  'Peru': [-75.02, -9.19],
  'Philippines': [121.77, 12.88],
  'Poland': [19.15, 51.92],
  'Portugal': [-8.22, 39.40],
  'Qatar': [51.18, 25.35],
  'Romania': [24.97, 45.94],
  'Russia': [105.32, 61.52],
  'Saudi Arabia': [45.08, 23.89],
  'Senegal': [-14.45, 14.50],
  'Singapore': [103.82, 1.35],
  'South Africa': [22.94, -30.56],
  'South Korea': [127.77, 35.91],
  'Spain': [-3.75, 40.46],
  'Sri Lanka': [80.77, 7.87],
  'Sweden': [18.64, 60.13],
  'Switzerland': [8.23, 46.82],
  'Taiwan': [120.96, 23.70],
  'Tanzania': [34.89, -6.37],
  'Thailand': [100.99, 15.87],
  'Tunisia': [9.54, 33.89],
  'Turkey': [35.24, 38.96],
  'Uganda': [32.29, 1.37],
  'Ukraine': [31.17, 48.38],
  'United Arab Emirates': [53.85, 23.42],
  'UAE': [53.85, 23.42],
  'United Kingdom': [-3.44, 55.38],
  'UK': [-3.44, 55.38],
  'United States': [-95.71, 37.09],
  'USA': [-95.71, 37.09],
  'Uzbekistan': [63.95, 41.38],
  'Venezuela': [-66.59, 6.42],
  'Vietnam': [108.28, 14.06],
  'Yemen': [48.52, 15.55],
  'Zimbabwe': [29.15, -19.02],
}

function getCoords(country: string): [number, number] {
  if (!country) return [0, 20]
  if (COUNTRY_COORDS[country]) return COUNTRY_COORDS[country]
  // Try case-insensitive
  const key = Object.keys(COUNTRY_COORDS).find(
    k => k.toLowerCase() === country.toLowerCase()
  )
  return key ? COUNTRY_COORDS[key] : [0, 20]
}

// ── Great-circle interpolation ─────────────────────────────────────────────
function interpolateGreatCircle(
  from: [number, number],
  to:   [number, number],
  t:    number
): [number, number] {
  const toRad = (d: number) => (d * Math.PI) / 180
  const toDeg = (r: number) => (r * 180) / Math.PI

  const lat1 = toRad(from[1]), lon1 = toRad(from[0])
  const lat2 = toRad(to[1]),   lon2 = toRad(to[0])

  const d = 2 * Math.asin(Math.sqrt(
    Math.pow(Math.sin((lat2 - lat1) / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) *
    Math.pow(Math.sin((lon2 - lon1) / 2), 2)
  ))

  if (d === 0) return from

  const A = Math.sin((1 - t) * d) / Math.sin(d)
  const B = Math.sin(t * d)       / Math.sin(d)

  const x = A * Math.cos(lat1) * Math.cos(lon1) + B * Math.cos(lat2) * Math.cos(lon2)
  const y = A * Math.cos(lat1) * Math.sin(lon1) + B * Math.cos(lat2) * Math.sin(lon2)
  const z = A * Math.sin(lat1)                  + B * Math.sin(lat2)

  return [
    toDeg(Math.atan2(y, x)),
    toDeg(Math.atan2(z, Math.sqrt(x * x + y * y))),
  ]
}

function buildArc(
  from:  [number, number],
  to:    [number, number],
  steps: number
): [number, number][] {
  return Array.from({ length: steps + 1 }, (_, i) =>
    interpolateGreatCircle(from, to, i / steps)
  )
}

function getCurrentPosition(
  from:   [number, number],
  to:     [number, number],
  status: ShipmentStatus
): [number, number] {
  let progress = STATUS_PROGRESS[status]
  if (progress < 0) progress = STATUS_PROGRESS['In Transit'] // fallback for On Hold / Damaged
  const t = Math.max(0, Math.min(progress, 100)) / 100
  return interpolateGreatCircle(from, to, t)
}

// ── Component ─────────────────────────────────────────────────────────────

interface Props {
  shipment: PublicShipment
  height?:  number
}

export default function TrackingMap({ shipment, height = 400 }: Props) {
  const containerRef  = useRef<HTMLDivElement>(null)
  const mapRef        = useRef<unknown>(null)
  const [ready, setReady]   = useState(false)
  const [failed, setFailed] = useState(false)

  const originCoords = getCoords(shipment.originCountry)
  const destCoords   = getCoords(shipment.destinationCountry)
  const currentPos   = getCurrentPosition(originCoords, destCoords, shipment.currentStatus)
  const isDelivered  = shipment.currentStatus === 'Delivered'
  const progressPct  = Math.max(0, STATUS_PROGRESS[shipment.currentStatus])

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if (!token || !containerRef.current || mapRef.current) return

    let mapInstance: mapboxgl.Map

    import('mapbox-gl').then((mapboxgl) => {
      const mapboxglLib = mapboxgl.default

      mapboxglLib.accessToken = token

      mapInstance = new mapboxglLib.Map({
        container:          containerRef.current!,
        style:              'mapbox://styles/mapbox/navigation-day-v1',
        center:             [0, 20] as [number, number],
        zoom:               2,
        projection:         { name: 'mercator' } as unknown as string,
        attributionControl: false,
      })

      mapRef.current = mapInstance

      mapInstance.on('load', () => {
        setReady(true)

        const arcCoords    = buildArc(originCoords, destCoords, 80)
        const doneSteps    = Math.max(1, Math.floor((progressPct / 100) * 80))
        const doneCoords   = arcCoords.slice(0, doneSteps + 1)
        const remainCoords = arcCoords.slice(doneSteps)

        // ── Remaining arc — dashed orange ──────────────────────────
        mapInstance.addSource('arc-remain', {
          type: 'geojson',
          data: {
            type: 'Feature', properties: {},
            geometry: { type: 'LineString', coordinates: remainCoords },
          },
        })
        mapInstance.addLayer({
          id: 'arc-remain-line', type: 'line', source: 'arc-remain',
          layout: { 'line-join': 'round', 'line-cap': 'round' },
          paint: {
            'line-color': '#fdba74',
            'line-width': 3,
            'line-dasharray': [4, 3],
            'line-opacity': 0.9,
          },
        })

        // ── Completed arc — solid orange ───────────────────────────
        if (doneCoords.length > 1) {
          mapInstance.addSource('arc-done', {
            type: 'geojson',
            data: {
              type: 'Feature', properties: {},
              geometry: { type: 'LineString', coordinates: doneCoords },
            },
          })
          mapInstance.addLayer({
            id: 'arc-done-line', type: 'line', source: 'arc-done',
            layout: { 'line-join': 'round', 'line-cap': 'round' },
            paint: {
              'line-color': '#f97316',
              'line-width': 4.5,
              'line-opacity': 1,
            },
          })
        }

        // ── Label markers as GeoJSON symbol layer ──────────────────
        mapInstance.addSource('markers-labels', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {
                  label: shipment.originCountry,
                  color: '#f97316',
                },
                geometry: {
                  type: 'Point',
                  coordinates: originCoords,
                },
              },
              {
                type: 'Feature',
                properties: {
                  label: isDelivered
                    ? '✓ ' + shipment.destinationCountry
                    : shipment.destinationCountry,
                  color: isDelivered ? '#22c55e' : '#64748b',
                },
                geometry: {
                  type: 'Point',
                  coordinates: destCoords,
                },
              },
            ],
          },
        })

        // Circle layer for the dots
        mapInstance.addLayer({
          id:     'marker-circles',
          type:   'circle',
          source: 'markers-labels',
          paint: {
            'circle-radius': 10,
            'circle-color': [
              'case',
              ['==', ['get', 'color'], '#f97316'], '#f97316',
              ['==', ['get', 'color'], '#22c55e'], '#22c55e',
              '#64748b',
            ],
            'circle-stroke-width': 3,
            'circle-stroke-color': '#ffffff',
            'circle-opacity': 1,
          },
        })

        // Label text above each circle
        mapInstance.addLayer({
          id:     'marker-labels',
          type:   'symbol',
          source: 'markers-labels',
          layout: {
            'text-field':           ['get', 'label'],
            'text-font':            ['DIN Offc Pro Bold', 'Arial Unicode MS Bold'],
            'text-size':            12,
            'text-offset':          [0, -2.2],
            'text-anchor':          'bottom',
            'text-allow-overlap':   true,
            'text-ignore-placement':true,
          },
          paint: {
            'text-color': [
              'case',
              ['==', ['get', 'color'], '#f97316'], '#f97316',
              ['==', ['get', 'color'], '#22c55e'], '#22c55e',
              '#64748b',
            ],
            'text-halo-color':  '#ffffff',
            'text-halo-width':  2,
          },
        })

        // ── Current position marker (only when past Pending) ───────
        if (
          shipment.currentStatus !== 'Pending' &&
          shipment.currentStatus !== 'Shipment Created'
        ) {
          mapInstance.addSource('position-marker', {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: { label: shipment.currentStatus },
              geometry: { type: 'Point', coordinates: currentPos },
            },
          })

          // Outer pulse ring
          mapInstance.addLayer({
            id:     'position-pulse',
            type:   'circle',
            source: 'position-marker',
            paint: {
              'circle-radius':       20,
              'circle-color':        'rgba(249,115,22,0)',
              'circle-stroke-width': 2,
              'circle-stroke-color': 'rgba(249,115,22,0.4)',
              'circle-opacity':      1,
            },
          })

          // Inner dot
          mapInstance.addLayer({
            id:     'position-dot',
            type:   'circle',
            source: 'position-marker',
            paint: {
              'circle-radius':       10,
              'circle-color':        '#f97316',
              'circle-stroke-width': 3,
              'circle-stroke-color': '#ffffff',
            },
          })

          // Status label
          mapInstance.addLayer({
            id:     'position-label',
            type:   'symbol',
            source: 'position-marker',
            layout: {
              'text-field':            ['get', 'label'],
              'text-font':             ['DIN Offc Pro Bold', 'Arial Unicode MS Bold'],
              'text-size':             11,
              'text-offset':           [0, -2.0],
              'text-anchor':           'bottom',
              'text-allow-overlap':    true,
              'text-ignore-placement': true,
            },
            paint: {
              'text-color':       '#f97316',
              'text-halo-color':  '#ffffff',
              'text-halo-width':  2,
            },
          })
        }

        // ── Fit map bounds ─────────────────────────────────────────
        const lngs = [originCoords[0], destCoords[0]]
        const lats  = [originCoords[1], destCoords[1]]
        mapInstance.fitBounds(
          [
            [Math.min(...lngs) - 10, Math.min(...lats) - 8],
            [Math.max(...lngs) + 10, Math.max(...lats) + 8],
          ],
          { padding: 80, maxZoom: 5, duration: 1200 }
        )
      })

      mapInstance.on('error', () => setFailed(true))

    }).catch(() => setFailed(true))

    return () => {
      if (mapRef.current) {
        (mapRef.current as mapboxgl.Map).remove()
        mapRef.current = null
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shipment.trackingId])

  if (failed || !process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
    return (
      <div style={{
        height,
        background: '#f1f5f9',
        display:    'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Nunito Sans', sans-serif",
        fontSize:   14,
        color:      '#9ca3af',
        gap:        8,
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        Map unavailable
      </div>
    )
  }

  return (
    <div style={{ position: 'relative', height, overflow: 'hidden' }}>
      {/* Map container */}
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />

      {/* Loading overlay */}
      {!ready && (
        <div style={{
          position:       'absolute',
          inset:          0,
          background:     '#f8fafc',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          zIndex:         10,
        }}>
          <div style={{
            width:        28,
            height:       28,
            borderRadius: '50%',
            border:       '3px solid #fed7aa',
            borderTop:    '3px solid #f97316',
            animation:    'spin 0.8s linear infinite',
          }} />
        </div>
      )}

      {/* Route labels overlay */}
      {ready && (
        <div style={{
          position:    'absolute',
          bottom:      12,
          left:        12,
          zIndex:      5,
          display:     'flex',
          alignItems:  'center',
          gap:         8,
          background:  'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(8px)',
          borderRadius: 8,
          padding:     '6px 12px',
          boxShadow:   '0 2px 8px rgba(0,0,0,0.10)',
          fontFamily:  "'Nunito Sans', sans-serif",
          fontSize:    11,
          fontWeight:  600,
          color:       '#374151',
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            background: '#f97316',
          }} />
          {shipment.originCountry}
          <div style={{ color: '#d1d5db' }}>→</div>
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            background: isDelivered ? '#22c55e' : '#9ca3af',
          }} />
          {shipment.destinationCountry}
        </div>
      )}

      {/* CSS keyframes for animations */}
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        @keyframes pulse-core {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
