import { clinicInfo } from '@/data/clinic-info'
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react'

const TRANSIT_INFO = [
  {
    type: '버스',
    icon: '🚌',
    lines: [
      { name: '수원 55번', stop: '인계동 미산빌딩 정류장 하차' },
      { name: '수원 62번', stop: '인계동 미산빌딩 정류장 하차' },
    ],
  },
  {
    type: '지하철',
    icon: '🚇',
    lines: [{ name: '수인분당선 수원시청역', stop: '2번 출구 도보 약 10분' }],
  },
]

const PARKING_INFO = [
  '건물 전용 주차장 이용 가능',
  '인근 인계동 공영주차장 이용 가능 (10분 무료)',
  '진료 시간에 따라 주차 도움 안내 가능',
]

export default function AccessSection() {
  const weekdayHours = clinicInfo.businessHours.filter(
    (h) => !['토', '일'].includes(h.day)
  )
  const weekendHours = clinicInfo.businessHours.filter((h) =>
    ['토', '일'].includes(h.day)
  )

  return (
    <section
      id="access"
      className="py-20 sm:py-28 bg-white scroll-mt-32"
      aria-labelledby="access-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#B8A080] mb-4">
          Location
        </p>
        <h2
          id="access-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-12"
        >
          오시는길
        </h2>

        {/* 지도 + 정보 레이아웃 */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* 지도 영역 (3/5) */}
          <div className="lg:col-span-3">
            {/* 지도 placeholder */}
            <div className="w-full aspect-[4/3] sm:aspect-video lg:aspect-auto lg:h-full min-h-64 bg-gray-200 rounded-2xl flex flex-col items-center justify-center border border-gray-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-300" />
              <div className="relative z-10 text-center px-6">
                <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6 text-[#B8A080]" aria-hidden="true" />
                </div>
                <p className="font-semibold text-gray-700 mb-1">지도 API 연동 예정</p>
                <p className="text-sm text-gray-500">
                  경기도 수원시 영통구<br />인계로220번길 6-3 미산빌딩 2층
                </p>

                {/* 네이버 플레이스 버튼 */}
                <a
                  href={clinicInfo.socialLinks.naverPlace}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 bg-[#03C75A] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#02b34d] transition-colors"
                >
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  네이버 플레이스 바로가기
                </a>
              </div>
            </div>
          </div>

          {/* 정보 영역 (2/5) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* 주소 · 전화 */}
            <div className="rounded-2xl border border-gray-100 p-6 space-y-4 shadow-sm">
              <div className="flex items-start gap-3">
                <MapPin
                  className="w-5 h-5 text-[#B8A080] mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    주소
                  </p>
                  <address className="not-italic text-sm text-gray-800 leading-relaxed">
                    {clinicInfo.address}
                  </address>
                </div>
              </div>

              <div className="border-t border-gray-100" />

              <div className="flex items-center gap-3">
                <Phone
                  className="w-5 h-5 text-[#B8A080] shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    전화
                  </p>
                  <a
                    href={`tel:${clinicInfo.phone.replace(/-/g, '')}`}
                    className="text-sm text-gray-800 hover:text-[#B8A080] transition-colors font-medium"
                  >
                    {clinicInfo.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* 진료시간 */}
            <div className="rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-[#B8A080]" aria-hidden="true" />
                <h3 className="text-sm font-semibold text-gray-700">
                  진료시간
                </h3>
              </div>

              <div className="space-y-1.5">
                {clinicInfo.businessHours.map((h) => (
                  <div
                    key={h.day}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-gray-600 w-6">{h.day}</span>
                    <span
                      className={`${
                        h.isClosed
                          ? 'text-gray-400'
                          : 'text-gray-800'
                      }`}
                    >
                      {h.hours}
                    </span>
                    {h.note && (
                      <span className="text-xs text-[#B8A080] font-medium">
                        {h.note}
                      </span>
                    )}
                  </div>
                ))}
                <p className="text-xs text-gray-400 mt-3 pt-3 border-t border-gray-100">
                  * 점심시간 13:00 - 14:00 (토요일 없음)
                </p>
              </div>
            </div>

            {/* 네이버 플레이스 버튼 (모바일) */}
            <a
              href={clinicInfo.socialLinks.naverPlace}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#03C75A] text-white font-semibold py-3.5 rounded-xl hover:bg-[#02b34d] transition-colors text-sm lg:hidden"
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              네이버 플레이스 바로가기
            </a>
          </div>
        </div>

        {/* 하단: 주차 + 대중교통 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
          {/* 주차 안내 */}
          <div className="rounded-2xl bg-stone-50 border border-stone-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-xl" aria-hidden="true">🅿️</span>
              주차 안내
            </h3>
            <ul className="space-y-2">
              {PARKING_INFO.map((info, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-[#B8A080] mt-0.5">·</span>
                  {info}
                </li>
              ))}
            </ul>
          </div>

          {/* 대중교통 안내 */}
          <div className="rounded-2xl bg-stone-50 border border-stone-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-xl" aria-hidden="true">🚇</span>
              대중교통
            </h3>
            <div className="space-y-4">
              {TRANSIT_INFO.map((transit) => (
                <div key={transit.type}>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    {transit.icon} {transit.type}
                  </p>
                  <ul className="space-y-1.5">
                    {transit.lines.map((line, i) => (
                      <li key={i} className="text-sm text-gray-700">
                        <span className="font-medium">{line.name}</span>
                        <br />
                        <span className="text-gray-500 text-xs">{line.stop}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
