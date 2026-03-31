'use client'

import { useEffect, useRef, useState } from 'react'
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
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="h-screen w-full relative overflow-hidden bg-black">
      {/* 유튜브 영상 배경 - 보이면 자동재생, 안 보이면 정지 */}
      {visible ? (
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
        <div className="text-center mb-8">
          <p className="text-xs tracking-[0.35em] uppercase text-white/50 mb-3">
            Sedation Dentistry
          </p>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-2">
            두려움 없는 치과치료
          </h2>
          <p className="text-sm md:text-base text-white/60 max-w-md mx-auto leading-relaxed">
            수면 상태에서 안전하게, 의식하 진정법
          </p>
        </div>

        <div className="mb-12" />

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
