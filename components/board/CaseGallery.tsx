// @TASK Board - 증례사진 갤러리 (DB 연동 전 placeholder)
import { ImageOff } from 'lucide-react'

interface CaseGalleryProps {
  boardCategory: string
  treatmentType: string
}

export default function CaseGallery({
  boardCategory,
  treatmentType,
}: CaseGalleryProps) {
  return (
    <div
      className="border border-gray-200 rounded-2xl p-8 sm:p-12 text-center bg-gray-50"
      aria-label={`${treatmentType} 증례 사진 영역`}
    >
      <ImageOff
        className="mx-auto mb-4 text-gray-300"
        size={40}
        aria-hidden="true"
      />
      <p className="text-gray-400 text-sm font-medium">
        증례 사진 준비 중입니다
      </p>
      <p className="text-gray-300 text-xs mt-1">
        {boardCategory} / {treatmentType}
      </p>
    </div>
  )
}
