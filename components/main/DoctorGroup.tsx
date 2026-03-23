'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { doctors } from '@/data/doctors'
import { ArrowRight, User } from 'lucide-react'

const SPECIALTY_LABEL: Record<string, string> = {
  '서울대 출신': '임플란트 · 구강외과',
  교정: '치아교정 전문',
  보존: '자연치 보존',
  소아: '소아치과',
}

export default function DoctorGroup() {
  const [hovered, setHovered] = useState<string | null>(null)
  const router = useRouter()

  return (
    <section className="h-screen w-full bg-white flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      {/* Title */}
      <div className="text-center mb-10 md:mb-14">
        <p className="text-xs tracking-[0.35em] uppercase text-stone-400 mb-2">
          Medical Team
        </p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-stone-800">
          서울이건 의료진을 소개합니다
        </h2>
        <div className="mt-3 w-10 h-0.5 mx-auto" style={{ backgroundColor: '#6B7B3A' }} />
      </div>

      {/* Doctors grid */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12 w-full max-w-4xl">
        {doctors.map((doctor) => {
          const isHovered = hovered === doctor.id
          const anyHovered = hovered !== null

          return (
            <button
              key={doctor.id}
              className="flex flex-col items-center gap-3 cursor-pointer group focus:outline-none"
              onMouseEnter={() => setHovered(doctor.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => router.push('/about#doctors')}
              aria-label={`${doctor.name} ${doctor.role} 상세 보기`}
            >
              {/* Avatar */}
              <div
                className="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-2 transition-all duration-300"
                style={{
                  borderColor: isHovered ? '#6B7B3A' : 'transparent',
                  opacity: anyHovered && !isHovered ? 0.35 : 1,
                  transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                }}
              >
                {/* Placeholder avatar */}
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ backgroundColor: isHovered ? '#6B7B3A' : '#e5e7eb' }}
                >
                  <User
                    size={36}
                    className="transition-colors duration-300"
                    style={{ color: isHovered ? '#fff' : '#9ca3af' }}
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* Name + role */}
              <div
                className="text-center transition-all duration-300"
                style={{
                  opacity: anyHovered && !isHovered ? 0.35 : 1,
                }}
              >
                <p
                  className="text-sm font-bold transition-colors duration-300"
                  style={{ color: isHovered ? '#6B7B3A' : '#1c1917' }}
                >
                  {doctor.name}
                </p>
                <p className="text-xs text-stone-500 mt-0.5">{doctor.role}</p>
                {(doctor.specialty || isHovered) && (
                  <p
                    className="text-xs mt-1 transition-all duration-300"
                    style={{
                      color: '#8B7D3C',
                      opacity: isHovered ? 1 : 0.6,
                    }}
                  >
                    {doctor.specialty
                      ? SPECIALTY_LABEL[doctor.specialty] || doctor.specialty
                      : '대표원장'}
                  </p>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* CTA link */}
      <button
        onClick={() => router.push('/about#doctors')}
        className="mt-10 md:mt-14 inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-stone-900 group transition-colors duration-200"
      >
        자세히 보기
        <ArrowRight
          size={14}
          className="group-hover:translate-x-1 transition-transform duration-200"
          aria-hidden="true"
        />
      </button>
    </section>
  )
}
