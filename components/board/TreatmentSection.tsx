// @TASK Board - 치료 설명 블록 (지그재그 레이아웃)
import type { TreatmentContent } from '@/types/treatment'

interface TreatmentSectionProps {
  treatment: TreatmentContent
  index: number
}

export default function TreatmentSection({
  treatment,
  index,
}: TreatmentSectionProps) {
  // 홀수 index(0, 2, 4…) = 이미지 왼쪽 / 짝수 index(1, 3, 5…) = 이미지 오른쪽
  const imageLeft = index % 2 === 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
      {/* 이미지 placeholder */}
      <div
        className={`${imageLeft ? 'md:order-1' : 'md:order-2'} order-1`}
      >
        <div
          className="bg-gray-100 rounded-2xl aspect-[4/3] flex items-center justify-center"
          aria-hidden="true"
        >
          <span className="text-gray-400 text-sm">이미지 준비 중</span>
        </div>
      </div>

      {/* 텍스트 영역 */}
      <div
        className={`${imageLeft ? 'md:order-2' : 'md:order-1'} order-2 space-y-4`}
      >
        <div>
          <p className="text-[#6B7B3A] text-sm font-medium tracking-wide uppercase mb-1">
            {treatment.boardCategory}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
            {treatment.title}
          </h2>
          <p className="text-gray-500 text-base mt-1">{treatment.subtitle}</p>
        </div>
        <p className="text-gray-600 leading-relaxed text-base">
          {treatment.description}
        </p>
      </div>
    </div>
  )
}
