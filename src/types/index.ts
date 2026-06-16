export type ParkingType = 'on_street' | 'multi_storey' | 'surface' | 'underground' | 'private'

export interface ParkingLocation {
  id: string
  name: string
  type: ParkingType
  lat: number
  lng: number
  address: string
  postcode: string
  provider_id: string
  zone_code: string
  confidence_score: number
  total_spaces: number | null
  ev_spaces: number | null
  disabled_spaces: number | null
  covered: boolean
  overnight_allowed: boolean
  opening_hours: Record<string, string> | null
  provider?: Provider
  tariff?: Tariff
  distance_metres?: number
}

export interface Provider {
  id: string
  name: string
  slug: string
  logo_text: string
  logo_url: string | null
  deeplink_ios: string | null
  deeplink_android: string | null
  web_fallback_url: string
  app_store_url: string | null
  play_store_url: string | null
  phone_number: string | null
}

export type RateType = 'per_hour' | 'per_day' | 'per_stay' | 'free' | 'progressive'

export interface Tariff {
  id: string
  location_id: string
  name: string
  rate_type: RateType
  price_per_hour_pence: number | null
  daily_max_pence: number | null
  free_minutes: number
  max_stay_minutes: number | null
  applies_from: string | null
  applies_to: string | null
  days_of_week: number[]
  rate_bands: RateBand[] | null
  verified_at: string
}

export interface RateBand {
  up_to_minutes: number
  price_pence: number
}

export type CorrectionType =
  | 'wrong_zone_code'
  | 'wrong_price'
  | 'wrong_hours'
  | 'wrong_provider'
  | 'location_moved'
  | 'other'

export interface UserCorrection {
  location_id: string
  correction_type: CorrectionType
  reported_value: string
  expected_value: string
  notes: string
  session_token: string
}

export interface SearchResult extends ParkingLocation {
  distance_metres: number
  provider: Provider
  tariff: Tariff
}

export interface IdentifyResult {
  location: ParkingLocation
  provider: Provider
  tariff: Tariff
  zone_code: string
  confidence_score: number
  gps_accuracy_metres: number
  deeplink_ios: string | null
  deeplink_android: string | null
  web_fallback_url: string
}

export interface SearchFilters {
  maxPricePerHourPence: number | null
  covered: boolean
  openNow: boolean
  accessible: boolean
  preBookOnly: boolean
  onStreetOnly: boolean
  carParkOnly: boolean
}

export type SortMode = 'nearest' | 'cheapest'
