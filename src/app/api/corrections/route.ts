import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json() as Record<string, unknown>
  const { location_id, correction_type, reported_value, expected_value, notes, session_token } = body

  if (!location_id || !correction_type || !session_token) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  console.log('[correction]', { location_id, correction_type, reported_value, expected_value, notes, session_token })
  return NextResponse.json({ ok: true })
}
