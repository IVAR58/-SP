import { useEffect, useState } from 'react';
import { MapPin, ArrowRight, Phone, ChevronDown } from 'lucide-react';
import { CLUB_INFO } from '../data/clubData';
import { ClubStatusBadge } from './ClubStatusBadge';

const HERO_VIDEO_SRC = 'https://videos.pexels.com/video-files/6012385/6012385-hd_1920_1080_25fps.mp4';
const HERO_VIDEO_SRC_MOBILE = 'https://videos.pexels.com/video-files/6012385/6012385-hd_1280_720_25fps.mp4';
const HERO_POSTER = '/images/pool-panorama.jpg';

interface HeroProps {
  onOpenBooking: (title?: string, category?: string) => void;
}

export function Hero({ onOpenBooking }: HeroProps) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <section className="relative min-h-[100svh] flex items-end bg-black overflow-hidden">
      {/* Video backdrop */}
      <div className="absolute inset-0">
        {reduceMotion ? (
          <img src={HERO_POSTER} alt="Бассейн 21 м — фитнес-клуб ГалаСпорт" className="w-full h-full object-cover" />
        ) : (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={HERO_POSTER}
            aria-hidden="true"
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" media="(min-width: 768px)" />
            <source src={HERO_VIDEO_SRC_MOBILE} type="video/mp4" />
          </video>
        )}
        {/* Readability overlays */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/60" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-14 sm:pb-16">
        <div className="max-w-3xl">
          <div className="hero-fade-up flex flex-wrap items-center gap-3 mb-6" style={{ ['--hero-delay' as never]: '100ms' }}>
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full border border-white/15 bg-black/50 backdrop-blur-md">
              <ClubStatusBadge compact />
            </span>
            <a
              href="#contacts"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/15 bg-black/50 backdrop-blur-md text-[11px] font-semibold text-neutral-300 hover:text-white hover:border-white/40 transition-colors"
            >
              <MapPin className="w-3 h-3 text-red-500" />
              Армянский пер., 29
            </a>
          </div>

          <h1 className="hero-fade-up text-[42px] leading-[0.98] sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.03em] text-white" style={{ ['--hero-delay' as never]: '220ms' }}>
            Фитнес-клуб
            <br />
            <span className="text-red-500">ГалаСпорт</span>
          </h1>

          <p className="hero-fade-up mt-5 text-base sm:text-lg lg:text-xl text-neutral-300 leading-relaxed max-w-xl font-medium" style={{ ['--hero-delay' as never]: '340ms' }}>
            Бассейн 21 метр и детский бассейн, тренажёрный зал, Cycle-студия, групповые программы и спа-комплекс с хамамом — всё в одном клубе во Всеволожске.
          </p>

          <div className="hero-fade-up mt-8 flex flex-col sm:flex-row gap-3" style={{ ['--hero-delay' as never]: '460ms' }}>
            <button
              onClick={() => onOpenBooking('Гостевой визит', 'guest')}
              className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-sm sm:text-base transition-all duration-300 hover:shadow-[0_0_32px_rgba(232,24,47,0.5)] active:scale-95 cursor-pointer"
            >
              Записаться на гостевой визит
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="#memberships"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-white/25 hover:border-white text-white/90 hover:text-white bg-white/[0.04] hover:bg-white/10 backdrop-blur-md font-bold text-sm sm:text-base transition-all duration-300"
            >
              Абонементы от 1 700 ₽
            </a>
          </div>

          <div className="hero-fade-up mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] font-semibold text-neutral-400" style={{ ['--hero-delay' as never]: '580ms' }}>
            <span className="text-white">Пн–Пт 07:00–23:00</span>
            <span className="w-1 h-1 rounded-full bg-red-600" />
            <span className="text-white">Сб–Вс 08:00–22:00</span>
            <span className="w-1 h-1 rounded-full bg-red-600" />
            <a href={`tel:${CLUB_INFO.phoneClean}`} className="inline-flex items-center gap-1.5 text-white hover:text-red-500 transition-colors">
              <Phone className="w-3.5 h-3.5" />
              {CLUB_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#pool"
        className="absolute right-6 sm:right-10 bottom-6 z-10 hidden sm:flex flex-col items-center gap-2 text-neutral-400 hover:text-white transition-colors group"
        style={{ animation: 'floatSlow 3s ease-in-out infinite' }}
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] [writing-mode:vertical-rl]">Бассейн</span>
        <ChevronDown className="w-5 h-5 group-hover:text-red-500 transition-colors" />
      </a>
    </section>
  );
}
