'use client'

import { useEffect, useRef } from 'react'
import JsBarcode             from 'jsbarcode'

interface Props {
  value:   string
  width?:  number
  height?: number
}

export default function Barcode({ value, width = 1.8, height = 60 }: Props) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !value) return

    JsBarcode(svgRef.current, value, {
      format:       'CODE128',
      width,
      height,
      displayValue: false,
      margin:       4,
      background:   '#ffffff',
      lineColor:    '#111827',
    })
  }, [value, width, height])

  return (
    <div style={{ textAlign: 'center' }}>
      <svg ref={svgRef} />
      <div style={{
        fontFamily:    "'JetBrains Mono', 'Courier New', monospace",
        fontSize:      11,
        fontWeight:    600,
        color:         '#374151',
        letterSpacing: '0.12em',
        marginTop:     4,
      }}>
        {value}
      </div>
    </div>
  )
}
