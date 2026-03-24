'use client'

// @TASK Board - FAQ 아코디언 (다중 열기 허용)
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FaqItem {
  question: string
  answer: string
}

interface FaqAccordionProps {
  faq: FaqItem[]
}

export default function FaqAccordion({ faq }: FaqAccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set())

  const toggle = (index: number) => {
    setOpenIndexes((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        자주 묻는 질문
      </h3>
      <dl className="space-y-2">
        {faq.map((item, index) => {
          const isOpen = openIndexes.has(index)
          const answerId = `faq-answer-${index}`

          return (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <dt>
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                >
                  {/* Q 아이콘 */}
                  <span
                    className="shrink-0 w-7 h-7 rounded-full bg-[#B8A080] flex items-center justify-center text-white text-xs font-bold"
                    aria-hidden="true"
                  >
                    Q
                  </span>
                  <span className="flex-1 text-sm sm:text-base font-medium text-gray-800">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-gray-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </dt>
              <dd
                id={answerId}
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-5 pb-4 pt-1 flex gap-3">
                  <span
                    className="shrink-0 w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-[#B8A080] text-xs font-bold mt-0.5"
                    aria-hidden="true"
                  >
                    A
                  </span>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </dd>
            </div>
          )
        })}
      </dl>
    </div>
  )
}
