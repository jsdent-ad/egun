'use client'

import { useState, useEffect } from 'react'

const PHILOSOPHY_SLIDES = [
  {
    doctorName: '이재성 대표원장',
    imageBg: 'bg-stone-200',
    initials: '이',
  },
  {
    doctorName: '유수현 원장',
    imageBg: 'bg-olive-100',
    initials: '유',
  },
]

const CORE_VALUES = [
  {
    title: '책임진료',
    description:
      '처음 상담부터 치료 마무리까지 담당 원장이 직접 책임지고 진료합니다. 치료 도중 담당이 바뀌는 일은 없습니다.',
  },
  {
    title: '과잉진료 Zero',
    description:
      '필요한 치료만, 정직하게 안내드립니다. 환자분의 치아 상태에 맞는 최선의 선택지를 함께 고민합니다.',
  },
  {
    title: '통증 최소화',
    description:
      '최신 마취 기법과 충분한 마취 시간으로 두려움 없이 치료받으실 수 있도록 최선을 다합니다.',
  },
  {
    title: '장기적 관점',
    description:
      '빠른 치료보다 오래 가는 치료를 목표로 합니다. 자연치아를 최대한 보존하는 방향을 우선 고려합니다.',
  },
]

export default function PhilosophySection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % PHILOSOPHY_SLIDES.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  const slide = PHILOSOPHY_SLIDES[currentSlide]

  return (
    <section
      id="philosophy"
      className="py-20 sm:py-28 bg-white scroll-mt-32"
      aria-labelledby="philosophy-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 레이블 */}
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#6B7B3A] mb-4">
          Our Philosophy
        </p>

        {/* 메인 타이틀 */}
        <h2
          id="philosophy-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-16 sm:mb-20"
        >
          마음을 담아<br />
          <span className="text-[#6B7B3A]">정성을 다하여</span>
        </h2>

        {/* 본문 레이아웃: 사진 슬라이드 좌 + 가치 우 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* 원장 사진 슬라이드 */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl aspect-[3/4] max-w-sm mx-auto lg:mx-0 bg-stone-100 shadow-lg">
              {/* 사진 placeholder */}
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${slide.imageBg}`}
              >
                <div className="w-24 h-24 rounded-full bg-white/60 flex items-center justify-center mb-4 shadow-inner">
                  <span className="text-4xl font-bold text-[#6B7B3A]">
                    {slide.initials}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-600">
                  사진 준비 중
                </p>
              </div>

              {/* 원장 이름 뱃지 */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-md">
                <p className="text-sm font-semibold text-gray-800">
                  {slide.doctorName}
                </p>
              </div>

              {/* 슬라이드 인디케이터 */}
              <div className="absolute bottom-6 right-6 flex gap-1.5">
                {PHILOSOPHY_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentSlide
                        ? 'bg-[#6B7B3A] w-5'
                        : 'bg-white/70'
                    }`}
                    aria-label={`${i + 1}번 슬라이드`}
                  />
                ))}
              </div>
            </div>

            {/* 장식 요소 */}
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-[#6B7B3A]/8 rounded-full -z-10 hidden lg:block" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-stone-100 rounded-full -z-10 hidden lg:block" />
          </div>

          {/* 핵심 가치 */}
          <div className="space-y-8">
            {/* 인트로 문구 */}
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed font-light">
              서울이건치과는 서울대학교 출신 원장들이 모여
              <strong className="font-semibold text-gray-900">
                {' '}처음부터 끝까지 직접 책임지는 진료
              </strong>
              를 실천합니다.
              <br className="hidden sm:block" />
              빠른 치료보다 오래 지속되는 건강한 치아를 목표로 합니다.
            </p>

            <div className="w-12 h-0.5 bg-[#6B7B3A]" />

            {/* 핵심 가치 그리드 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {CORE_VALUES.map((value) => (
                <div key={value.title} className="group">
                  <div className="flex items-start gap-3">
                    <div className="w-1 h-full min-h-12 bg-[#6B7B3A]/30 rounded-full group-hover:bg-[#6B7B3A] transition-colors mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1.5 text-base">
                        {value.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
