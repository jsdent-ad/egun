'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Pencil, Trash2, X } from 'lucide-react'

interface Notice {
  id: string
  title: string
  content: string | null
  image_url: string | null
  notice_date: string
  is_active: boolean
  created_at: string
}

interface FormData {
  title: string
  content: string
  notice_date: string
  is_active: boolean
}

const emptyForm: FormData = {
  title: '',
  content: '',
  notice_date: new Date().toISOString().split('T')[0],
  is_active: true,
}

export default function NoticesPage() {
  const [items, setItems] = useState<Notice[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      // 관리자는 모든 공지 (활성+비활성) 조회 필요 → Supabase 직접 조회
      const supabase = createClient()
      const { data } = await supabase
        .from('notices')
        .select('*')
        .order('notice_date', { ascending: false })
      setItems(data || [])
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const openAddModal = () => {
    setEditingId(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  const openEditModal = (item: Notice) => {
    setEditingId(item.id)
    setForm({
      title: item.title,
      content: item.content || '',
      notice_date: item.notice_date,
      is_active: item.is_active,
    })
    setModalOpen(true)
  }

  const handleSave = async () => {
    if (!form.title.trim()) return
    setSaving(true)

    try {
      const url = editingId ? `/api/notices/${editingId}` : '/api/notices'
      const method = editingId ? 'PATCH' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
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

  const toggleActive = async (id: string, currentActive: boolean) => {
    const res = await fetch(`/api/notices/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: !currentActive }),
    })
    if (res.ok) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, is_active: !currentActive } : item,
        ),
      )
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    const res = await fetch(`/api/notices/${deleteId}`, { method: 'DELETE' })
    if (res.ok) {
      setItems((prev) => prev.filter((item) => item.id !== deleteId))
      setDeleteId(null)
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">공지사항</h1>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 bg-[#6B7B3A] text-white text-sm font-medium rounded-lg hover:bg-[#5A6A2F] transition-colors"
        >
          <Plus size={16} />
          공지 추가
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">불러오는 중...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          등록된 공지사항이 없습니다.
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                  제목
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">
                  날짜
                </th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                  활성
                </th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                  관리
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">
                      {item.title}
                    </p>
                    {item.content && (
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                        {item.content}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">
                    {formatDate(item.notice_date)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => toggleActive(item.id, item.is_active)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        item.is_active ? 'bg-[#6B7B3A]' : 'bg-gray-300'
                      }`}
                      role="switch"
                      aria-checked={item.is_active}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          item.is_active ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1 justify-center">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1.5 text-gray-400 hover:text-[#6B7B3A] transition-colors"
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 추가/수정 모달 */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingId ? '공지 수정' : '공지 추가'}
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
                  className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#6B7B3A] focus:border-[#6B7B3A]"
                  placeholder="공지사항 제목"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  내용
                </label>
                <textarea
                  value={form.content}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, content: e.target.value }))
                  }
                  rows={5}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#6B7B3A] focus:border-[#6B7B3A] resize-none"
                  placeholder="공지 내용을 입력하세요"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    공지 날짜
                  </label>
                  <input
                    type="date"
                    value={form.notice_date}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, notice_date: e.target.value }))
                    }
                    className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#6B7B3A]"
                  />
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.is_active}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, is_active: e.target.checked }))
                      }
                      className="w-4 h-4 accent-[#6B7B3A]"
                    />
                    <span className="text-sm text-gray-700">활성화</span>
                  </label>
                </div>
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
                className="px-4 py-2 text-sm bg-[#6B7B3A] text-white rounded-lg hover:bg-[#5A6A2F] disabled:opacity-60 transition-colors"
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
              공지 삭제
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              이 공지를 삭제하시겠습니까? 삭제된 데이터는 복구할 수 없습니다.
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
