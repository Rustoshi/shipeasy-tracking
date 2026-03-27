// Company branding resolved from subdomain
export interface CompanyBranding {
  _id:          string
  name:         string
  slug:         string
  logo:         string | null
  email:        string
  phone:        string
  address:      string
  baseDomain:   string
  templateId:   'atlas' | 'pulse' | 'meridian'
  primaryColor:   string
  secondaryColor: string
  font:           string
  support: {
    type:         'none' | 'telegram' | 'smartsupp'
    telegramLink: string | null
    smartsuppKey: string | null
  } | null
}

// Public shipment — only fields safe for public display
export interface PublicShipment {
  trackingId:          string
  currentStatus:       ShipmentStatus
  senderName:          string
  senderAddress:       string
  receiverName:        string
  receiverEmail:       string
  receiverPhone:       string
  receiverAddress:     string
  originCountry:       string
  destinationCountry:  string
  description:         string
  weight:              number
  currency:            string
  declaredValue:       number
  images:              string[]
  charges: {
    amount:      number
    currency:    string
    description: string | null
    visible:     boolean
    status:      'Unpaid' | 'Partially paid' | 'Paid'
  }
  carrier: {
    name:         string | null
    trackingCode: string | null
  }
  createdAt: string
  updatedAt: string
}

export interface PublicShipmentHistory {
  _id:       string
  status:    ShipmentStatus
  remark:    string | null
  location:  string | null
  timestamp: string
}

export type ShipmentStatus =
  | 'Pending'
  | 'Shipment Created'
  | 'Picked Up'
  | 'Export Customs Clearance'
  | 'In Transit'
  | 'Arrived at Destination'
  | 'Import Customs Clearance'
  | 'Out for Delivery'
  | 'Delivered'
  | 'On Hold'
  | 'Returned'
  | 'Damaged'

// Status → progress % along the route arc
export const STATUS_PROGRESS: Record<ShipmentStatus, number> = {
  'Pending':                   0,
  'Shipment Created':          5,
  'Picked Up':                15,
  'Export Customs Clearance': 28,
  'In Transit':               50,
  'Arrived at Destination':   70,
  'Import Customs Clearance': 80,
  'Out for Delivery':         92,
  'Delivered':               100,
  'On Hold':                  -1,  // freeze at last known position
  'Returned':                 -2,  // reverse direction
  'Damaged':                  -1,  // freeze at last known position
}

// Fixed template palettes — colors are NOT configurable by companies
export const TEMPLATE_PALETTES = {
  atlas: {
    bg:        '#040d1f',
    bgSurface: '#071029',
    bgElevated: '#0c1a3d',
    gold:      '#c9a84c',
    goldLight: '#e2c05e',
    steel:     '#8ba0bc',
    white:     '#ffffff',
  },
  pulse: {
    bg:        '#ffffff',
    bgSurface: '#f7f9fc',
    bgElevated: '#eef2f7',
    blue:      '#2563eb',
    blueLight: '#3b82f6',
    navy:      '#0f172a',
    muted:     '#64748b',
  },
  meridian: {
    bg:        '#faf9f7',
    bgSurface: '#f2ede8',
    bgElevated: '#e8e0d5',
    slate:     '#2d3748',
    slateLight: '#4a5568',
    rule:      '#d1c8bc',
    ink:       '#1a202c',
  },
} as const
