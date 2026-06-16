'use client'

import { useSearchStore } from '@/store/search'

export function SortControl() {
  const { sort, setSort } = useSearchStore()
  return (
    <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
      <button
        onClick={() => setSort('nearest')}
        className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
          sort === 'nearest' ? 'bg-white shadow text-slate-800' : 'text-slate-500'
        }`}
      >
        Nearest
      </button>
      <button
        onClick={() => setSort('cheapest')}
        className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
          sort === 'cheapest' ? 'bg-white shadow text-slate-800' : 'text-slate-500'
        }`}
      >
        Cheapest
      </button>
    </div>
  )
}
