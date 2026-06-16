'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { ZoneCodeHero } from '@/components/parking/ZoneCodeHero'
import { ConfidenceBar } from '@/components/atcar/ConfidenceBar'
import { PayButton } from '@/components/atcar/PayButton'
import { ProviderBadge } from '@/components/parking/ProviderBadge'
import { TariffTable } from '@/components/parking/TariffTable'
import { useSessionStore } from '@/store/session'

function LocatedContent() {
  const router = useRouter()
  const params = useSearchParams()
  const { identifyResult, gpsAccuracy } = useSessionStore()

  const manualZone = params.get('zone')
  const isManual = params.get('manual') === '1'

  if (!identifyResult && !manualZone) {
    return (
      <div className="flex h-screen flex-col items-center justify-center p-6 text-center">
        <p className="text-slate-500">No location data. Try again.</p>
        <button
          onClick={() => router.push('/parked')}
          className="mt-4 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white"
        >
          Retry GPS
        </button>
      </div>
    )
  }

  const zone = manualZone ?? identifyResult?.zone_code ?? ''
  const provider = identifyResult?.provider
  const tariff = identifyResult?.tariff
  const confidence = identifyResult?.confidence_score ?? 0
  const accuracy = gpsAccuracy ?? identifyResult?.gps_accuracy_metres ?? 0

  return (
    <div className="flex h-screen flex-col overflow-y-auto bg-white">
      <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-4">
        <button onClick={() => router.push('/')} className="text-slate-500">
          ←
        </button>
        <h1 className="font-semibold text-slate-800">Your parking zone</h1>
      </div>

      <div className="flex-1 space-y-5 px-4 py-6">
        <ZoneCodeHero
          zoneCode={zone}
          providerName={provider?.name ?? 'Parking provider'}
        />

        {!isManual && identifyResult && (
          <ConfidenceBar confidence={confidence} accuracy={Math.round(accuracy)} />
        )}

        {provider && (
          <ProviderBadge provider={provider} />
        )}

        {tariff && <TariffTable tariff={tariff} />}

        {provider && identifyResult && (
          <PayButton
            deeplink_ios={identifyResult.deeplink_ios}
            web_fallback_url={identifyResult.web_fallback_url}
            zone_code={zone}
            provider_name={provider.name}
          />
        )}

        <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-xs text-amber-800">
          <strong>Always check the sign on street.</strong> ParkBridge uses GPS and
          map data to identify your zone — always verify the zone code shown on the
          physical sign before paying to avoid a Penalty Charge Notice.
        </div>

        <button
          onClick={() => router.push('/fallback')}
          className="w-full text-center text-sm text-slate-500 underline underline-offset-2"
        >
          Not right? Report an issue
        </button>
      </div>
    </div>
  )
}

export default function LocatedPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" /></div>}>
      <LocatedContent />
    </Suspense>
  )
}
