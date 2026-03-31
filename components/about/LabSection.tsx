'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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
      className="py-20 sm:py-28 bg-gray-900 scroll-mt-32"
      aria-labelledby="lab-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#B8A080] mb-4">
          In-house Lab
        </p>
        <h2
          id="lab-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
        >
          디지털 기공소
        </h2>
        <p className="text-lg sm:text-xl text-[#B8A080] font-medium mb-4">
          인하우스 기공소, 더욱 정교하게
        </p>
        <p className="text-sm sm:text-base text-gray-400 max-w-2xl leading-relaxed mb-16">
          원내 디지털 기공소를 운영합니다.<br />
          원장과 기공사가 직접 협업하여<br />
          정밀하고 빠른 보철물을 제작합니다.
        </p>

        {/* 메인 콘텐츠: 영상 + 특징 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          {/* 유튜브 영상 */}
          <div className="aspect-video rounded-2xl overflow-hidden bg-gray-800 border border-gray-700">
            <iframe
              src="https://www.youtube.com/embed/vu6J8cy5Gnc"
              title="서울이건치과 디지털 기공소 소개"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          {/* 특징 리스트 */}
          <div className="flex flex-col gap-5">
            {LAB_FEATURES.map((feature, i) => (
              <div
                key={feature.title}
                className="flex gap-4 p-5 rounded-2xl bg-gray-800 border border-gray-700 hover:border-[#B8A080]/50 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#B8A080]/20 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-[#B8A080]">
                    0{i + 1}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-line">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 기공소 사진 캐러셀 */}
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
