import Link from 'next/link'

const MEDIA_ITEMS = [
  {
    id: 'notice',
    label: '공지사항',
    image: '/images/media-image/notice.jpg',
    href: '/notice',
  },
  {
    id: 'blog',
    label: '원장님 칼럼',
    image: '/images/media-image/blog.jpg',
    href: '/media?tab=blog',
  },
  {
    id: 'youtube',
    label: '이건TV',
    image: '/images/media-image/youtube.jpg',
    href: '/media?tab=youtube',
  },
  {
    id: 'review',
    label: '환자분 실제 후기',
    image: '/images/media-image/review.jpg',
    href: '/media?tab=review',
  },
] as const

export default function MediaSection() {
  return (
    <section
      className="h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: '#F5F5F0' }}
    >
      {/* Header */}
      <div className="mb-8 md:mb-12">
        <p className="text-xs tracking-[0.35em] uppercase text-stone-400 mb-2">
          이건 미디어
        </p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-stone-800">
          EGUN MEDIA
        </h2>
      </div>

      {/* 4-column grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full max-w-6xl">
        {MEDIA_ITEMS.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="group relative flex flex-col items-center"
          >
            {/* Image container */}
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-stone-200">
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Hover border overlay */}
              <div className="absolute inset-0 rounded-xl border-[4px] border-transparent group-hover:border-white transition-all duration-300 pointer-events-none" />
            </div>

            {/* Label */}
            <p className="mt-3 md:mt-4 text-sm md:text-base font-semibold text-stone-700 group-hover:text-[#B8A080] transition-colors duration-300">
              {item.label}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
