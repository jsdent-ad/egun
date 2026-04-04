'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useScrollReveal } from '@/hooks/useScrollReveal'

function Typewriter({ text, delay = 0, speed = 120 }: { text: string; delay?: number; speed?: number }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!started) return
    if (displayed.length >= text.length) return

    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1))
    }, speed)
    return () => clearTimeout(timer)
  }, [started, displayed, text, speed])

  return (
    <span>
      {displayed}
      {displayed.length < text.length && (
        <span className="inline-block w-[2px] h-[1em] bg-[#B8A080] ml-0.5 animate-pulse align-middle" />
      )}
    </span>
  )
}

export default function DoctorGroup() {
  const router = useRouter()
  const { ref, isVisible } = useScrollReveal(0.3)
  const [showSub, setShowSub] = useState(false)

  useEffect(() => {
    if (!isVisible) return
    // "한자리에서 변하지 않는 마음." 완료 후 부제 표시 (약 2.5초)
    const timer = setTimeout(() => setShowSub(true), 3000)
    return () => clearTimeout(timer)
  }, [isVisible])

  return (
    <section className="h-screen w-full relative overflow-hidden">
      <div
        className="absolute inset-0 hidden md:block bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/doctors/doctor-group-3.png)' }}
      />
      <div
        className="absolute inset-0 md:hidden bg-cover bg-bottom bg-no-repeat"
        style={{ backgroundImage: 'url(/images/doctors/doctors-mobile-v2.png)' }}
      />

      {/* 모바일 */}
      <div ref={ref} className="relative z-10 h-full flex flex-col items-center pt-[15vh] md:hidden px-4">
        <p className={`text-sm tracking-[0.25em] uppercase text-gray-400 mb-4 ${isVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}>
          Medical Team
        </p>
        <div className="text-center mb-2">
          <h2 className="text-2xl font-bold text-gray-900 leading-relaxed">
            {isVisible && (
              <>
                <Typewriter text="한자리에서" delay={500} speed={150} />
                <br />
                <Typewriter text="변하지 않는 마음." delay={1500} speed={130} />
              </>
            )}
          </h2>
        </div>
        <p className={`text-sm text-gray-500 mb-6 transition-opacity duration-700 ${showSub ? 'opacity-100' : 'opacity-0'}`}>
          전문의료진으로 구성된 서울이건치과
        </p>
        <button
          onClick={() => router.push('/about#doctors')}
          className={`text-sm text-gray-600 hover:text-gray-900 transition-all duration-500 border border-gray-400 hover:border-gray-700 px-10 py-3 rounded-full ${showSub ? 'opacity-100' : 'opacity-0'}`}
        >
          자세히보기 →
        </button>
      </div>

      {/* PC */}
      <div className="relative z-10 h-full hidden md:flex flex-col items-center pt-24 lg:pt-28 px-4">
        <p className={`text-sm tracking-[0.25em] uppercase text-gray-400 mb-3 ${isVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}>
          Medical Team
        </p>
        <h2 className="text-xl lg:text-2xl font-bold text-gray-900 text-center leading-snug mb-2">
          {isVisible && (
            <Typewriter text="한자리에서 변하지 않는 마음." delay={500} speed={100} />
          )}
        </h2>
        <p className={`text-sm text-gray-500 mb-4 transition-opacity duration-700 ${showSub ? 'opacity-100' : 'opacity-0'}`}>
          전문의료진으로 구성된 서울이건치과
        </p>
        <button
          onClick={() => router.push('/about#doctors')}
          className={`text-sm text-gray-600 hover:text-gray-900 transition-all duration-500 border border-gray-400 hover:border-gray-700 px-8 py-2.5 rounded-full ${showSub ? 'opacity-100' : 'opacity-0'}`}
        >
          자세히보기 →
        </button>
      </div>
    </section>
  )
}
