import { NextRequest, NextResponse } from 'next/server'
import { searchParking } from '@/lib/data'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const lat = parseFloat(searchParams.get('lat') ?? '')
  const lng = parseFloat(searchParams.get('lng') ?? '')
  const radius = parseInt(searchParams.get('radius') ?? '800', 10)

  if (isNaN(lat) || isNaN(lng)) {
    return NextResponse.json({ error: 'lat and lng required' }, { status: 400 })
  }

  const results = await searchParking(lat, lng, radius)
  return NextResponse.json(results)
}
