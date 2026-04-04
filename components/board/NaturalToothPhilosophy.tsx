'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function NaturalToothPhilosophy() {
  const { ref, isVisible } = useScrollReveal(0.15)

  return (
    <section
      ref={ref}
      className="py-20 sm:py-28 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* 좌측: 메인 카피 */}
          <div className="flex flex-col justify-center">
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-[1.3] ${isVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
            >
              가장 좋은 임플란트는
              <br />
              <span className="text-[#5BB5A2]">내 몸이 가진</span>
              <br />
              자연치아입니다.
            </h2>
          </div>

          {/* 우측: 상세 본문 */}
          <div className="space-y-6">
            <p
              className={`text-sm sm:text-base text-gray-600 leading-[1.8] ${isVisible ? 'scroll-reveal-right' : 'scroll-hidden'}`}
              style={isVisible ? { animationDelay: '0.5s' } : undefined}
            >
              많은 이들이 빠르고 간편한 '대체'를 말할 때,
              우리는 조금 더 느리고 세밀한 '보존'에 집중합니다.
              자연치아는 인공치아가 결코 흉내 낼 수 없는
              고유의 <strong className="text-gray-900">치주인대</strong>를 가지고 있어,
              음식의 질감을 느끼게 하고
              외부 충격을 완화하는 천연 완충 작용을 합니다.
            </p>

            <p
              className={`text-sm sm:text-base text-gray-600 leading-[1.8] ${isVisible ? 'scroll-reveal-right' : 'scroll-hidden'}`}
              style={isVisible ? { animationDelay: '0.7s' } : undefined}
            >
              우리는 단순히 아픈 곳을 뽑아내는 진료가 아니라,
              현미경을 이용한 정밀 신경치료와 치근단 절제술 등
              고난도의 <strong className="text-gray-900">보존 술식</strong>을 통해
              단 <strong className="text-gray-900">1%의 가능성</strong>이라도 있다면
              당신의 치아를 지켜내고자 합니다.
            </p>

            <div
              className={`border-l-2 border-[#5BB5A2] pl-4 ${isVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}
              style={isVisible ? { animationDelay: '0.9s' } : undefined}
            >
              <p className="text-sm sm:text-base text-gray-800 font-semibold leading-[1.8]">
                '뽑기 전 마지막으로 들르는 곳'
                <br />
                그 책임감이 우리의 진료 철학이며,
                <br />
                타협하지 않는 정석 진료의 핵심입니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
