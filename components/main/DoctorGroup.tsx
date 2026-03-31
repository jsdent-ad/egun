'use client'

import { useRouter } from 'next/navigation'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function DoctorGroup() {
  const router = useRouter()
  const { ref, isVisible } = useScrollReveal(0.3)

  return (
    <section className="h-screen w-full relative overflow-hidden">
      {/* 데스크탑 배경 */}
      <div
        className="absolute inset-0 hidden md:block bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/doctors/doctor-group-3.png)' }}
      />
      {/* 모바일 배경 - 하단 정렬 */}
      <div
        className="absolute inset-0 md:hidden bg-cover bg-bottom bg-no-repeat"
        style={{ backgroundImage: 'url(/images/doctors/doctors-mobile.png)' }}
      />

      {/* 모바일: 상단 15vh, 타자 애니메이션 큰 글씨 */}
      <div ref={ref} className="relative z-10 h-full flex flex-col items-center pt-[15vh] md:hidden px-4">
        <p className={`text-sm tracking-[0.25em] uppercase text-gray-400 mb-4 ${isVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}>
          Medical Team
        </p>
        <div className="text-center mb-2">
          <h2 className="text-3xl font-bold text-gray-900 leading-tight">
            {isVisible ? (
              <>
                <span
                  className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-[#B8A080]"
                  style={{ animation: 'typing 1s steps(5) forwards, blink-caret 0.75s step-end 2' }}
                >
                  한자리에서
                </span>
                <br />
                <span
                  className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-[#B8A080]"
                  style={{ width: 0, animation: 'typing 1.2s steps(8) 0.3s forwards, blink-caret 0.75s step-end 0.3s 2' }}
                >
                  변하지 않는 마음
                </span>
              </>
            ) : (
              <span className="opacity-0">한자리에서<br />변하지 않는 마음</span>
            )}
          </h2>
        </div>
        <p className={`text-base text-gray-500 mb-6 ${isVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}
          style={isVisible ? { animationDelay: '1.8s' } : undefined}>
          전문의료진으로 구성된 서울이건치과
        </p>
        <button
          onClick={() => router.push('/about#doctors')}
          className={`text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 border border-gray-400 hover:border-gray-700 px-10 py-3 rounded-full ${isVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}
          style={isVisible ? { animationDelay: '2s' } : undefined}
        >
          자세히보기 →
        </button>
      </div>

      {/* PC: 상단 작은 글씨, 한 줄 */}
      <div className="relative z-10 h-full hidden md:flex flex-col items-center pt-24 lg:pt-28 px-4">
        <p className={`text-sm tracking-[0.25em] uppercase text-gray-400 mb-3 ${isVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}>
          Medical Team
        </p>
        <h2 className={`text-xl lg:text-2xl font-bold text-gray-900 text-center leading-snug mb-2 ${isVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}
          style={isVisible ? { animationDelay: '0.12s' } : undefined}>
          한자리에서 변하지 않는 마음
        </h2>
        <p className={`text-sm text-gray-500 mb-4 ${isVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}
          style={isVisible ? { animationDelay: '0.24s' } : undefined}>
          전문의료진으로 구성된 서울이건치과
        </p>
        <button
          onClick={() => router.push('/about#doctors')}
          className={`text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 border border-gray-400 hover:border-gray-700 px-8 py-2.5 rounded-full ${isVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}
          style={isVisible ? { animationDelay: '0.36s' } : undefined}
        >
          자세히보기 →
        </button>
      </div>
    </section>
  )
}
