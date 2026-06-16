import type { SearchResult, IdentifyResult } from '@/types'

export async function searchParkingSupabase(
  lat: number,
  lng: number,
  radius: number
): Promise<SearchResult[]> {
  void lat; void lng; void radius
  throw new Error('Supabase not configured')
}

export async function identifyLocationSupabase(
  lat: number,
  lng: number
): Promise<IdentifyResult | null> {
  void lat; void lng
  throw new Error('Supabase not configured')
}
