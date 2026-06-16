'use client'

import { useRouter } from 'next/navigation'
import { BrandMark } from '@/components/ui/BrandMark'
import { BottomBar } from '@/components/ui/BottomBar'
import { ParkingMap } from '@/components/map/ParkingMap'
import { useSearchStore } from '@/store/search'
import type { GeocodeResult } from '@/lib/maps/geocode'
import { SearchBar } from '@/components/search/SearchBar'

const LONDON_CENTER: [number, number] = [51.505, -0.09]

export default function HomePage() {
  const router = useRouter()
  const { setDestination } = useSearchStore()

  function handleSelect(result: GeocodeResult) {
    setDestination({ label: result.label, lat: result.lat, lng: result.lng })
    router.push('/results')
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <ParkingMap center={LONDON_CENTER} zoom={13} />

      <div className="absolute top-0 left-0 right-0 z-10 p-4 pt-safe">
        <div className="mb-3 flex items-center justify-between">
          <BrandMark className="text-xl" />
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            London pilot
          </span>
        </div>
        <SearchBar onSelect={handleSelect} placeholder="Where are you going?" />
      </div>

      <BottomBar />
    </div>
  )
}
