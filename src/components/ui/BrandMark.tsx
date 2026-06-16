'use client'

export function BrandMark({ className = '' }: { className?: string }) {
  return (
    <span className={`font-bold tracking-tight text-blue-600 ${className}`}>
      Park<span className="text-slate-800">Bridge</span>
    </span>
  )
}
