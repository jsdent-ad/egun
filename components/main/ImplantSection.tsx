import Link from 'next/link'
import { ChevronDown, Plus } from 'lucide-react'

export default function ImplantSection() {
  return (
    <section
      className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden px-4"
      style={{ backgroundColor: '#111111' }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 20% 40%, #6B7B3A 0%, transparent 60%), radial-gradient(ellipse at 80% 60%, #8B7D3C 0%, transparent 60%)',
        }}
      />

      {/* Sub heading */}
      <p className="text-xs tracking-[0.4em] uppercase text-stone-500 mb-4">
        Implant Solution
      </p>

      {/* Main headline */}
      <h2 className="text-xl md:text-2xl lg:text-3xl text-stone-300 font-light text-center mb-3 leading-snug">
        상실된 치아의 완벽한 복원 솔루션
      </h2>

      {/* "All on 4" large type */}
      <div className="relative my-6 md:my-8 flex flex-col items-center">
        <span
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight select-none"
          style={{
            background: 'linear-gradient(135deg, #8B7D3C 0%, #c8aa62 40%, #8B7D3C 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          All on 4
        </span>
        <p className="text-stone-500 text-xs tracking-widest mt-1 uppercase">
          Full-Arch Rehabilitation
        </p>
      </div>

      {/* Prosthesis placeholder images */}
      <div className="flex gap-4 md:gap-6 mb-8 md:mb-10">
        {/* Placeholder 1 */}
        <div
          className="w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-2xl flex items-center justify-center text-xs text-stone-600"
          style={{ backgroundColor: '#1e1e1e', border: '1px solid #2a2a2a' }}
        >
          <div className="text-center px-3">
            <div
              className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center"
              style={{ backgroundColor: '#2a2a2a' }}
            >
              <span className="text-lg" role="img" aria-label="임플란트 보철">🦷</span>
            </div>
            <span className="text-stone-600 text-xs">어버트먼트</span>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center">
          <div className="w-px h-16 bg-stone-700" />
        </div>

        {/* Placeholder 2 */}
        <div
          className="w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-2xl flex items-center justify-center text-xs text-stone-600"
          style={{ backgroundColor: '#1e1e1e', border: '1px solid #2a2a2a' }}
        >
          <div className="text-center px-3">
            <div
              className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center"
              style={{ backgroundColor: '#2a2a2a' }}
            >
              <span className="text-lg" role="img" aria-label="임플란트 완성">✨</span>
            </div>
            <span className="text-stone-600 text-xs">전악 보철</span>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8 text-center">
        {[
          { label: '당일 임시치아', desc: '수술 당일 식사 가능' },
          { label: '디지털 가이드', desc: '오차 ±0.1mm 정밀 식립' },
          { label: '의식하 진정', desc: '공포 없는 수술 환경' },
        ].map((feat) => (
          <div key={feat.label} className="flex flex-col items-center">
            <p className="text-xs font-semibold text-stone-300 mb-0.5">{feat.label}</p>
            <p className="text-xs text-stone-600">{feat.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <Link
        href="/implant"
        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-stone-300 rounded-full border border-stone-600 hover:border-stone-400 hover:text-white transition-all duration-300 group"
      >
        자세히 보기
        <Plus
          size={14}
          className="group-hover:rotate-90 transition-transform duration-300"
          aria-hidden="true"
        />
      </Link>

      {/* Scroll Down */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-stone-600 text-xs tracking-widest">
        <span>SCROLL DOWN</span>
        <ChevronDown size={16} className="animate-bounce" aria-hidden="true" />
      </div>
    </section>
  )
}
