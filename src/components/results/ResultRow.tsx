'use client'

import type { SearchResult } from '@/types'

interface ResultRowProps {
  result: SearchResult
  selected: boolean
  onClick: () => void
}

function penceToPrice(pence: number | null): string {
  if (!pence) return 'Free'
  return `£${(pence / 100).toFixed(2)}/hr`
}

function distanceLabel(m: number): string {
  return m < 1000 ? `${m}m` : `${(m / 1000).toFixed(1)}km`
}

function typeLabel(type: string): string {
  const map: Record<string, string> = {
    on_street: 'On-street',
    multi_storey: 'Car park',
    surface: 'Surface',
    underground: 'Underground',
    private: 'Private',
  }
  return map[type] ?? type
}

export function ResultRow({ result, selected, onClick }: ResultRowProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 border-b border-slate-100 transition-colors ${
        selected ? 'bg-blue-50' : 'hover:bg-slate-50'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
            selected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
          }`}
        >
          {result.provider.logo_text}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="font-semibold text-slate-800 text-sm leading-tight line-clamp-1">
              {result.name}
            </p>
            <span className="shrink-0 text-sm font-bold text-slate-800">
              {penceToPrice(result.tariff?.price_per_hour_pence ?? null)}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
            <span>{distanceLabel(result.distance_metres)}</span>
            <span>·</span>
            <span>{typeLabel(result.type)}</span>
            {result.covered && <span>· Covered</span>}
            {(result.ev_spaces ?? 0) > 0 && <span>· EV</span>}
          </div>
          {result.tariff?.daily_max_pence && (
            <p className="mt-0.5 text-xs text-slate-400">
              Max £{(result.tariff.daily_max_pence / 100).toFixed(0)}/day
            </p>
          )}
        </div>
      </div>
    </button>
  )
}
