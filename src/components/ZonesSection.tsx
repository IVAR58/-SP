import { useState } from 'react';
import { CLUB_ZONES } from '../data/clubData';
import { Check, ChevronRight, ArrowUpRight } from 'lucide-react';
import { Reveal } from './Reveal';

interface ZonesSectionProps {
  onOpenBooking: (title?: string, category?: string) => void;
}

export function ZonesSection({ onOpenBooking }: ZonesSectionProps) {
  const [activeZoneId, setActiveZoneId] = useState(CLUB_ZONES[0].id);
  const activeZone = CLUB_ZONES.find((z) => z.id === activeZoneId) || CLUB_ZONES[0];
  const activeIndex = CLUB_ZONES.findIndex((z) => z.id === activeZoneId);

  return (
    <section id="zones" className="py-24 sm:py-32 bg-black border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-end mb-14">
          <Reveal>
            <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-red-500 mb-4">Инфраструктура</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.05]">
              Шесть пространств —
              <br />
              <span className="text-neutral-500">один клуб</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-neutral-300">
                Все зоны — зал, бассейн, Cycle, сауна и хамам
                <span className="text-white"> включены в любую клубную карту.</span>
              </p>
              <a
                href="#memberships"
                className="shrink-0 w-11 h-11 rounded-full bg-red-600 hover:bg-red-500 flex items-center justify-center text-white transition-colors"
                aria-label="К абонементам"
              >
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Tabs */}
        <Reveal delay={100}>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-10 no-scrollbar">
            {CLUB_ZONES.map((zone, i) => {
              const active = zone.id === activeZoneId;
              return (
                <button
                  key={zone.id}
                  onClick={() => setActiveZoneId(zone.id)}
                  className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-full text-[13px] font-bold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    active
                      ? 'bg-white text-black'
                      : 'text-neutral-400 hover:text-white border border-white/10 hover:border-white/30 bg-white/[0.02]'
                  }`}
                >
                  <span className={`text-[11px] tabular-nums ${active ? 'text-red-600' : 'text-neutral-600 group-hover:text-red-500'}`}>
                    0{i + 1}
                  </span>
                  {zone.title}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Active zone panel */}
        <Reveal delay={60} key={activeZone.id}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Image */}
            <div className="lg:col-span-7 relative img-zoom rounded-[28px] overflow-hidden border border-white/10">
              <img
                src={activeZone.image}
                alt={activeZone.title}
                className="w-full h-[300px] sm:h-[440px] lg:h-[500px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-5 left-5 sm:bottom-8 sm:left-8 right-5 flex items-end justify-between gap-4">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-black/60 backdrop-blur border border-white/15 text-[11px] font-bold uppercase tracking-[0.15em] text-white mb-2.5">
                    {activeZone.badge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.02em] text-white lg:hidden">
                    {activeZone.title}
                  </h3>
                </div>
                <span className="hidden sm:block text-[56px] leading-none font-extrabold text-white/10 select-none tabular-nums">
                  0{activeIndex + 1}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-5">
              <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-red-500 mb-3">{activeZone.subtitle}</p>
              <h3 className="hidden lg:block text-3xl lg:text-4xl font-extrabold tracking-[-0.02em] text-white">
                {activeZone.title}
              </h3>
              <p className="mt-4 text-[15px] sm:text-base text-neutral-400 leading-relaxed font-medium">
                {activeZone.description}
              </p>

              <ul className="mt-7 space-y-3">
                {activeZone.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-[14px] font-semibold text-neutral-200">
                    <span className="w-5 h-5 rounded-full bg-red-600/15 border border-red-600/40 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-red-500" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onOpenBooking(`Визит: ${activeZone.title}`, 'guest')}
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-all duration-300 hover:shadow-[0_0_24px_rgba(232,24,47,0.45)] active:scale-95 cursor-pointer"
                >
                  Прийти посмотреть
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <a
                  href="#memberships"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-full border border-white/15 hover:border-white/50 text-neutral-300 hover:text-white font-bold text-sm transition-colors"
                >
                  Цены на карты
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Zone strip thumbnails */}
        <div className="mt-16 grid grid-cols-3 sm:grid-cols-6 gap-3">
          {CLUB_ZONES.map((zone, i) => (
            <Reveal key={zone.id} delay={i * 60}>
              <button
                onClick={() => {
                  setActiveZoneId(zone.id);
                  document.getElementById('zones')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`group w-full text-left rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer ${
                  activeZoneId === zone.id
                    ? 'border-red-600 ring-1 ring-red-600/60'
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
                <div className="h-16 sm:h-20 overflow-hidden img-zoom">
                  <img
                    src={zone.image}
                    alt={zone.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="px-2.5 py-2 bg-white/[0.02]">
                  <p className="text-[11px] font-bold text-white truncate">{zone.title}</p>
                  <p className="text-[10px] font-semibold text-neutral-500 truncate">{zone.badge}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
