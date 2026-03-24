'use client'

import { useState } from 'react'
import { useCountUp } from '@/hooks/useCountUp'

const STATS = [
  { target: 12259, suffix: '+', label: '임플란트 시술' },
  { target: 23725, suffix: '+', label: '누적 진료' },
  { target: 10, suffix: '+', label: '진료 경력(년)' },
]

function StatItem({
  target,
  suffix,
  label,
}: {
  target: number
  suffix: string
  label: string
}) {
  const { count, elementRef } = useCountUp({ target, duration: 2200 })

  return (
    <div ref={elementRef} className="flex flex-col items-center gap-2">
      <div className="flex items-end gap-0.5">
        <span className="text-4xl md:text-6xl font-black tabular-nums text-white drop-shadow-lg">
          {count.toLocaleString()}
        </span>
        <span className="text-2xl md:text-4xl font-bold pb-1 text-white/80">
          {suffix}
        </span>
      </div>
      <p className="text-sm md:text-base text-white/70 tracking-wide">
        {label}
      </p>
    </div>
  )
}

export default function SedationSection() {
  const [playing, setPlaying] = useState(false)

  return (
    <section className="h-screen w-full relative overflow-hidden bg-black">
      {/* 유튜브 영상 배경 (풀스크린) */}
      {playing ? (
        <iframe
          src="https://www.youtube.com/embed/SOI5QjYwCMM?autoplay=1&mute=1&loop=1&playlist=SOI5QjYwCMM&controls=0&showinfo=0&modestbranding=1"
          className="absolute inset-0 w-full h-full"
          style={{ transform: 'scale(1.2)' }}
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="의식하진정법 소개 영상"
        />
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://img.youtube.com/vi/SOI5QjYwCMM/maxresdefault.jpg)',
          }}
        />
      )}

      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 bg-black/50" />

      {/* 콘텐츠 오버레이 */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        {/* 제목 */}
        <div className="text-center mb-8">
          <p className="text-xs tracking-[0.35em] uppercase text-white/50 mb-3">
            Sedation Dentistry
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
            의식하 진정법
          </h2>
          <p className="text-sm md:text-lg text-white/70 max-w-lg mx-auto">
            두려움 없이 편안한 치료 환경. 수면 상태에서 안전하게 치료받으세요.
          </p>
        </div>

        {/* 재생 버튼 (영상 미재생 시만) */}
        {!playing && (
          <button
            className="mb-12 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center border-2 border-white/40 hover:border-white hover:scale-110 transition-all duration-300"
            style={{ backgroundColor: 'rgba(107,123,58,0.7)' }}
            onClick={() => setPlaying(true)}
            aria-label="영상 재생"
          >
            <svg className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        )}

        {playing && <div className="mb-12" />}

        {/* 카운팅 숫자 (영상 위 오버랩) */}
        <div className="flex flex-wrap justify-center gap-10 md:gap-20 lg:gap-28">
          {STATS.map((s) => (
            <StatItem key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}
