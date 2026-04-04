'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const MEDIA_ITEMS = [
  { id: 'notice', label: '공지사항', image: '/images/media-image/notice.jpg', href: '/notice', hoverColor: '#ffffff' },
  { id: 'blog', label: '원장님 칼럼', image: '/images/media-image/blog.jpg', href: '/media?tab=blog', hoverColor: '#64D515' },
  { id: 'youtube', label: '이건TV', image: '/images/media-image/youtube.jpg', href: '/media?tab=youtube', hoverColor: '#FF0000' },
  { id: 'review', label: '환자분 실제 후기', image: '/images/media-image/review.jpg', href: '/media?tab=review', hoverColor: '#64D515' },
] as const

export default function MediaSection() {
  const { ref, isVisible } = useScrollReveal(0.2)
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section ref={ref}
      className="h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: '#F5F5F0' }}>
      <div className="text-center mb-8 md:mb-12">
        <p className={`text-xs tracking-[0.35em] uppercase text-stone-400 mb-3 ${isVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}>
          Egun Media
        </p>
        <h2 className={`text-xl md:text-2xl lg:text-3xl font-bold text-stone-800 leading-tight ${isVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}
          style={isVisible ? { animationDelay: '0.12s' } : undefined}>
          이건치과 소식
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full max-w-6xl">
        {MEDIA_ITEMS.map((item, i) => {
          const isHov = hovered === item.id
          return (
            <Link key={item.id} href={item.href}
              className={`group relative flex flex-col items-center ${isVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}
              style={isVisible ? { animationDelay: `${0.2 + i * 0.12}s` } : undefined}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-stone-200">
                <img src={item.image} alt={item.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div
                  className="absolute inset-0 rounded-xl border-[4px] transition-all duration-300 pointer-events-none"
                  style={{ borderColor: isHov ? item.hoverColor : 'transparent' }}
                />
              </div>
              <p className="mt-3 md:mt-4 text-sm md:text-base font-semibold text-stone-700 group-hover:text-[#B8A080] transition-colors duration-300">
                {item.label}
              </p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
