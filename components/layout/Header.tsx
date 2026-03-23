'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import MobileNav from './MobileNav'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [navOpen, setNavOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* 로고 영역 */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
              aria-label="서울이건치과 홈으로 이동"
            >
              {/* 서울대 로고 플레이스홀더 */}
              <div
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#6B7B3A] flex items-center justify-center shrink-0 group-hover:bg-[#4A5A2A] transition-colors"
                aria-hidden="true"
              >
                <span className="text-white text-xs font-bold leading-none">SNU</span>
              </div>

              {/* 텍스트 */}
              <div className="flex flex-col">
                <span
                  className={`text-xs sm:text-sm font-bold tracking-[0.15em] uppercase leading-tight transition-colors ${
                    scrolled ? 'text-gray-800' : 'text-white drop-shadow-sm'
                  }`}
                >
                  Seoul Egun Dental
                </span>
                <span
                  className={`text-[10px] sm:text-xs tracking-wide transition-colors ${
                    scrolled ? 'text-[#6B7B3A]' : 'text-white/80 drop-shadow-sm'
                  }`}
                >
                  서울이건치과
                </span>
              </div>
            </Link>

            {/* 햄버거 메뉴 버튼 */}
            <button
              onClick={() => setNavOpen(true)}
              aria-label="메뉴 열기"
              aria-expanded={navOpen}
              aria-controls="mobile-nav"
              className={`w-11 h-11 flex flex-col items-center justify-center gap-[5px] rounded-lg transition-colors ${
                scrolled
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <span
                className={`block w-6 h-0.5 rounded-full transition-colors ${
                  scrolled ? 'bg-gray-700' : 'bg-white'
                }`}
              />
              <span
                className={`block w-6 h-0.5 rounded-full transition-colors ${
                  scrolled ? 'bg-gray-700' : 'bg-white'
                }`}
              />
              <span
                className={`block w-4 h-0.5 rounded-full self-start ml-[5px] transition-colors ${
                  scrolled ? 'bg-gray-700' : 'bg-white'
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* 모바일 내비게이션 */}
      <MobileNav isOpen={navOpen} onClose={() => setNavOpen(false)} />
    </>
  )
}
