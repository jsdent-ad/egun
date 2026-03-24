// @TASK Board - 게시판 히어로 섹션
interface BoardHeroProps {
  title: string
  subtitle: string
}

export default function BoardHero({ title, subtitle }: BoardHeroProps) {
  return (
    <section
      className="relative flex items-center justify-center min-h-[280px] sm:min-h-[340px] overflow-hidden"
      aria-label={`${title} 소개`}
    >
      {/* 올리브 그라데이션 배경 */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#96775A] via-[#B8A080] to-[#8A9B50]"
        aria-hidden="true"
      />
      {/* 패턴 오버레이 */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 text-center px-4 py-16 sm:py-20 max-w-3xl mx-auto">
        <p className="text-white/70 text-sm sm:text-base tracking-widest uppercase mb-3 font-medium">
          Seoul Egun Dental
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
          {title}
        </h1>
        <p className="text-white/80 text-base sm:text-lg leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  )
}
