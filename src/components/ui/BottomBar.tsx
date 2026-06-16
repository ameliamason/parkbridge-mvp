'use client'

import { useRouter } from 'next/navigation'

export function BottomBar() {
  const router = useRouter()
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 safe-bottom">
      <button
        onClick={() => router.push('/parked')}
        className="w-full rounded-xl border-2 border-slate-800 bg-white py-3 text-center font-semibold text-slate-800 transition-colors hover:bg-slate-50 active:bg-slate-100"
      >
        📍 I&apos;m parked — find my zone
      </button>
    </div>
  )
}
