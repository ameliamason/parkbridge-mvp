'use client'

interface ChipProps {
  label: string
  active?: boolean
  onClick?: () => void
}

export function Chip({ label, active = false, onClick }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
        active
          ? 'bg-blue-600 text-white'
          : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-400'
      }`}
    >
      {label}
    </button>
  )
}
