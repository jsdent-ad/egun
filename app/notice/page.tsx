import { createClient } from '@/lib/supabase/server'

interface Notice {
  id: string
  title: string
  content: string | null
  image_url: string | null
  notice_date: string
}

export const metadata = {
  title: '공지사항 | 수원치과 서울이건치과',
  description: '수원치과 서울이건치과의 최신 공지사항, 휴무일정, 진료안내를 확인하세요.',
}

export default async function NoticePage() {
  const supabase = await createClient()
  const { data: notices } = await supabase
    .from('notices')
    .select('*')
    .eq('is_active', true)
    .order('notice_date', { ascending: false })

  const items: Notice[] = notices || []

  // 이미지가 있는 최근 공지 3개
  const imageNotices = items.filter((n) => n.image_url).slice(0, 3)

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          공지사항
        </h1>
        <p className="mt-3 text-gray-500">
          서울이건치과의 소식을 알려드립니다.
        </p>
      </div>

      {/* 최근 이미지 공지 상단 배너 */}
      {imageNotices.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {imageNotices.map((notice) => (
            <div key={notice.id} className="rounded-xl overflow-hidden border border-gray-200 bg-white hover:shadow-md transition-shadow">
              <img
                src={notice.image_url!}
                alt={notice.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-sm text-gray-900 truncate">{notice.title}</h3>
                <time className="text-xs text-gray-400 mt-1 block">{formatDate(notice.notice_date)}</time>
              </div>
            </div>
          ))}
        </div>
      )}

      {items.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          등록된 공지사항이 없습니다.
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((notice) => (
            <article
              key={notice.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {notice.title}
                  </h2>
                  {notice.image_url && (
                    <img src={notice.image_url} alt={notice.title} className="w-full h-auto rounded-lg mt-3 max-h-80 object-cover" />
                  )}
                  {notice.content && (
                    <p className="mt-2 text-sm text-gray-600 whitespace-pre-line leading-relaxed">
                      {notice.content}
                    </p>
                  )}
                </div>
                <time className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0">
                  {formatDate(notice.notice_date)}
                </time>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
