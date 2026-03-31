'use client'

import type { TreatmentContent } from '@/types/treatment'
import { useScrollReveal } from '@/hooks/useScrollReveal'

interface TreatmentSectionProps {
  treatment: TreatmentContent
  index: number
}

/** 설명 텍스트에서 문장 첫 단어를 민트색으로 강조 */
function HighlightedDescription({ text }: { text: string }) {
  const sentences = text.split(/(?<=\.)\s+/)

  return (
    <p className="text-gray-600 leading-[1.9] text-base">
      {sentences.map((sentence, i) => {
        const firstSpaceIdx = sentence.indexOf(' ')
        if (firstSpaceIdx === -1) return <span key={i}>{sentence} </span>

        const firstWord = sentence.slice(0, firstSpaceIdx)
        const rest = sentence.slice(firstSpaceIdx)

        return (
          <span key={i}>
            <span className="text-[#5BB5A2] font-semibold text-[18px]">
              {firstWord}
            </span>
            {rest}{' '}
          </span>
        )
      })}
    </p>
  )
}

export default function TreatmentSection({
  treatment,
}: TreatmentSectionProps) {
  const { ref: textRef, isVisible: textVisible } = useScrollReveal(0.15)
  const { ref: cardRef, isVisible: cardVisible } = useScrollReveal(0.1)

  return (
    <div className="space-y-12">
      {/* 상단: 로고 + 제목 + 설명 + 이미지 */}
      <div ref={textRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* 텍스트 영역 — 왼쪽에서 슬라이드인 */}
        <div className="space-y-4">
          <img
            src="/images/logo/egun-logo%20(1).png"
            alt="서울이건치과"
            className={`h-8 mb-2 ${textVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
          />
          <h2 className={`text-2xl sm:text-3xl font-bold text-gray-900 leading-tight ${textVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
            style={textVisible ? { animationDelay: '0.1s' } : undefined}>
            {treatment.title}
          </h2>
          <p className={`text-lg text-[#B8A080] font-medium ${textVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
            style={textVisible ? { animationDelay: '0.2s' } : undefined}>
            {treatment.subtitle}
          </p>
          <div className={`${textVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
            style={textVisible ? { animationDelay: '0.3s' } : undefined}>
            <HighlightedDescription text={treatment.description} />
          </div>
        </div>

        {/* 이미지 영역 — 오른쪽에서 슬라이드인 */}
        <div className={`order-first md:order-last ${textVisible ? 'scroll-reveal-right' : 'scroll-hidden'}`}
          style={textVisible ? { animationDelay: '0.15s' } : undefined}>
          <div className="bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden max-w-full">
            {treatment.image ? (
              <img
                src={treatment.image}
                alt={treatment.title}
                className="w-full h-auto rounded-2xl"
              />
            ) : (
              <div className="w-full aspect-[4/3] flex items-center justify-center">
                <span className="text-gray-400 text-sm">치료 이미지 준비 중</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 중단: 해시태그 카드 그리드 — 좌측은 왼쪽에서, 우측은 오른쪽에서 */}
      <div ref={cardRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {treatment.benefits.map((benefit, i) => {
          const isLeft = i % 2 === 0
          const anim = isLeft ? 'scroll-reveal-left' : 'scroll-reveal-right'

          return (
            <div key={i}
              className={`space-y-2 ${cardVisible ? anim : 'scroll-hidden'}`}
              style={cardVisible ? { animationDelay: `${0.1 + i * 0.08}s` } : undefined}>
              <h3 className="text-[#B8A080] font-bold text-base">
                #{benefit.split('.')[0].replace(/^[✓\s]+/, '').slice(0, 15)}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {benefit.replace(/^[✓\s]+/, '')}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
