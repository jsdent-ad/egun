import type { TreatmentContent } from '@/types/treatment'

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
  return (
    <div className="space-y-12">
      {/* 상단: 로고 + 제목 + 설명 + 이미지 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* 텍스트 영역 */}
        <div className="space-y-4">
          {/* 로고 */}
          <img
            src="/images/logo/egun-logo%20(1).png"
            alt="서울이건치과"
            className="h-8 mb-2 animate-drop-in"
          />

          {/* 제목 */}
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight animate-drop-in [animation-delay:0.1s]">
            {treatment.title}
          </h2>

          {/* 부제목 */}
          <p className="text-lg text-[#B8A080] font-medium animate-drop-in [animation-delay:0.2s]">
            {treatment.subtitle}
          </p>

          {/* 설명 - 핵심 키워드 민트색 강조 */}
          <div className="animate-drop-in [animation-delay:0.3s]">
            <HighlightedDescription text={treatment.description} />
          </div>
        </div>

        {/* 이미지 영역 */}
        <div className="order-first md:order-last">
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

      {/* 중단: 해시태그 카드 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {treatment.benefits.map((benefit, i) => (
          <div key={i} className="space-y-2">
            <h3 className="text-[#B8A080] font-bold text-base">
              #{benefit.split('.')[0].replace(/^[✓\s]+/, '').slice(0, 15)}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {benefit.replace(/^[✓\s]+/, '')}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
