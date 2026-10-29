import { useState } from 'react';
import { PERSONAL_TRAINERS_INFO } from '../data/clubData';
import { ArrowRight, Check } from 'lucide-react';
import { Reveal } from './Reveal';

interface PersonalTrainingSectionProps {
  onOpenBooking: (title?: string, category?: string) => void;
}

export function PersonalTrainingSection({ onOpenBooking }: PersonalTrainingSectionProps) {
  const [hasPass, setHasPass] = useState(true);
  const { tiers, adultSwimming } = PERSONAL_TRAINERS_INFO;

  return (
    <section id="trainers" className="py-24 sm:py-32 bg-black border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <Reveal>
              <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-red-500 mb-4">Индивидуально</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.05]">
                Персональные
                <br />
                <span className="text-neutral-500">тренировки</span>
              </h2>
            </Reveal>
          </div>

          {/* Toggle */}
          <Reveal delay={120}>
            <div className="inline-flex items-center gap-1 p-1 rounded-full border border-white/10 bg-white/[0.03]">
              <button
                onClick={() => setHasPass(true)}
                className={`px-5 py-2.5 rounded-full text-[13px] font-bold transition-all duration-300 cursor-pointer ${
                  hasPass ? 'bg-red-600 text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                С абонементом
              </button>
              <button
                onClick={() => setHasPass(false)}
                className={`px-5 py-2.5 rounded-full text-[13px] font-bold transition-all duration-300 cursor-pointer ${
                  !hasPass ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Без абонемента
              </button>
            </div>
          </Reveal>
        </div>

        {/* Trainer tiers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          {tiers.map((tier, idx) => {
            const pricing = hasPass ? tier.withPass : tier.noPass;
            const rows = [
              { label: 'Индивидуальная тренировка', note: '1 человек · 60 минут', price: pricing.single },
              { label: 'Сплит-тренировка', note: 'пара · за двоих · 60 минут', price: pricing.split },
              ...(pricing.package10
                ? [{ label: 'Пакет 10 персональных тренировок', note: 'выгодный блок', price: pricing.package10 }]
                : [])
            ];
            return (
              <Reveal key={idx} delay={idx * 100}>
                <article className="h-full rounded-[24px] border border-white/10 bg-white/[0.03] hover:border-red-600/50 p-7 sm:p-9 flex flex-col transition-all duration-500">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="px-3.5 py-1.5 rounded-full bg-red-600 text-white text-[11px] font-extrabold uppercase tracking-[0.15em]">
                      {tier.badge}
                    </span>
                    <span className="text-[12px] font-bold text-neutral-500">
                      {hasPass ? 'тариф владельца карты' : 'включён вход в клуб'}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-[28px] font-extrabold tracking-[-0.02em] text-white">
                    {tier.category}
                  </h3>
                  <p className="mt-3 text-[14px] text-neutral-400 leading-relaxed font-medium">
                    {tier.description}
                  </p>

                  <div className="mt-7 space-y-3">
                    {rows.map((row, rIdx) => (
                      <div
                        key={rIdx}
                        className="flex items-center justify-between gap-4 py-3.5 px-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-white/20 transition-colors"
                      >
                        <div>
                          <p className="text-[14px] font-bold text-white">{row.label}</p>
                          <p className="text-[12px] font-medium text-neutral-500">{row.note}</p>
                        </div>
                        <p className="text-xl sm:text-2xl font-extrabold tracking-[-0.02em] text-white tabular-nums whitespace-nowrap">
                          {row.price.toLocaleString('ru-RU')} ₽
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 grow flex items-end">
                    <button
                      onClick={() =>
                        onOpenBooking(
                          `Персональная тренировка: ${tier.category} (${hasPass ? 'с абонементом' : 'без абонемента'})`,
                          'pt'
                        )
                      }
                      className="group/btn w-full py-3.5 rounded-full bg-white text-black hover:bg-red-600 hover:text-white font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                    >
                      Выбрать тренера
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Adult swimming */}
        <Reveal delay={120}>
          <article className="rounded-[24px] border border-white/10 bg-white/[0.03] p-7 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5">
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-red-500 mb-3">
                Плавание для взрослых · 60 минут
              </p>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.02em] text-white leading-snug">
                {adultSwimming.title.replace('(взрослые)', '').trim()}
              </h3>
              <ul className="mt-5 space-y-2.5">
                {['Техника кроля, брасса и баттерфляя', 'Преодоление страха глубины', 'Подготовка к заплывам и триатлону'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-[13.5px] font-semibold text-neutral-300">
                    <Check className="w-4 h-4 text-red-500 shrink-0" strokeWidth={3} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {adultSwimming.prices.map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/[0.07] bg-white/[0.03] hover:border-red-600/50 p-5 flex flex-col transition-all duration-300"
                >
                  <p className="text-[12px] font-bold text-neutral-400">{item.type}</p>
                  <p className="mt-2 text-[26px] leading-none font-extrabold tracking-[-0.02em] text-white tabular-nums">
                    {item.price.toLocaleString('ru-RU')} ₽
                  </p>
                  <p className="mt-1.5 text-[11.5px] font-semibold text-red-500">{item.note}</p>
                  <button
                    onClick={() => onOpenBooking(`Плавание (взрослые): ${item.type} (${item.price} ₽)`, 'swim-adult')}
                    className="mt-5 w-full py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    Записаться
                  </button>
                </div>
              ))}
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
