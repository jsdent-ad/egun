export interface Doctor {
  id: string
  name: string
  role: string
  specialty?: string
  image: string
  specialtyDetail?: string
  careers?: string[]
  letter?: string
}

export const doctors: Doctor[] = [
  {
    id: 'lee-jaesung',
    name: '이재성',
    role: '대표원장',
    specialty: '서울대 출신',
    specialtyDetail: '임플란트 · 구강외과 · 전악보철',
    image: '/doctors/lee-jaesung.jpg',
    careers: [
      '서울대학교 치과대학 졸업',
      '서울대학교 치과대학병원 인턴 수료',
      '전 분당서울대병원 치과진료부 외래교수',
      '대한구강악안면외과학회 정회원',
      '대한임플란트학회 정회원',
      '現 서울이건치과 대표원장',
    ],
    letter:
      '처음 오신 분도, 오래 다니신 분도 매번 진심으로 맞이하겠습니다. 치료 결과만큼 치료 과정도 편안하도록 최선을 다하겠습니다.',
  },
  {
    id: 'jung-chaeyun',
    name: '정채윤',
    role: '원장',
    specialty: '보존 · 심미',
    specialtyDetail: '심미보철 · 라미네이트 · 치아미백',
    image: '/doctors/jung-chaeyun.jpg',
    careers: [
      '서울대학교 치과대학 졸업',
      '서울대학교 치과대학병원 인턴 수료',
      '대한치과보존학회 정회원',
      '대한심미치과학회 정회원',
      '現 서울이건치과 원장',
    ],
    letter:
      '자연치아를 최대한 보존하면서도 아름다운 미소를 만들어 드리겠습니다. 세심한 진료로 항상 함께하겠습니다.',
  },
  {
    id: 'yoo-suhyun',
    name: '유수현',
    role: '원장',
    specialty: '교정',
    specialtyDetail: '투명교정 · 메탈교정 · 성인교정',
    image: '/doctors/yoo-suhyun.jpg',
    careers: [
      '연세대학교 치과대학 졸업',
      '연세대학교 치과대학병원 교정과 수련',
      '교정과 전문의 취득',
      '대한치과교정학회 정회원',
      '現 서울이건치과 교정전문 원장',
    ],
    letter:
      '교정은 단순한 치아 배열이 아닌 얼굴 전체의 균형을 만드는 과정입니다. 끝까지 함께하며 최선의 결과를 만들겠습니다.',
  },
  {
    id: 'park-jiwon',
    name: '박지원',
    role: '원장',
    specialty: '보존',
    specialtyDetail: '신경치료 · 레진 · 크라운',
    image: '/doctors/park-jiwon.jpg',
    careers: [
      '경희대학교 치과대학 졸업',
      '경희대학교 치과대학병원 보존과 수련',
      '보존과 전문의 취득',
      '대한치과보존학회 정회원',
      '現 서울이건치과 보존전문 원장',
    ],
    letter:
      '한 번 치료하면 오래 유지될 수 있도록 기본에 충실한 진료를 약속드립니다. 치과가 두렵지 않도록 편안하게 모시겠습니다.',
  },
  {
    id: 'baek-seola',
    name: '백설아',
    role: '원장',
    specialty: '소아',
    specialtyDetail: '소아치과 · 성장기교정 · 불소도포',
    image: '/doctors/baek-seola.jpg',
    careers: [
      '단국대학교 치과대학 졸업',
      '단국대학교 치과대학병원 소아치과 수련',
      '소아치과 전문의 취득',
      '대한소아치과학회 정회원',
      '現 서울이건치과 소아전문 원장',
    ],
    letter:
      '아이들에게 치과는 무서운 곳이 아니라 친구 같은 곳이 되길 바랍니다. 아이의 눈높이에서 따뜻하게 돌보겠습니다.',
  },
]
