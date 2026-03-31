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
      '치아색 레진으로 당일 복원.\n삭제 최소화, 자연치아 보존.',
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
      '신경을 살리면서 치아를 지키는\n치수보존술로 수명을 연장합니다.',
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
      '크라운 대신 삭제를 최소화한\n온레이 보철로 치질을 보존합니다.',
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
        <p className="text-xs tracking-[0.35em] uppercase text-stone-400 mb-3">
          Natural Tooth Solution
        </p>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-stone-800 leading-tight mb-1">
          자연치 보존 솔루션
        </h2>
        <p className="text-sm md:text-base text-stone-500">
          최소 삭제, 최대 보존
        </p>
        <div className="mt-4 w-10 h-0.5 mx-auto" style={{ backgroundColor: '#B8A080' }} />
      </div>

      {/* Cards */}
      <div className="flex flex-row gap-3 md:gap-6 w-full max-w-5xl">
        {CARDS.map((card) => {
          const isHovered = hovered === card.id

          return (
            <button
              key={card.id}
              className="relative flex-1 rounded-2xl overflow-hidden cursor-pointer focus:outline-none group"
              style={{ minHeight: '200px', maxHeight: '340px', height: '32vw' }}
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
                <p className="text-sm text-white/85 leading-relaxed whitespace-pre-line">{card.description}</p>
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
