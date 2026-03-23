const LAB_FEATURES = [
  {
    title: '정밀 디지털 스캔',
    description: '3D 구강 스캐너로 0.01mm 단위의 정밀한 본을 채득합니다.',
  },
  {
    title: '당일 제작 가능',
    description: '인하우스 기공소 운영으로 임시 보철물을 당일 제작할 수 있습니다.',
  },
  {
    title: '품질 직접 관리',
    description: '원장과 기공사가 함께 협의하여 최적의 결과물을 만듭니다.',
  },
  {
    title: '비용 절감',
    description: '외부 기공소 불필요로 환자 부담 비용을 낮출 수 있습니다.',
  },
]

const LAB_STAFF = [
  { name: '기공사 A', role: '수석 기공사', detail: '20년 경력' },
  { name: '기공사 B', role: '기공사', detail: '보철 전문' },
  { name: '기공사 C', role: '기공사', detail: '교정장치 전문' },
]

export default function LabSection() {
  return (
    <section
      id="lab"
      className="py-20 sm:py-28 bg-gray-900 scroll-mt-32"
      aria-labelledby="lab-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#6B7B3A] mb-4">
          In-house Lab
        </p>
        <h2
          id="lab-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
        >
          디지털 기공소
        </h2>
        <p className="text-lg sm:text-xl text-[#6B7B3A] font-medium mb-4">
          인하우스 기공소, 더욱 정교하게
        </p>
        <p className="text-base text-gray-400 max-w-2xl leading-relaxed mb-16">
          서울이건치과는 원내에 디지털 기공소를 운영합니다.
          외부 기공소에 의존하지 않고 원장과 기공사가 직접 협업하여
          보다 정밀하고 빠른 보철물을 제작합니다.
        </p>

        {/* 메인 콘텐츠: 영상 placeholder + 특징 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          {/* 영상 placeholder */}
          <div className="relative">
            <div className="aspect-video rounded-2xl overflow-hidden bg-gray-800 border border-gray-700 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 border border-white/20">
                  <svg
                    className="w-7 h-7 text-white ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-gray-500 text-sm">기공소 소개 영상 준비 중</p>
              </div>
            </div>

            {/* 사진 그리드 */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {['디지털 스캐너', 'CAD/CAM 장비', '완성된 보철물'].map(
                (caption) => (
                  <div
                    key={caption}
                    className="aspect-square rounded-xl bg-gray-800 border border-gray-700 flex flex-col items-center justify-center"
                  >
                    <div className="w-8 h-8 rounded bg-gray-700 mb-1.5" />
                    <p className="text-xs text-gray-500 text-center px-1">
                      {caption}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* 특징 리스트 */}
          <div className="flex flex-col gap-5">
            {LAB_FEATURES.map((feature, i) => (
              <div
                key={feature.title}
                className="flex gap-4 p-5 rounded-2xl bg-gray-800 border border-gray-700 hover:border-[#6B7B3A]/50 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#6B7B3A]/20 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-[#6B7B3A]">
                    0{i + 1}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 기공소 구성원 */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-lg font-semibold text-white">기공소 구성원</h3>
            <div className="flex-1 h-px bg-gray-700" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {LAB_STAFF.map((staff) => (
              <div
                key={staff.name}
                className="p-5 rounded-2xl bg-gray-800 border border-gray-700 text-center"
              >
                {/* 사진 placeholder */}
                <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mx-auto mb-3 border border-gray-600">
                  <span className="text-gray-500 text-xs">사진</span>
                </div>
                <p className="font-semibold text-white text-sm">{staff.role}</p>
                <p className="text-xs text-gray-500 mt-1">{staff.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
