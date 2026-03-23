'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'
import { useCountUp } from '@/hooks/useCountUp'

const STATS = [
  { target: 2500, suffix: '+', label: '임플란트 시술', unit: '건' },
  { target: 15000, suffix: '+', label: '누적 진료', unit: '건' },
  { target: 10, suffix: '+', label: '진료 경력', unit: '년' },
]

function StatItem({
  target,
  suffix,
  label,
  unit,
}: {
  target: number
  suffix: string
  label: string
  unit: string
}) {
  const { count, elementRef } = useCountUp({ target, duration: 2200 })

  return (
    <div ref={elementRef} className="flex flex-col items-center gap-1">
      <div className="flex items-end gap-0.5">
        <span
          className="text-4xl md:text-5xl font-black tabular-nums"
          style={{ color: '#6B7B3A' }}
        >
          {count.toLocaleString()}
        </span>
        <span className="text-2xl md:text-3xl font-bold pb-1" style={{ color: '#8B7D3C' }}>
          {suffix}
        </span>
      </div>
      <p className="text-xs text-stone-500 tracking-wide">
        {label}
        <span className="ml-1 text-stone-400">({unit})</span>
      </p>
    </div>
  )
}

export default function SedationSection() {
  const [playing, setPlaying] = useState(false)

  return (
    <section className="h-screen w-full bg-white flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      {/* Header */}
      <div className="text-center mb-8 md:mb-10">
        <p className="text-xs tracking-[0.35em] uppercase text-stone-400 mb-2">
          Sedation Dentistry
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-stone-800 mb-2">
          의식하 진정법
        </h2>
        <p className="text-sm md:text-base text-stone-500 leading-relaxed max-w-md mx-auto">
          두려움 없이 편안한 치료 환경. 수면 상태에서 안전하게 치료받으세요.
        </p>
        <div className="mt-3 w-10 h-0.5 mx-auto" style={{ backgroundColor: '#6B7B3A' }} />
      </div>

      {/* Video placeholder */}
      <div className="w-full max-w-2xl aspect-video rounded-xl overflow-hidden relative mb-8 md:mb-12 bg-stone-800">
        {/* Thumbnail placeholder gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-700 via-stone-800 to-stone-900" />

        {/* Play overlay */}
        {!playing ? (
          <button
            className="absolute inset-0 flex items-center justify-center group"
            onClick={() => setPlaying(true)}
            aria-label="진정법 영상 재생"
          >
            <div
              className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center border-2 border-white/50 group-hover:border-white transition-all duration-300 group-hover:scale-110"
              style={{ backgroundColor: 'rgba(107,123,58,0.85)' }}
            >
              <Play
                size={28}
                fill="white"
                className="ml-1 text-white"
                aria-hidden="true"
              />
            </div>
            <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-white/50 tracking-widest">
              의식하 진정법 소개 영상
            </div>
          </button>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white/40 text-sm">영상이 준비 중입니다.</p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="flex flex-wrap justify-center gap-8 md:gap-16 lg:gap-24 w-full max-w-2xl">
        {STATS.map((s) => (
          <StatItem key={s.label} {...s} />
        ))}
      </div>
    </section>
  )
}
