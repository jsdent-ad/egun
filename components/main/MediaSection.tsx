import { clinicInfo } from '@/data/clinic-info'
import { BookOpen, Youtube, MessageCircle, MapPin } from 'lucide-react'

const MEDIA_CARDS = [
  {
    id: 'blog',
    icon: BookOpen,
    label: '공식 블로그',
    description: '치료 정보 · 케이스 스터디',
    href: 'https://blog.naver.com/seoulegundc',
    color: '#03c75a',
    bg: '#f0fff7',
  },
  {
    id: 'youtube',
    icon: Youtube,
    label: '유튜브 채널',
    description: '시술 영상 · 의료진 인터뷰',
    href: 'https://youtube.com/@seoulegun',
    color: '#ff0000',
    bg: '#fff5f5',
  },
  {
    id: 'kakao',
    icon: MessageCircle,
    label: '카카오톡 상담',
    description: '24시간 빠른 온라인 상담',
    href: 'http://pf.kakao.com/_xmDDNxb',
    color: '#f9e000',
    bg: '#fffde7',
  },
  {
    id: 'naver',
    icon: MapPin,
    label: '환자 실제 후기',
    description: '네이버 플레이스 리뷰',
    href: 'https://m.place.naver.com/restaurant/12872860',
    color: '#03c75a',
    bg: '#f0fff7',
  },
] as const

export default function MediaSection() {
  const { socialLinks } = clinicInfo

  const links: Record<string, string> = {
    blog: socialLinks.blog,
    youtube: socialLinks.youtube,
    kakao: socialLinks.kakao,
    naver: socialLinks.naverPlace,
  }

  return (
    <section
      className="h-screen w-full flex flex-col items-center justify-center px-4 py-12 overflow-hidden"
      style={{ backgroundColor: '#F5F5F0' }}
    >
      {/* Header */}
      <div className="text-center mb-8 md:mb-12">
        <p className="text-xs tracking-[0.35em] uppercase text-stone-400 mb-2">Media</p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-stone-800">
          서울이건 미디어
        </h2>
        <p className="text-sm text-stone-500 mt-2">
          다양한 채널에서 서울이건치과를 만나보세요
        </p>
        <div className="mt-3 w-10 h-0.5 mx-auto" style={{ backgroundColor: '#B8A080' }} />
      </div>

      {/* 2x2 grid */}
      <div className="grid grid-cols-2 gap-4 md:gap-5 w-full max-w-xl">
        {MEDIA_CARDS.map((card) => {
          const Icon = card.icon
          const href = links[card.id]

          return (
            <a
              key={card.id}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl p-5 md:p-6 flex flex-col gap-3 border border-stone-200 hover:border-stone-300 hover:-translate-y-0.5 transition-all duration-300"
              style={{ backgroundColor: card.bg }}
            >
              {/* Icon */}
              <div
                className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${card.color}18` }}
              >
                <Icon
                  size={22}
                  style={{ color: card.color }}
                  aria-hidden="true"
                />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-stone-800 truncate">{card.label}</p>
                <p className="text-xs text-stone-500 mt-0.5 leading-snug">{card.description}</p>
              </div>

              {/* Arrow */}
              <div className="flex items-center gap-1 text-xs font-medium text-stone-400 group-hover:text-stone-700 transition-colors duration-200">
                <span>바로가기</span>
                <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                  →
                </span>
              </div>
            </a>
          )
        })}
      </div>

      {/* Bottom contact info */}
      <div className="mt-8 md:mt-12 text-center text-xs text-stone-400 space-y-0.5">
        <p>경기도 수원시 영통구 인계로220번길 6-3 미산빌딩 2층</p>
        <p>
          Tel{' '}
          <a
            href="tel:031-896-5512"
            className="underline underline-offset-2 hover:text-stone-600 transition-colors"
          >
            031-896-5512
          </a>
        </p>
      </div>
    </section>
  )
}
