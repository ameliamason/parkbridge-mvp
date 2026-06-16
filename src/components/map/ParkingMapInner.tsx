'use client'

import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { SearchResult } from '@/types'
import { useEffect } from 'react'

function penceToLabel(pence: number | null): string {
  if (!pence) return '?'
  return `£${(pence / 100).toFixed(0)}`
}

function makePriceIcon(label: string, selected: boolean) {
  return L.divIcon({
    className: '',
    html: `<div style="
      background:${selected ? '#2563eb' : '#ffffff'};
      color:${selected ? '#ffffff' : '#1e293b'};
      border:2px solid ${selected ? '#1d4ed8' : '#94a3b8'};
      border-radius:20px;
      padding:3px 8px;
      font-size:12px;
      font-weight:700;
      white-space:nowrap;
      box-shadow:0 2px 6px rgba(0,0,0,0.15);
      font-family:system-ui,sans-serif;
    ">${label}/hr</div>`,
    iconAnchor: [28, 16],
  })
}

function makeUserIcon() {
  return L.divIcon({
    className: '',
    html: `<div style="
      width:14px;height:14px;
      background:#2563eb;
      border:3px solid white;
      border-radius:50%;
      box-shadow:0 0 0 3px rgba(37,99,235,0.3);
    "></div>`,
    iconAnchor: [7, 7],
  })
}

function RecenterMap({ center }: { center: [number, number] }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, map.getZoom())
  }, [center, map])
  return null
}

interface Props {
  center: [number, number]
  zoom?: number
  results?: SearchResult[]
  selectedId?: string | null
  onSelectPin?: (id: string) => void
  userPosition?: [number, number] | null
}

export default function ParkingMapInner({
  center,
  zoom = 15,
  results = [],
  selectedId,
  onSelectPin,
  userPosition,
}: Props) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <RecenterMap center={center} />
      {userPosition && (
        <Marker position={userPosition} icon={makeUserIcon()} />
      )}
      {results.map((r) => (
        <Marker
          key={r.id}
          position={[r.lat, r.lng]}
          icon={makePriceIcon(
            penceToLabel(r.tariff?.price_per_hour_pence ?? null),
            r.id === selectedId
          )}
          eventHandlers={{ click: () => onSelectPin?.(r.id) }}
        />
      ))}
    </MapContainer>
  )
}
