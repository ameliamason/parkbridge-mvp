'use client'

import { useRouter } from 'next/navigation'

export function FallbackPanel() {
  const router = useRouter()
  return (
    <div className="space-y-3">
      <button
        onClick={() => router.push('/parked')}
        className="w-full rounded-xl border-2 border-slate-200 bg-white p-4 text-left hover:border-blue-300 hover:bg-blue-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">🔄</span>
          <div>
            <p className="font-semibold text-slate-800">Try GPS again</p>
            <p className="text-xs text-slate-500">Move to an open area and retry</p>
          </div>
        </div>
      </button>
      <button
        onClick={() => {
          const code = prompt('Enter your parking zone code from the sign:')
          if (code) {
            router.push(`/located?zone=${encodeURIComponent(code)}&manual=1`)
          }
        }}
        className="w-full rounded-xl border-2 border-slate-200 bg-white p-4 text-left hover:border-blue-300 hover:bg-blue-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">✏️</span>
          <div>
            <p className="font-semibold text-slate-800">Enter code manually</p>
            <p className="text-xs text-slate-500">Type the zone code from the sign</p>
          </div>
        </div>
      </button>
      <button
        onClick={() => router.push('/')}
        className="w-full rounded-xl border-2 border-slate-200 bg-white p-4 text-left hover:border-blue-300 hover:bg-blue-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">🗺️</span>
          <div>
            <p className="font-semibold text-slate-800">Search nearby parking</p>
            <p className="text-xs text-slate-500">Browse options on the map</p>
          </div>
        </div>
      </button>
    </div>
  )
}
