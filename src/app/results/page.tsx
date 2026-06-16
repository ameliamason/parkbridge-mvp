'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { ParkingMap } from '@/components/map/ParkingMap'
import { FilterChips } from '@/components/results/FilterChips'
import { SortControl } from '@/components/results/SortControl'
import { ResultRow } from '@/components/results/ResultRow'
import { BottomSheet } from '@/components/ui/BottomSheet'
import { useSearchStore } from '@/store/search'
import type { SearchResult } from '@/types'

export default function ResultsPage() {
  const router = useRouter()
  const { destination, filters, sort, selectedId, setSelectedId } = useSearchStore()
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)

  const center: [number, number] = destination
    ? [destination.lat, destination.lng]
    : [51.505, -0.09]

  useEffect(() => {
    if (!destination) return
    setLoading(true)
    fetch(`/api/search?lat=${destination.lat}&lng=${destination.lng}&radius=1200`)
      .then((r) => r.json())
      .then((data: SearchResult[]) => setResults(data))
      .catch(() => setResults([]))
      .finally(() => setLoading(false))
  }, [destination])

  const filtered = useMemo(() => {
    let r = results
    if (filters.covered) r = r.filter((x) => x.covered)
    if (filters.accessible) r = r.filter((x) => (x.disabled_spaces ?? 0) > 0)
    if (filters.onStreetOnly) r = r.filter((x) => x.type === 'on_street')
    if (filters.carParkOnly) r = r.filter((x) => x.type === 'multi_storey' || x.type === 'underground')
    if (filters.maxPricePerHourPence != null)
      r = r.filter((x) => (x.tariff?.price_per_hour_pence ?? Infinity) <= (filters.maxPricePerHourPence ?? Infinity))
    if (sort === 'cheapest') {
      r = [...r].sort(
        (a, b) => (a.tariff?.price_per_hour_pence ?? 9999) - (b.tariff?.price_per_hour_pence ?? 9999)
      )
    }
    return r
  }, [results, filters, sort])

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="h-[55%] w-full">
        <ParkingMap
          center={center}
          zoom={15}
          results={filtered}
          selectedId={selectedId}
          onSelectPin={setSelectedId}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-10 flex items-center gap-2 p-3 bg-gradient-to-b from-white/90 to-transparent">
        <button onClick={() => router.back()} className="rounded-lg bg-white/90 p-2 shadow text-slate-600">
          ←
        </button>
        <div className="flex-1 rounded-xl bg-white/90 shadow px-3 py-2 text-sm font-medium text-slate-700 line-clamp-1">
          {destination?.label ?? 'Nearby parking'}
        </div>
      </div>

      <BottomSheet className="h-[48%]">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-4 py-2">
            <span className="text-sm font-semibold text-slate-700">
              {loading ? 'Searching…' : `${filtered.length} options`}
            </span>
            <div className="w-36">
              <SortControl />
            </div>
          </div>
          <FilterChips />
          <div className="flex-1 overflow-y-auto">
            {filtered.map((r) => (
              <ResultRow
                key={r.id}
                result={r}
                selected={r.id === selectedId}
                onClick={() => setSelectedId(r.id === selectedId ? null : r.id)}
              />
            ))}
            {!loading && filtered.length === 0 && (
              <p className="p-8 text-center text-sm text-slate-400">
                No parking found. Try adjusting the filters.
              </p>
            )}
          </div>
        </div>
      </BottomSheet>
    </div>
  )
}
