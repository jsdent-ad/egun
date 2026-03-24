import type { Metadata } from 'next'
import AnchorNav from '@/components/about/AnchorNav'
import PhilosophySection from '@/components/about/PhilosophySection'
import DoctorProfileSection from '@/components/about/DoctorProfileSection'
import ScheduleSection from '@/components/about/ScheduleSection'
import InteriorSection from '@/components/about/InteriorSection'
import LabSection from '@/components/about/LabSection'
import AccessSection from '@/components/about/AccessSection'

export const metadata: Metadata = {
  title: '이건치과소개 | 서울이건치과',
  description:
    '서울이건치과의 진료 철학, 의료진 소개, 진료일정, 내부전경, 디지털 기공소, 오시는길을 안내합니다.',
}

export default function AboutPage() {
  return (
    <>
      {/* 페이지 히어로 */}
      <div className="h-40 sm:h-52 bg-gradient-to-br from-[#B8A080] to-[#96775A] flex items-end">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
          <p className="text-white/70 text-xs font-semibold tracking-[0.2em] uppercase mb-2">
            About Us
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            이건치과소개
          </h1>
        </div>
      </div>

      {/* 앵커 내비게이션 (sticky) */}
      <AnchorNav />

      {/* 섹션들 */}
      <PhilosophySection />
      <DoctorProfileSection />
      <ScheduleSection />
      <InteriorSection />
      <LabSection />
      <AccessSection />
    </>
  )
}
