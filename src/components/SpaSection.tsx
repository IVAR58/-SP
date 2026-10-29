import { useState } from 'react';
import { SPA_PROGRAMS, SpaProgram } from '../data/clubData';
import { Clock, Gift, ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';

interface SpaSectionProps {
  onOpenBooking: (title?: string, category?: string) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'Все процедуры' },
  { id: 'spa-program', label: 'Спа-программы' },
  { id: 'hammam', label: 'Хамам' },
  { id: 'massage', label: 'Массаж и сертификаты' }
] as const;

type CategoryId = (typeof CATEGORIES)[number]['id'];

export function SpaSection({ onOpenBooking }: SpaSectionProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const filtered = SPA_PROGRAMS.filter((p) => activeCategory === 'all' || p.category === activeCategory);

  return (
    <section id="spa" className="py-24 sm:py-32 bg-black border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <Reveal>
              <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-red-500 mb-4">Спа-комплекс</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.05]">
                Спа-программы, хамам
                <br />
                <span className="text-neutral-500">и массаж</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <p className="text-base text-neutral-400 leading-relaxed font-medium max-w-sm lg:text-right">
              Восточные ритуалы в мраморном хамаме и авторские спа-программы 1.5–2.5 часа. Подарочные сертификаты — от 3 000 ₽.
            </p>
          </Reveal>
        </div>

        {/* Filters */}
        <Reveal delay={80}>
          <div className="flex flex-wrap items-center gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-[13px] font-bold transition-all duration-300 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(232,24,47,0.35)]'
                    : 'bg-white/[0.04] text-neutral-400 hover:text-white border border-white/10 hover:border-white/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((program: SpaProgram, i) => (
            <Reveal key={program.id} delay={Math.min(i, 3) * 70}>
              <article className="group h-full rounded-[24px] bg-white/[0.03] border border-white/10 hover:border-red-600/50 overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-1.5">
                <div className="relative h-52 img-zoom overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  {program.badge && (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-red-600 text-white text-[10.5px] font-extrabold uppercase tracking-[0.12em]">
                      {program.badge}
                    </span>
                  )}
                  {program.duration && (
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur border border-white/15 text-[11px] font-bold text-white">
                      <Clock className="w-3 h-3 text-red-500" />
                      {program.duration}
                    </span>
                  )}
                </div>

                <div className="p-6 flex flex-col grow">
                  <p className="text-[26px] leading-none font-extrabold tracking-[-0.02em] text-red-500 tabular-nums">
                    {program.price.toLocaleString('ru-RU')} ₽
                  </p>
                  <h3 className="mt-2.5 text-[17px] font-extrabold tracking-[-0.01em] text-white leading-snug min-h-[44px]">
                    {program.name}
                  </h3>
                  <p className="mt-2.5 text-[13px] text-neutral-400 leading-relaxed font-medium line-clamp-3">
                    {program.description}
                  </p>

                  {program.includes.length > 0 && (
                    <ul className="mt-4 pt-4 border-t border-white/10 space-y-1.5">
                      {program.includes.slice(0, 2).map((inc, j) => (
                        <li key={j} className="flex items-start gap-2 text-[12px] font-semibold text-neutral-300 leading-snug">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-red-500 shrink-0" />
                          {inc}
                        </li>
                      ))}
                      {program.includes.length > 2 && (
                        <li className="text-[11.5px] font-bold text-red-500">
                          + ещё {program.includes.length - 2} этапа ритуала
                        </li>
                      )}
                    </ul>
                  )}

                  <div className="mt-6 pt-1 grow flex items-end">
                    <button
                      onClick={() =>
                        onOpenBooking(`Спа: ${program.name} (${program.price.toLocaleString('ru-RU')} ₽)`, 'spa')
                      }
                      className="group/btn w-full py-3 rounded-full bg-white text-black hover:bg-red-600 hover:text-white font-bold text-[13px] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                    >
                      Записаться
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Gift banner */}
        <Reveal delay={100}>
          <div className="mt-16 relative rounded-[28px] overflow-hidden border border-white/10 bg-neutral-950">
            <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-red-600/15 to-transparent pointer-events-none" />
            <div className="relative p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-red-600 flex items-center justify-center shrink-0 shadow-[0_0_32px_rgba(232,24,47,0.4)]">
                  <Gift className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-red-500 mb-1.5">
                    Подарок, который запомнится
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.02em] text-white">
                    Подарочные сертификаты
                  </h3>
                  <p className="mt-2 text-sm sm:text-[15px] text-neutral-400 font-medium max-w-lg leading-relaxed">
                    На любую спа-программу или сеанс массажа 60 минут — в стильной подарочной упаковке на стойке рецепции.
                  </p>
                </div>
              </div>
              <div className="shrink-0 text-left md:text-right">
                <p className="text-4xl font-extrabold tracking-[-0.02em] text-white tabular-nums">от 3 000 ₽</p>
                <button
                  onClick={() => onOpenBooking('Подарочный сертификат на спа / массаж', 'gift')}
                  className="mt-4 px-7 py-3.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-all duration-300 hover:shadow-[0_0_28px_rgba(232,24,47,0.5)] cursor-pointer"
                >
                  Оформить сертификат
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
