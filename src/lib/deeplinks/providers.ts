export interface DeepLinkResult {
  url: string
  isApp: boolean
  label: string
}

export function buildDeepLink(
  deeplink_ios: string | null,
  web_fallback_url: string,
  zone_code: string,
  provider_name: string
): DeepLinkResult {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
  const isAndroid = /Android/.test(navigator.userAgent)
  const template = isIOS || isAndroid ? deeplink_ios : null
  const resolved = template
    ? template.replace('{zone_code}', encodeURIComponent(zone_code))
    : null
  return {
    url: resolved ?? web_fallback_url,
    isApp: !!resolved,
    label: `Pay with ${provider_name}`,
  }
}

export const PROVIDER_DEEPLINKS: Record<string, { ios: string; web: string }> = {
  ringgo: {
    ios: 'ringgo://pay?locationCode={zone_code}',
    web: 'https://www.ringgo.co.uk/ringgo/index.php?pagename=findlocation&location={zone_code}',
  },
  paybyphone: {
    ios: 'paybyphone://parking?locationNumber={zone_code}',
    web: 'https://m.paybyphone.com/parking?locationNumber={zone_code}',
  },
  justpark: {
    ios: 'justpark://location/{zone_code}',
    web: 'https://www.justpark.com/locations/{zone_code}',
  },
  ncp: {
    ios: 'ncp://carpark/{zone_code}',
    web: 'https://www.ncp.co.uk/find-a-car-park/',
  },
  qpark: {
    ios: 'qpark://location/{zone_code}',
    web: 'https://www.q-park.co.uk/en-gb/',
  },
  apcoa: {
    ios: 'apcoaconnect://park?facilityId={zone_code}',
    web: 'https://www.apcoa.co.uk/',
  },
  flowbird: {
    ios: 'flowbird://pay?zone={zone_code}',
    web: 'https://flowbird.group/',
  },
}
