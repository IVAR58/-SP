import { useState } from 'react';
import { MEMBERSHIPS, Membership } from '../data/clubData';
import { Check, ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';

interface MembershipsSectionProps {
  onOpenBooking: (title?: string, category?: string) => void;
}

const FILTERS = [
  { id: 'all', label: 'Все' },
  { id: 'unlimited', label: 'Безлимитные' },
  { id: 'day', label: 'Дневные' },
  { id: 'flexible', label: 'Разовое и пакеты' }
] as const;

type FilterId = (typeof FILTERS)[number]['id'];

export function MembershipsSection({ onOpenBooking }: MembershipsSectionProps) {
  const [filter, setFilter] = useState<FilterId>('all');

  const filtered = MEMBERSHIPS.filter((m) => {
    if (filter === 'all') return true;
    if (filter === 'unlimited') return m.type === 'unlimited';
    if (filter === 'day') return m.type === 'day';
    return m.type === 'single' || m.type === 'package';
  });

  return (
    <section id="memberships" className="py-24 sm:py-32 bg-neutral-950 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <Reveal>
            <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-red-500 mb-4">Тарифы</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.05]">
              Клубные карты и абонементы
            </h2>
          </Reveal>
          <Reveal delay={110}>
            <p className="mt-5 text-base sm:text-lg text-neutral-400 leading-relaxed font-medium">
              От разового визита на весь день до годового безлимита. В каждую карту уже включены: тренажёрный зал, бассейн 21 м и детская чаша, Cycle-студия, групповые программы, финская сауна и хамам.
            </p>
          </Reveal>
        </div>

        {/* Filters */}
        <Reveal delay={80}>
          <div className="flex flex-wrap items-center gap-2 mb-12">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-5 py-2.5 rounded-full text-[13px] font-bold transition-all duration-300 cursor-pointer ${
                  filter === f.id
                    ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(232,24,47,0.35)]'
                    : 'bg-white/[0.04] text-neutral-400 hover:text-white border border-white/10 hover:border-white/30'
                }`}
              >
                {f.label}
                {f.id === 'all' && <span className="ml-1.5 text-[11px] opacity-70">{MEMBERSHIPS.length}</span>}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((membership: Membership, i) => (
            <Reveal key={membership.id} delay={Math.min(i, 5) * 70}>
              <article
                className={`group relative h-full rounded-[24px] p-7 flex flex-col transition-all duration-500 hover:-translate-y-1.5 ${
                  membership.isPopular
                    ? 'bg-red-600 text-white shadow-[0_20px_60px_-18px_rgba(232,24,47,0.55)]'
                    : 'bg-white/[0.03] border border-white/10 hover:border-red-600/50 hover:bg-white/[0.05]'
                }`}
              >
                {membership.isPopular && (
                  <span className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-black text-white text-[11px] font-extrabold uppercase tracking-[0.12em] border border-white/15">
                    Хит продаж
                  </span>
                )}

                <p className={`text-[12px] font-bold uppercase tracking-[0.15em] ${membership.isPopular ? 'text-red-100' : 'text-red-500'}`}>
                  {membership.period}
                </p>

                <h3 className="mt-2.5 text-xl font-extrabold tracking-[-0.02em] text-white">
                  {membership.name}
                </h3>

                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="text-[40px] leading-none font-extrabold tracking-[-0.03em] text-white tabular-nums">
                    {membership.price.toLocaleString('ru-RU')}
                  </span>
                  <span className={`text-lg font-bold ${membership.isPopular ? 'text-red-100' : 'text-neutral-500'}`}>₽</span>
                </div>

                <p className={`mt-4 text-[13.5px] leading-relaxed font-medium min-h-[52px] ${membership.isPopular ? 'text-red-50/90' : 'text-neutral-400'}`}>
                  {membership.description}
                </p>

                <ul className={`mt-6 pt-6 space-y-2.5 border-t ${membership.isPopular ? 'border-white/25' : 'border-white/10'}`}>
                  {membership.features.slice(0, 4).map((feature, idx) => (
                    <li key={idx} className={`flex items-start gap-2.5 text-[13px] font-medium leading-snug ${membership.isPopular ? 'text-red-50' : 'text-neutral-300'}`}>
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${membership.isPopular ? 'text-white' : 'text-red-500'}`} strokeWidth={3} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-2 grow flex items-end">
                  <button
                    onClick={() =>
                      onOpenBooking(
                        `Абонемент: ${membership.name} (${membership.price.toLocaleString('ru-RU')} ₽)`,
                        'membership'
                      )
                    }
                    className={`group/btn w-full py-3.5 rounded-full font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] ${
                      membership.isPopular
                        ? 'bg-black text-white hover:bg-neutral-900'
                        : 'bg-white text-black hover:bg-red-600 hover:text-white'
                    }`}
                  >
                    Забронировать
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Helper strip */}
        <Reveal delay={100}>
          <div className="mt-12 rounded-[24px] border border-white/10 bg-white/[0.03] px-6 py-6 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-base font-extrabold text-white tracking-tight">Не уверены, что выбрать?</p>
              <p className="text-sm text-neutral-400 font-medium mt-1">
                Начните с разового посещения за 1 700 ₽ на весь день — или воспользуйтесь подбором ниже.
              </p>
            </div>
            <button
              onClick={() => onOpenBooking('Подбор абонемента', 'consultation')}
              className="shrink-0 px-6 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-all duration-300 hover:shadow-[0_0_24px_rgba(232,24,47,0.45)] cursor-pointer"
            >
              Помогите с выбором
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
