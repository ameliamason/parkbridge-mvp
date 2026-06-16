import { searchParkingMock, identifyLocationMock } from './mock'

export const usingSupabase = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function searchParking(lat: number, lng: number, radius = 800) {
  if (!usingSupabase) return searchParkingMock(lat, lng, radius)
  const { searchParkingSupabase } = await import('./supabase-source')
  return searchParkingSupabase(lat, lng, radius)
}

export async function identifyLocation(lat: number, lng: number) {
  if (!usingSupabase) return identifyLocationMock(lat, lng)
  const { identifyLocationSupabase } = await import('./supabase-source')
  return identifyLocationSupabase(lat, lng)
}
