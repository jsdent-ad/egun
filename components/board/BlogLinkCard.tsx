// @TASK Board - 관련 블로그 글 링크 카드 (데이터 연동 전 placeholder)
import { BookOpen } from 'lucide-react'

interface BlogLinkCardProps {
  boardCategory: string
}

export default function BlogLinkCard({ boardCategory }: BlogLinkCardProps) {
  return (
    <div
      className="border border-dashed border-gray-200 rounded-2xl p-6 sm:p-8 text-center bg-white"
      aria-label={`${boardCategory} 관련 블로그 글`}
    >
      <BookOpen
        className="mx-auto mb-3 text-[#6B7B3A]/40"
        size={32}
        aria-hidden="true"
      />
      <p className="text-gray-400 text-sm font-medium">
        관련 블로그 글이 곧 업데이트됩니다
      </p>
    </div>
  )
}
