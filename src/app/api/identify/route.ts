import { NextRequest, NextResponse } from 'next/server'
import { identifyLocation } from '@/lib/data'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const lat = parseFloat(searchParams.get('lat') ?? '')
  const lng = parseFloat(searchParams.get('lng') ?? '')

  if (isNaN(lat) || isNaN(lng)) {
    return NextResponse.json({ error: 'lat and lng required' }, { status: 400 })
  }

  const result = await identifyLocation(lat, lng)
  if (!result) {
    return NextResponse.json({ error: 'No parking location found nearby' }, { status: 404 })
  }
  return NextResponse.json(result)
}
