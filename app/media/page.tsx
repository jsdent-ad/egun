// @TASK Board - 미디어 페이지 (SNS / 채널 / 가는 길)
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  MessageCircle,
  Phone,
  BookOpen,
  Youtube,
  MapPin,
} from 'lucide-react'
import { clinicInfo } from '@/data/clinic-info'

export const metadata: Metadata = {
  title: '미디어 | 서울이건치과',
  description:
    '카카오톡 상담, 전화 연결, 블로그, 유튜브, 병원 오시는 길을 안내합니다.',
}

// 상단 큰 카드 2개
const MAIN_CARDS = [
  {
    icon: MessageCircle,
    label: '카카오톡 상담',
    description: '편하게 문자로 문의하세요',
    href: clinicInfo.socialLinks.kakao,
    external: true,
    bg: 'bg-[#FAE300]',
    text: 'text-gray-900',
    iconColor: 'text-gray-800',
  },
  {
    icon: Phone,
    label: '빠른 상담 (전화)',
    description: clinicInfo.phone,
    href: `tel:${clinicInfo.phone}`,
    external: false,
    bg: 'bg-[#6B7B3A]',
    text: 'text-white',
    iconColor: 'text-white',
  },
]

// 하단 작은 카드 3개
const SUB_CARDS = [
  {
    icon: BookOpen,
    label: '블로그',
    description: '치료 정보 & 후기',
    href: clinicInfo.socialLinks.blog,
    external: true,
  },
  {
    icon: Youtube,
    label: '유튜브',
    description: '치료 영상',
    href: clinicInfo.socialLinks.youtube,
    external: true,
  },
  {
    icon: MapPin,
    label: '가는 길',
    description: '오시는 방법 안내',
    href: '/about#access',
    external: false,
  },
]

export default function MediaPage() {
  return (
    <>
      {/* 페이지 헤더 */}
      <section className="relative flex items-center justify-center min-h-[220px] sm:min-h-[280px] overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#4A5A2A] via-[#6B7B3A] to-[#8A9B50]"
          aria-hidden="true"
        />
        <div className="relative z-10 text-center px-4 py-12 sm:py-16">
          <p className="text-white/70 text-sm tracking-widest uppercase mb-2 font-medium">
            Seoul Egun Dental
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">미디어</h1>
          <p className="text-white/75 text-base mt-2">
            카카오, 전화, 블로그, 유튜브, 오시는 길
          </p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-6">
        {/* 큰 카드 2열 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="list">
          {MAIN_CARDS.map(
            ({ icon: Icon, label, description, href, external, bg, text, iconColor }) => (
              <a
                key={label}
                href={href}
                role="listitem"
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className={`${bg} ${text} rounded-3xl p-8 sm:p-10 flex flex-col items-center justify-center gap-4 min-h-[160px] hover:opacity-90 active:scale-[0.98] transition-all duration-200`}
                aria-label={label}
              >
                <Icon size={36} className={iconColor} aria-hidden="true" />
                <div className="text-center">
                  <p className="font-bold text-lg">{label}</p>
                  <p className="text-sm mt-1 opacity-80">{description}</p>
                </div>
              </a>
            ),
          )}
        </div>

        {/* 작은 카드 3열 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" role="list">
          {SUB_CARDS.map(({ icon: Icon, label, description, href, external }) => {
            const commonClasses =
              'bg-white border border-gray-100 shadow-sm rounded-2xl p-6 flex flex-col items-center justify-center gap-3 min-h-[120px] hover:shadow-md hover:border-[#6B7B3A]/30 active:scale-[0.98] transition-all duration-200'

            if (external) {
              return (
                <a
                  key={label}
                  href={href}
                  role="listitem"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={commonClasses}
                  aria-label={label}
                >
                  <Icon size={28} className="text-[#6B7B3A]" aria-hidden="true" />
                  <div className="text-center">
                    <p className="font-semibold text-gray-800 text-sm">{label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{description}</p>
                  </div>
                </a>
              )
            }

            return (
              <Link
                key={label}
                href={href}
                role="listitem"
                className={commonClasses}
                aria-label={label}
              >
                <Icon size={28} className="text-[#6B7B3A]" aria-hidden="true" />
                <div className="text-center">
                  <p className="font-semibold text-gray-800 text-sm">{label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{description}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </main>
    </>
  )
}
