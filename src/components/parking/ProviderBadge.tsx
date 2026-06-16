'use client'

import type { Provider } from '@/types'

export function ProviderBadge({ provider }: { provider: Provider }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-slate-50 border border-slate-200 px-4 py-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-sm font-bold text-white">
        {provider.logo_text}
      </div>
      <div>
        <p className="font-semibold text-slate-800">{provider.name}</p>
        <p className="text-xs text-slate-500">Parking provider</p>
      </div>
    </div>
  )
}
