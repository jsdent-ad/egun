'use client'

import { clinicInfo } from '@/data/clinic-info'

export default function MapSection() {
  return (
    <section className="relative w-full h-screen min-h-[500px]">
      {/* 지도 이미지 - 전체 배경 */}
      <img
        src="/images/clinic/map.png"
        alt="서울이건치과 위치 지도"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 치과 정보 카드 */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 max-w-sm w-[calc(100%-3rem)] md:w-auto z-10">
        {/* 로고 */}
        <img
          src="/images/logo/seoulegun-logo%20(1).png"
          alt="서울이건치과"
          className="h-10 mb-4"
        />

        {/* 구분선 */}
        <div className="w-8 h-0.5 bg-[#B8A080] mb-5" />

        {/* 전화번호 */}
        <a
          href={`tel:${clinicInfo.phone}`}
          className="block text-2xl md:text-3xl font-bold text-gray-900 tracking-wide mb-4 hover:text-[#B8A080] transition-colors"
        >
          {clinicInfo.phone}
        </a>

        {/* 주소 */}
        <p className="text-sm text-gray-600 mb-5 leading-relaxed">
          {clinicInfo.address}
        </p>

        {/* 진료시간 */}
        <div className="space-y-2 text-sm">
          {clinicInfo.businessHours
            .filter((h) => !h.isClosed)
            .map((item) => (
              <div key={item.day} className="flex items-center gap-4">
                <span className="w-16 text-gray-500 font-medium shrink-0">
                  {item.day}
                </span>
                <span className="text-gray-800">
                  {item.hours}
                  {item.note && (
                    <span className="ml-2 text-[#B8A080] font-semibold text-xs">
                      {item.note}
                    </span>
                  )}
                </span>
              </div>
            ))}
          <div className="flex items-center gap-4">
            <span className="w-16 text-gray-500 font-medium shrink-0">점심시간</span>
            <span className="text-gray-800">{clinicInfo.lunchTime}</span>
          </div>
        </div>

        {/* 공휴일 안내 */}
        <div className="mt-5 pt-4 border-t border-gray-200">
          <p className="text-sm font-semibold text-[#B8A080] mb-1">공휴일 진료</p>
          <p className="text-xs text-gray-500 leading-relaxed">
            일요일 · 공휴일 휴진
            <br />
            토요일 점심시간 없음
          </p>
        </div>
      </div>
    </section>
  )
}
