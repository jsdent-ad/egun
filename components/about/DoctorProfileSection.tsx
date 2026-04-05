'use client'

import { useRef, useEffect, useCallback } from 'react'
import { doctors } from '@/data/doctors'
import { useScrollReveal } from '@/hooks/useScrollReveal'

function useDoctorSnap(threshold = 0.3) {
  const cardRef = useRef<HTMLElement>(null)
  const hasSnapped = useRef(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    // 데스크톱(lg) 전용
    const mql = window.matchMedia('(min-width: 1024px)')
    if (!mql.matches) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasSnapped.current) {
          hasSnapped.current = true
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        if (!entry.isIntersecting) {
          hasSnapped.current = false
        }
      },
      { threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return cardRef
}

function DoctorCard({
  doctor,
  index,
}: {
  doctor: (typeof doctors)[0]
  index: number
}) {
  const isEven = index % 2 === 0
  const { ref, isVisible } = useScrollReveal(0.15)
  const snapRef = useDoctorSnap(0.3)

  // 사진 반대쪽에서 슬라이드인: 사진 왼쪽이면 텍스트는 오른쪽에서, 사진 오른쪽이면 텍스트는 왼쪽에서
  const slideClass = isEven ? 'scroll-reveal-right' : 'scroll-reveal-left'

  // 두 ref를 합침
  const mergedRef = useCallback(
    (node: HTMLElement | null) => {
      (ref as React.MutableRefObject<HTMLElement | null>).current = node
      ;(snapRef as React.MutableRefObject<HTMLElement | null>).current = node
    },
    [ref, snapRef],
  )

  return (
    <article
      ref={mergedRef}
      className="min-h-screen lg:h-screen flex items-center py-12 lg:py-0"
    >
      <div className={`w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${index > 0 ? 'lg:pl-16' : ''}`}>
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center`}>
          {/* 사진 영역 */}
          <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
            <div className={`relative overflow-hidden rounded-2xl aspect-[3/4] max-w-[242px] sm:max-w-[275px] lg:max-w-[308px] bg-stone-100 shadow-md mx-auto lg:mx-0 ${isVisible ? 'scroll-reveal-scale' : 'scroll-hidden'}`}>
              <img
                src={doctor.image}
                alt={`${doctor.name} ${doctor.role}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#B8A080] text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                {doctor.role}
              </div>
            </div>
          </div>

          {/* 약력 및 편지 영역 — 사진 옆에서 슬라이드인 */}
          <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'} space-y-4`}>
            <div>
              <p className={`text-[10px] font-semibold tracking-[0.2em] uppercase text-[#B8A080] mb-1 ${isVisible ? slideClass : 'scroll-hidden'}`}
                style={isVisible ? { animationDelay: '0.3s' } : undefined}>
                {doctor.specialtyDetail ?? doctor.specialty}
              </p>
              <h3 className={`text-lg sm:text-xl font-bold text-gray-900 mb-0.5 ${isVisible ? slideClass : 'scroll-hidden'}`}
                style={isVisible ? { animationDelay: '0.4s' } : undefined}>
                {doctor.name} {doctor.role}
              </h3>
              <div className={`w-8 h-0.5 bg-[#B8A080] mt-2 ${isVisible ? slideClass : 'scroll-hidden'}`}
                style={isVisible ? { animationDelay: '0.5s' } : undefined} />
            </div>

            {doctor.careers && doctor.careers.length > 0 && (
              <div>
                <h4 className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 ${isVisible ? slideClass : 'scroll-hidden'}`}
                  style={isVisible ? { animationDelay: '0.6s' } : undefined}>
                  학력 · 경력
                </h4>
                <ul className="space-y-1.5">
                  {doctor.careers.map((career, i) => (
                    <li key={i} className={`flex items-start gap-2 ${isVisible ? slideClass : 'scroll-hidden'}`}
                      style={isVisible ? { animationDelay: `${0.7 + i * 0.1}s` } : undefined}>
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-[#B8A080] shrink-0" />
                      <span className="text-xs text-gray-700 leading-relaxed">{career}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {doctor.letter && (
              <div className={`bg-stone-50 border border-stone-200 rounded-xl p-4 relative ${isVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}
                style={isVisible ? { animationDelay: `${0.7 + (doctor.careers?.length ?? 0) * 0.1 + 0.2}s` } : undefined}>
                <span className="absolute top-3 left-4 text-2xl text-[#B8A080]/20 font-serif leading-none select-none">&ldquo;</span>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed pl-3 italic whitespace-pre-line">
                  {doctor.letter}
                </p>
                <p className="text-right text-xs text-[#B8A080] font-semibold mt-2">
                  — {doctor.name} {doctor.role}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export default function DoctorProfileSection() {
  const { ref, isVisible } = useScrollReveal(0.15)

  return (
    <section
      id="doctors"
      className="bg-stone-50 scroll-mt-32"
      aria-labelledby="doctors-heading"
    >
      {/* 섹션 헤더 — 풀페이지 */}
      <div className="min-h-[60vh] lg:h-screen flex items-center py-16 lg:py-0">
        <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className={`text-xs font-semibold tracking-[0.25em] uppercase text-[#B8A080] mb-4 ${isVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}>
            Our Doctors
          </p>
          <h2 id="doctors-heading"
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight ${isVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
            style={isVisible ? { animationDelay: '0.1s' } : undefined}>
            한자리에서<br />
            <span className="text-[#B8A080]">변하지 않는 마음</span>
          </h2>
          <p className={`mt-6 text-sm sm:text-base text-gray-500 max-w-2xl leading-relaxed ${isVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
            style={isVisible ? { animationDelay: '0.2s' } : undefined}>
            각자의 전문 분야에서 최선을 다하며<br />
            언제나 같은 자리에서 기다리고 있습니다.
          </p>
        </div>
      </div>

      {/* 원장님 카드 — 각각 풀페이지 */}
      {doctors.map((doctor, index) => (
        <DoctorCard key={doctor.id} doctor={doctor} index={index} />
      ))}
    </section>
  )
}
