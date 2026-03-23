export interface Doctor {
  id: string
  name: string
  role: string
  specialty?: string
  image: string
}

export const doctors: Doctor[] = [
  {
    id: 'lee-jaesung',
    name: '이재성',
    role: '대표원장',
    specialty: '서울대 출신',
    image: '/doctors/lee-jaesung.jpg',
  },
  {
    id: 'jung-chaeyun',
    name: '정채윤',
    role: '원장',
    image: '/doctors/jung-chaeyun.jpg',
  },
  {
    id: 'yoo-suhyun',
    name: '유수현',
    role: '원장',
    specialty: '교정',
    image: '/doctors/yoo-suhyun.jpg',
  },
  {
    id: 'park-jiwon',
    name: '박지원',
    role: '원장',
    specialty: '보존',
    image: '/doctors/park-jiwon.jpg',
  },
  {
    id: 'baek-seola',
    name: '백설아',
    role: '원장',
    specialty: '소아',
    image: '/doctors/baek-seola.jpg',
  },
]
