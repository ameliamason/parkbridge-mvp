import { create } from 'zustand'
import type { IdentifyResult } from '@/types'

type AppMode = 'plan' | 'identifying' | 'located' | 'fallback'

interface SessionStore {
  mode: AppMode
  gpsLat: number | null
  gpsLng: number | null
  gpsAccuracy: number | null
  identifyResult: IdentifyResult | null
  setMode: (mode: AppMode) => void
  setGps: (lat: number, lng: number, accuracy: number) => void
  setIdentifyResult: (result: IdentifyResult | null) => void
}

export const useSessionStore = create<SessionStore>((set) => ({
  mode: 'plan',
  gpsLat: null,
  gpsLng: null,
  gpsAccuracy: null,
  identifyResult: null,
  setMode: (mode) => set({ mode }),
  setGps: (lat, lng, accuracy) => set({ gpsLat: lat, gpsLng: lng, gpsAccuracy: accuracy }),
  setIdentifyResult: (result) => set({ identifyResult: result }),
}))
