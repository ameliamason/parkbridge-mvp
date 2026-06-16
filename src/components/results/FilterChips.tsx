'use client'

import { Chip } from '@/components/ui/Chip'
import { useSearchStore } from '@/store/search'

export function FilterChips() {
  const { filters, setFilter } = useSearchStore()
  return (
    <div className="flex gap-2 overflow-x-auto px-4 py-2 scrollbar-none">
      <Chip label="Covered" active={filters.covered} onClick={() => setFilter('covered', !filters.covered)} />
      <Chip label="Open now" active={filters.openNow} onClick={() => setFilter('openNow', !filters.openNow)} />
      <Chip label="Accessible" active={filters.accessible} onClick={() => setFilter('accessible', !filters.accessible)} />
      <Chip label="On-street" active={filters.onStreetOnly} onClick={() => setFilter('onStreetOnly', !filters.onStreetOnly)} />
      <Chip label="Car park" active={filters.carParkOnly} onClick={() => setFilter('carParkOnly', !filters.carParkOnly)} />
    </div>
  )
}
