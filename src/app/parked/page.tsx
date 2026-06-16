'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { GpsPulse } from '@/components/atcar/GpsPulse'
import { useSessionStore } from '@/store/session'
import { getCurrentPosition } from '@/lib/geo/location'
import type { IdentifyResult } from '@/types'

export default function ParkedPage() {
  const router = useRouter()
  const { setGps, setIdentifyResult, setMode } = useSessionStore()

  useEffect(() => {
    let cancelled = false

    async function identify() {
      try {
        const pos = await getCurrentPosition()
        if (cancelled) return
        setGps(pos.lat, pos.lng, pos.accuracy)

        const res = await fetch(`/api/identify?lat=${pos.lat}&lng=${pos.lng}`)
        if (cancelled) return

        if (res.ok) {
          const data = (await res.json()) as IdentifyResult
          setIdentifyResult(data)
          setMode('located')
          router.push('/located')
        } else {
          setMode('fallback')
          router.push('/fallback')
        }
      } catch {
        if (!cancelled) {
          setMode('fallback')
          router.push('/fallback')
        }
      }
    }

    identify()
    return () => { cancelled = true }
  }, [router, setGps, setIdentifyResult, setMode])

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8 bg-white px-6">
      <GpsPulse />
      <div className="text-center">
        <h1 className="text-xl font-bold text-slate-800">Finding your location…</h1>
        <p className="mt-2 text-sm text-slate-500">
          Allow location access when prompted
        </p>
      </div>
      <button
        onClick={() => router.push('/fallback')}
        className="text-sm text-blue-600 underline underline-offset-2"
      >
        Can&apos;t find my location — enter manually
      </button>
    </div>
  )
}
