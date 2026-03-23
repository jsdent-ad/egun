import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import QuickConsultBar from '@/components/layout/QuickConsultBar'
import FloatingSidebar from '@/components/layout/FloatingSidebar'
import CustomCursor from '@/components/layout/CustomCursor'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans-kr',
})

export const metadata: Metadata = {
  title: '서울이건치과 | 서울대 출신 원장 2인 책임진료',
  description:
    '서울대 출신 대표 원장 2인이 처음 상담부터 치료 마무리까지 책임지고 진료합니다. 임플란트, 교정, 심미보철, 소아치과.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.variable} font-sans antialiased`}>
        {/* 커스텀 커서 (데스크톱 전용, 클라이언트) */}
        <CustomCursor />

        {/* 상단 헤더 */}
        <Header />

        {/* 우측 플로팅 사이드바 (데스크톱 전용) */}
        <FloatingSidebar />

        {/* 메인 콘텐츠 영역 */}
        {/* pb-16: 하단 QuickConsultBar 높이만큼 여백 확보 */}
        <main className="pb-16 sm:pb-14">
          {children}
        </main>

        {/* 푸터 */}
        <Footer />

        {/* 하단 고정 빠른상담 바 */}
        <QuickConsultBar />
      </body>
    </html>
  )
}
