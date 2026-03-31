import type { Metadata } from 'next'
import './globals.css'

import SiteShell from '@/components/layout/SiteShell'
import { LocalBusinessJsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: '서울이건치과 | 서울대 출신 원장 2인 책임진료',
  description:
    '서울대 출신 대표 원장 2인이 처음 상담부터 치료 마무리까지 책임지고 진료합니다. 임플란트, 교정, 심미보철, 소아치과.',
  metadataBase: new URL('https://egun.vercel.app'),
  openGraph: {
    title: '서울이건치과 | 서울대 출신 원장 2인 책임진료',
    description:
      '서울대 출신 대표 원장 2인이 처음 상담부터 치료 마무리까지 책임지고 진료합니다.',
    url: 'https://egun.vercel.app',
    siteName: '서울이건치과',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/images/logo/egun-logo%20(1).png',
        width: 800,
        height: 600,
        alt: '서울이건치과',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '서울이건치과 | 서울대 출신 원장 2인 책임진료',
    description:
      '서울대 출신 대표 원장 2인이 처음 상담부터 치료 마무리까지 책임지고 진료합니다.',
    images: ['/images/logo/egun-logo%20(1).png'],
  },
  alternates: {
    canonical: 'https://egun.vercel.app',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <LocalBusinessJsonLd />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}
