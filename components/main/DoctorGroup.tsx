'use client'

import { useRouter } from 'next/navigation'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function DoctorGroup() {
  const router = useRouter()
  const { ref, isVisible } = useScrollReveal(0.3)

  return (
    <section className="h-screen w-full relative overflow-hidden">
      {/* 배경 이미지 - 모바일/PC 동일 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/doctors/doctor-group-3.png)' }}
      />

      {/* 텍스트 오버레이 */}
      <div ref={ref} className="relative z-10 h-full flex flex-col items-center pt-16 md:pt-24 lg:pt-28 px-4">
        <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 text-center leading-[1.3] mb-3 ${isVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}>
          한자리에서 <span style={{ color: '#99d9d9' }}>변하지 않는 마음</span>
        </h2>

        <p className={`text-sm sm:text-base md:text-lg text-gray-600 text-center mb-6 ${isVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}
          style={isVisible ? { animationDelay: '0.2s' } : undefined}>
          <span style={{ color: '#99d9d9' }}>서울대학교</span> 출신 2인 대표원장
        </p>

        <button
          onClick={() => router.push('/about#doctors')}
          className={`text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 border border-gray-400 hover:border-gray-700 px-8 py-2.5 rounded-full ${isVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}
          style={isVisible ? { animationDelay: '0.4s' } : undefined}
        >
          자세히보기 →
        </button>
      </div>
    </section>
  )
}
