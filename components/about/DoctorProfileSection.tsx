import { doctors } from '@/data/doctors'

function DoctorCard({
  doctor,
  index,
}: {
  doctor: (typeof doctors)[0]
  index: number
}) {
  const isEven = index % 2 === 0

  return (
    <article
      className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start py-16 sm:py-20 border-b border-gray-100 last:border-0`}
    >
      {/* 사진 영역 - 짝수 인덱스: 좌, 홀수 인덱스: 우 (lg 이상에서만 지그재그) */}
      <div
        className={`${isEven ? 'lg:order-1' : 'lg:order-2'} flex flex-col gap-6`}
      >
        {/* 프로필 사진 */}
        <div className="relative overflow-hidden rounded-2xl aspect-[3/4] max-w-xs bg-stone-100 shadow-md mx-auto lg:mx-0">
          <img
            src={doctor.image}
            alt={`${doctor.name} ${doctor.role}`}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* 직책 뱃지 */}
          <div className="absolute top-4 left-4 bg-[#B8A080] text-white text-xs font-semibold px-3 py-1 rounded-full">
            {doctor.role}
          </div>
        </div>

        {/* 면허증 · 수료증 영역 */}
        <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto lg:mx-0 w-full">
          {['면허증', '수료증'].map((label) => (
            <div
              key={label}
              className="aspect-[3/4] bg-gray-100 rounded-xl flex flex-col items-center justify-center border border-dashed border-gray-300"
            >
              <div className="w-8 h-8 rounded bg-gray-200 mb-2 flex items-center justify-center">
                <span className="text-gray-400 text-xs">사진</span>
              </div>
              <p className="text-xs text-gray-400">{label} 준비 중</p>
            </div>
          ))}
        </div>
      </div>

      {/* 약력 및 편지 영역 */}
      <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'} space-y-8`}>
        {/* 이름 · 전문분야 */}
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#B8A080] mb-2">
            {doctor.specialtyDetail ?? doctor.specialty}
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            {doctor.name} {doctor.role}
          </h3>
          <div className="w-10 h-0.5 bg-[#B8A080] mt-3" />
        </div>

        {/* 경력사항 */}
        {doctor.careers && doctor.careers.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              학력 · 경력
            </h4>
            <ul className="space-y-2.5">
              {doctor.careers.map((career, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#B8A080] shrink-0" />
                  <span className="text-sm text-gray-700 leading-relaxed">
                    {career}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 손글씨 편지 영역 */}
        {doctor.letter && (
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 relative">
            {/* 따옴표 장식 */}
            <span className="absolute top-4 left-5 text-4xl text-[#B8A080]/20 font-serif leading-none select-none">
              &ldquo;
            </span>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed pl-4 italic">
              {doctor.letter}
            </p>
            <p className="text-right text-sm text-[#B8A080] font-semibold mt-4">
              — {doctor.name} {doctor.role}
            </p>

            {/* 손글씨 사진 placeholder */}
            <div className="mt-4 h-24 bg-white rounded-xl border border-dashed border-stone-300 flex items-center justify-center">
              <p className="text-xs text-gray-400">손글씨 사진 준비 중</p>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}

export default function DoctorProfileSection() {
  return (
    <section
      id="doctors"
      className="py-20 sm:py-28 bg-stone-50 scroll-mt-32"
      aria-labelledby="doctors-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="mb-4">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#B8A080] mb-4">
            Our Doctors
          </p>
          <h2
            id="doctors-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
          >
            한자리에서<br />
            <span className="text-[#B8A080]">변하지 않는 마음</span>
          </h2>
        </div>
        <p className="mt-6 text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed">
          서울이건치과의 원장들은 각자의 전문 분야에서 최선을 다하며,
          언제나 같은 자리에서 환자 여러분을 기다리고 있습니다.
        </p>

        {/* 원장 카드 목록 */}
        <div className="mt-16">
          {doctors.map((doctor, index) => (
            <DoctorCard key={doctor.id} doctor={doctor} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
