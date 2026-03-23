'use client'

import { useState } from 'react'
import { clinicInfo } from '@/data/clinic-info'
import { Clock } from 'lucide-react'

export default function ScheduleSection() {
  const [activeTab, setActiveTab] = useState('main')

  const currentTab = clinicInfo.scheduleTabs.find(
    (tab) => tab.id === activeTab
  )!

  return (
    <section
      id="schedule"
      className="py-20 sm:py-28 bg-white scroll-mt-32"
      aria-labelledby="schedule-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#6B7B3A] mb-4">
          Hours
        </p>
        <h2
          id="schedule-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-12"
        >
          진료일정
        </h2>

        {/* 탭 버튼 */}
        <div
          className="flex gap-2 mb-10 overflow-x-auto scrollbar-hide pb-1"
          role="tablist"
          aria-label="진료 구분"
        >
          {clinicInfo.scheduleTabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`tabpanel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-[#6B7B3A] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 탭 콘텐츠 */}
        <div
          key={activeTab}
          id={`tabpanel-${activeTab}`}
          role="tabpanel"
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16"
          style={{ animation: 'fadeIn 0.25s ease' }}
        >
          {/* 시간표 */}
          <div>
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <div className="bg-[#6B7B3A] px-6 py-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-white" aria-hidden="true" />
                <h3 className="text-white font-semibold text-sm">
                  {currentTab.label} 진료시간
                </h3>
              </div>

              <table className="w-full">
                <thead className="sr-only">
                  <tr>
                    <th scope="col">요일</th>
                    <th scope="col">진료 시간</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTab.hours.map((row, i) => (
                    <tr
                      key={row.day}
                      className={`${
                        i % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'
                      } ${row.isClosed ? 'opacity-50' : ''}`}
                    >
                      <td className="px-6 py-3.5 text-sm font-medium text-gray-700 w-36">
                        {row.day}
                      </td>
                      <td className="px-6 py-3.5 text-sm text-gray-800">
                        <span
                          className={
                            row.isClosed ? 'text-gray-400' : ''
                          }
                        >
                          {row.hours}
                        </span>
                        {row.note && (
                          <span className="ml-2 inline-block text-xs font-medium bg-[#6B7B3A]/10 text-[#6B7B3A] px-2 py-0.5 rounded-full">
                            {row.note}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 공지사항 */}
          <div className="flex flex-col gap-6">
            {/* 안내 사항 */}
            {currentTab.notice && currentTab.notice.length > 0 && (
              <div className="bg-[#6B7B3A]/5 border border-[#6B7B3A]/20 rounded-2xl p-6">
                <h4 className="text-sm font-semibold text-[#6B7B3A] mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#6B7B3A] text-white flex items-center justify-center text-xs">
                    i
                  </span>
                  진료 안내
                </h4>
                <ul className="space-y-2">
                  {currentTab.notice.map((note, i) => (
                    <li
                      key={i}
                      className="text-sm text-gray-700 flex items-start gap-2"
                    >
                      <span className="text-[#6B7B3A] mt-0.5">·</span>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 예약 안내 카드 */}
            <div className="bg-gray-900 rounded-2xl p-6 text-white">
              <h4 className="font-semibold mb-2">예약 후 방문을 권장합니다</h4>
              <p className="text-sm text-gray-400 leading-relaxed mb-5">
                대기 시간 없이 편안하게 진료받으실 수 있도록 사전 예약을
                권장드립니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${clinicInfo.phone.replace(/-/g, '')}`}
                  className="flex-1 bg-[#6B7B3A] text-white text-center py-2.5 rounded-xl text-sm font-semibold hover:bg-[#5a6a2f] transition-colors"
                >
                  {clinicInfo.phone}
                </a>
                <a
                  href={clinicInfo.socialLinks.kakao}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#FEE500] text-[#3C1E1E] text-center py-2.5 rounded-xl text-sm font-semibold hover:bg-[#f5db00] transition-colors"
                >
                  카카오로 예약
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
