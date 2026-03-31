'use client'

import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const LAB_FEATURES = [
  {
    title: '정밀 디지털 스캔',
    description: '3D 구강 스캐너로\n0.01mm 단위의 정밀 채득',
  },
  {
    title: '당일 제작 가능',
    description: '인하우스 기공소 운영으로\n임시 보철물 당일 제작 가능',
  },
  {
    title: '품질 직접 관리',
    description: '원장과 기공사가 직접 협의하여\n최적의 결과물을 제작',
  },
  {
    title: '비용 절감',
    description: '외부 위탁 없이\n환자 부담 비용 절감',
  },
]

const LAB_IMAGES = [
  '/images/ddlab/ddlab%20(1).jpg',
  '/images/ddlab/ddlab%20(2).jpg',
  '/images/ddlab/ddlab%20(3).jpg',
  '/images/ddlab/ddlab%20(4).jpg',
  '/images/ddlab/ddlab%20(7).jpg',
  '/images/ddlab/ddlab%20(10).jpg',
  '/images/ddlab/ddlab%20(11).jpg',
  '/images/ddlab/ddlab%20(12).jpg',
  '/images/ddlab/ddlab%20(13).jpg',
  '/images/ddlab/ddlab%20(14).jpg',
  '/images/ddlab/ddlab%20(15).jpg',
  '/images/ddlab/ddlab%20(16).jpg',
  '/images/ddlab/ddlab%20(17).jpg',
]

export default function LabSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLDivElement>(null)
  const [videoVisible, setVideoVisible] = useState(false)
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal(0.15)
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal(0.15)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setVideoVisible(entry.isIntersecting),
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const cardWidth = scrollRef.current.firstElementChild?.clientWidth ?? 300
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -(cardWidth + 16) : cardWidth + 16,
      behavior: 'smooth',
    })
  }

  return (
    <section
      id="lab"
      className="py-16 sm:py-24 bg-gray-900 scroll-mt-32"
      aria-labelledby="lab-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 - 위→아래 드롭 애니메이션 */}
        <div ref={headerRef}>
          <p className={`text-xs font-semibold tracking-[0.25em] uppercase text-[#B8A080] mb-3 ${headerVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}>
            In-house Lab
          </p>
          <h2
            id="lab-heading"
            className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-3 ${headerVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}
            style={headerVisible ? { animationDelay: '0.1s' } : undefined}
          >
            디지털 기공소
          </h2>
          <p className={`text-base sm:text-lg text-[#B8A080] font-medium mb-3 ${headerVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}
            style={headerVisible ? { animationDelay: '0.2s' } : undefined}
          >
            인하우스 기공소, 더욱 정교하게
          </p>
          <p className={`text-sm text-gray-400 max-w-2xl leading-relaxed mb-10 ${headerVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}
            style={headerVisible ? { animationDelay: '0.3s' } : undefined}
          >
            원내 디지털 기공소를 운영합니다.<br />
            원장과 기공사가 직접 협업하여<br />
            정밀하고 빠른 보철물을 제작합니다.
          </p>
        </div>

        {/* 메인 콘텐츠: 영상 + 특징 */}
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-10">
          {/* 유튜브 영상 */}
          <div ref={videoRef} className={`aspect-video rounded-2xl overflow-hidden bg-gray-800 border border-gray-700 ${contentVisible ? 'scroll-reveal-scale' : 'scroll-hidden'}`}>
            {videoVisible ? (
              <iframe
                src="https://www.youtube.com/embed/vu6J8cy5Gnc?autoplay=1&mute=1&loop=1&playlist=vu6J8cy5Gnc&controls=1&modestbranding=1"
                title="서울이건치과 디지털 기공소 소개"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: 'url(https://img.youtube.com/vi/vu6J8cy5Gnc/maxresdefault.jpg)' }}>
                <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[16px] border-l-gray-800 ml-1" />
                </div>
              </div>
            )}
          </div>

          {/* 특징 리스트 - 오른쪽→왼쪽 슬라이드인 */}
          <div className="flex flex-col gap-4">
            {LAB_FEATURES.map((feature, i) => (
              <div
                key={feature.title}
                className={`flex gap-4 p-4 rounded-2xl bg-gray-800 border border-gray-700 hover:border-[#B8A080]/50 transition-colors ${contentVisible ? 'scroll-reveal-right' : 'scroll-hidden'}`}
                style={contentVisible ? { animationDelay: `${0.15 + i * 0.1}s` } : undefined}
              >
                <div className="w-8 h-8 rounded-full bg-[#B8A080]/20 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-[#B8A080]">
                    0{i + 1}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1 text-sm">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed whitespace-pre-line">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 기공소 사진 캐러셀 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold text-white">기공소 시설</h3>
            <div className="flex-1 h-px bg-gray-700 w-20" />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
              aria-label="이전 사진"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
              aria-label="다음 사진"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* 수평 스냅 캐러셀 */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pl-4 sm:pl-6 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] pr-4 pb-4"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {LAB_IMAGES.map((src, i) => (
          <div
            key={i}
            className="shrink-0 w-[260px] sm:w-[320px] lg:w-[380px] aspect-[4/3] rounded-2xl overflow-hidden bg-gray-800"
            style={{ scrollSnapAlign: 'start' }}
          >
            <img
              src={src}
              alt={`서울이건치과 기공소 ${i + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
