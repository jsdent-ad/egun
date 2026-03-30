'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const CLINIC_IMAGES = [
  '/images/clinic/interior-annex%20(1).jpeg',
  '/images/clinic/interior-annex%20(1).jpg',
  '/images/clinic/interior-annex%20(2).jpg',
  '/images/clinic/interior-annex%20(3).jpg',
  '/images/clinic/interior-annex%20(4).jpg',
  '/images/clinic/interior-annex%20(5).jpg',
  '/images/clinic/interior-annex%20(6).jpg',
  '/images/clinic/interior-annex%20(7).jpg',
  '/images/clinic/interior-annex%20(8).jpg',
  '/images/clinic/interior-annex%20(9).jpg',
]

const AUTO_INTERVAL = 4000

export default function InteriorSection() {
  const [current, setCurrent] = useState(0)
  const total = CLINIC_IMAGES.length

  const goTo = useCallback(
    (index: number) => {
      setCurrent(((index % total) + total) % total)
    },
    [total],
  )

  useEffect(() => {
    const timer = setInterval(() => goTo(current + 1), AUTO_INTERVAL)
    return () => clearInterval(timer)
  }, [current, goTo])

  const getCardStyle = (index: number) => {
    let diff = index - current
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total

    const absD = Math.abs(diff)

    if (absD > 2) {
      return {
        transform: 'translateX(0) scale(0.7)',
        opacity: 0,
        zIndex: 0,
        pointerEvents: 'none' as const,
      }
    }

    const translateX = diff * 320
    const scale = 1 - absD * 0.12
    const rotateY = diff * -8
    const z = 10 - absD
    const opacity = 1 - absD * 0.3

    return {
      transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
      opacity,
      zIndex: z,
      pointerEvents: (absD === 0 ? 'auto' : 'none') as React.CSSProperties['pointerEvents'],
    }
  }

  return (
    <section
      id="interior"
      className="py-20 sm:py-28 bg-stone-50 scroll-mt-32"
      aria-labelledby="interior-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#B8A080] mb-4">
          Interior
        </p>
        <h2
          id="interior-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4"
        >
          내부전경
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed mb-12">
          쾌적하고 편안한 환경에서 치료를 받으실 수 있도록 공간을 세심하게 구성하였습니다.
        </p>

        {/* 본관 라벨 */}
        <div className="flex items-center gap-4 mb-10">
          <h3 className="text-lg font-bold text-gray-900">본관</h3>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
      </div>

      {/* 3D 캐러셀 */}
      <div
        className="relative w-full overflow-hidden"
        style={{ perspective: '1200px', height: '420px' }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {CLINIC_IMAGES.map((src, i) => {
            const style = getCardStyle(i)
            return (
              <div
                key={i}
                className="absolute w-[280px] sm:w-[380px] lg:w-[480px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 ease-in-out"
                style={{
                  ...style,
                  transformStyle: 'preserve-3d',
                }}
              >
                <img
                  src={src}
                  alt={`서울이건치과 본관 내부 ${i + 1}`}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                {/* 비활성 카드 어둡게 */}
                {i !== current && (
                  <div className="absolute inset-0 bg-black/20 rounded-2xl" />
                )}
              </div>
            )
          })}
        </div>

        {/* 좌우 화살표 */}
        <button
          onClick={() => goTo(current - 1)}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
          aria-label="이전 사진"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={() => goTo(current + 1)}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
          aria-label="다음 사진"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* 인디케이터 */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {CLINIC_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'w-6 h-2 bg-[#B8A080]'
                : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`사진 ${i + 1}번으로 이동`}
          />
        ))}
      </div>
    </section>
  )
}
