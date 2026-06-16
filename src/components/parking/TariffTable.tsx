'use client'

import type { Tariff } from '@/types'

export function TariffTable({ tariff }: { tariff: Tariff }) {
  const rows: { label: string; value: string }[] = []
  if (tariff.price_per_hour_pence) {
    rows.push({ label: 'Per hour', value: `£${(tariff.price_per_hour_pence / 100).toFixed(2)}` })
  }
  if (tariff.daily_max_pence) {
    rows.push({ label: 'Daily max', value: `£${(tariff.daily_max_pence / 100).toFixed(2)}` })
  }
  if (tariff.free_minutes > 0) {
    rows.push({ label: 'Free period', value: `${tariff.free_minutes} min` })
  }
  if (tariff.max_stay_minutes) {
    rows.push({ label: 'Max stay', value: `${tariff.max_stay_minutes / 60} hr` })
  }

  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden">
      {rows.map((r, i) => (
        <div
          key={i}
          className={`flex justify-between px-4 py-2.5 text-sm ${
            i % 2 === 0 ? 'bg-white' : 'bg-slate-50'
          }`}
        >
          <span className="text-slate-500">{r.label}</span>
          <span className="font-semibold text-slate-800">{r.value}</span>
        </div>
      ))}
    </div>
  )
}
