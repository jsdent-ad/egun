// @TASK Board - 게시판 히어로 섹션
interface BoardHeroProps {
  title: string
  subtitle: string
  videoId?: string
}

export default function BoardHero({ title, subtitle, videoId }: BoardHeroProps) {
  if (videoId) {
    return (
      <section
        className="relative min-h-[50vh] sm:min-h-[60vh] overflow-hidden"
        aria-label={`${title} 소개`}
      >
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&modestbranding=1&playsinline=1`}
          className="absolute inset-0 w-full h-full"
          style={{ transform: 'scale(1.2)' }}
          allow="autoplay; encrypted-media"
          allowFullScreen
          title={`${title} 소개 영상`}
        />
        <div className="absolute inset-0 bg-black/30" />
      </section>
    )
  }

  return (
    <section
      className="relative flex items-center justify-center min-h-[280px] sm:min-h-[340px] overflow-hidden"
      aria-label={`${title} 소개`}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#96775A] via-[#B8A080] to-[#8A9B50]"
        aria-hidden="true"
      />
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
        <p className="text-white/70 text-sm sm:text-base tracking-widest uppercase mb-3 font-medium animate-drop-in">
          Seoul Egun Dental
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 animate-drop-in [animation-delay:0.12s]">
          {title}
        </h1>
        <p className="text-white/80 text-base sm:text-lg leading-relaxed animate-drop-in [animation-delay:0.24s]">
          {subtitle}
        </p>
      </div>
    </section>
  )
}
