'use client'

import { buildDeepLink } from '@/lib/deeplinks/providers'

interface PayButtonProps {
  deeplink_ios: string | null
  web_fallback_url: string
  zone_code: string
  provider_name: string
}

export function PayButton({
  deeplink_ios,
  web_fallback_url,
  zone_code,
  provider_name,
}: PayButtonProps) {
  function handlePay() {
    const { url } = buildDeepLink(deeplink_ios, web_fallback_url, zone_code, provider_name)
    window.location.href = url
  }

  return (
    <button
      onClick={handlePay}
      className="w-full rounded-xl bg-green-600 py-4 text-center text-base font-bold text-white shadow-lg shadow-green-200 transition-colors hover:bg-green-700 active:bg-green-800"
    >
      Pay with {provider_name} →
    </button>
  )
}
