export interface BusinessHours {
  day: string
  hours: string
  isClosed?: boolean
}

export interface SocialLinks {
  kakao: string
  youtube: string
  blog: string
  naverPlace: string
}

export interface ClinicInfo {
  name: string
  representative: string
  phone: string
  fax: string
  businessNumber: string
  address: string
  latitude: number
  longitude: number
  socialLinks: SocialLinks
  businessHours: BusinessHours[]
}

export const clinicInfo: ClinicInfo = {
  name: '서울이건치과',
  representative: '이재성',
  phone: '031-896-5512',
  fax: '031-213-5510',
  businessNumber: '770-17-01708',
  address: '경기도 수원시 영통구 인계로220번길 6-3 미산빌딩 2층 서울이건치과',
  latitude: 37.264707,
  longitude: 127.041222,
  socialLinks: {
    kakao: 'http://pf.kakao.com/_xmDDNxb',
    youtube: 'https://youtube.com/@seoulegun',
    blog: 'https://blog.naver.com/seoulegundc',
    naverPlace: 'https://m.place.naver.com/restaurant/12872860',
  },
  businessHours: [
    { day: '월', hours: '09:30-18:30' },
    { day: '화', hours: '09:30-20:30' },
    { day: '수', hours: '09:30-18:30' },
    { day: '목', hours: '09:30-18:30' },
    { day: '금', hours: '09:30-20:30' },
    { day: '토', hours: '09:30-13:30' },
    { day: '일', hours: '휴진', isClosed: true },
  ],
}
