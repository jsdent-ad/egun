'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { doctors } from '@/data/doctors'
import { X } from 'lucide-react'

export default function DoctorGroup() {
  const [selected, setSelected] = useState<string | null>(null)
  const router = useRouter()
  const selectedDoctor = doctors.find((d) => d.id === selected)

  return (
    <section className="h-screen w-full relative overflow-hidden">
      {/* 단체사진 배경 (풀스크린) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/doctors/doctor-group.jpeg)' }}
      />

      {/* 그라데이션 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* 콘텐츠 */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-24 px-4">
        {/* 제목 */}
        <div className="text-center mb-8">
          <p className="text-xs tracking-[0.35em] uppercase text-white/50 mb-2">
            Medical Team
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-white">
            서울이건 의료진
          </h2>
        </div>

        {/* 자세히 보기 */}
        <div className="text-center">
          <button
            onClick={() => router.push('/about#doctors')}
            className="text-sm text-white/70 hover:text-white transition-colors border border-white/30 hover:border-white/60 px-6 py-2 rounded-full"
          >
            의료진 소개 보기 →
          </button>
        </div>
      </div>

      {/* 약력 오버레이 (선택 시) */}
      {selectedDoctor && (
        <div
          className="absolute inset-0 z-20 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          {/* 배경 블러 */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* 약력 카드 */}
          <div
            className="relative bg-white rounded-2xl max-w-lg w-full p-8 md:p-10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 닫기 버튼 */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <X size={20} />
            </button>

            {/* 이름 + 직책 */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <h3 className="text-2xl md:text-3xl font-black text-gray-900">
                  {selectedDoctor.name}
                </h3>
                <span className="text-lg md:text-xl text-gray-500 font-medium">
                  {selectedDoctor.role}
                </span>
                {selectedDoctor.title && (
                  <span className="text-sm text-gray-400">{selectedDoctor.title}</span>
                )}
              </div>
              {selectedDoctor.specialtyDetail && (
                <p className="text-sm text-[#B8A080] mt-1 font-medium">
                  {selectedDoctor.specialtyDetail}
                </p>
              )}
              <div className="mt-3 w-full h-px bg-gray-200" />
            </div>

            {/* 약력 */}
            <div className="mb-6">
              <p className="text-sm font-bold text-[#4A90D9] mb-3">약력</p>
              <ul className="space-y-1.5">
                {selectedDoctor.careers.map((career, i) => (
                  <li key={i} className="text-sm text-gray-700 leading-relaxed">
                    {career}
                  </li>
                ))}
              </ul>
            </div>

            {/* 인사말 */}
            {selectedDoctor.letter && (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 italic leading-relaxed">
                  &ldquo;{selectedDoctor.letter}&rdquo;
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
