'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { searchPlaces, type GeocodeResult } from '@/lib/maps/geocode'

interface SearchBarProps {
  onSelect: (result: GeocodeResult) => void
  placeholder?: string
  autoFocus?: boolean
}

export function SearchBar({
  onSelect,
  placeholder = 'Search destination or postcode…',
  autoFocus = false,
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<GeocodeResult[]>([])
  const [loading, setLoading] = useState(false)
  const abortRef = useRef<AbortController | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const cacheRef = useRef<Map<string, GeocodeResult[]>>(new Map())

  const fetchSuggestions = useCallback(async (q: string) => {
    const cached = cacheRef.current.get(q)
    if (cached) { setSuggestions(cached); return }
    abortRef.current?.abort()
    abortRef.current = new AbortController()
    setLoading(true)
    try {
      const results = await searchPlaces(q, abortRef.current.signal)
      cacheRef.current.set(q, results)
      setSuggestions(results)
    } catch {
      // aborted or network error — ignore
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (query.trim().length < 3) { setSuggestions([]); return }
    timerRef.current = setTimeout(() => fetchSuggestions(query), 400)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [query, fetchSuggestions])

  function handleSelect(r: GeocodeResult) {
    setSuggestions([])
    setQuery('')
    onSelect(r)
  }

  return (
    <div className="relative w-full">
      <div className="flex items-center gap-2 rounded-xl bg-white border border-slate-200 shadow-md px-4 py-3">
        <svg className="h-4 w-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="flex-1 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 outline-none"
        />
        {loading && (
          <div className="h-4 w-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
        )}
      </div>
      {suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 top-full mt-1 z-50 rounded-xl bg-white shadow-xl border border-slate-100 overflow-hidden">
          {suggestions.map((r, i) => (
            <li key={i}>
              <button
                onClick={() => handleSelect(r)}
                className="w-full px-4 py-3 text-left text-sm hover:bg-slate-50 text-slate-700 border-b border-slate-100 last:border-0"
              >
                <span className="mr-2 text-slate-400">📍</span>
                <span className="line-clamp-1">{r.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
