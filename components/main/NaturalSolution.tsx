'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

const CARDS = [
  {
    id: 'resin',
    label: '01',
    title: '원데이 레진빌드업',
    subtitle: 'One-Day Resin Build-up',
    description:
      '충치 범위가 작을 때 치아색 레진으로 당일 복원. 삭제 최소화 · 자연치아 보존을 최우선으로 합니다.',
    gradient: 'from-amber-50 to-stone-100',
    iconColor: '#C4A87A',
    image: '/images/treatments/resin-buildup-treat.jpg',
  },
  {
    id: 'vpt',
    label: '02',
    title: 'VPT 신경보존술',
    subtitle: 'Vital Pulp Therapy',
    description:
      '신경을 살리면서 치아를 지키는 치수보존술. 신경치료 없이 자연 치아 수명을 연장합니다.',
    gradient: 'from-green-50 to-stone-100',
    iconColor: '#B8A080',
    image: '/images/treatments/vpt-treat.jpg',
  },
  {
    id: 'onlay',
    label: '03',
    title: '최소삭제 온레이',
    subtitle: 'Minimal Prep Onlay',
    description:
      '크라운 대신 치아 삭제를 최소화한 온레이 보철. 건강한 치질을 최대한 보존합니다.',
    gradient: 'from-sky-50 to-stone-100',
    iconColor: '#B8A080',
    image: '/images/treatments/onlay-treat.jpg',
  },
]

export default function NaturalSolution() {
  const [hovered, setHovered] = useState<string | null>(null)
  const router = useRouter()

  return (
    <section className="h-screen w-full flex flex-col items-center justify-center px-4 py-12 overflow-hidden"
      style={{ backgroundColor: '#F5F3EE' }}>
      {/* Header */}
      <div className="text-center mb-8 md:mb-12">
        <p className="text-xs tracking-[0.35em] uppercase text-stone-400 mb-2">
          Natural Tooth Solution
        </p>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-stone-800 leading-snug">
          자연치를 보존하는 이건치과 솔루션
        </h2>
        <div className="mt-3 w-10 h-0.5 mx-auto" style={{ backgroundColor: '#B8A080' }} />
      </div>

      {/* Cards */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full max-w-5xl">
        {CARDS.map((card) => {
          const isHovered = hovered === card.id

          return (
            <button
              key={card.id}
              className="relative flex-1 rounded-2xl overflow-hidden cursor-pointer focus:outline-none group"
              style={{ minHeight: '260px', maxHeight: '340px', height: '32vw' }}
              onMouseEnter={() => setHovered(card.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => router.push('/natural-tooth')}
              aria-label={`${card.title} 자세히 보기`}
            >
              {/* 배경 이미지 */}
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                style={{ filter: isHovered ? 'brightness(0.4)' : 'brightness(0.85)' }}
              />
              {/* 그라데이션 오버레이 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Hover overlay */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center transition-opacity duration-300"
                style={{ opacity: isHovered ? 1 : 0 }}
              >
                <p className="text-base font-bold text-white mb-3">{card.title}</p>
                <p className="text-sm text-white/85 leading-relaxed">{card.description}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-xs text-white/70">
                  자세히 보기 <ArrowRight size={12} aria-hidden="true" />
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Bottom link */}
      <button
        onClick={() => router.push('/natural-tooth')}
        className="mt-8 md:mt-10 inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-stone-900 group transition-colors duration-200"
      >
        자연치 보존치료 전체 보기
        <ArrowRight
          size={14}
          className="group-hover:translate-x-1 transition-transform duration-200"
          aria-hidden="true"
        />
      </button>
    </section>
  )
}
