import type { TreatmentContent } from '@/types/treatment'

interface TreatmentSectionProps {
  treatment: TreatmentContent
  index: number
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
            src="/images/logo/seoulegun-logo%20(1).png"
            alt="서울이건치과"
            className="h-8 mb-2"
          />

          {/* 제목 */}
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
            {treatment.title}
          </h2>

          {/* 부제목 */}
          <p className="text-lg text-[#B8A080] font-medium">
            {treatment.subtitle}
          </p>

          {/* 설명 */}
          <p className="text-gray-600 leading-relaxed text-base whitespace-pre-line">
            {treatment.description}
          </p>
        </div>

        {/* 이미지 영역 */}
        <div className="order-first md:order-last">
          <div className="bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden" style={{ width: 420, height: 450 }}>
            {treatment.image ? (
              <img
                src={treatment.image}
                alt={treatment.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400 text-sm">치료 이미지 준비 중</span>
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
