'use client'

import { clinicInfo } from '@/data/clinic-info'
import { Clock } from 'lucide-react'

const SCHEDULE = [
  { day: '월요일', hours: '09:30 - 18:30' },
  { day: '화요일', hours: '09:30 - 20:30', note: '야간진료' },
  { day: '수요일', hours: '09:30 - 18:30' },
  { day: '목요일', hours: '09:30 - 20:30', note: '교정야간진료' },
  { day: '금요일', hours: '09:30 - 20:30', note: '야간진료' },
  { day: '토요일', hours: '09:30 - 13:30' },
]

export default function MapSection() {
  return (
    <section className="relative w-full h-screen min-h-[500px]">
      {/* 지도 이미지 - 전체 배경 */}
      <img
        src="/images/clinic/map.png"
        alt="서울이건치과 위치 지도"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 카드 컨테이너 */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10 z-10 flex flex-col gap-4 max-w-sm w-[calc(100%-3rem)] md:w-auto">
        {/* 치과 정보 카드 */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8">
          <img
            src="/images/logo/seoulegun-logo%20(1).svg"
            alt="서울이건치과"
            className="h-14 mb-4"
          />
          <div className="w-8 h-0.5 bg-[#B8A080] mb-5" />
          <a
            href={`tel:${clinicInfo.phone}`}
            className="block text-2xl md:text-3xl font-bold text-gray-900 tracking-wide mb-4 hover:text-[#B8A080] transition-colors"
          >
            {clinicInfo.phone}
          </a>
          <p className="text-sm text-gray-600 leading-relaxed">
            {clinicInfo.address}
          </p>
        </div>

        {/* 진료시간 카드 */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
          {/* 헤더 */}
          <div className="bg-[#B8A080] px-6 py-3.5 flex items-center gap-2">
            <Clock className="w-4 h-4 text-white" aria-hidden="true" />
            <span className="text-white font-semibold text-sm">진료시간</span>
          </div>

          {/* 시간표 */}
          <div className="divide-y divide-gray-100">
            {SCHEDULE.map((item) => (
              <div key={item.day} className="flex items-center px-6 py-4">
                <span className="w-20 text-sm font-medium text-gray-700 shrink-0">
                  {item.day}
                </span>
                <span className="text-sm text-gray-800 tabular-nums">
                  {item.hours}
                </span>
                {item.note && (
                  <span className="ml-3 text-xs font-medium text-[#B8A080] bg-[#B8A080]/10 px-2.5 py-1 rounded-full">
                    {item.note}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* 하단 안내 */}
          <div className="px-6 py-3.5 bg-gray-50/80 text-xs text-gray-400">
            점심시간 {clinicInfo.lunchTime} · 일요일/공휴일 휴진
          </div>
        </div>
      </div>
    </section>
  )
}
