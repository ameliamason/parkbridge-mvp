import { v4 as uuidv4 } from 'uuid'

const SESSION_KEY = 'pb_session_token'

export function getSessionToken(): string {
  if (typeof window === 'undefined') return ''
  const existing = localStorage.getItem(SESSION_KEY)
  if (existing) return existing
  const newToken = uuidv4()
  localStorage.setItem(SESSION_KEY, newToken)
  return newToken
}
