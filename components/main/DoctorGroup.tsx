'use client'

import { useRouter } from 'next/navigation'

export default function DoctorGroup() {
  const router = useRouter()

  return (
    <section className="h-screen w-full relative overflow-hidden">
      {/* 데스크탑: doctor-group-3 배경 풀스크린 */}
      <div
        className="absolute inset-0 hidden md:block bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/doctors/doctor-group-3.png)' }}
      />

      {/* 모바일: doctors-mobile 배경 */}
      <div
        className="absolute inset-0 md:hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/doctors/doctors-mobile.png)' }}
      />

      {/* 상단 문구 오버레이 */}
      <div className="relative z-10 h-full flex flex-col items-center pt-12 md:pt-28 px-4">
        <p className="text-sm md:text-sm tracking-[0.25em] uppercase text-gray-400 mb-3 animate-drop-in">
          Medical Team
        </p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center leading-tight mb-2 animate-drop-in [animation-delay:0.12s]">
          한자리에서 변하지 않는 마음
        </h2>
        <p className="text-sm md:text-base text-gray-500 mb-6 animate-drop-in [animation-delay:0.24s]">
          전문의료진으로 구성된 서울이건치과
        </p>
        <button
          onClick={() => router.push('/about#doctors')}
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 border border-gray-400 hover:border-gray-700 px-8 py-2.5 rounded-full animate-drop-in [animation-delay:0.36s]"
        >
          자세히보기 →
        </button>
      </div>
    </section>
  )
}
