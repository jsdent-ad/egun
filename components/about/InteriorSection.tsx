const INTERIOR_AREAS = [
  {
    id: 'main',
    label: '본관',
    slots: [
      { caption: '대기실' },
      { caption: '진료실 1' },
      { caption: '진료실 2' },
      { caption: '상담실' },
      { caption: '수술실' },
      { caption: '멸균실' },
    ],
  },
  {
    id: 'annex',
    label: '별관',
    slots: [
      { caption: '소아 대기공간' },
      { caption: '소아 진료실' },
      { caption: '교정 진료실' },
      { caption: '파노라마실' },
      { caption: '상담실' },
      { caption: '회복실' },
    ],
  },
]

function PhotoGrid({ slots }: { slots: { caption: string }[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {slots.map((slot, i) => (
        <div
          key={i}
          className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 border border-stone-200"
        >
          {/* 사진 placeholder */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200 group-hover:from-stone-200 group-hover:to-stone-300 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-white/60 flex items-center justify-center mb-2">
              <svg
                className="w-5 h-5 text-stone-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-xs text-stone-400 font-medium">사진 준비 중</p>
          </div>

          {/* 캡션 */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent px-3 py-2">
            <p className="text-white text-xs font-medium">{slot.caption}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function InteriorSection() {
  return (
    <section
      id="interior"
      className="py-20 sm:py-28 bg-stone-50 scroll-mt-32"
      aria-labelledby="interior-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#B8A080] mb-4">
          Interior
        </p>
        <h2
          id="interior-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4"
        >
          내부전경
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed mb-16">
          쾌적하고 편안한 환경에서 치료를 받으실 수 있도록 공간을 세심하게 구성하였습니다.
        </p>

        {/* 본관 / 별관 영역 */}
        <div className="space-y-16">
          {INTERIOR_AREAS.map((area) => (
            <div key={area.id}>
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-lg font-bold text-gray-900">{area.label}</h3>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <PhotoGrid slots={area.slots} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
