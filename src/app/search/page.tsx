'use client'

import { useRouter } from 'next/navigation'
import { BrandMark } from '@/components/ui/BrandMark'
import { SearchBar } from '@/components/search/SearchBar'
import { useSearchStore } from '@/store/search'
import type { GeocodeResult } from '@/lib/maps/geocode'

const QUICK_PICKS = [
  { label: 'London Bridge', lat: 51.5079, lng: -0.0877 },
  { label: 'Southwark', lat: 51.5025, lng: -0.1058 },
  { label: 'Bermondsey', lat: 51.4982, lng: -0.0643 },
  { label: 'Borough Market', lat: 51.5055, lng: -0.0912 },
]

export default function SearchPage() {
  const router = useRouter()
  const { setDestination } = useSearchStore()

  function handleSelect(result: GeocodeResult) {
    setDestination({ label: result.label, lat: result.lat, lng: result.lng })
    router.push('/results')
  }

  return (
    <div className="flex h-screen flex-col bg-white">
      <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-4">
        <button onClick={() => router.back()} className="text-slate-500 hover:text-slate-800">
          ←
        </button>
        <BrandMark />
      </div>

      <div className="px-4 pt-4">
        <SearchBar onSelect={handleSelect} autoFocus placeholder="Search destination or postcode…" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Quick picks
        </p>
        <ul className="space-y-1">
          {QUICK_PICKS.map((place) => (
            <li key={place.label}>
              <button
                onClick={() =>
                  handleSelect({ label: place.label, lat: place.lat, lng: place.lng })
                }
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left hover:bg-slate-50"
              >
                <span className="text-slate-400">🕐</span>
                <span className="text-sm font-medium text-slate-700">{place.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
