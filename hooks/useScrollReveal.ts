'use client'

import { useEffect, useRef, useState } from 'react'

export function useScrollReveal(threshold = 0.2) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 0.5초 딜레이 후 애니메이션 시작
          setTimeout(() => {
            setIsVisible(true)
          }, 500)
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}
