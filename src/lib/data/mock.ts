import type { SearchResult, IdentifyResult } from '@/types'
import { MOCK_PROVIDERS, MOCK_LOCATIONS } from './mock-data'

function distanceMetres(aLat: number, aLng: number, bLat: number, bLng: number): number {
  const R = 6371000
  const toRad = (d: number) => (d * Math.PI) / 180
  const dLat = toRad(bLat - aLat)
  const dLng = toRad(bLng - aLng)
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(s))
}

const providerBySlug = (slug: string) => MOCK_PROVIDERS.find((p) => p.slug === slug)!

export function searchParkingMock(lat: number, lng: number, radius = 800): SearchResult[] {
  return MOCK_LOCATIONS.map((l) => ({ l, d: distanceMetres(lat, lng, l.lat, l.lng) }))
    .filter(({ d }) => d <= radius)
    .sort((a, b) => a.d - b.d)
    .slice(0, 20)
    .map(({ l, d }) => {
      const pr = providerBySlug(l.provider_slug)
      return {
        id: l.id,
        name: l.name,
        type: l.type,
        lat: l.lat,
        lng: l.lng,
        address: l.address,
        postcode: l.postcode,
        provider_id: pr.id,
        zone_code: l.zone_code,
        confidence_score: l.confidence_score,
        covered: l.covered,
        ev_spaces: l.ev_spaces,
        disabled_spaces: l.disabled_spaces,
        total_spaces: null,
        overnight_allowed: true,
        opening_hours: null,
        distance_metres: Math.round(d),
        provider: {
          ...pr,
          logo_url: null,
          deeplink_android: pr.deeplink_ios,
          app_store_url: null,
          play_store_url: null,
          phone_number: null,
        },
        tariff: {
          id: `t-${l.id}`,
          location_id: l.id,
          name: 'Standard',
          rate_type: 'per_hour' as const,
          price_per_hour_pence: l.price_per_hour_pence,
          daily_max_pence: l.daily_max_pence,
          free_minutes: 0,
          max_stay_minutes: l.max_stay_minutes,
          applies_from: null,
          applies_to: null,
          days_of_week: [1, 2, 3, 4, 5, 6, 7],
          rate_bands: null,
          verified_at: new Date().toISOString(),
        },
      } as SearchResult
    })
}

export function identifyLocationMock(lat: number, lng: number): IdentifyResult | null {
  const near = MOCK_LOCATIONS.map((l) => ({ l, d: distanceMetres(lat, lng, l.lat, l.lng) }))
    .filter(({ d }) => d <= 300)
    .sort((a, b) => b.l.confidence_score - a.l.confidence_score || a.d - b.d)
  if (near.length === 0) return null
  const entry = near[0]
  if (!entry) return null
  const { l, d } = entry
  const pr = providerBySlug(l.provider_slug)
  return {
    location: {
      id: l.id,
      name: l.name,
      type: l.type as 'on_street' | 'multi_storey' | 'surface' | 'underground' | 'private',
      lat: l.lat,
      lng: l.lng,
      address: l.address,
      postcode: l.postcode,
      provider_id: pr.id,
      zone_code: l.zone_code,
      confidence_score: l.confidence_score,
      total_spaces: null,
      ev_spaces: l.ev_spaces,
      disabled_spaces: l.disabled_spaces,
      covered: l.covered,
      overnight_allowed: true,
      opening_hours: null,
    },
    provider: {
      ...pr,
      logo_url: null,
      deeplink_android: pr.deeplink_ios,
      app_store_url: null,
      play_store_url: null,
      phone_number: null,
    },
    tariff: {
      id: `t-${l.id}`,
      location_id: l.id,
      name: 'Standard',
      rate_type: 'per_hour' as const,
      price_per_hour_pence: l.price_per_hour_pence,
      daily_max_pence: l.daily_max_pence,
      free_minutes: 0,
      max_stay_minutes: l.max_stay_minutes,
      applies_from: null,
      applies_to: null,
      days_of_week: [1, 2, 3, 4, 5, 6, 7],
      rate_bands: null,
      verified_at: new Date().toISOString(),
    },
    zone_code: l.zone_code,
    confidence_score: l.confidence_score,
    gps_accuracy_metres: Math.max(5, Math.round(d)),
    deeplink_ios: pr.deeplink_ios,
    deeplink_android: pr.deeplink_ios,
    web_fallback_url: pr.web_fallback_url,
  }
}
