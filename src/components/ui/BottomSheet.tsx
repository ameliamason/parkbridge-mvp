'use client'

import { ReactNode } from 'react'

interface BottomSheetProps {
  children: ReactNode
  className?: string
}

export function BottomSheet({ children, className = '' }: BottomSheetProps) {
  return (
    <div
      className={`absolute bottom-0 left-0 right-0 rounded-t-2xl bg-white shadow-2xl ${className}`}
    >
      <div className="mx-auto mt-3 mb-1 h-1 w-10 rounded-full bg-slate-300" />
      {children}
    </div>
  )
}
