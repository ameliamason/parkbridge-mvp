'use client'

interface ConfidenceBarProps {
  confidence: number
  accuracy: number
}

export function ConfidenceBar({ confidence, accuracy }: ConfidenceBarProps) {
  const color =
    confidence >= 85 ? 'bg-green-500' : confidence >= 65 ? 'bg-amber-500' : 'bg-red-400'

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-slate-500 mb-1.5">
        <span>Confidence</span>
        <span>
          {confidence}% · ±{accuracy}m
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full transition-all ${color}`}
          style={{ width: `${confidence}%` }}
        />
      </div>
    </div>
  )
}
