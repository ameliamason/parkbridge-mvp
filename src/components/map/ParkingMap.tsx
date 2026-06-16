'use client'

import dynamic from 'next/dynamic'
import type { SearchResult } from '@/types'

const ParkingMapInner = dynamic(() => import('./ParkingMapInner'), { ssr: false })

interface ParkingMapProps {
  center: [number, number]
  zoom?: number
  results?: SearchResult[]
  selectedId?: string | null
  onSelectPin?: (id: string) => void
  userPosition?: [number, number] | null
}

export function ParkingMap(props: ParkingMapProps) {
  return (
    <div className="h-full w-full">
      <ParkingMapInner {...props} />
    </div>
  )
}
