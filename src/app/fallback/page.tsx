'use client'

import { useRouter } from 'next/navigation'
import { FallbackPanel } from '@/components/atcar/FallbackPanel'

export default function FallbackPage() {
  const router = useRouter()
  return (
    <div className="flex h-screen flex-col bg-white">
      <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-4">
        <button onClick={() => router.back()} className="text-slate-500">
          ←
        </button>
        <h1 className="font-semibold text-slate-800">Couldn&apos;t identify location</h1>
      </div>

      <div className="flex-1 px-4 py-6 space-y-4">
        <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
          GPS couldn&apos;t determine your exact zone. Try one of the options below.
        </div>

        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
          What would you like to do?
        </p>

        <FallbackPanel />

        <p className="text-xs text-slate-400 text-center pt-4">
          Always check the sign on street before paying.
        </p>
      </div>
    </div>
  )
}
