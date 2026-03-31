'use client'

import { doctors } from '@/data/doctors'
import { useScrollReveal } from '@/hooks/useScrollReveal'

function DoctorCard({
  doctor,
  index,
}: {
  doctor: (typeof doctors)[0]
  index: number
}) {
  const isEven = index % 2 === 0
  const { ref, isVisible } = useScrollReveal(0.15)

  return (
    <article
      ref={ref}
      className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start py-16 sm:py-20 border-b border-gray-100 last:border-0"
    >
      {/* 사진 영역 */}
      <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
        <div className={`relative overflow-hidden rounded-2xl aspect-[3/4] max-w-sm lg:max-w-md bg-stone-100 shadow-md mx-auto lg:mx-0 ${isVisible ? 'scroll-reveal-scale' : 'scroll-hidden'}`}>
          <img
            src={doctor.image}
            alt={`${doctor.name} ${doctor.role}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-[#B8A080] text-white text-xs font-semibold px-3 py-1 rounded-full">
            {doctor.role}
          </div>
        </div>
      </div>

      {/* 약력 및 편지 영역 */}
      <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'} space-y-8`}>
        <div>
          <p className={`text-xs font-semibold tracking-[0.2em] uppercase text-[#B8A080] mb-2 ${isVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}>
            {doctor.specialtyDetail ?? doctor.specialty}
          </p>
          <h3 className={`text-2xl sm:text-3xl font-bold text-gray-900 mb-1 ${isVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
            style={isVisible ? { animationDelay: '0.1s' } : undefined}>
            {doctor.name} {doctor.role}
          </h3>
          <div className={`w-10 h-0.5 bg-[#B8A080] mt-3 ${isVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
            style={isVisible ? { animationDelay: '0.18s' } : undefined} />
        </div>

        {doctor.careers && doctor.careers.length > 0 && (
          <div>
            <h4 className={`text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 ${isVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
              style={isVisible ? { animationDelay: '0.25s' } : undefined}>
              학력 · 경력
            </h4>
            <ul className="space-y-2.5">
              {doctor.careers.map((career, i) => (
                <li key={i} className={`flex items-start gap-3 ${isVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
                  style={isVisible ? { animationDelay: `${0.3 + i * 0.07}s` } : undefined}>
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#B8A080] shrink-0" />
                  <span className="text-sm text-gray-700 leading-relaxed">{career}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {doctor.letter && (
          <div className={`bg-stone-50 border border-stone-200 rounded-2xl p-6 relative ${isVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}
            style={isVisible ? { animationDelay: `${0.3 + (doctor.careers?.length ?? 0) * 0.07 + 0.1}s` } : undefined}>
            <span className="absolute top-4 left-5 text-4xl text-[#B8A080]/20 font-serif leading-none select-none">&ldquo;</span>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed pl-4 italic whitespace-pre-line">
              {doctor.letter}
            </p>
            <p className="text-right text-sm text-[#B8A080] font-semibold mt-4">
              — {doctor.name} {doctor.role}
            </p>
          </div>
        )}
      </div>
    </article>
  )
}

export default function DoctorProfileSection() {
  const { ref, isVisible } = useScrollReveal(0.15)

  return (
    <section
      id="doctors"
      className="py-20 sm:py-28 bg-stone-50 scroll-mt-32"
      aria-labelledby="doctors-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="mb-4">
          <p className={`text-xs font-semibold tracking-[0.25em] uppercase text-[#B8A080] mb-4 ${isVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}>
            Our Doctors
          </p>
          <h2 id="doctors-heading"
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight ${isVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
            style={isVisible ? { animationDelay: '0.1s' } : undefined}>
            한자리에서<br />
            <span className="text-[#B8A080]">변하지 않는 마음</span>
          </h2>
        </div>
        <p className={`mt-6 text-sm sm:text-base text-gray-500 max-w-2xl leading-relaxed ${isVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
          style={isVisible ? { animationDelay: '0.2s' } : undefined}>
          각자의 전문 분야에서 최선을 다하며<br />
          언제나 같은 자리에서 기다리고 있습니다.
        </p>

        <div className="mt-16">
          {doctors.map((doctor, index) => (
            <DoctorCard key={doctor.id} doctor={doctor} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
