import { create } from 'zustand'
import type { SearchFilters, SortMode } from '@/types'

interface SearchStore {
  destination: { label: string; lat: number; lng: number } | null
  filters: SearchFilters
  sort: SortMode
  selectedId: string | null
  setDestination: (dest: { label: string; lat: number; lng: number } | null) => void
  setSort: (sort: SortMode) => void
  setSelectedId: (id: string | null) => void
  setFilter: <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => void
}

const DEFAULT_FILTERS: SearchFilters = {
  maxPricePerHourPence: null,
  covered: false,
  openNow: false,
  accessible: false,
  preBookOnly: false,
  onStreetOnly: false,
  carParkOnly: false,
}

export const useSearchStore = create<SearchStore>((set) => ({
  destination: null,
  filters: DEFAULT_FILTERS,
  sort: 'nearest',
  selectedId: null,
  setDestination: (dest) => set({ destination: dest }),
  setSort: (sort) => set({ sort }),
  setSelectedId: (id) => set({ selectedId: id }),
  setFilter: (key, value) =>
    set((s) => ({ filters: { ...s.filters, [key]: value } })),
}))
