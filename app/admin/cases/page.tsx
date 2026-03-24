'use client'

import { useState, useEffect, useCallback } from 'react'
import { Plus, Pencil, Trash2, X } from 'lucide-react'

interface CaseBlog {
  id: string
  blog_url: string
  blog_title: string | null
}

interface Case {
  id: string
  board_category: string
  treatment_type: string | null
  title: string
  description: string | null
  before_image_url: string | null
  after_image_url: string | null
  sort_order: number | null
  created_at: string
  case_blogs: CaseBlog[]
}

interface FormData {
  title: string
  description: string
  board_category: string
  treatment_type: string
  blog_urls: { url: string; title: string }[]
}

const BOARD_CATEGORIES = [
  { value: 'all', label: '전체' },
  { value: 'natural-tooth', label: '자연치아' },
  { value: 'implant', label: '임플란트' },
  { value: 'cosmetic', label: '심미보철' },
  { value: 'orthodontics', label: '교정' },
  { value: 'pediatric', label: '소아' },
]

const TREATMENT_TYPES = [
  '충치치료',
  '신경치료',
  '사랑니 발치',
  '임플란트',
  '올세라믹',
  '라미네이트',
  '교정',
  '소아진료',
  '기타',
]

const CATEGORY_BADGE: Record<string, string> = {
  'natural-tooth': 'bg-emerald-100 text-emerald-800',
  implant: 'bg-blue-100 text-blue-800',
  cosmetic: 'bg-purple-100 text-purple-800',
  orthodontics: 'bg-orange-100 text-orange-800',
  pediatric: 'bg-pink-100 text-pink-800',
}

const emptyForm: FormData = {
  title: '',
  description: '',
  board_category: 'natural-tooth',
  treatment_type: '',
  blog_urls: [{ url: '', title: '' }],
}

export default function CasesPage() {
  const [items, setItems] = useState<Case[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const params = filter !== 'all' ? `?board_category=${filter}` : ''
      const res = await fetch(`/api/cases${params}`)
      if (res.ok) setItems(await res.json())
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }, [filter])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const openAddModal = () => {
    setEditingId(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  const openEditModal = (item: Case) => {
    setEditingId(item.id)
    setForm({
      title: item.title,
      description: item.description || '',
      board_category: item.board_category,
      treatment_type: item.treatment_type || '',
      blog_urls:
        item.case_blogs.length > 0
          ? item.case_blogs.map((b) => ({
              url: b.blog_url,
              title: b.blog_title || '',
            }))
          : [{ url: '', title: '' }],
    })
    setModalOpen(true)
  }

  const handleSave = async () => {
    if (!form.title.trim()) return
    setSaving(true)

    try {
      const payload = {
        title: form.title,
        description: form.description || null,
        board_category: form.board_category,
        treatment_type: form.treatment_type || null,
        blog_urls: form.blog_urls.filter((b) => b.url.trim()),
      }

      const url = editingId ? `/api/cases/${editingId}` : '/api/cases'
      const method = editingId ? 'PATCH' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setModalOpen(false)
        fetchData()
      }
    } catch {
      // ignore
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    const res = await fetch(`/api/cases/${deleteId}`, { method: 'DELETE' })
    if (res.ok) {
      setItems((prev) => prev.filter((item) => item.id !== deleteId))
      setDeleteId(null)
    }
  }

  const addBlogUrl = () => {
    setForm((prev) => ({
      ...prev,
      blog_urls: [...prev.blog_urls, { url: '', title: '' }],
    }))
  }

  const removeBlogUrl = (index: number) => {
    setForm((prev) => ({
      ...prev,
      blog_urls: prev.blog_urls.filter((_, i) => i !== index),
    }))
  }

  const updateBlogUrl = (
    index: number,
    field: 'url' | 'title',
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      blog_urls: prev.blog_urls.map((b, i) =>
        i === index ? { ...b, [field]: value } : b,
      ),
    }))
  }

  const getCategoryLabel = (value: string) =>
    BOARD_CATEGORIES.find((c) => c.value === value)?.label || value

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">증례 관리</h1>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 bg-[#B8A080] text-white text-sm font-medium rounded-lg hover:bg-[#5A6A2F] transition-colors"
        >
          <Plus size={16} />
          증례 추가
        </button>
      </div>

      {/* 카테고리 필터 */}
      <div className="flex flex-wrap gap-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
        {BOARD_CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setFilter(cat.value)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === cat.value
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">불러오는 중...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          등록된 증례가 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${CATEGORY_BADGE[item.board_category] || 'bg-gray-100 text-gray-600'}`}
                >
                  {getCategoryLabel(item.board_category)}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-1.5 text-gray-400 hover:text-[#B8A080] transition-colors"
                    title="수정"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => setDeleteId(item.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                    title="삭제"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
              {item.treatment_type && (
                <p className="text-xs text-gray-500 mb-2">
                  {item.treatment_type}
                </p>
              )}
              {item.description && (
                <p className="text-sm text-gray-600 line-clamp-2">
                  {item.description}
                </p>
              )}
              {item.case_blogs.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">
                    블로그 링크 ({item.case_blogs.length})
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 추가/수정 모달 */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingId ? '증례 수정' : '증례 추가'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  제목 *
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                  className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8A080] focus:border-[#B8A080]"
                  placeholder="증례 제목"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  설명
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8A080] focus:border-[#B8A080] resize-none"
                  placeholder="증례 설명"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    게시판 카테고리 *
                  </label>
                  <select
                    value={form.board_category}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, board_category: e.target.value }))
                    }
                    className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8A080]"
                  >
                    {BOARD_CATEGORIES.filter((c) => c.value !== 'all').map(
                      (cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ),
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    치료 유형
                  </label>
                  <select
                    value={form.treatment_type}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        treatment_type: e.target.value,
                      }))
                    }
                    className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8A080]"
                  >
                    <option value="">선택 안 함</option>
                    {TREATMENT_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 이미지 업로드 placeholder */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Before 이미지
                  </label>
                  <div className="h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-xs text-gray-400">
                    추후 업로드 연동
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    After 이미지
                  </label>
                  <div className="h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-xs text-gray-400">
                    추후 업로드 연동
                  </div>
                </div>
              </div>

              {/* 블로그 URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  블로그 링크
                </label>
                {form.blog_urls.map((blog, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input
                      type="url"
                      value={blog.url}
                      onChange={(e) => updateBlogUrl(i, 'url', e.target.value)}
                      placeholder="블로그 URL"
                      className="flex-1 h-9 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8A080]"
                    />
                    <input
                      type="text"
                      value={blog.title}
                      onChange={(e) =>
                        updateBlogUrl(i, 'title', e.target.value)
                      }
                      placeholder="제목 (선택)"
                      className="w-32 h-9 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8A080]"
                    />
                    {form.blog_urls.length > 1 && (
                      <button
                        onClick={() => removeBlogUrl(i)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addBlogUrl}
                  className="text-xs text-[#B8A080] hover:underline"
                >
                  + 링크 추가
                </button>
              </div>
            </div>

            <div className="flex gap-3 justify-end p-6 border-t border-gray-200">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.title.trim()}
                className="px-4 py-2 text-sm bg-[#B8A080] text-white rounded-lg hover:bg-[#5A6A2F] disabled:opacity-60 transition-colors"
              >
                {saving ? '저장 중...' : editingId ? '수정' : '추가'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 삭제 확인 다이얼로그 */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              증례 삭제
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              이 증례를 삭제하시겠습니까? 삭제된 데이터는 복구할 수 없습니다.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
              >
                취소
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
