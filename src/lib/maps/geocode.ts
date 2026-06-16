export interface GeocodeResult {
  label: string
  lat: number
  lng: number
}

const ENDPOINT = 'https://nominatim.openstreetmap.org/search'

export async function searchPlaces(
  query: string,
  signal?: AbortSignal
): Promise<GeocodeResult[]> {
  if (query.trim().length < 3) return []
  const params = new URLSearchParams({
    q: query,
    format: 'jsonv2',
    countrycodes: 'gb',
    addressdetails: '1',
    limit: '6',
  })
  const res = await fetch(`${ENDPOINT}?${params}`, {
    signal,
    headers: { 'Accept-Language': 'en-GB' },
  })
  if (!res.ok) return []
  const data = (await res.json()) as Array<{
    display_name: string
    lat: string
    lon: string
  }>
  return data.map((d) => ({
    label: d.display_name,
    lat: parseFloat(d.lat),
    lng: parseFloat(d.lon),
  }))
}
