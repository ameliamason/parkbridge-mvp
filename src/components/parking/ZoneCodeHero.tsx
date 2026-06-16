'use client'

interface ZoneCodeHeroProps {
  zoneCode: string
  providerName: string
}

export function ZoneCodeHero({ zoneCode, providerName }: ZoneCodeHeroProps) {
  return (
    <div className="text-center">
      <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
        {providerName} Zone Code
      </p>
      <div className="rounded-2xl bg-slate-900 px-8 py-5 inline-block">
        <span className="font-mono text-3xl font-bold tracking-widest text-white">
          {zoneCode}
        </span>
      </div>
      <p className="mt-3 text-xs text-slate-500">Enter this code in the provider app to pay</p>
    </div>
  )
}
