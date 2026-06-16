'use client'

export function GpsPulse() {
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute h-32 w-32 rounded-full bg-blue-100 animate-ping opacity-40" />
      <div className="absolute h-20 w-20 rounded-full bg-blue-200 animate-ping opacity-60 animation-delay-150" />
      <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 shadow-lg">
        <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
      </div>
    </div>
  )
}
